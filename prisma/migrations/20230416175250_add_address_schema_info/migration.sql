/*
  Warnings:

  - Added the required column `description` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "description" VARCHAR(255) NOT NULL,
ADD COLUMN     "number" VARCHAR(6);
