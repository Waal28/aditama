/*
  Warnings:

  - You are about to alter the column `tagihan` on the `transaksi` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `transaksi` MODIFY `tagihan` INTEGER NOT NULL;
