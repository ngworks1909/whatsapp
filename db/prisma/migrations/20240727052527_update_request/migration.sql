/*
  Warnings:

  - You are about to drop the column `sentTo` on the `Request` table. All the data in the column will be lost.
  - Added the required column `recieverId` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_sentTo_fkey";

-- AlterTable
ALTER TABLE "Request" DROP COLUMN "sentTo",
ADD COLUMN     "recieverId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_recieverId_fkey" FOREIGN KEY ("recieverId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
