import LaporanController from "../controllers/laporan.js";
import upload from "../middleware/upload.js";
import verifyToken from "../middleware/verifyToken.js";

export default (router) => {
  router.get("/laporan", verifyToken, LaporanController.getAllLaporan);
  router.get("/laporan/:id", verifyToken, LaporanController.getLaporanById);
  router.post(
    "/laporan/search",
    verifyToken,
    LaporanController.getDataLaporanByQuery
  );
  router.post(
    "/laporan",
    [
      verifyToken,
      upload.fields([
        { name: "foto_sebelum_perbaikan", maxCount: 1 },
        { name: "foto_sesudah_perbaikan", maxCount: 1 },
      ]),
    ],
    LaporanController.createLaporan
  );
  router.put(
    "/laporan/:id",
    [
      verifyToken,
      upload.fields([
        { name: "foto_sebelum_perbaikan", maxCount: 1 },
        { name: "foto_sesudah_perbaikan", maxCount: 1 },
      ]),
    ],
    LaporanController.updateLaporan
  );
  router.delete("/laporan/:id", verifyToken, LaporanController.deleteLaporan);
};
