import { useAppState } from "../../context/AppStateContext";
import ApiService from "../ApiService";

export default function WifiApi() {
  const { HandleToast } = useAppState();
  async function getAllWifi() {
    const response = await ApiService.get("/wifi");
    if (response.status === "failed") {
      console.log(response.message);
      HandleToast.error(response.message);
    }
    return response;
  }

  async function getWifiById(id) {
    const response = await ApiService.get(`/wifi/${id}`);
    if (response.status === "failed") {
      console.log(response.message);
      HandleToast.error(response.message);
    }
    return response;
  }

  async function createWifi(data) {
    const response = await ApiService.post("/wifi", data);
    if (response.status === "failed") {
      console.log(response.message);
      HandleToast.error(response.message);
    } else {
      HandleToast.success(response.message);
    }
    return response;
  }

  async function updateWifi(id, data) {
    const response = await ApiService.put(`/wifi/${id}`, data);
    if (response.status === "failed") {
      console.log(response.message);
      HandleToast.error(response.message);
    } else {
      HandleToast.success(response.message);
    }
    return response;
  }

  async function deleteWifi(id) {
    const response = await ApiService.delete(`/wifi/${id}`);
    if (response.status === "failed") {
      console.log(response.message);
      HandleToast.error(response.message);
    } else {
      HandleToast.success(response.message);
    }
    return response;
  }

  async function getWifiByQuery(query) {
    const response = await ApiService.post(`/wifi/search?query=${query}`);
    if (response.status === "failed") {
      console.log(response.message);
      HandleToast.error(response.message);
    }
    return response;
  }

  return {
    getAllWifi,
    getWifiById,
    createWifi,
    updateWifi,
    deleteWifi,
    getWifiByQuery,
  };
}
