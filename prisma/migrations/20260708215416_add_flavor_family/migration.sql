-- AlterTable
ALTER TABLE "Product" ADD COLUMN "familyId" TEXT;
ALTER TABLE "Product" ADD COLUMN "flavorName" TEXT;

-- CreateIndex
CREATE INDEX "Product_familyId_idx" ON "Product"("familyId");
