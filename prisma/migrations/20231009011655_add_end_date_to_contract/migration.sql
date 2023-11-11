/*
  Warnings:

  - You are about to drop the column `date` on the `Contract` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Contract` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contract" DROP COLUMN "date",
ADD COLUMN     "endDate" TIMESTAMP NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP NOT NULL;
