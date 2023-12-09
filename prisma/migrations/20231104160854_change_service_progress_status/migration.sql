/*
  Warnings:

  - You are about to drop the column `finished` on the `Contract` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contract" DROP COLUMN "finished",
ADD COLUMN     "progressStatus" VARCHAR(20) NOT NULL DEFAULT 'NotStarted';
