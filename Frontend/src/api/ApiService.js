import axios from "axios";

const { VITE_BASE_URL_API } = import.meta.env;

export default class ApiService {
    static async get(endpoint) {
        const response = await axios.get(`${VITE_BASE_URL_API}${endpoint}`);
        const data = await response.data;
        return data;
    }

    static async post(endpoint, payload) {
        const response = await axios.post(`${VITE_BASE_URL_API}${endpoint}`, payload);
        const data = await response.data;
        return data;
    }

    static async put(endpoint, payload) {
        const response = await axios.put(`${VITE_BASE_URL_API}${endpoint}`, payload);
        const data = await response.data;
        return data;
    }

    static async delete(endpoint) {
        const response = await axios.delete(`${VITE_BASE_URL_API}${endpoint}`);
        const data = await response.data;
        return data;
    }
}