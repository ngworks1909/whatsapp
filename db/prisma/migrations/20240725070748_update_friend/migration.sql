/*
  Warnings:

  - A unique constraint covering the columns `[friendId]` on the table `Friend` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `friendId` to the `Friend` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Friend" ADD COLUMN     "friendId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Friend_friendId_key" ON "Friend"("friendId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
