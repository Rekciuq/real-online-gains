/*
  Warnings:

  - You are about to drop the column `receiverId` on the `UserMessage` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `UserMessage` table. All the data in the column will be lost.
  - Added the required column `chatRoomId` to the `UserMessage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UserMessage` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "ChatRoom" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserMessage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "messageId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "chatRoomId" INTEGER NOT NULL,
    CONSTRAINT "UserMessage_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserMessage_chatRoomId_fkey" FOREIGN KEY ("chatRoomId") REFERENCES "ChatRoom" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserMessage" ("createdAt", "id", "messageId") SELECT "createdAt", "id", "messageId" FROM "UserMessage";
DROP TABLE "UserMessage";
ALTER TABLE "new_UserMessage" RENAME TO "UserMessage";
CREATE INDEX "UserMessage_userId_idx" ON "UserMessage"("userId");
CREATE INDEX "UserMessage_messageId_idx" ON "UserMessage"("messageId");
CREATE UNIQUE INDEX "UserMessage_userId_messageId_key" ON "UserMessage"("userId", "messageId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
