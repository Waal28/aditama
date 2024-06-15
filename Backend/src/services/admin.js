import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ResponseError from "../config/error.js";
import prisma from "../config/prisma.js";
import { JWT_SECRET } from "../config/env.js";

export default class AdminService {
  static async login(data) {
    const { username, password } = data;

    const admin = await prisma.admin.findUnique({
      where: {
        username,
      },
    });

    if (!admin) {
      throw new ResponseError(404, "username tidak ditemukan");
    }

    const isMatch = await bycrypt.compare(password, admin.password);

    if (!isMatch) {
      throw new ResponseError(404, "Password salah");
    }

    const payload = {
      nama: admin.nama,
      username: admin.username,
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "1h",
    });

    const result = {
      message: "Berhasil login",
      data: token,
      status: "success",
    };

    return result;
  }
  static async getAllAdmin() {
    const admin = await prisma.admin.findMany();
    const result = {
      message: "Berhasil mengambil data admin",
      data: admin,
      status: "success",
    };
    return result;
  }

  static async getAdminById(id) {
    const admin = await prisma.admin.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!admin) throw new ResponseError(404, "admin tidak ditemukan");
    const result = {
      message: "Berhasil mengambil 1 data admin",
      data: admin,
      status: "success",
    };
    return result;
  }

  static async createAdmin(data) {
    const hashedPassword = await bycrypt.hash(data.password, 10);
    data.password = hashedPassword;
    const admin = await prisma.admin.create({
      data,
    });
    const result = {
      message: "Berhasil menambahkan Admin",
      data: admin,
      status: "success",
    };
    return result;
  }

  static async updateAdmin(id, data) {
    const admin = await prisma.admin.update({
      where: {
        id: Number(id),
      },
      data,
    });
    const result = {
      message: "Berhasil mengubah Admin",
      data: admin,
      status: "success",
    };
    return result;
  }

  static async deleteAdmin(id) {
    try {
      const admin = await prisma.admin.delete({
        where: {
          id,
        },
      });
      if (!admin) {
        throw new ResponseError(404, `admin dengan id ${id} tidak ditemukan`);
      }
      const result = {
        message: "Berhasil menghapus Admin",
        status: "success",
      };
      return result;
    } catch (error) {
      return error;
    }
  }

  static async getDataAdminByQuery(query) {
    const admin = await prisma.admin.findMany({
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
      message: "Berhasil mengambil data admin sesuai query",
      data: admin,
      status: "success",
    };
    return result;
  }
}
