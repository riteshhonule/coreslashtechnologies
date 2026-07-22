-- AlterEnum
BEGIN;
CREATE TYPE "CertificateStatus_new" AS ENUM ('Verified', 'Revoked', 'Expired');
ALTER TABLE "public"."Certificate" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Certificate" ALTER COLUMN "status" TYPE "CertificateStatus_new" USING ("status"::text::"CertificateStatus_new");
ALTER TYPE "CertificateStatus" RENAME TO "CertificateStatus_old";
ALTER TYPE "CertificateStatus_new" RENAME TO "CertificateStatus";
DROP TYPE "public"."CertificateStatus_old";
ALTER TABLE "Certificate" ALTER COLUMN "status" SET DEFAULT 'Verified';
COMMIT;

-- DropIndex
DROP INDEX "Certificate_certificateId_idx";

-- DropIndex
DROP INDEX "Certificate_certificateId_key";

-- AlterTable
ALTER TABLE "Certificate" DROP COLUMN "certificateId",
DROP COLUMN "studentName",
ADD COLUMN     "candidateName" TEXT NOT NULL,
ADD COLUMN     "certificateNumber" TEXT NOT NULL,
ADD COLUMN     "certificateUrl" TEXT,
ADD COLUMN     "completionDate" TIMESTAMP(3),
ADD COLUMN     "grade" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'Verified';

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_certificateNumber_key" ON "Certificate"("certificateNumber");

-- CreateIndex
CREATE INDEX "Certificate_certificateNumber_idx" ON "Certificate"("certificateNumber");
