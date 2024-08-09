/*
  Warnings:

  - The primary key for the `Friend` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `combinedId` on the `Friend` table. All the data in the column will be lost.
  - You are about to drop the column `combinedId` on the `Message` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_combinedId_fkey";

-- AlterTable
ALTER TABLE "Friend" DROP CONSTRAINT "Friend_pkey",
DROP COLUMN "combinedId",
ADD CONSTRAINT "Friend_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "combinedId",
ADD COLUMN     "recieverId" TEXT NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Friend"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_recieverId_fkey" FOREIGN KEY ("recieverId") REFERENCES "Friend"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
