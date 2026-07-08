import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/authz";
import { viewedItemSchema } from "@/lib/validation";
import { rateLimit, clientIp } from "@/lib/rate-limit";

// Fire-and-forget: called via navigator.sendBeacon/fetch(keepalive) whenever
// a visitor clicks out to a brand's site. Recording view history isn't the
// primary action a caller is taking, so this always resolves 204 — a
// logged-out visitor or a rate-limited/invalid request is a silent no-op,
// never a blocking error surfaced to the click itself.
export async function POST(request: Request) {
  if (!rateLimit(`view-record-ip:${clientIp(request)}`, 240, 60 * 1000)) {
    return new NextResponse(null, { status: 204 });
  }

  const session = await requireSession();
  if (!session) {
    return new NextResponse(null, { status: 204 });
  }

  if (!rateLimit(`view-record:${session.user.id}`, 120, 60 * 1000)) {
    return new NextResponse(null, { status: 204 });
  }

  const body = await request.json().catch(() => null);
  const parsed = viewedItemSchema.safeParse(body);
  if (!parsed.success) {
    return new NextResponse(null, { status: 204 });
  }

  const { productId } = parsed.data;

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) {
    return new NextResponse(null, { status: 204 });
  }

  await prisma.viewedItem.upsert({
    where: { userId_productId: { userId: session.user.id, productId } },
    update: { viewedAt: new Date() },
    create: { userId: session.user.id, productId },
  });

  return new NextResponse(null, { status: 204 });
}
