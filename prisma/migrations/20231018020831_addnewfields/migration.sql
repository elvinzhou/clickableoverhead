/*
  Warnings:

  - You are about to drop the column `name` on the `switches` table. All the data in the column will be lost.
  - Added the required column `cec` to the `aircraft` table without a default value. This is not possible if the table is not empty.
  - Added the required column `switchid` to the `switches` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_aircraft" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "msn" INTEGER NOT NULL,
    "tail" INTEGER NOT NULL,
    "fleet" TEXT NOT NULL,
    "cec" INTEGER NOT NULL
);
INSERT INTO "new_aircraft" ("fleet", "id", "msn", "tail") SELECT "fleet", "id", "msn", "tail" FROM "aircraft";
DROP TABLE "aircraft";
ALTER TABLE "new_aircraft" RENAME TO "aircraft";
CREATE UNIQUE INDEX "aircraft_msn_key" ON "aircraft"("msn");
CREATE UNIQUE INDEX "aircraft_tail_key" ON "aircraft"("tail");
CREATE TABLE "new_switches" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "switchid" TEXT NOT NULL,
    "atareference" TEXT NOT NULL,
    "equipnum" TEXT,
    "cmm" TEXT,
    "switchdesc" TEXT,
    "legend" TEXT,
    "effectivity" TEXT,
    "panel" TEXT
);
INSERT INTO "new_switches" ("atareference", "cmm", "effectivity", "equipnum", "id", "legend", "switchdesc") SELECT "atareference", "cmm", "effectivity", "equipnum", "id", "legend", "switchdesc" FROM "switches";
DROP TABLE "switches";
ALTER TABLE "new_switches" RENAME TO "switches";
CREATE UNIQUE INDEX "switches_switchid_atareference_key" ON "switches"("switchid", "atareference");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
