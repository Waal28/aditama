import { useAppState } from "../../context/AppStateContext";
import ApiService from "../ApiService";

export default function TransaksiApi() {
  const { HandleToast } = useAppState();
  async function getAllTransaksi() {
    const response = await ApiService.get("/transaksi");
    if (response.status === "failed") {
      console.log(response.message);
      HandleToast.error(response.message);
    }
    return response;
  }

  async function getTransaksiById(id) {
    const response = await ApiService.get(`/transaksi/${id}`);
    if (response.status === "failed") {
      console.log(response.message);
      HandleToast.error(response.message);
    }
    return response;
  }

  async function createTransaksi(data) {
    const response = await ApiService.post("/transaksi", data);
    if (response.status === "failed") {
      console.log(response.message);
      HandleToast.error(response.message);
    } else {
      HandleToast.success(response.message);
    }
    return response;
  }

  async function setLunasTransaksi(id) {
    const response = await ApiService.put(`/transaksi/setLunas/${id}`);
    if (response.status === "failed") {
      console.log(response.message);
      HandleToast.error(response.message);
    } else {
      HandleToast.success(response.message);
    }
    return response;
  }

  async function deleteTransaksi(id) {
    const response = await ApiService.delete(`/transaksi/${id}`);
    if (response.status === "failed") {
      console.log(response.message);
      HandleToast.error(response.message);
    } else {
      HandleToast.success(response.message);
    }
    return response;
  }

  async function getTransaksiByQuery(query) {
    const response = await ApiService.post(`/transaksi/search?query=${query}`);
    if (response.status === "failed") {
      console.log(response.message);
      HandleToast.error(response.message);
    }
    return response;
  }

  return {
    getAllTransaksi,
    getTransaksiById,
    createTransaksi,
    setLunasTransaksi,
    deleteTransaksi,
    getTransaksiByQuery,
  };
}
