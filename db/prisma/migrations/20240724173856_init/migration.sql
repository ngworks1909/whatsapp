-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pending', 'Accepted', 'Rejected');

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT 'https://github.com/shadcn.png',
    "mobile" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Friend" (
    "userId" TEXT NOT NULL,
    "combinedId" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "lastMessage" TEXT NOT NULL DEFAULT '',
    "time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Friend_pkey" PRIMARY KEY ("combinedId")
);

-- CreateTable
CREATE TABLE "Message" (
    "combinedId" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "senderId" TEXT NOT NULL,
    "senderDelete" BOOLEAN NOT NULL DEFAULT false,
    "recieverDelete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("messageId")
);

-- CreateTable
CREATE TABLE "Request" (
    "senderId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Pending',

    CONSTRAINT "Request_pkey" PRIMARY KEY ("mobile")
);

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_combinedId_fkey" FOREIGN KEY ("combinedId") REFERENCES "Friend"("combinedId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
