/*
  Warnings:

  - The `programPreferenceID` column on the `Application` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `jobAppliedForID` column on the `Application` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `type` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "type" TEXT NOT NULL,
DROP COLUMN "programPreferenceID",
ADD COLUMN     "programPreferenceID" INTEGER,
DROP COLUMN "jobAppliedForID",
ADD COLUMN     "jobAppliedForID" INTEGER;
