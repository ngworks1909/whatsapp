/*
  Warnings:

  - You are about to drop the column `email` on the `Request` table. All the data in the column will be lost.
  - Added the required column `senderEmail` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Request" DROP COLUMN "email",
ADD COLUMN     "senderEmail" TEXT NOT NULL;
