/*
  Warnings:

  - Added the required column `address` to the `Campaign` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN     "address" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Campaign_address_idx" ON "Campaign"("address");
