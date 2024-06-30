import TransaksiService from "../services/transaksi.js";

export default class WifiController {
  static async getAllTransaksi(req, res) {
    try {
      const result = await TransaksiService.getAllTransaksi();
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

  static async getTransaksiById(req, res) {
    const { id } = req.params;
    try {
      const result = await TransaksiService.getTransaksiById(id);
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

  static async createTransaksi(req, res) {
    try {
      const result = await TransaksiService.createTransaksi(req.body);
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
  static async setLunasTransaksi(req, res) {
    const { id } = req.params;
    try {
      const result = await TransaksiService.setLunasTransaksi(id);
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
  static async deleteTransaksi(req, res) {
    try {
      const { id } = req.params;
      const result = await TransaksiService.deleteTransaksi(Number(id));
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

  static async getDataTransaksiByQuery(req, res) {
    const { query } = req.query;
    try {
      const result = await TransaksiService.getDataTransaksiByQuery(query);
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
