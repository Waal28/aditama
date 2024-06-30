import ResponseError from "../config/error.js";
import prisma from "../config/prisma.js";

export default class TransaksiService {
  static async getAllTransaksi() {
    const transaksi = await prisma.transaksi.findMany({
      include: {
        pelanggan: true,
      },
    });

    const result = {
      message: "Berhasil mengambil data transaksi",
      data: transaksi,
      status: "success",
    };
    return result;
  }

  static async getTransaksiById(id) {
    const transaksi = await prisma.transaksi.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        pelanggan: true,
      },
    });
    if (!transaksi) throw new ResponseError(404, "transaksi tidak ditemukan");
    const result = {
      message: "Berhasil mengambil 1 data transaksi",
      data: transaksi,
      status: "success",
    };
    return result;
  }

  static async createTransaksi(data) {
    const { pelangganId, bulan, tahun } = data;
    const pelanggan = await prisma.pelanggan.findFirst({
      where: {
        id: Number(pelangganId),
      },
    });
    const paketWifi = await prisma.paketWifi.findFirst({
      where: {
        nama: pelanggan.paketWifi,
      },
    });
    if (!pelanggan) {
      throw new ResponseError(404, "Pelanggan tidak ditemukan");
    }
    if (!paketWifi) {
      throw new ResponseError(404, "Paket wifi tidak ditemukan");
    }
    const payload = {
      tagihan: paketWifi.tarifPerBulan,
      status: "Belum Lunas",
      pelangganId: pelanggan.id,
      bulan,
      tahun: Number(tahun),
    };
    const transaksi = await prisma.transaksi.create({
      data: payload,
    });
    const result = {
      message: "Berhasil menambahkan transaksi",
      data: transaksi,
      status: "success",
    };
    return result;
  }
  static async setLunasTransaksi(id) {
    const transaksi = await prisma.transaksi.update({
      where: {
        id: Number(id),
      },
      data: {
        status: "Lunas",
      },
    });
    const result = {
      message: "Berhasil lunaskan transaksi",
      data: transaksi,
      status: "success",
    };
    return result;
  }
  static async deleteTransaksi(id) {
    try {
      const transaksi = await prisma.transaksi.delete({
        where: {
          id,
        },
      });
      if (!transaksi) {
        throw new ResponseError(
          404,
          `Transaksi dengan id ${id} tidak ditemukan`
        );
      }
      const result = {
        message: "Berhasil menghapus transaksi",
        status: "success",
      };
      return result;
    } catch (error) {
      return error;
    }
  }

  static async getDataTransaksiByQuery(query) {
    const transaksi = await prisma.transaksi.findMany({
      where: {
        OR: [
          {
            pelanggan: {
              nama: {
                contains: query,
              },
            },
          },
          {
            pelanggan: {
              paketWifi: {
                contains: query,
              },
            },
          },
        ],
      },
      include: {
        pelanggan: true, // Termasuk data pelanggan dalam hasil
      },
    });
    const result = {
      message: "Berhasil mengambil data transaksi sesuai query",
      data: transaksi,
      status: "success",
    };
    return result;
  }
}
