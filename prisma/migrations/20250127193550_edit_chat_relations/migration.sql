/*
  Warnings:

  - You are about to drop the column `userId` on the `UserMessage` table. All the data in the column will be lost.
  - Added the required column `trainerId` to the `ChatRoom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ChatRoom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `UserMessage` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ChatRoom" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "trainerId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "ChatRoom_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ChatRoom_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ChatRoom" ("createdAt", "id") SELECT "createdAt", "id" FROM "ChatRoom";
DROP TABLE "ChatRoom";
ALTER TABLE "new_ChatRoom" RENAME TO "ChatRoom";
CREATE TABLE "new_UserMessage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "messageId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "chatRoomId" INTEGER NOT NULL,
    CONSTRAINT "UserMessage_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserMessage_chatRoomId_fkey" FOREIGN KEY ("chatRoomId") REFERENCES "ChatRoom" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserMessage_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserMessage" ("chatRoomId", "createdAt", "id", "messageId") SELECT "chatRoomId", "createdAt", "id", "messageId" FROM "UserMessage";
DROP TABLE "UserMessage";
ALTER TABLE "new_UserMessage" RENAME TO "UserMessage";
CREATE INDEX "UserMessage_authorId_idx" ON "UserMessage"("authorId");
CREATE INDEX "UserMessage_messageId_idx" ON "UserMessage"("messageId");
CREATE UNIQUE INDEX "UserMessage_authorId_messageId_key" ON "UserMessage"("authorId", "messageId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
