import ResponseError from "../config/error.js";
import prisma from "../config/prisma.js";

export default class LaporanService {
  static async getAllLaporan() {
    const laporan = await prisma.laporan.findMany();
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
    const result = {
      message: "Berhasil mengambil 1 data laporan",
      data: laporan,
      status: "success",
    };
    return result;
  }

  static async createLaporan(data) {
    const laporan = await prisma.laporan.create({
      data,
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
    const laporan = await prisma.laporan.findMany({
      where: {
        OR: [
          {
            teknisi: {
              contains: query,
            },
          },
          {
            pelanggan: {
              contains: query,
            },
          },
          {
            alamat_pelanggan: {
              contains: query,
            },
          },
        ],
      },
    });
    const result = {
      message: "Berhasil mengambil data laporan sesuai query",
      data: laporan,
      status: "success",
    };
    return result;
  }
}
