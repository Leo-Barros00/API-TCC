/*
  Warnings:

  - You are about to drop the column `scheduleDayHours` on the `ProviderPreferences` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProviderPreferences" DROP COLUMN "scheduleDayHours",
ADD COLUMN     "workEightHoursPerDay" INTEGER,
ADD COLUMN     "workFourHoursPerDay" INTEGER,
ADD COLUMN     "workSixHoursPerDay" INTEGER;
