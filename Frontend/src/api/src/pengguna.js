import { useAppState } from "../../context/AppStateContext";
import ApiService from "../ApiService";

export default function PenggunaApi() {
  const { HandleToast } = useAppState();
  async function login(data) {
    const response = await ApiService.post("/pengguna/login", data);
    if (response.status === "failed") {
      console.log(response.message);
      HandleToast.error(response.message);
    }
    return response;
  }
  async function getAllPengguna() {
    const response = await ApiService.get("/pengguna");
    if (response.status === "failed") {
      console.log(response.message);
      HandleToast.error(response.message);
    }
    return response;
  }

  async function getPenggunaById(id) {
    const response = await ApiService.get(`/pengguna/${id}`);
    if (response.status === "failed") {
      console.log(response.message);
      HandleToast.error(response.message);
    }
    return response;
  }

  async function createPengguna(data) {
    const response = await ApiService.post("/pengguna", data);
    if (response.status === "failed") {
      console.log(response.message);
      HandleToast.error(response.message);
    } else {
      HandleToast.success(response.message);
    }
  }

  async function updatePengguna(id, data) {
    const response = await ApiService.put(`/pengguna/${id}`, data);
    if (response.status === "failed") {
      console.log(response.message);
      HandleToast.error(response.message);
    }
    return response;
  }

  async function deletePengguna(id) {
    const response = await ApiService.delete(`/pengguna/${id}`);
    if (response.status === "failed") {
      console.log(response.message);
      HandleToast.error(response.message);
    } else {
      HandleToast.success(response.message);
    }
    return response;
  }

  async function getPenggunaByQuery(query) {
    const response = await ApiService.post(`/pengguna/search?query=${query}`);
    if (response.status === "failed") {
      console.log(response.message);
      HandleToast.error(response.message);
    }
    return response;
  }

  return {
    login,
    getAllPengguna,
    getPenggunaById,
    createPengguna,
    updatePengguna,
    deletePengguna,
    getPenggunaByQuery,
  };
}
