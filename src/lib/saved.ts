import "server-only";
import { prisma } from "@/lib/prisma";

export async function getSavedForUser(userId: string) {
  const items = await prisma.savedItem.findMany({
    where: { userId },
    include: { product: true },
    orderBy: { createdAt: "desc" },
  });

  return { items };
}
