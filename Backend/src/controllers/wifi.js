import WifiService from "../services/wifi.js";

export default class WifiController {
  static async getAllWifi(req, res) {
    try {
      const result = await WifiService.getAllWifi();
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

  static async getWifiById(req, res) {
    const { id } = req.params;
    try {
      const result = await WifiService.getWifiById(id);
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

  static async createWifi(req, res) {
    try {
      const { body } = req;
      const result = await WifiService.createWifi(body);
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

  static async updateWifi(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      const result = await WifiService.updateWifi(id, body);
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

  static async deleteWifi(req, res) {
    try {
      const { id } = req.params;
      const result = await WifiService.deleteWifi(Number(id));
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

  static async getDataWifiByQuery(req, res) {
    const { query } = req.query;
    try {
      const result = await WifiService.getDataWifiByQuery(query);
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
