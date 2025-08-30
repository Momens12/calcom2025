/*
  Warnings:

  - A unique constraint covering the columns `[desk360Id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "desk360Id" INTEGER;

-- CreateTable
CREATE TABLE "Desk360" (
    "id" SERIAL NOT NULL,
    "apiKey" TEXT,

    CONSTRAINT "Desk360_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Desk360_apiKey_key" ON "Desk360"("apiKey");

-- CreateIndex
CREATE UNIQUE INDEX "users_desk360Id_key" ON "users"("desk360Id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_desk360Id_fkey" FOREIGN KEY ("desk360Id") REFERENCES "Desk360"("id") ON DELETE SET NULL ON UPDATE CASCADE;
