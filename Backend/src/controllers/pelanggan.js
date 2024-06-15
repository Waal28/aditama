import PelangganService from "../services/pelanggan.js";

export default class PelangganController {
  static async getAllPelanggan(req, res) {
    try {
      const result = await PelangganService.getAllPelanggan();
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

  static async getPelangganById(req, res) {
    const { id } = req.params;
    try {
      const result = await PelangganService.getPelangganById(id);
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

  static async createPelanggan(req, res) {
    try {
      const { body } = req;
      const result = await PelangganService.createPelanggan(body);
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

  static async updatePelanggan(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      const result = await PelangganService.updatePelanggan(id, body);
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

  static async deletePelanggan(req, res) {
    try {
      const { id } = req.params;
      const result = await PelangganService.deletePelanggan(Number(id));
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

  static async getDataPelangganByQuery(req, res) {
    const { query } = req.query;
    try {
      const result = await PelangganService.getDataPelangganByQuery(query);
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
