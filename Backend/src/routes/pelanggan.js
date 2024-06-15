import PelangganController from "../controllers/pelanggan.js";

export default (router) => {
  router.get("/pelanggan", PelangganController.getAllPelanggan);
  router.get("/pelanggan/:id", PelangganController.getPelangganById);
  router.post("/pelanggan/search", PelangganController.getDataPelangganByQuery);
  router.post("/pelanggan", PelangganController.createPelanggan);
  router.put("/pelanggan/:id", PelangganController.updatePelanggan);
  router.delete("/pelanggan/:id", PelangganController.deletePelanggan);
};
