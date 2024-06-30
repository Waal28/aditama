import ResponseError from "../config/error.js";
import prisma from "../config/prisma.js";

export default class WifiService {
  static async getAllWifi() {
    const wifi = await prisma.paketWifi.findMany();
    const result = {
      message: "Berhasil mengambil data wifi",
      data: wifi,
      status: "success",
    };
    return result;
  }

  static async getWifiById(id) {
    const wifi = await prisma.paketWifi.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!wifi) throw new ResponseError(404, "Wifi tidak ditemukan");
    const result = {
      message: "Berhasil mengambil 1 data wifi",
      data: wifi,
      status: "success",
    };
    return result;
  }

  static async createWifi(data) {
    const { nama, mbps, tarifPerBulan } = data;
    const findWifi = await prisma.paketWifi.findFirst({
      where: {
        nama: data.nama,
      },
    });
    if (findWifi) throw new ResponseError(404, "Nama wifi sudah digunakan");
    const wifi = await prisma.paketWifi.create({
      data: {
        nama,
        mbps: Number(mbps),
        tarifPerBulan: Number(tarifPerBulan),
      },
    });
    const result = {
      message: "Berhasil menambahkan wifi",
      data: wifi,
      status: "success",
    };
    return result;
  }

  static async updateWifi(id, data) {
    const findWifi = await prisma.paketWifi.findFirst({
      where: {
        nama: data.nama,
      },
    });
    if (findWifi) throw new ResponseError(404, "Nama wifi sudah digunakan");
    const wifi = await prisma.paketWifi.update({
      where: {
        id: Number(id),
      },
      data,
    });
    const result = {
      message: "Berhasil mengubah wifi",
      data: wifi,
      status: "success",
    };
    return result;
  }

  static async deleteWifi(id) {
    try {
      const wifi = await prisma.paketWifi.delete({
        where: {
          id,
        },
      });
      if (!wifi) {
        throw new ResponseError(404, `wifi dengan id ${id} tidak ditemukan`);
      }
      const result = {
        message: "Berhasil menghapus wifi",
        status: "success",
      };
      return result;
    } catch (error) {
      return error;
    }
  }

  static async getDataWifiByQuery(query) {
    const wifi = await prisma.paketWifi.findMany({
      where: {
        OR: [
          {
            nama: {
              contains: query,
            },
          },
          {
            mbps: {
              contains: Number(query) || 0,
            },
          },
          {
            tarifPerBulan: {
              contains: Number(query) || 0,
            },
          },
        ],
      },
    });
    const result = {
      message: "Berhasil mengambil data wifi sesuai query",
      data: wifi,
      status: "success",
    };
    return result;
  }
}
