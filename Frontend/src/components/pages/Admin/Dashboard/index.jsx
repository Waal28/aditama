import { useEffect, useState } from "react";
import LaporanApi from "../../../../api/src/laporan";
import PelangganApi from "../../../../api/src/pelanggan";
import PenggunaApi from "../../../../api/src/pengguna";
import TransaksiApi from "../../../../api/src/transaksi";
import WifiApi from "../../../../api/src/wifi";
import AdminLayout from "../../../layout/admin";
import HeaderContent from "../../../layout/admin/HeaderContent";
import { useAppState } from "../../../../context/AppStateContext";
import { cardsDashboard } from "../../../../../constants";

export default function Dashboard() {
  const { user } = useAppState();
  const { getAllPelanggan } = PelangganApi();
  const { getAllWifi } = WifiApi();
  const { getAllTransaksi } = TransaksiApi();
  const { getAllLaporan } = LaporanApi();
  const { getAllPengguna } = PenggunaApi();
  const [loading, setLoading] = useState(false);
  const [totalData, setTotalData] = useState(0);
  async function handleFetchAll() {
    setLoading(true);
    try {
      const [resPelanggan, resWifi, resTransaksi, resLaporan, resPengguna] =
        await Promise.all([
          getAllPelanggan(),
          getAllWifi(),
          getAllTransaksi(),
          getAllLaporan(),
          getAllPengguna(),
        ]);
      const data = {
        pelanggan: resPelanggan.data.length,
        paketWifi: resWifi.data.length,
        belum_bayar: resTransaksi.data.filter(
          (item) => item.status === "Belum Lunas"
        ).length,
        sudah_bayar: resTransaksi.data.filter((item) => item.status === "Lunas")
          .length,
        laporan: resLaporan.data.length,
        teknisi: resPengguna.data.filter((item) => item.tipeAkses === "teknisi")
          .length,
        admin: resPengguna.data.filter((item) => item.tipeAkses === "admin")
          .length,
      };
      // const colors = [
      //   "bg-blue-500",
      //   "bg-teal-500",
      //   "bg-red-500",
      //   "bg-green-500",
      //   "bg-yellow-500",
      //   "bg-purple-500",
      //   "bg-pink-500",
      // ];
      console.log(resTransaksi.data);
      setTotalData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  useEffect(() => {
    handleFetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AdminLayout>
      <HeaderContent title="Dashboard" />
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 px-4 mt-8 sm:px-8">
        {cardsDashboard[user.tipeAkses] &&
          cardsDashboard[user.tipeAkses].map((item, i) => {
            return (
              <div
                key={i}
                className="grid grid-cols-3 bg-white border rounded-xl overflow-hidden shadow-lg"
              >
                <div className={`p-4 flex items-center ${item.color}`}>
                  <img src={item.icon} className="w-full" />
                </div>
                <div className="p-4 col-span-2 flex flex-col justify-center text-gray-700">
                  <h3 className="lg:text-base text-xs mb-2">{item.title}</h3>
                  <p className="lg:text-3xl text-lg">
                    {loading ? (
                      <span className="loading loading-ring text-fuchsia-500 lg:loading-lg loading-sm"></span>
                    ) : (
                      totalData[item.name]
                    )}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </AdminLayout>
  );
}
