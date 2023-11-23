/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Contact` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "updatedAt",
ADD COLUMN     "received" BOOLEAN NOT NULL DEFAULT false;
