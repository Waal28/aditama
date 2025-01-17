import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ResponseError from "../config/error.js";
import prisma from "../config/prisma.js";
import { JWT_SECRET } from "../config/env.js";

export default class PenggunaService {
  static async login(data) {
    const { username, tipeAkses, password } = data;

    const pengguna = await prisma.pengguna.findUnique({
      where: {
        username,
      },
    });

    if (!pengguna || pengguna.tipeAkses !== tipeAkses) {
      throw new ResponseError(404, "Pengguna tidak ditemukan");
    }

    const isMatch = await bycrypt.compare(password, pengguna.password);

    if (!isMatch) {
      throw new ResponseError(404, "Password salah");
    }

    const payload = {
      nama: pengguna.nama,
      username: pengguna.username,
      tipeAkses: pengguna.tipeAkses,
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "1d",
    });

    const result = {
      message: "Berhasil login",
      data: token,
      status: "success",
    };

    return result;
  }
  static async getAllPengguna() {
    const pengguna = await prisma.pengguna.findMany();
    const result = {
      message: "Berhasil mengambil data pengguna",
      data: pengguna,
      status: "success",
    };
    return result;
  }

  static async getPenggunaById(id) {
    const pengguna = await prisma.pengguna.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!pengguna) throw new ResponseError(404, "Pengguna tidak ditemukan");
    const result = {
      message: "Berhasil mengambil 1 data pengguna",
      data: pengguna,
      status: "success",
    };
    return result;
  }

  static async createPengguna(data) {
    const findpengguna = await prisma.pengguna.findFirst({
      where: {
        username: data.username,
      },
    });
    if (findpengguna) throw new ResponseError(404, "Username sudah terdaftar");
    if (data.password.length < 5)
      throw new ResponseError(404, "Password minimal 5 karakter");

    const hashedPassword = await bycrypt.hash(data.password, 10);
    data.password = hashedPassword;

    const pengguna = await prisma.pengguna.create({
      data,
    });
    const result = {
      message: "Berhasil menambahkan pengguna",
      data: pengguna,
      status: "success",
    };
    return result;
  }

  static async updatePengguna(id, data) {
    const findPenggunaById = await prisma.pengguna.findFirst({
      where: {
        id: Number(id),
      },
    });
    const findPenggunaByName = await prisma.pengguna.findFirst({
      where: {
        username: data.username,
      },
    });
    if (!findPenggunaById)
      throw new ResponseError(404, "Pengguna tidak ditemukan");

    if (
      findPenggunaByName &&
      findPenggunaById.username !== findPenggunaByName.username
    )
      throw new ResponseError(404, "Username sudah terdaftar");

    // Mengecek apakah password ingin diubah dan apakah password memenuhi syarat
    if (data.password) {
      if (data.password.length < 5)
        throw new ResponseError(404, "Password minimal 5 karakter");

      const hashedPassword = await bycrypt.hash(data.password, 10);
      data.password = hashedPassword;
    }

    const pengguna = await prisma.pengguna.update({
      where: {
        id: Number(id),
      },
      data,
    });

    const result = {
      message: "Berhasil mengubah pengguna",
      data: pengguna,
      status: "success",
    };

    return result;
  }

  static async deletePengguna(id) {
    try {
      const pengguna = await prisma.pengguna.delete({
        where: {
          id,
        },
      });
      if (!pengguna) {
        throw new ResponseError(
          404,
          `pengguna dengan id ${id} tidak ditemukan`
        );
      }
      const result = {
        message: "Berhasil menghapus pengguna",
        status: "success",
      };
      return result;
    } catch (error) {
      return error;
    }
  }

  static async getDataPenggunaByQuery(query) {
    // Mendefinisikan nilai enum yang valid
    const validTipeAkses = ["admin", "teknisi"];

    // Membuat kondisi OR
    const conditions = [
      {
        nama: {
          contains: query,
        },
      },
      {
        username: {
          contains: query,
        },
      },
    ];

    // Menambahkan kondisi untuk tipeAkses jika query cocok dengan nilai enum
    if (validTipeAkses.includes(query.toLowerCase())) {
      conditions.push({
        tipeAkses: {
          equals: query.toLowerCase(),
        },
      });
    }

    const pengguna = await prisma.pengguna.findMany({
      where: {
        OR: conditions,
      },
    });

    const result = {
      message: "Berhasil mengambil data pengguna sesuai query",
      data: pengguna,
      status: "success",
    };
    return result;
  }
}
