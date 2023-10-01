/*
  Warnings:

  - Added the required column `date` to the `Contract` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contract" ADD COLUMN     "accepted" BOOLEAN,
ADD COLUMN     "date" DATE NOT NULL;
