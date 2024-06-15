import AdminController from "../controllers/admin.js";

export default (router) => {
  router.post("/admin/login", AdminController.login);
  router.get("/admin", AdminController.getAllAdmin);
  router.get("/admin/:id", AdminController.getAdminById);
  router.post("/admin/search", AdminController.getDataAdminByQuery);
  router.post("/admin", AdminController.createAdmin);
  router.put("/admin/:id", AdminController.updateAdmin);
  router.delete("/admin/:id", AdminController.deleteAdmin);
};
