/*
  Warnings:

  - Added the required column `avaliationId` to the `Contract` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contract" ADD COLUMN     "avaliationId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_avaliationId_fkey" FOREIGN KEY ("avaliationId") REFERENCES "Avaliation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
