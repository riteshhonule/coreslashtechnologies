-- CreateEnum
CREATE TYPE "AuditStatus" AS ENUM ('PENDING', 'FETCHING_WEBSITE', 'PERFORMANCE_ANALYSIS', 'SEO_ANALYSIS', 'MOBILE_ANALYSIS', 'ACCESSIBILITY_ANALYSIS', 'SECURITY_ANALYSIS', 'TECH_STACK_DETECTION', 'AI_READINESS_ANALYSIS', 'COMPETITOR_ANALYSIS', 'GENERATING_REPORT', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "WebsiteAudit" (
    "id" SERIAL NOT NULL,
    "auditId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "competitorUrl" TEXT,
    "email" TEXT,
    "status" "AuditStatus" NOT NULL DEFAULT 'PENDING',
    "overallScore" INTEGER,
    "grade" TEXT,
    "reportJson" JSONB,
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "WebsiteAudit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WebsiteAudit_auditId_key" ON "WebsiteAudit"("auditId");
