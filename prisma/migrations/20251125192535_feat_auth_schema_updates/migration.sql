/*
  Warnings:

  - You are about to drop the column `value` on the `verifications` table. All the data in the column will be lost.
  - Added the required column `verification_value` to the `verifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "verifications" DROP COLUMN "value",
ADD COLUMN     "verification_value" TEXT NOT NULL;
