import WifiController from "../controllers/wifi.js";
import verifyToken from "../middleware/verifyToken.js";

export default (router) => {
  router.get("/wifi", verifyToken, WifiController.getAllWifi);
  router.get("/wifi/:id", verifyToken, WifiController.getWifiById);
  router.post("/wifi/search", verifyToken, WifiController.getDataWifiByQuery);
  router.post("/wifi", verifyToken, WifiController.createWifi);
  router.put("/wifi/:id", verifyToken, WifiController.updateWifi);
  router.delete("/wifi/:id", verifyToken, WifiController.deleteWifi);
};
