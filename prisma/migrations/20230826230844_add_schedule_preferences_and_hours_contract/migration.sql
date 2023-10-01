/*
  Warnings:

  - Added the required column `workHours` to the `Contract` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_neighborhoodId_fkey";

-- AlterTable
ALTER TABLE "Contract" ADD COLUMN     "workHours" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ProviderPreferences" ADD COLUMN     "scheduleDayHours" INTEGER[];

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_neighborhoodId_fkey" FOREIGN KEY ("neighborhoodId") REFERENCES "Neighborhood"("id") ON DELETE CASCADE ON UPDATE CASCADE;
