-- DropForeignKey
ALTER TABLE "NeighborhoodsOnPreferences" DROP CONSTRAINT "NeighborhoodsOnPreferences_neighborhoodId_fkey";

-- DropForeignKey
ALTER TABLE "NeighborhoodsOnPreferences" DROP CONSTRAINT "NeighborhoodsOnPreferences_providerPreferencesId_fkey";

-- AddForeignKey
ALTER TABLE "NeighborhoodsOnPreferences" ADD CONSTRAINT "NeighborhoodsOnPreferences_providerPreferencesId_fkey" FOREIGN KEY ("providerPreferencesId") REFERENCES "ProviderPreferences"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NeighborhoodsOnPreferences" ADD CONSTRAINT "NeighborhoodsOnPreferences_neighborhoodId_fkey" FOREIGN KEY ("neighborhoodId") REFERENCES "Neighborhood"("id") ON DELETE CASCADE ON UPDATE CASCADE;
