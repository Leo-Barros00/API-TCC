/*
  Warnings:

  - You are about to drop the column `contractId` on the `Avaliation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Avaliation" DROP CONSTRAINT "Avaliation_contractId_fkey";

-- DropForeignKey
ALTER TABLE "Contract" DROP CONSTRAINT "Contract_avaliationId_fkey";

-- AlterTable
ALTER TABLE "Avaliation" DROP COLUMN "contractId";

-- AlterTable
ALTER TABLE "Contract" ALTER COLUMN "avaliationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_avaliationId_fkey" FOREIGN KEY ("avaliationId") REFERENCES "Avaliation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
