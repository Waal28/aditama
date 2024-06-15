import express from "express";
import pelanggan from "./pelanggan.js";
import admin from "./admin.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});
export default () => {
  pelanggan(router);
  admin(router);
  return router;
};
