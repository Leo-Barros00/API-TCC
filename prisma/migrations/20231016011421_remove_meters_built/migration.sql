/*
  Warnings:

  - You are about to drop the column `metersBuilt` on the `House` table. All the data in the column will be lost.
  - You are about to drop the column `maximumMetersBuilt` on the `ProviderPreferences` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "House" DROP COLUMN "metersBuilt";

-- AlterTable
ALTER TABLE "ProviderPreferences" DROP COLUMN "maximumMetersBuilt";
