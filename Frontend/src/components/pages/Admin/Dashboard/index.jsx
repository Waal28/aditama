import AdminLayout from "../../../layout/admin";
import HeaderContent from "../../../layout/admin/HeaderContent";

const cardData = [
  {
    title: "Pelanggan",
    value: 235,
    icon: "https://api.iconify.design/gridicons:multiple-users.svg?color=%23ece9ff",
    color: "bg-blue-500",
  },
  {
    title: "Tarif Wifi",
    value: 150,
    icon: "https://api.iconify.design/material-symbols:wifi-sharp.svg?color=%23ece9ff",
    color: "bg-teal-500",
  },
  {
    title: "Belum Bayar",
    value: 30,
    icon: "https://api.iconify.design/uil:money-bill-slash.svg?color=%23ece9ff",
    color: "bg-red-500",
  },
  {
    title: "Lunas",
    value: 120,
    icon: "https://api.iconify.design/uil:money-bill.svg?color=%23ece9ff",
    color: "bg-green-500",
  },
  {
    title: "Laporan",
    value: 50,
    icon: "https://api.iconify.design/icon-park-outline:transaction.svg?color=%23ece9ff",
    color: "bg-yellow-500",
  },
  {
    title: "Teknisi",
    value: 8,
    icon: "https://api.iconify.design/gravity-ui:person-worker.svg?color=%23ece9ff",
    color: "bg-purple-500",
  },
];
export default function Dashboard() {
  return (
    <AdminLayout>
      <HeaderContent title="Dashboard" />
      <div className="grid grid-cols-2 gap-5 px-4 mt-8 sm:grid-cols-3 sm:px-8">
        {cardData.map((item, i) => (
          <div
            key={i}
            className="grid grid-cols-3 bg-white border rounded-xl overflow-hidden shadow-md"
          >
            <div className={`p-4 flex items-center ${item.color}`}>
              <img src={item.icon} className="w-full" />
            </div>
            <div className="p-4 col-span-2 flex flex-col justify-center text-gray-700">
              <h3 className="lg:text-base text-xs mb-2">{item.title}</h3>
              <p className="lg:text-3xl text-lg">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
