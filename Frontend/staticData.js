import Customer from "./src/components/pages/Admin/Customer";
import Dashboard from "./src/components/pages/Admin/Dashboard";
import AdminLogin from "./src/components/pages/Admin/Login";
import Transaction from "./src/components/pages/Admin/Transaction";
import Wifi from "./src/components/pages/Admin/Wifi";
import logo_blt from "./src/assets/images/Netmedia-Logo-Bulat.svg";
import logo_pjg from "./src/assets/images/Netmedia-Logo-Panjang.svg";
import Pengguna from "./src/components/pages/Admin/Penggunna";
import Laporan from "./src/components/pages/Admin/Laporan";

const staticData = {
  menu_navbar_portal: [
    {
      id: 1,
      name: "Beranda",
      link: "/#beranda",
    },
    {
      id: 2,
      name: "Paket Layanan",
      link: "/#paket-layanan",
    },
    {
      id: 3,
      name: "Informasi Tagihan",
      link: "/tagihan",
    },
    {
      id: 4,
      name: "Tentang Kami",
      link: "/#tentang-kami",
    },
  ],
  menu_navbar_admin: [
    {
      id: 1,
      name: "Dashboard",
      link: "/admin",
      icon: "https://api.iconify.design/octicon:dashboard.svg",
      showMenuFor: ["", "admin", "teknisi"],
      component: Dashboard,
    },
    {
      id: 2,
      name: "Pelanggan",
      link: "/admin/pelanggan",
      icon: "https://api.iconify.design/gridicons:multiple-users.svg",
      showMenuFor: ["", "admin"],
      component: Customer,
    },
    {
      id: 3,
      name: "Wifi",
      link: "/admin/wifi",
      icon: "https://api.iconify.design/material-symbols:wifi-sharp.svg",
      showMenuFor: ["", "admin"],
      component: Wifi,
    },
    {
      id: 4,
      name: "Transaksi",
      link: "/admin/transaksi",
      icon: "https://api.iconify.design/fluent:wallet-credit-card-32-filled.svg",
      showMenuFor: ["", "admin"],
      component: Transaction,
    },
    {
      id: 5,
      name: "Laporan",
      link: "/admin/laporan",
      icon: "https://api.iconify.design/mingcute:task-2-line.svg",
      showMenuFor: ["", "admin", "teknisi"],
      component: Laporan,
    },
    {
      id: 6,
      name: "Pengguna",
      link: "/admin/pengguna",
      icon: "https://api.iconify.design/clarity:administrator-solid.svg",
      showMenuFor: ["", "admin"],
      component: Pengguna,
    },
    {
      id: 7,
      name: "Login",
      link: "/admin/login",
      icon: "https://api.iconify.design/octicon:dashboard.svg",
      showMenuFor: ["", "admin", "teknisi"],
      component: AdminLogin,
    },
  ],
  nama_pt: "PT. Aditama Netmedia Solusindo",
  desk_pt:
    "Sebagai provider internet terbaik dengan koneksi ultra cepat kini hadir dengan berbagai paket internet yang sesuai dengan kebutuhan kamu.",
  logo_blt: logo_blt,
  logo_pjg: logo_pjg,
  lokasi:
    "Jl. Wonosari Barat, Wonosari, Kec. Bengkalis, Kab. Bengkalis, Riau 28711",
  kontak: {
    email: "netmedia@gmail.com",
    noHp: "+6281234567890",
  },
  tipeAkses: ["admin", "teknisi"],
};

export default staticData;
