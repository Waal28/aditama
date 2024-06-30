import LaporanService from "../services/laporan.js";

export default class LaporanController {
  static async getAllLaporan(req, res) {
    try {
      const result = await LaporanService.getAllLaporan();
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

  static async getLaporanById(req, res) {
    const { id } = req.params;
    try {
      const result = await LaporanService.getLaporanById(id);
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

  static async createLaporan(req, res) {
    const foto_sebelum_perbaikan =
      req.files && req.files["foto_sebelum_perbaikan"]
        ? `/uploads/${req.files["foto_sebelum_perbaikan"][0].filename}`
        : "";
    const foto_sesudah_perbaikan =
      req.files && req.files["foto_sesudah_perbaikan"]
        ? `/uploads/${req.files["foto_sesudah_perbaikan"][0].filename}`
        : "";
    req.body.latitude = parseFloat(req.body.latitude);
    req.body.longitude = parseFloat(req.body.longitude);
    const data = {
      ...req.body,
      foto_sebelum_perbaikan,
      foto_sesudah_perbaikan,
    };
    try {
      const result = await LaporanService.createLaporan(data);
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

  static async updateLaporan(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      const result = await LaporanService.updateLaporan(id, body);
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

  static async deleteLaporan(req, res) {
    try {
      const { id } = req.params;
      const result = await LaporanService.deleteLaporan(Number(id));
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

  static async getDataLaporanByQuery(req, res) {
    const { query } = req.query;
    try {
      const result = await LaporanService.getDataLaporanByQuery(query);
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
