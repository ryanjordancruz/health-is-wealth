import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/authz";
import { cartItemSchema } from "@/lib/validation";
import { getCartForUser } from "@/lib/cart";
import { rateLimit, clientIp } from "@/lib/rate-limit";

const MAX_QUANTITY_PER_ITEM = 50;

export async function GET() {
  const session = await requireSession();
  if (!session) {
    return NextResponse.json({ error: "You must be logged in." }, { status: 401 });
  }

  const cart = await getCartForUser(session.user.id);
  return NextResponse.json(cart);
}

export async function POST(request: Request) {
  const session = await requireSession();
  if (!session) {
    return NextResponse.json({ error: "You must be logged in." }, { status: 401 });
  }

  if (
    !rateLimit(`cart-add:${session.user.id}`, 60, 60 * 1000) ||
    !rateLimit(`cart-add-ip:${clientIp(request)}`, 120, 60 * 1000)
  ) {
    return NextResponse.json({ error: "Too many requests. Slow down." }, { status: 429 });
  }

  if (!(request.headers.get("content-type") ?? "").includes("application/json")) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  const parsed = cartItemSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  }

  const { productId, quantity } = parsed.data;

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product || !product.active) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  const existing = await prisma.cartItem.findUnique({
    where: { userId_productId: { userId: session.user.id, productId } },
  });

  const nextQuantity = Math.min(
    (existing?.quantity ?? 0) + quantity,
    MAX_QUANTITY_PER_ITEM,
  );

  await prisma.cartItem.upsert({
    where: { userId_productId: { userId: session.user.id, productId } },
    update: { quantity: nextQuantity },
    create: { userId: session.user.id, productId, quantity: nextQuantity },
  });

  const cart = await getCartForUser(session.user.id);
  return NextResponse.json(cart);
}
