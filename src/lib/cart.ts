import "server-only";
import { prisma } from "@/lib/prisma";

export async function getCartForUser(userId: string) {
  const items = await prisma.cartItem.findMany({
    where: { userId },
    include: { product: true },
    orderBy: { createdAt: "asc" },
  });

  // Only ever priced from the DB's current product prices, never from
  // anything a client could have cached or sent — this same helper backs
  // both the cart page display and the Stripe checkout line-item build, so
  // the two can never disagree.
  const subtotalCents = items.reduce(
    (sum, item) => sum + item.product.priceCents * item.quantity,
    0,
  );

  return { items, subtotalCents };
}
