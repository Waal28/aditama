import AdminService from "../services/admin.js";

export default class AdminController {
  static async login(req, res) {
    const { body } = req;
    try {
      const result = await AdminService.login(body);
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
  static async getAllAdmin(req, res) {
    try {
      const result = await AdminService.getAllAdmin();
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

  static async getAdminById(req, res) {
    const { id } = req.params;
    try {
      const result = await AdminService.getAdminById(id);
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

  static async createAdmin(req, res) {
    try {
      const { body } = req;
      const result = await AdminService.createAdmin(body);
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

  static async updateAdmin(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      const result = await AdminService.updateAdmin(id, body);
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

  static async deleteAdmin(req, res) {
    try {
      const { id } = req.params;
      const result = await AdminService.deleteAdmin(Number(id));
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

  static async getDataAdminByQuery(req, res) {
    const { query } = req.query;
    try {
      const result = await AdminService.getDataAdminByQuery(query);
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
