/*
  Warnings:

  - You are about to drop the column `contractorId` on the `House` table. All the data in the column will be lost.
  - You are about to drop the `Contractor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Provider` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ownerId` to the `House` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Contractor" DROP CONSTRAINT "Contractor_userId_fkey";

-- DropForeignKey
ALTER TABLE "House" DROP CONSTRAINT "House_contractorId_fkey";

-- DropForeignKey
ALTER TABLE "Provider" DROP CONSTRAINT "Provider_userId_fkey";

-- AlterTable
ALTER TABLE "House" DROP COLUMN "contractorId",
ADD COLUMN     "ownerId" UUID NOT NULL;

-- DropTable
DROP TABLE "Contractor";

-- DropTable
DROP TABLE "Provider";

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
