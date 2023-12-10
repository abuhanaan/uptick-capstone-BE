-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "companyName" TEXT,
ADD COLUMN     "jobCategory" TEXT,
ADD COLUMN     "jobMode" TEXT,
ADD COLUMN     "jobType" TEXT,
ADD COLUMN     "location" TEXT,
ALTER COLUMN "startDate" SET DEFAULT CURRENT_TIMESTAMP;
