/*
  Warnings:

  - You are about to drop the column `userId` on the `ProviderPreferences` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[preferenceId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ProviderPreferences" DROP CONSTRAINT "ProviderPreferences_userId_fkey";

-- DropIndex
DROP INDEX "ProviderPreferences_userId_key";

-- AlterTable
ALTER TABLE "ProviderPreferences" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "preferenceId" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "User_preferenceId_key" ON "User"("preferenceId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_preferenceId_fkey" FOREIGN KEY ("preferenceId") REFERENCES "ProviderPreferences"("id") ON DELETE SET NULL ON UPDATE CASCADE;
