/*
  Warnings:

  - You are about to drop the column `providerPreferencesId` on the `Neighborhood` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `ProviderPreferences` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `ProviderPreferences` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Neighborhood" DROP CONSTRAINT "Neighborhood_providerPreferencesId_fkey";

-- AlterTable
ALTER TABLE "Neighborhood" DROP COLUMN "providerPreferencesId";

-- AlterTable
ALTER TABLE "ProviderPreferences" ADD COLUMN     "userId" UUID NOT NULL;

-- CreateTable
CREATE TABLE "NeighborhoodsOnPreferences" (
    "providerPreferencesId" UUID NOT NULL,
    "neighborhoodId" UUID NOT NULL,

    CONSTRAINT "NeighborhoodsOnPreferences_pkey" PRIMARY KEY ("providerPreferencesId","neighborhoodId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProviderPreferences_userId_key" ON "ProviderPreferences"("userId");

-- AddForeignKey
ALTER TABLE "ProviderPreferences" ADD CONSTRAINT "ProviderPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NeighborhoodsOnPreferences" ADD CONSTRAINT "NeighborhoodsOnPreferences_providerPreferencesId_fkey" FOREIGN KEY ("providerPreferencesId") REFERENCES "ProviderPreferences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NeighborhoodsOnPreferences" ADD CONSTRAINT "NeighborhoodsOnPreferences_neighborhoodId_fkey" FOREIGN KEY ("neighborhoodId") REFERENCES "Neighborhood"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
