import { useAppState } from "../../context/AppStateContext";
import ApiService from "../ApiService";

export default function LaporanApi() {
  const { HandleToast } = useAppState();
  async function getAllLaporan() {
    const response = await ApiService.get("/laporan");
    if (response.status === "failed") {
      console.log(response.message);
      HandleToast.error(response.message);
    }
    return response;
  }

  async function getLaporanById(id) {
    const response = await ApiService.get(`/laporan/${id}`);
    if (response.status === "failed") {
      console.log(response.message);
      HandleToast.error(response.message);
    }
    return response;
  }

  async function createLaporan(data) {
    const response = await ApiService.post("/laporan", data, {
      "Content-Type": "multipart/form-data",
    });
    if (response.status === "failed") {
      console.log(response.message);
      HandleToast.error(response.message);
    } else {
      HandleToast.success(response.message);
    }
    return response;
  }

  async function updateLaporan(id, data) {
    const response = await ApiService.put(`/laporan/${id}`, data, {
      "Content-Type": "multipart/form-data",
    });
    if (response.status === "failed") {
      console.log(response.message);
      HandleToast.error(response.message);
    } else {
      HandleToast.success(response.message);
    }
    return response;
  }

  async function deleteLaporan(id) {
    const response = await ApiService.delete(`/laporan/${id}`);
    if (response.status === "failed") {
      console.log(response.message);
      HandleToast.error(response.message);
    } else {
      HandleToast.success(response.message);
    }
    return response;
  }

  async function getLaporanByQuery(query) {
    const response = await ApiService.post(`/laporan/search?query=${query}`);
    if (response.status === "failed") {
      console.log(response.message);
      HandleToast.error(response.message);
    }
    return response;
  }

  return {
    getAllLaporan,
    getLaporanById,
    createLaporan,
    updateLaporan,
    deleteLaporan,
    getLaporanByQuery,
  };
}
