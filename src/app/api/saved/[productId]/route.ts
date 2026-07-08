import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/authz";
import { getSavedForUser } from "@/lib/saved";

// Saved items are keyed by (userId, productId) and every query below filters
// on the session's own userId, so there's no id to guess/IDOR into another
// customer's saved list — deleting a productId you haven't saved is a no-op
// (Prisma throws P2025, caught below), not a leak.

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
    await prisma.savedItem.delete({
      where: { userId_productId: { userId: session.user.id, productId } },
    });
  } catch {
    return NextResponse.json({ error: "Item not found in saved list." }, { status: 404 });
  }

  const saved = await getSavedForUser(session.user.id);
  return NextResponse.json(saved);
}
