-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Store" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Store_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Store" ("id", "name", "userId") SELECT "id", "name", "userId" FROM "Store";
DROP TABLE "Store";
ALTER TABLE "new_Store" RENAME TO "Store";
CREATE UNIQUE INDEX "Store_name_key" ON "Store"("name");
CREATE UNIQUE INDEX "Store_userId_key" ON "Store"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
