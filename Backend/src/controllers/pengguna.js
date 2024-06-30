import PenggunaService from "../services/pengguna.js";

export default class PenggunaController {
  static async login(req, res) {
    const { body } = req;
    try {
      const result = await PenggunaService.login(body);
      return res.json({
        status: result.status,
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      return res.json({
        status: "failed",
        message: error.message,
      });
    }
  }
  static async getAllPengguna(req, res) {
    try {
      const result = await PenggunaService.getAllPengguna();
      return res.json({
        status: result.status,
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      return res.json({
        status: "failed",
        message: error.message,
      });
    }
  }

  static async getPenggunaById(req, res) {
    const { id } = req.params;
    try {
      const result = await PenggunaService.getPenggunaById(id);
      return res.json({
        status: result.status,
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      return res.json({
        status: "failed",
        message: error.message,
      });
    }
  }

  static async createPengguna(req, res) {
    try {
      const { body } = req;
      const result = await PenggunaService.createPengguna(body);
      return res.json({
        status: result.status,
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      return res.json({
        status: "failed",
        message: error.message,
      });
    }
  }

  static async updatePengguna(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      const result = await PenggunaService.updatePengguna(id, body);
      return res.json({
        status: result.status,
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      return res.json({
        status: "failed",
        message: error.message,
      });
    }
  }

  static async deletePengguna(req, res) {
    try {
      const { id } = req.params;
      const result = await PenggunaService.deletePengguna(Number(id));
      return res.json({
        status: result.status,
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      return res.json({
        status: "failed",
        message: error.message,
      });
    }
  }

  static async getDataPenggunaByQuery(req, res) {
    const { query } = req.query;
    try {
      const result = await PenggunaService.getDataPenggunaByQuery(query);
      return res.json({
        status: result.status,
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      return res.json({
        status: "failed",
        message: error.message,
      });
    }
  }
}
