-- AlterTable
ALTER TABLE "Neighborhood" ADD COLUMN     "providerPreferencesId" UUID;

-- CreateTable
CREATE TABLE "ProviderPreferences" (
    "id" UUID NOT NULL,
    "animals" BOOLEAN NOT NULL,
    "maximumMetersBuilt" INTEGER NOT NULL,

    CONSTRAINT "ProviderPreferences_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Neighborhood" ADD CONSTRAINT "Neighborhood_providerPreferencesId_fkey" FOREIGN KEY ("providerPreferencesId") REFERENCES "ProviderPreferences"("id") ON DELETE SET NULL ON UPDATE CASCADE;
