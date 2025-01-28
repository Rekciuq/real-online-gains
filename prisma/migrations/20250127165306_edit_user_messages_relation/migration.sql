/*
  Warnings:

  - You are about to drop the column `userId` on the `UserMessage` table. All the data in the column will be lost.
  - Added the required column `receiverId` to the `UserMessage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `UserMessage` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserMessage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "messageId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserMessage_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserMessage_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserMessage" ("createdAt", "id", "messageId") SELECT "createdAt", "id", "messageId" FROM "UserMessage";
DROP TABLE "UserMessage";
ALTER TABLE "new_UserMessage" RENAME TO "UserMessage";
CREATE INDEX "UserMessage_senderId_idx" ON "UserMessage"("senderId");
CREATE INDEX "UserMessage_receiverId_idx" ON "UserMessage"("receiverId");
CREATE INDEX "UserMessage_messageId_idx" ON "UserMessage"("messageId");
CREATE UNIQUE INDEX "UserMessage_senderId_receiverId_messageId_key" ON "UserMessage"("senderId", "receiverId", "messageId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
