import AdminLayout from "../../../layout/admin";
import axios from "axios";
import PropTypes from "prop-types";
import PageTableTemplate from "../../../layout/admin/PageTableTemplate";
import HeaderContent from "../../../layout/admin/HeaderContent";

export default function Wifi() {
  const urlApi = "https://dummyjson.com/users";
  async function getDataPelanggan() {
    const res = await axios.get(urlApi);
    const payload = res.data.users.map((user) => ({
      id: user.id,
      nama: user.firstName,
      alamat: user.address.address,
      noHp: user.phone,
      paket: user.bloodGroup,
      tahun: new Date(user.birthDate).getFullYear(),
      status: user.gender === "male" ? true : false,
      tanggal: user.birthDate,
    }));
    return payload;
  }
  async function getDataPelangganByQuery(query) {
    const res = await axios.get(`${urlApi}/search?q=${query}`);
    const payload = res.data.users.map((user) => ({
      id: user.id,
      nama: user.firstName,
      alamat: user.address.address,
      noHp: user.phone,
      paket: user.bloodGroup,
      tahun: new Date(user.birthDate).getFullYear(),
      status: user.gender === "male" ? true : false,
      tanggal: user.birthDate,
    }));
    return payload;
  }

  return (
    <AdminLayout>
      <HeaderContent title="Wifi" />
      <main>
        <PageTableTemplate
          getData={getDataPelanggan}
          getDataByQuery={getDataPelangganByQuery}
          colspan={9}
          Thead={Thead}
          Tbody={Tbody}
          placeholderSearch="Cari wifi..."
        />
      </main>
    </AdminLayout>
  );
}

function Thead() {
  return (
    <tr className="bg-header_footer text-gray-700 lg:text-sm text-xs border-b-8 border-secondary">
      <th>No</th>
      <td>Nama</td>
      <td>Alamat</td>
      <td>No. Hp</td>
      <td className="text-center">Paket</td>
      <td>Bulan</td>
      <td>Tahun</td>
      <th className="text-center">Status</th>
      <th>Tanggal</th>
    </tr>
  );
}
function Tbody({ user, index }) {
  return (
    <tr className="border-b border-secondary text-gray-700">
      <th className="lg:text-sm text-xs">{index + 1}</th>
      <td className="lg:text-sm text-xs">{user.nama}</td>
      <td className="lg:text-sm text-xs">{user.alamat}</td>
      <td className="lg:text-sm text-xs">{user.noHp}</td>
      <td className="lg:text-sm text-xs text-center">{user.paket}</td>
      <td className="lg:text-sm text-xs">{user.tahun}</td>
      <th className="lg:text-sm text-xs">
        <img
          src={
            user.status
              ? "https://api.iconify.design/ic:round-check.svg?color=%2307d600"
              : "https://api.iconify.design/material-symbols:close-rounded.svg?color=%23d60006"
          }
          alt="..."
          className="w-5 mx-auto"
        />
      </th>
      <th className="lg:text-sm text-xs">{user.tanggal}</th>
    </tr>
  );
}
Tbody.propTypes = {
  user: PropTypes.object,
  index: PropTypes.number,
};
