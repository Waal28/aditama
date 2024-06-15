import Customer from "./src/components/pages/Admin/Customer";
import Dashboard from "./src/components/pages/Admin/Dashboard";
import AdminLogin from "./src/components/pages/Admin/Login";
import Report from "./src/components/pages/Admin/Report";
import Technician from "./src/components/pages/Admin/Technician";
import Transaction from "./src/components/pages/Admin/Transaction";
import UserAdmin from "./src/components/pages/Admin/UserAdmin";
import Wifi from "./src/components/pages/Admin/Wifi";
import logo_blt from "./src/assets/images/Netmedia-Logo-Bulat.svg";
import logo_pjg from "./src/assets/images/Netmedia-Logo-Panjang.svg";

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
      component: Dashboard,
    },
    {
      id: 2,
      name: "Pelanggan",
      link: "/admin/pelanggan",
      icon: "https://api.iconify.design/gridicons:multiple-users.svg",
      component: Customer,
    },
    {
      id: 3,
      name: "Wifi",
      link: "/admin/wifi",
      icon: "https://api.iconify.design/material-symbols:wifi-sharp.svg",
      component: Wifi,
    },
    {
      id: 4,
      name: "Transaksi",
      link: "/admin/transaksi",
      icon: "https://api.iconify.design/fluent:wallet-credit-card-32-filled.svg",
      component: Transaction,
    },
    {
      id: 5,
      name: "Laporan",
      link: "/admin/laporan",
      icon: "https://api.iconify.design/icon-park-outline:transaction.svg",
      component: Report,
    },
    {
      id: 6,
      name: "Teknisi",
      link: "/admin/teknisi",
      icon: "https://api.iconify.design/gravity-ui:person-worker.svg",
      component: Technician,
    },
    {
      id: 7,
      name: "Admin",
      link: "/admin/administrator",
      icon: "https://api.iconify.design/clarity:administrator-solid.svg",
      component: UserAdmin,
    },
    {
      id: 8,
      name: "Login",
      link: "/admin/login",
      icon: "https://api.iconify.design/octicon:dashboard.svg",
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
};

export default staticData;
