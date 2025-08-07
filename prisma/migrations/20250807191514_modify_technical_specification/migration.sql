/*
  Warnings:

  - You are about to drop the column `technical_specifi` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "technical_specifi",
ADD COLUMN     "manual_url" TEXT,
ADD COLUMN     "technical_specification" JSONB;
