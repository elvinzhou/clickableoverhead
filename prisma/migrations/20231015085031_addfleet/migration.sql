/*
  Warnings:

  - Added the required column `fleet` to the `aircraft` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_aircraft" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "msn" INTEGER NOT NULL,
    "tail" INTEGER NOT NULL,
    "fleet" TEXT NOT NULL
);
INSERT INTO "new_aircraft" ("id", "msn", "tail") SELECT "id", "msn", "tail" FROM "aircraft";
DROP TABLE "aircraft";
ALTER TABLE "new_aircraft" RENAME TO "aircraft";
CREATE UNIQUE INDEX "aircraft_msn_key" ON "aircraft"("msn");
CREATE UNIQUE INDEX "aircraft_tail_key" ON "aircraft"("tail");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
