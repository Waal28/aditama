import axios from "axios";

const { VITE_BASE_URL_API } = import.meta.env;
const token = localStorage.getItem("token");
export default class ApiService {
  static async get(endpoint) {
    try {
      const response = await axios.get(`${VITE_BASE_URL_API}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.data;

      return data;
    } catch (error) {
      if (error.response.data.message === "Forbidden") {
        window.location.href = "/admin/login";
      }
    }
  }

  static async post(endpoint, payload, otherHeaders) {
    try {
      const response = await axios.post(
        `${VITE_BASE_URL_API}${endpoint}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            otherHeaders,
          },
        }
      );
      const data = await response.data;
      return data;
    } catch (error) {
      if (error.response.data.message === "Forbidden") {
        window.location.href = "/admin/login";
      }
    }
  }

  static async put(endpoint, payload, otherHeaders) {
    try {
      const response = await axios.put(
        `${VITE_BASE_URL_API}${endpoint}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            otherHeaders,
          },
        }
      );
      const data = await response.data;
      return data;
    } catch (error) {
      if (error.response.data.message === "Forbidden") {
        window.location.href = "/admin/login";
      }
    }
  }

  static async delete(endpoint) {
    try {
      const response = await axios.delete(`${VITE_BASE_URL_API}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.data;
      return data;
    } catch (error) {
      if (error.response.data.message === "Forbidden") {
        window.location.href = "/admin/login";
      }
    }
  }
}
