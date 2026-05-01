/*
  Warnings:

  - You are about to drop the `leads` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "contacts" ADD COLUMN     "service" VARCHAR(120);

-- DropTable
DROP TABLE "leads";
