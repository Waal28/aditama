import ResponseError from "../config/error.js";
import prisma from "../config/prisma.js";

export default class LaporanService {
  static async getAllLaporan() {
    const laporan = await prisma.laporan.findMany();
    laporan.forEach((item) => {
      item.teknisi = JSON.parse(item.teknisi);
    });
    const result = {
      message: "Berhasil mengambil data laporan",
      data: laporan,
      status: "success",
    };
    return result;
  }

  static async getLaporanById(id) {
    const laporan = await prisma.laporan.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!laporan) throw new ResponseError(404, "Laporan tidak ditemukan");
    laporan.teknisi = JSON.parse(laporan.teknisi);
    const result = {
      message: "Berhasil mengambil 1 data laporan",
      data: laporan,
      status: "success",
    };
    return result;
  }

  static async createLaporan(data) {
    const laporan = await prisma.laporan.create({
      data: {
        ...data,
        teknisi: data.teknisi,
      },
    });
    const result = {
      message: "Berhasil menambahkan laporan",
      data: laporan,
      status: "success",
    };
    return result;
  }

  static async updateLaporan(id, data) {
    const laporan = await prisma.laporan.update({
      where: {
        id: Number(id),
      },
      data,
    });
    laporan.teknisi = JSON.parse(laporan.teknisi);
    const result = {
      message: "Berhasil mengubah laporan",
      data: laporan,
      status: "success",
    };
    return result;
  }

  static async deleteLaporan(id) {
    try {
      const laporan = await prisma.laporan.delete({
        where: {
          id,
        },
      });
      if (!laporan) {
        throw new ResponseError(404, `Laporan dengan id ${id} tidak ditemukan`);
      }
      const result = {
        message: "Berhasil menghapus laporan",
        status: "success",
      };
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  static async getDataLaporanByQuery(query) {
    const laporan = await prisma.laporan.findMany();
    const filterLaporan = laporan.filter(
      (item) =>
        item.teknisi.toLowerCase().includes(query.toLowerCase()) ||
        item.pelanggan.toLowerCase().includes(query.toLowerCase()) ||
        item.alamat_pelanggan.toLowerCase().includes(query.toLowerCase())
    );

    filterLaporan.forEach((item) => {
      item.teknisi = JSON.parse(item.teknisi);
    });
    const result = {
      message: "Berhasil mengambil data laporan sesuai query",
      data: filterLaporan,
      status: "success",
    };
    return result;
  }
}
