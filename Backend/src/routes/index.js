import express from "express";
import pelanggan from "./pelanggan.js";
import pengguna from "./pengguna.js";
import wifi from "./wifi.js";
import transaksi from "./transaksi.js";
import laporan from "./laporan.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});
export default () => {
  pelanggan(router);
  pengguna(router);
  wifi(router);
  transaksi(router);
  laporan(router);
  return router;
};
