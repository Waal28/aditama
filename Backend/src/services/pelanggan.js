import ResponseError from "../config/error.js";
import prisma from "../config/prisma.js";

export default class PelangganService {
  static async getAllPelanggan() {
    const pelanggan = await prisma.pelanggan.findMany();
    const result = {
      message: "Berhasil mengambil data pelanggan",
      data: pelanggan,
      status: "success",
    };
    return result;
  }

  static async getPelangganById(id) {
    const pelanggan = await prisma.pelanggan.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!pelanggan) throw new ResponseError(404, "Pelanggan tidak ditemukan");
    const result = {
      message: "Berhasil mengambil 1 data pelanggan",
      data: pelanggan,
      status: "success",
    };
    return result;
  }

  static async createPelanggan(data) {
    const pelanggan = await prisma.pelanggan.create({
      data,
    });
    const result = {
      message: "Berhasil menambahkan pelanggan",
      data: pelanggan,
      status: "success",
    };
    return result;
  }

  static async updatePelanggan(id, data) {
    const pelanggan = await prisma.pelanggan.update({
      where: {
        id: Number(id),
      },
      data,
    });
    const result = {
      message: "Berhasil mengubah pelanggan",
      data: pelanggan,
      status: "success",
    };
    return result;
  }

  static async deletePelanggan(id) {
    try {
      const pelanggan = await prisma.pelanggan.delete({
        where: {
          id,
        },
      });
      if (!pelanggan) {
        throw new ResponseError(
          404,
          `Pelanggan dengan id ${id} tidak ditemukan`
        );
      }
      const result = {
        message: "Berhasil menghapus pelanggan",
        status: "success",
      };
      return result;
    } catch (error) {
      return error;
    }
  }

  static async getDataPelangganByQuery(query) {
    const pelanggan = await prisma.pelanggan.findMany({
      where: {
        OR: [
          {
            nama: {
              contains: query,
            },
          },
          {
            alamat: {
              contains: query,
            },
          },
          {
            no_hp: {
              contains: query,
            },
          },
        ],
      },
    });
    const result = {
      message: "Berhasil mengambil data pelanggan sesuai query",
      data: pelanggan,
      status: "success",
    };
    return result;
  }
}
