import { useEffect, useState } from "react";
import LaporanApi from "../../../../api/src/laporan";
import PelangganApi from "../../../../api/src/pelanggan";
import PenggunaApi from "../../../../api/src/pengguna";
import TransaksiApi from "../../../../api/src/transaksi";
import WifiApi from "../../../../api/src/wifi";
import AdminLayout from "../../../layout/admin";
import HeaderContent from "../../../layout/admin/HeaderContent";
import { useAppState } from "../../../../context/AppStateContext";

export default function Dashboard() {
  const { user } = useAppState();
  const { getAllPelanggan } = PelangganApi();
  const { getAllWifi } = WifiApi();
  const { getAllTransaksi } = TransaksiApi();
  const { getAllLaporan } = LaporanApi();
  const { getAllPengguna } = PenggunaApi();
  const [loading, setLoading] = useState(false);
  const [cardData, setCardData] = useState([
    {
      title: "Pelanggan",
      name: "pelanggan",
      showCardFor: ["admin"],
      value: 235,
      icon: "https://api.iconify.design/gridicons:multiple-users.svg?color=%23ece9ff",
      color: "bg-blue-500",
    },
    {
      title: "Paket Wifi",
      name: "paketWifi",
      showCardFor: ["admin"],
      value: 0,
      icon: "https://api.iconify.design/material-symbols:wifi-sharp.svg?color=%23ece9ff",
      color: "bg-teal-500",
    },
    {
      title: "Belum Bayar",
      name: "belum_bayar",
      showCardFor: ["admin"],
      value: 0,
      icon: "https://api.iconify.design/uil:money-bill-slash.svg?color=%23ece9ff",
      color: "bg-red-500",
    },
    {
      title: "Lunas",
      name: "sudah_bayar",
      showCardFor: ["admin"],
      value: 0,
      icon: "https://api.iconify.design/uil:money-bill.svg?color=%23ece9ff",
      color: "bg-green-500",
    },
    {
      title: "Laporan",
      name: "laporan",
      showCardFor: ["admin", "teknisi"],
      value: 0,
      icon: "https://api.iconify.design/icon-park-outline:transaction.svg?color=%23ece9ff",
      color: "bg-yellow-500",
    },
    {
      title: "Teknisi",
      name: "teknisi",
      showCardFor: ["admin"],
      value: 0,
      icon: "https://api.iconify.design/gravity-ui:person-worker.svg?color=%23ece9ff",
      color: "bg-purple-500",
    },
  ]);
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
          (item) => item.status === "Belum Bayar"
        ).length,
        sudah_bayar: resTransaksi.data.filter(
          (item) => item.status === "Sudah Bayar"
        ).length,
        laporan: resLaporan.data.length,
        teknisi: resPengguna.data.filter((item) => item.tipeAkses === "teknisi")
          .length,
      };
      const newCardData = cardData.map((item) => ({
        ...item,
        value: data[item.name],
      }));
      setCardData(newCardData);
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
        {cardData.map(
          (item, i) =>
            item.showCardFor.includes(user.tipeAkses) && (
              <div
                key={i}
                className="grid grid-cols-3 bg-white border rounded-xl overflow-hidden shadow-md"
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
                      item.value
                    )}
                  </p>
                </div>
              </div>
            )
        )}
      </div>
    </AdminLayout>
  );
}
