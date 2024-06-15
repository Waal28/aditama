/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Laporan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `PaketWifi` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Pelanggan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Transaksi` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Laporan_id_key` ON `Laporan`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `PaketWifi_id_key` ON `PaketWifi`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Pelanggan_id_key` ON `Pelanggan`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Transaksi_id_key` ON `Transaksi`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `User_id_key` ON `User`(`id`);
