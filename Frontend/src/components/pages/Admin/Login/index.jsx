import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import staticData from "../../../../../staticData";
import { useAppState } from "../../../../context/AppStateContext";
import Toast from "../../../Toast";
import PenggunaApi from "../../../../api/src/pengguna";

export default function AdminLogin() {
  const { nama_pt, logo_blt, logo_pjg, tipeAkses } = staticData;
  const { login } = PenggunaApi();
  const { HandleToast } = useAppState();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    tipeAkses: tipeAkses[0],
    password: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await login(formData);
      if (response.status === "success") {
        localStorage.setItem("token", response.data);
        HandleToast.success(response.message);
        navigate("/admin");
      }
    } catch (error) {
      console.log(error);
      HandleToast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      const isTokenExpired = decoded.exp < Date.now() / 1000;
      if (isTokenExpired) {
        localStorage.removeItem("token");
        HandleToast.error("Sesi anda telah habis, silahkan login kembali");
        window.location.href = "/admin/login";
      } else {
        navigate("/admin");
      }
    } else {
      navigate("/admin/login");
    }
    // eslint-disable-next-line
  }, [token]);

  if (!token)
    return (
      <>
        <div className="flex h-screen">
          <div className="hidden lg:flex items-center justify-center flex-1 bg-gray-300 text-black border">
            <div className="max-w-md text-center">
              <img src={logo_blt} alt="Logo" />
            </div>
          </div>
          <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center bg-cover">
            <div className="lg:hidden w-full absolute bg-cover top-0 left-0 right-0 bottom-0 flex justify-center items-center">
              <img
                src={logo_blt}
                alt="Logo"
                className="md:w-[70%] w-[95%] blur-sm"
              />
            </div>
            <div className="lg:hidden w-full bg-gray-200 absolute bg-cover top-0 left-0 right-0 bottom-0 z-10 opacity-75"></div>
            <div className="max-w-md w-full p-6 relative z-20">
              <img
                src={logo_pjg}
                alt="Logo"
                className="lg:hidden w-52 rounded-3xl mx-auto mb-5"
              />
              <h1 className="text-3xl font-semibold mb-6 text-black text-center">
                Login
              </h1>
              <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
                Sistem Master Data {nama_pt}
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Masukkan username"
                    className="mt-1 p-2 w-full border bg-white rounded-md focus:border-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300 transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tipe Akses
                  </label>
                  <select
                    name="tipeAkses"
                    value={formData.tipeAkses}
                    required
                    onChange={handleChange}
                    className="select mt-1 p-2 w-full capitalize border bg-white rounded-md focus:border-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300 transition-colors duration-300 lg:text-base text-sm"
                  >
                    {tipeAkses.map((tipe) => (
                      <option key={tipe} value={tipe} className="capitalize">
                        {tipe}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="********"
                    className="mt-1 p-2 w-full border bg-white rounded-md focus:border-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300 transition-colors duration-300"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full font-semibold bg-yellow-300 text-gray-500 hover:text-white p-2 rounded-md hover:bg-yellow-600 focus:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                  >
                    {loading ? (
                      <span className="loading loading-bars lg:loading-md loading-sm"></span>
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Toast />
      </>
    );
}
