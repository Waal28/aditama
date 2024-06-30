/*
  Warnings:

  - You are about to alter the column `tglPengerjaan` on the `laporan` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `mbps` on the `paketwifi` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `tarifPerBulan` on the `paketwifi` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `tanggal` on the `transaksi` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `laporan` MODIFY `tglPengerjaan` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `paketwifi` MODIFY `mbps` INTEGER NOT NULL,
    MODIFY `tarifPerBulan` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `transaksi` MODIFY `tanggal` DATETIME(3) NOT NULL;
