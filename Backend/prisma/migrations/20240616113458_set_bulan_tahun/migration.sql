/*
  Warnings:

  - You are about to drop the `laporan` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Pelanggan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bulan` to the `Transaksi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tahun` to the `Transaksi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Transaksi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pelanggan` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `transaksi` ADD COLUMN `bulan` VARCHAR(191) NOT NULL,
    ADD COLUMN `tahun` INTEGER NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- DropTable
DROP TABLE `laporan`;
