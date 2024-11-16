/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `Token` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Token_user_id_token_key";

-- CreateIndex
CREATE UNIQUE INDEX "Token_token_key" ON "Token"("token");
