import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { products } from "./product-catalog";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: product,
      create: product,
    });
  }

  // Products are never hard-deleted (SavedItem/ViewedItem cascade off them),
  // so anything dropped from the current catalog list just gets deactivated
  // instead — it can still show up in a user's saved/recently-viewed list
  // with a "no longer listed" badge.
  const currentIds = products.map((product) => product.id);
  const { count: deactivatedCount } = await prisma.product.updateMany({
    where: { id: { notIn: currentIds }, active: true },
    data: { active: false },
  });

  console.log(`Seeded ${products.length} products. Deactivated ${deactivatedCount} dropped products.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
