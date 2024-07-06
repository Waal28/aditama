import Customer from "./src/components/pages/Admin/Customer";
import Dashboard from "./src/components/pages/Admin/Dashboard";
import AdminLogin from "./src/components/pages/Admin/Login";
import Transaction from "./src/components/pages/Admin/Transaction";
import Wifi from "./src/components/pages/Admin/Wifi";
import logo_blt from "./src/assets/images/Netmedia-Logo-Bulat.svg";
import logo_pjg from "./src/assets/images/Netmedia-Logo-Panjang.svg";
import Pengguna from "./src/components/pages/Admin/Penggunna";
import Laporan from "./src/components/pages/Admin/Laporan";
import gambarDiTentangKami from "./src/assets/images/gambardiTentangKami.png";

const constants = {
  menuPortal: [
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
  menusAdmin: [
    {
      id: 1,
      name: "Dashboard",
      link: "/admin",
      icon: "https://api.iconify.design/octicon:dashboard.svg",
      showFeatureFor: ["", "admin", "teknisi"],
      component: Dashboard,
    },
    {
      id: 2,
      name: "Pelanggan",
      link: "/admin/pelanggan",
      icon: "https://api.iconify.design/gridicons:multiple-users.svg",
      showFeatureFor: ["", "admin"],
      component: Customer,
    },
    {
      id: 3,
      name: "Wifi",
      link: "/admin/wifi",
      icon: "https://api.iconify.design/material-symbols:wifi-sharp.svg",
      showFeatureFor: ["", "admin"],
      component: Wifi,
    },
    {
      id: 4,
      name: "Transaksi",
      link: "/admin/transaksi",
      icon: "https://api.iconify.design/fluent:wallet-credit-card-32-filled.svg",
      showFeatureFor: ["", "admin"],
      component: Transaction,
    },
    {
      id: 5,
      name: "Laporan",
      link: "/admin/laporan",
      icon: "https://api.iconify.design/mingcute:task-2-line.svg",
      showFeatureFor: ["", "teknisi"],
      component: Laporan,
    },
    {
      id: 6,
      name: "Pengguna",
      link: "/admin/pengguna",
      icon: "https://api.iconify.design/clarity:administrator-solid.svg",
      showFeatureFor: ["", "admin"],
      component: Pengguna,
    },
    {
      id: 7,
      name: "Login",
      link: "/admin/login",
      icon: "https://api.iconify.design/octicon:dashboard.svg",
      showFeatureFor: ["", "admin", "teknisi"],
      component: AdminLogin,
    },
  ],
  cardsDashboard: [
    {
      title: "Pelanggan",
      name: "pelanggan",
      showFeatureFor: ["admin"],
      value: 0,
      icon: "https://api.iconify.design/gridicons:multiple-users.svg?color=%23ece9ff",
      color: "bg-blue-500",
    },
    {
      title: "Paket Wifi",
      name: "paketWifi",
      showFeatureFor: ["admin"],
      value: 0,
      icon: "https://api.iconify.design/material-symbols:wifi-sharp.svg?color=%23ece9ff",
      color: "bg-teal-500",
    },
    {
      title: "Belum Bayar",
      name: "belum_bayar",
      showFeatureFor: ["admin"],
      value: 0,
      icon: "https://api.iconify.design/uil:money-bill-slash.svg?color=%23ece9ff",
      color: "bg-red-500",
    },
    {
      title: "Lunas",
      name: "sudah_bayar",
      showFeatureFor: ["admin"],
      value: 0,
      icon: "https://api.iconify.design/uil:money-bill.svg?color=%23ece9ff",
      color: "bg-green-500",
    },
    {
      title: "Laporan",
      name: "laporan",
      showFeatureFor: ["admin", "teknisi"],
      value: 0,
      icon: "https://api.iconify.design/icon-park-outline:transaction.svg?color=%23ece9ff",
      color: "bg-yellow-500",
    },
    {
      title: "Teknisi",
      name: "teknisi",
      showFeatureFor: ["admin"],
      value: 0,
      icon: "https://api.iconify.design/gravity-ui:person-worker.svg?color=%23ece9ff",
      color: "bg-purple-500",
    },
  ],
  menusAdminForAyi: [
    {
      id: 1,
      name: "Dashboard",
      link: "/admin",
      icon: "https://api.iconify.design/octicon:dashboard.svg",
      showFeatureFor: ["", "admin", "teknisi"],
      component: Dashboard,
    },
    {
      id: 2,
      name: "Pelanggan",
      link: "/admin/pelanggan",
      icon: "https://api.iconify.design/gridicons:multiple-users.svg",
      showFeatureFor: ["", "teknisi"],
      component: Customer,
    },
    {
      id: 3,
      name: "Wifi",
      link: "/admin/wifi",
      icon: "https://api.iconify.design/material-symbols:wifi-sharp.svg",
      showFeatureFor: [""],
      component: Wifi,
    },
    {
      id: 4,
      name: "Transaksi",
      link: "/admin/transaksi",
      icon: "https://api.iconify.design/fluent:wallet-credit-card-32-filled.svg",
      showFeatureFor: [""],
      component: Transaction,
    },
    {
      id: 5,
      name: "Laporan",
      link: "/admin/laporan",
      icon: "https://api.iconify.design/mingcute:task-2-line.svg",
      showFeatureFor: ["", "admin", "teknisi"],
      component: Laporan,
    },
    {
      id: 6,
      name: "Pengguna",
      link: "/admin/pengguna",
      icon: "https://api.iconify.design/clarity:administrator-solid.svg",
      showFeatureFor: ["", "admin"],
      component: Pengguna,
    },
    {
      id: 7,
      name: "Login",
      link: "/admin/login",
      icon: "https://api.iconify.design/octicon:dashboard.svg",
      showFeatureFor: ["", "admin", "teknisi"],
      component: AdminLogin,
    },
  ],
  cardsDashboardForAyi: [
    {
      title: "Pelanggan",
      name: "pelanggan",
      showFeatureFor: ["teknisi"],
      value: 0,
      icon: "https://api.iconify.design/gridicons:multiple-users.svg?color=%23ece9ff",
      color: "bg-blue-500",
    },
    {
      title: "Paket Wifi",
      name: "paketWifi",
      showFeatureFor: [""],
      value: 0,
      icon: "https://api.iconify.design/material-symbols:wifi-sharp.svg?color=%23ece9ff",
      color: "bg-teal-500",
    },
    {
      title: "Belum Bayar",
      name: "belum_bayar",
      showFeatureFor: [""],
      value: 0,
      icon: "https://api.iconify.design/uil:money-bill-slash.svg?color=%23ece9ff",
      color: "bg-red-500",
    },
    {
      title: "Lunas",
      name: "sudah_bayar",
      showFeatureFor: [""],
      value: 0,
      icon: "https://api.iconify.design/uil:money-bill.svg?color=%23ece9ff",
      color: "bg-green-500",
    },
    {
      title: "Laporan",
      name: "laporan",
      showFeatureFor: ["admin", "teknisi"],
      value: 0,
      icon: "https://api.iconify.design/icon-park-outline:transaction.svg?color=%23ece9ff",
      color: "bg-yellow-500",
    },
    {
      title: "Teknisi",
      name: "teknisi",
      showFeatureFor: ["admin"],
      value: 0,
      icon: "https://api.iconify.design/gravity-ui:person-worker.svg?color=%23ece9ff",
      color: "bg-purple-500",
    },
  ],
  nama_pt: "PT. Aditama Netmedia Solusindo",
  desk_pt:
    "Sebagai provider internet terbaik dengan koneksi ultra cepat kini hadir dengan berbagai paket internet yang sesuai dengan kebutuhan kamu.",
  logo_blt: logo_blt,
  logo_pjg: logo_pjg,
  gambarDiTentangKami: gambarDiTentangKami,
  img_carousel_landing_page: [
    "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg",
    "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg",
    "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg",
    "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg",
  ],
  logo_mitra: [
    "./src/assets/images/mitra/Logo APJII.png",
    "./src/assets/images/mitra/Logo bertuahix.png",
    "./src/assets/images/mitra/Logo Cloudpi.png",
    "./src/assets/images/mitra/Logo Cmedia.png",
    "./src/assets/images/mitra/Logo exel net.png",
    "./src/assets/images/mitra/Logo GDS.png",
    "./src/assets/images/mitra/Logo Idnic.png",
    "./src/assets/images/mitra/Logo internetwork.png",
    "./src/assets/images/mitra/Logo LKPP.png",
    "./src/assets/images/mitra/Logo Mayatama.png",
    "./src/assets/images/mitra/Logo neucentrix.png",
    "./src/assets/images/mitra/Logo vixer.std.png",
  ],
  paket_wifi: [
    {
      id: 1,
      nama: "Paket 1",
      mbps: 10,
      tarifPerBulan: 175000,
      discount: 22,
      fitur: [
        "Internet UNLIMITED",
        "Ideal untuk 1 - 3 perangkat",
        "Gratis instalasi",
      ],
    },
    {
      id: 2,
      nama: "Paket 2",
      mbps: 20,
      tarifPerBulan: 220000,
      discount: 27,
      fitur: [
        "Internet UNLIMITED",
        "Ideal untuk 1 - 3 perangkat",
        "Gratis instalasi",
      ],
    },
    {
      id: 3,
      nama: "Paket 3",
      mbps: 50,
      tarifPerBulan: "350.000",
      discount: 30,
      fitur: [
        "Internet UNLIMITED",
        "Ideal untuk 1 - 3 perangkat",
        "Gratis instalasi",
      ],
    },
    {
      id: 4,
      nama: "Paket 3",
      mbps: 100,
      tarifPerBulan: 660000,
      discount: 27,
      fitur: [
        "Internet UNLIMITED",
        "Ideal untuk 1 - 3 perangkat",
        "Gratis instalasi",
      ],
    },
  ],
  lokasi:
    "Jl. Wonosari Barat, Wonosari, Kec. Bengkalis, Kab. Bengkalis, Riau 28711",
  kontak: {
    email: "netmedia@gmail.com",
    noHp: "+6281234567890",
  },
  tipeAkses: ["admin", "teknisi"],
};

export default constants;

export const isAyiPresentasi = false;

export const menusAdmin = isAyiPresentasi
  ? constants.menusAdminForAyi
  : constants.menusAdmin;
export const cardsDashboard = isAyiPresentasi
  ? constants.cardsDashboardForAyi
  : constants.cardsDashboard;
