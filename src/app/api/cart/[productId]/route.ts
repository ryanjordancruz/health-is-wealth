import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/authz";
import { getCartForUser } from "@/lib/cart";

const quantitySchema = z.object({
  quantity: z.coerce.number().int().min(1).max(50),
});

// Cart items are keyed by (userId, productId) and every query below filters
// on the session's own userId, so there's no id to guess/IDOR into another
// customer's cart — updating/deleting a productId you don't have in your
// cart is a no-op (Prisma throws P2025, caught below), not a leak.

export async function PATCH(
  request: Request,
  ctx: { params: Promise<{ productId: string }> },
) {
  const session = await requireSession();
  if (!session) {
    return NextResponse.json({ error: "You must be logged in." }, { status: 401 });
  }

  const { productId } = await ctx.params;
  const body = await request.json().catch(() => null);
  const parsed = quantitySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  }

  try {
    await prisma.cartItem.update({
      where: { userId_productId: { userId: session.user.id, productId } },
      data: { quantity: parsed.data.quantity },
    });
  } catch {
    return NextResponse.json({ error: "Item not found in cart." }, { status: 404 });
  }

  const cart = await getCartForUser(session.user.id);
  return NextResponse.json(cart);
}

export async function DELETE(
  _request: Request,
  ctx: { params: Promise<{ productId: string }> },
) {
  const session = await requireSession();
  if (!session) {
    return NextResponse.json({ error: "You must be logged in." }, { status: 401 });
  }

  const { productId } = await ctx.params;

  try {
    await prisma.cartItem.delete({
      where: { userId_productId: { userId: session.user.id, productId } },
    });
  } catch {
    return NextResponse.json({ error: "Item not found in cart." }, { status: 404 });
  }

  const cart = await getCartForUser(session.user.id);
  return NextResponse.json(cart);
}
