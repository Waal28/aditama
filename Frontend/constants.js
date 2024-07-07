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
// Mitra
import logoAPJII from "./src/assets/images/mitra/Logo APJII.png";
import logoBertua from "./src/assets/images/mitra/Logo bertuahix.png";
import logoCloudpi from "./src/assets/images/mitra/Logo Cloudpi.png";
import logoCmedia from "./src/assets/images/mitra/Logo Cmedia.png";
import logoExelNet from "./src/assets/images/mitra/Logo exel net.png";
import logoGDS from "./src/assets/images/mitra/Logo GDS.png";
import logoIdnic from "./src/assets/images/mitra/Logo Idnic.png";
import logoInternetwork from "./src/assets/images/mitra/Logo internetwork.png";
import logoLKPP from "./src/assets/images/mitra/Logo LKPP.png";
import logoMayatama from "./src/assets/images/mitra/Logo Mayatama.png";
import logoNeucentrix from "./src/assets/images/mitra/Logo neucentrix.png";
import logoVixerStd from "./src/assets/images/mitra/Logo vixer.std.png";
// Landing Page
// import imgCarousel1 from "";
// import imgCarousel2 from "";
// import imgCarousel3 from "";
// import imgCarousel4 from "";

const imgCarousel1 =
  "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg";
const imgCarousel2 =
  "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg";
const imgCarousel3 =
  "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg";
const imgCarousel4 =
  "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg";

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
  nama_pt: "PT. Aditama Netmedia Solusindo",
  desk_pt:
    "Sebagai provider internet terbaik dengan koneksi ultra cepat kini hadir dengan berbagai paket internet yang sesuai dengan kebutuhan kamu.",
  logo_blt: logo_blt,
  logo_pjg: logo_pjg,
  gambarDiTentangKami: gambarDiTentangKami,
  img_carousel_landing_page: [
    imgCarousel1,
    imgCarousel2,
    imgCarousel3,
    imgCarousel4,
  ],
  logo_mitra: [
    {
      link: "https://apjii.or.id",
      img: logoAPJII,
    },
    {
      link: "https://bertuahix.net",
      img: logoBertua,
    },
    {
      link: "https://cloudpi.id",
      img: logoCloudpi,
    },
    {
      link: "https://cmedia.net.id",
      img: logoCmedia,
    },
    {
      link: "https://exel.net.id",
      img: logoExelNet,
    },
    {
      link: "https://gds.net.id",
      img: logoGDS,
    },
    {
      link: "https://idnic.id",
      img: logoIdnic,
    },
    {
      link: "https://neucentrix.co.id",
      img: logoInternetwork,
    },
    {
      link: "https://e-katalog.lkpp.go.id/productsearchcontroller/listproduk?authenticityToken=705e676f3529bf3e32a8fc45f53145feca343835&cat=&commodityId=508&q=Fiber+Optik+Internasional+10+Mbps+Dedicated&jenis_produk=&kabid=99&pid=435609&mid=&tkdn_produk=-99&gt=&lt=",
      img: logoLKPP,
    },
    {
      link: "https://mayatama.id",
      img: logoMayatama,
    },
    {
      link: "https://neucentrix.co.id",
      img: logoNeucentrix,
    },
    {
      link: "https://vixer.std",
      img: logoVixerStd,
    },
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
  linkLokasi: "https://maps.app.goo.gl/UqJ2tKd222UXgnik8",
  kontak: {
    email: "netmedia@gmail.com",
    noHp: "+6281234567890",
  },
};

export default constants;

//user ada: "ayi", "indah", "ratiha", "kantor"
const user = "kantor";

