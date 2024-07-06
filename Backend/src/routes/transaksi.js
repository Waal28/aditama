import TransaksiController from "../controllers/transaksi.js";
import verifyToken from "../middleware/verifyToken.js";

export default (router) => {
  router.get("/transaksi", TransaksiController.getAllTransaksi);
  router.get(
    "/transaksi/:id",
    verifyToken,
    TransaksiController.getTransaksiById
  );
  router.post("/transaksi/search", TransaksiController.getDataTransaksiByQuery);
  router.post("/transaksi/", verifyToken, TransaksiController.createTransaksi);
  router.put(
    "/transaksi/setLunas/:id",
    verifyToken,
    TransaksiController.setLunasTransaksi
  );
  router.delete(
    "/transaksi/:id",
    verifyToken,
    TransaksiController.deleteTransaksi
  );
};
