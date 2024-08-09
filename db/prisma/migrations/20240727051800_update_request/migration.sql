/*
  Warnings:

  - The primary key for the `Request` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `mobile` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Request` table. All the data in the column will be lost.
  - Added the required column `emailOrMobile` to the `Request` table without a default value. This is not possible if the table is not empty.
  - The required column `requestId` was added to the `Request` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `senderName` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sentTo` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_senderId_fkey";

-- AlterTable
ALTER TABLE "Request" DROP CONSTRAINT "Request_pkey",
DROP COLUMN "mobile",
DROP COLUMN "username",
ADD COLUMN     "emailOrMobile" TEXT NOT NULL,
ADD COLUMN     "requestId" TEXT NOT NULL,
ADD COLUMN     "senderName" TEXT NOT NULL,
ADD COLUMN     "sentTo" TEXT NOT NULL,
ADD CONSTRAINT "Request_pkey" PRIMARY KEY ("requestId");

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_sentTo_fkey" FOREIGN KEY ("sentTo") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