const menuFor = {
  ayi: {
    admin: [
      {
        id: 2,
        name: "Pelanggan",
        link: "/admin/pelanggan",
        icon: "https://api.iconify.design/gridicons:multiple-users.svg",
        can: {
          create: true,
          edit: true,
          delete: true,
        },
        component: Customer,
      },
      {
        id: 3,
        name: "Wifi",
        link: "/admin/wifi",
        icon: "https://api.iconify.design/material-symbols:wifi-sharp.svg",
        can: {
          create: true,
          edit: true,
          delete: true,
        },
        component: Wifi,
      },
      {
        id: 4,
        name: "Transaksi",
        link: "/admin/transaksi",
        icon: "https://api.iconify.design/fluent:wallet-credit-card-32-filled.svg",
        can: {
          create: true,
          edit: true,
          delete: true,
        },
        component: Transaction,
      },
      {
        id: 6,
        name: "Pengguna",
        link: "/admin/pengguna",
        icon: "https://api.iconify.design/clarity:administrator-solid.svg",
        can: {
          create: true,
          edit: true,
          delete: true,
        },
        component: Pengguna,
      },
    ],
  },
  indah: {
    admin: [
      {
        id: 2,
        name: "Pelanggan",
        link: "/admin/pelanggan",
        icon: "https://api.iconify.design/gridicons:multiple-users.svg",
        can: {
          create: true,
          edit: true,
          delete: true,
        },
        component: Customer,
      },
      {
        id: 6,
        name: "Pengguna",
        link: "/admin/pengguna",
        icon: "https://api.iconify.design/clarity:administrator-solid.svg",
        can: {
          create: true,
          edit: true,
          delete: true,
        },
        component: Pengguna,
      },
    ],
  },
  ratiha: {
    admin: [
      {
        id: 2,
        name: "Pelanggan",
        link: "/admin/pelanggan",
        icon: "https://api.iconify.design/gridicons:multiple-users.svg",
        can: {
          create: true,
          edit: true,
          delete: true,
        },
        component: Customer,
      },
      {
        id: 5,
        name: "Laporan",
        link: "/admin/laporan",
        icon: "https://api.iconify.design/mingcute:task-2-line.svg",
        can: {
          create: false,
          edit: false,
          delete: false,
        },
        component: Laporan,
      },
      {
        id: 6,
        name: "Pengguna",
        link: "/admin/pengguna",
        icon: "https://api.iconify.design/clarity:administrator-solid.svg",
        can: {
          create: true,
          edit: true,
          delete: true,
        },
        component: Pengguna,
      },
    ],
    teknisi: [
      {
        id: 2,
        name: "Pelanggan",
        link: "/admin/pelanggan",
        icon: "https://api.iconify.design/gridicons:multiple-users.svg",
        can: {
          create: false,
          edit: false,
          delete: false,
        },
        component: Customer,
      },
      {
        id: 5,
        name: "Laporan",
        link: "/admin/laporan",
        icon: "https://api.iconify.design/mingcute:task-2-line.svg",
        can: {
          create: true,
          edit: true,
          delete: true,
        },
        component: Laporan,
      },
    ],
  },
  kantor: {
    admin: [
      {
        id: 2,
        name: "Pelanggan",
        link: "/admin/pelanggan",
        icon: "https://api.iconify.design/gridicons:multiple-users.svg",
        can: {
          create: true,
          edit: true,
          delete: true,
        },
        component: Customer,
      },
      {
        id: 3,
        name: "Wifi",
        link: "/admin/wifi",
        icon: "https://api.iconify.design/material-symbols:wifi-sharp.svg",
        can: {
          create: true,
          edit: true,
          delete: true,
        },
        component: Wifi,
      },
      {
        id: 4,
        name: "Transaksi",
        link: "/admin/transaksi",
        icon: "https://api.iconify.design/fluent:wallet-credit-card-32-filled.svg",
        can: {
          create: true,
          edit: true,
          delete: true,
        },
        component: Transaction,
      },
      {
        id: 5,
        name: "Laporan",
        link: "/admin/laporan",
        icon: "https://api.iconify.design/mingcute:task-2-line.svg",
        can: {
          create: false,
          edit: false,
          delete: false,
        },
        component: Laporan,
      },
      {
        id: 6,
        name: "Pengguna",
        link: "/admin/pengguna",
        icon: "https://api.iconify.design/clarity:administrator-solid.svg",
        can: {
          create: true,
          edit: true,
          delete: true,
        },
        component: Pengguna,
      },
    ],
    teknisi: [
      {
        id: 2,
        name: "Pelanggan",
        link: "/admin/pelanggan",
        icon: "https://api.iconify.design/gridicons:multiple-users.svg",
        can: {
          create: false,
          edit: false,
          delete: false,
        },
        component: Customer,
      },
      {
        id: 5,
        name: "Laporan",
        link: "/admin/laporan",
        icon: "https://api.iconify.design/mingcute:task-2-line.svg",
        can: {
          create: true,
          edit: true,
          delete: true,
        },
        component: Laporan,
      },
    ],
  },
};
const cardsFor = {
  ayi: {
    admin: [
      {
        title: "Pelanggan",
        name: "pelanggan",
        showFeatureFor: {
          admin: true,
        },
        value: 0,
        icon: "https://api.iconify.design/gridicons:multiple-users.svg?color=%23ece9ff",
        color: "bg-blue-500",
      },
      {
        title: "Paket Wifi",
        name: "paketWifi",
        showFeatureFor: {
          admin: true,
        },
        value: 0,
        icon: "https://api.iconify.design/material-symbols:wifi-sharp.svg?color=%23ece9ff",
        color: "bg-teal-500",
      },
      {
        title: "Belum Bayar",
        name: "belum_bayar",
        showFeatureFor: {
          admin: true,
        },
        value: 0,
        icon: "https://api.iconify.design/uil:money-bill-slash.svg?color=%23ece9ff",
        color: "bg-red-500",
      },
      {
        title: "Lunas",
        name: "sudah_bayar",
        showFeatureFor: {
          admin: true,
        },
        value: 0,
        icon: "https://api.iconify.design/uil:money-bill.svg?color=%23ece9ff",
        color: "bg-green-500",
      },
      {
        title: "Admin",
        name: "admin",
        showFeatureFor: {
          admin: true,
        },
        value: 0,
        icon: "https://api.iconify.design/clarity:administrator-line.svg?color=%23ece9ff",
        color: "bg-pink-500",
      },
    ],
  },
  indah: {
    admin: [
      {
        title: "Pelanggan",
        name: "pelanggan",
        value: 0,
        icon: "https://api.iconify.design/gridicons:multiple-users.svg?color=%23ece9ff",
        color: "bg-blue-500",
      },
      {
        title: "Admin",
        name: "admin",
        value: 0,
        icon: "https://api.iconify.design/clarity:administrator-line.svg?color=%23ece9ff",
        color: "bg-pink-500",
      },
    ],
  },
  ratiha: {
    admin: [
      {
        title: "Pelanggan",
        name: "pelanggan",
        value: 0,
        icon: "https://api.iconify.design/gridicons:multiple-users.svg?color=%23ece9ff",
        color: "bg-blue-500",
      },
      {
        title: "Laporan",
        name: "laporan",
        value: 0,
        icon: "https://api.iconify.design/icon-park-outline:transaction.svg?color=%23ece9ff",
        color: "bg-yellow-500",
      },
      {
        title: "Teknisi",
        name: "teknisi",
        value: 0,
        icon: "https://api.iconify.design/gravity-ui:person-worker.svg?color=%23ece9ff",
        color: "bg-purple-500",
      },
      {
        title: "Admin",
        name: "admin",
        value: 0,
        icon: "https://api.iconify.design/clarity:administrator-line.svg?color=%23ece9ff",
        color: "bg-pink-500",
      },
    ],
    teknisi: [
      {
        title: "Pelanggan",
        name: "pelanggan",
        value: 0,
        icon: "https://api.iconify.design/gridicons:multiple-users.svg?color=%23ece9ff",
        color: "bg-blue-500",
      },
      {
        title: "Laporan",
        name: "laporan",
        value: 0,
        icon: "https://api.iconify.design/icon-park-outline:transaction.svg?color=%23ece9ff",
        color: "bg-yellow-500",
      },
    ],
  },
  kantor: {
    admin: [
      {
        title: "Pelanggan",
        name: "pelanggan",
        showFeatureFor: {
          admin: true,
          teknisi: true,
        },
        value: 0,
        icon: "https://api.iconify.design/gridicons:multiple-users.svg?color=%23ece9ff",
        color: "bg-blue-500",
      },
      {
        title: "Paket Wifi",
        name: "paketWifi",
        showFeatureFor: {
          admin: true,
          teknisi: true,
        },
        value: 0,
        icon: "https://api.iconify.design/material-symbols:wifi-sharp.svg?color=%23ece9ff",
        color: "bg-teal-500",
      },
      {
        title: "Belum Bayar",
        name: "belum_bayar",
        showFeatureFor: {
          admin: true,
          teknisi: true,
        },
        value: 0,
        icon: "https://api.iconify.design/uil:money-bill-slash.svg?color=%23ece9ff",
        color: "bg-red-500",
      },
      {
        title: "Lunas",
        name: "sudah_bayar",
        showFeatureFor: {
          admin: true,
          teknisi: true,
        },
        value: 0,
        icon: "https://api.iconify.design/uil:money-bill.svg?color=%23ece9ff",
        color: "bg-green-500",
      },
      {
        title: "Laporan",
        name: "laporan",
        showFeatureFor: {
          admin: true,
          teknisi: true,
        },
        value: 0,
        icon: "https://api.iconify.design/icon-park-outline:transaction.svg?color=%23ece9ff",
        color: "bg-yellow-500",
      },
      {
        title: "Teknisi",
        name: "teknisi",
        showFeatureFor: {
          admin: true,
          teknisi: true,
        },
        value: 0,
        icon: "https://api.iconify.design/gravity-ui:person-worker.svg?color=%23ece9ff",
        color: "bg-purple-500",
      },
      {
        title: "Admin",
        name: "admin",
        showFeatureFor: {
          admin: true,
        },
        value: 0,
        icon: "https://api.iconify.design/clarity:administrator-line.svg?color=%23ece9ff",
        color: "bg-pink-500",
      },
    ],
    teknisi: [
      {
        title: "Pelanggan",
        name: "pelanggan",
        value: 0,
        icon: "https://api.iconify.design/gridicons:multiple-users.svg?color=%23ece9ff",
        color: "bg-blue-500",
      },
      {
        title: "Laporan",
        name: "laporan",
        value: 0,
        icon: "https://api.iconify.design/icon-park-outline:transaction.svg?color=%23ece9ff",
        color: "bg-yellow-500",
      },
    ],
  },
};
const tipeAksesFor = {
  ayi: ["admin"],
  indah: ["admin"],
  ratiha: ["admin", "teknisi"],
  kantor: ["admin", "teknisi"],
};

export const menusAdmin = menuFor[user];
export const cardsDashboard = cardsFor[user];
export const tipeAkses = tipeAksesFor[user];

export const defaultMenusAdmin = [
  {
    id: 1,
    name: "Dashboard",
    link: "/admin",
    icon: "https://api.iconify.design/octicon:dashboard.svg",
    component: Dashboard,
  },
  {
    id: 7,
    name: "Login",
    link: "/admin/login",
    icon: "https://api.iconify.design/octicon:dashboard.svg",
    component: AdminLogin,
  },
];
