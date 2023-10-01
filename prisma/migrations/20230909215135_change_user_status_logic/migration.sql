/*
  Warnings:

  - You are about to drop the column `approved` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "approved",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending';
