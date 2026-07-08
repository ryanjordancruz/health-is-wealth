import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/authz";
import { savedItemSchema } from "@/lib/validation";
import { getSavedForUser } from "@/lib/saved";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export async function GET() {
  const session = await requireSession();
  if (!session) {
    return NextResponse.json({ error: "You must be logged in." }, { status: 401 });
  }

  const saved = await getSavedForUser(session.user.id);
  return NextResponse.json(saved);
}

export async function POST(request: Request) {
  const session = await requireSession();
  if (!session) {
    return NextResponse.json({ error: "You must be logged in." }, { status: 401 });
  }

  if (
    !rateLimit(`saved-add:${session.user.id}`, 60, 60 * 1000) ||
    !rateLimit(`saved-add-ip:${clientIp(request)}`, 120, 60 * 1000)
  ) {
    return NextResponse.json({ error: "Too many requests. Slow down." }, { status: 429 });
  }

  if (!(request.headers.get("content-type") ?? "").includes("application/json")) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  const parsed = savedItemSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  }

  const { productId } = parsed.data;

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product || !product.active) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  // Idempotent: saving something already saved is a no-op, not an error.
  await prisma.savedItem.upsert({
    where: { userId_productId: { userId: session.user.id, productId } },
    update: {},
    create: { userId: session.user.id, productId },
  });

  const saved = await getSavedForUser(session.user.id);
  return NextResponse.json(saved);
}
