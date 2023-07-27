-- DropForeignKey
ALTER TABLE "Neighborhood" DROP CONSTRAINT "Neighborhood_cityId_fkey";

-- AddForeignKey
ALTER TABLE "Neighborhood" ADD CONSTRAINT "Neighborhood_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;
