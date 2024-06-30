import PenggunaController from "../controllers/pengguna.js";
import verifyToken from "../middleware/verifyToken.js";

export default (router) => {
  router.post("/pengguna/login", PenggunaController.login);
  router.get("/pengguna", verifyToken, PenggunaController.getAllPengguna);
  router.get("/pengguna/:id", verifyToken, PenggunaController.getPenggunaById);
  router.post(
    "/pengguna/search",
    verifyToken,
    PenggunaController.getDataPenggunaByQuery
  );
  router.post("/pengguna", verifyToken, PenggunaController.createPengguna);
  router.put("/pengguna/:id", verifyToken, PenggunaController.updatePengguna);
  router.delete(
    "/pengguna/:id",
    verifyToken,
    PenggunaController.deletePengguna
  );
};
