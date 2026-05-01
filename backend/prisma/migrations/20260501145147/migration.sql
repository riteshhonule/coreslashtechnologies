/*
  Warnings:

  - You are about to drop the column `city` on the `leads` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "contacts" ADD COLUMN     "address" VARCHAR(255),
ADD COLUMN     "businessType" VARCHAR(100);

-- AlterTable
ALTER TABLE "leads" DROP COLUMN "city",
ADD COLUMN     "address" VARCHAR(255),
ADD COLUMN     "businessType" VARCHAR(100),
ADD COLUMN     "email" VARCHAR(160);
