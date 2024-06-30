import PelangganController from "../controllers/pelanggan.js";
import verifyToken from "../middleware/verifyToken.js";

export default (router) => {
  router.get("/pelanggan", PelangganController.getAllPelanggan);
  router.get(
    "/pelanggan/:id",
    verifyToken,
    PelangganController.getPelangganById
  );
  router.post(
    "/pelanggan/search",
    verifyToken,
    PelangganController.getDataPelangganByQuery
  );
  router.post("/pelanggan", verifyToken, PelangganController.createPelanggan);
  router.put(
    "/pelanggan/:id",
    verifyToken,
    PelangganController.updatePelanggan
  );
  router.delete(
    "/pelanggan/:id",
    verifyToken,
    PelangganController.deletePelanggan
  );
};
