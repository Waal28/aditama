-- DropForeignKey
ALTER TABLE `transaksi` DROP FOREIGN KEY `Transaksi_pelangganId_fkey`;

-- AddForeignKey
ALTER TABLE `Transaksi` ADD CONSTRAINT `Transaksi_pelangganId_fkey` FOREIGN KEY (`pelangganId`) REFERENCES `Pelanggan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
