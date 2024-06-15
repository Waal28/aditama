import { useAppState } from "../../context/AppStateContext";
import ApiService from "../ApiService";

export default function PelangganApi() {
  const { HandleToast } = useAppState();
  async function getAllPelanggan() {
    const response = await ApiService.get("/pelanggan");
    if (response.status === "failed") {
      console.log(response.message);
      HandleToast.error(response.message);
    }
    return response;
  }

  async function getPelangganById(id) {
    const response = await ApiService.get(`/pelanggan/${id}`);
    if (response.status === "failed") {
      console.log(response.message);
      HandleToast.error(response.message);
    }
    return response;
  }

  async function createPelanggan(data) {
    const response = await ApiService.post("/pelanggan", data);
    if (response.status === "failed") {
      console.log(response.message);
      HandleToast.error(response.message);
    } else {
      HandleToast.success(response.message);
    }
    return response;
  }

  async function updatePelanggan(id, data) {
    const response = await ApiService.put(`/pelanggan/${id}`, data);
    if (response.status === "failed") {
      console.log(response.message);
      HandleToast.error(response.message);
    } else {
      HandleToast.success(response.message);
    }
    return response;
  }

  async function deletePelanggan(id) {
    const response = await ApiService.delete(`/pelanggan/${id}`);
    if (response.status === "failed") {
      console.log(response.message);
      HandleToast.error(response.message);
    } else {
      HandleToast.success(response.message);
    }
    return response;
  }

  async function getPelangganByQuery(query) {
    const response = await ApiService.post(`/pelanggan/search?query=${query}`);
    if (response.status === "failed") {
      console.log(response.message);
      HandleToast.error(response.message);
    }
    return response;
  }

  return {
    getAllPelanggan,
    getPelangganById,
    createPelanggan,
    updatePelanggan,
    deletePelanggan,
    getPelangganByQuery,
  };
}
