/*
  Warnings:

  - Made the column `name` on table `switches` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `url` to the `versions` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_switches" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "atareference" TEXT NOT NULL,
    "equipnum" TEXT,
    "cmm" TEXT,
    "switchdesc" TEXT,
    "legend" TEXT,
    "effectivity" TEXT
);
INSERT INTO "new_switches" ("atareference", "id", "name") SELECT "atareference", "id", "name" FROM "switches";
DROP TABLE "switches";
ALTER TABLE "new_switches" RENAME TO "switches";
CREATE TABLE "new_versions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tbversion" TEXT NOT NULL,
    "rversion" TEXT NOT NULL,
    "url" TEXT NOT NULL
);
INSERT INTO "new_versions" ("id", "rversion", "tbversion") SELECT "id", "rversion", "tbversion" FROM "versions";
DROP TABLE "versions";
ALTER TABLE "new_versions" RENAME TO "versions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
