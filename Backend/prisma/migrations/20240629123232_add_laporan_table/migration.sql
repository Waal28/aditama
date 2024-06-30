-- CreateTable
CREATE TABLE `Laporan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `teknisi` VARCHAR(191) NOT NULL,
    `pelanggan` VARCHAR(191) NOT NULL,
    `tgl_pengerjaan` DATETIME(3) NOT NULL,
    `alamat_pelanggan` INTEGER NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `keterangan` VARCHAR(191) NOT NULL,
    `foto_sesudah_perbaikan` VARCHAR(191) NOT NULL,
    `foto_sebelum_perbaikan` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Laporan_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
