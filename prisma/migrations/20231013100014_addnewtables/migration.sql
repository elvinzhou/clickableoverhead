-- CreateTable
CREATE TABLE "aircraft" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "msn" INTEGER NOT NULL,
    "tail" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "switches" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "atareference" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "aircraft_msn_key" ON "aircraft"("msn");

-- CreateIndex
CREATE UNIQUE INDEX "aircraft_tail_key" ON "aircraft"("tail");
