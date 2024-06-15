import axios from "axios";
import React from "react";
import PropTypes from "prop-types";

export default function BillingTable() {
  const urlApi = "https://dummyjson.com/users";
  const [dataBilling, setDataBilling] = React.useState([]);
  const [query, setQuery] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  async function getDataBilling() {
    try {
      const res = await axios.get(urlApi);
      const payload = res.data.users.map((user) => ({
        id: user.id,
        nama: user.firstName,
        alamat: user.address.address,
        noHp: user.phone,
        paket: user.bloodGroup,
        bulan: getMonth(new Date(user.birthDate).getMonth()),
        tahun: new Date(user.birthDate).getFullYear(),
        status: user.gender === "male" ? true : false,
        tanggal: user.birthDate,
      }));

      setDataBilling(payload);
      setLoading(false);
    } catch (error) {
      alert("Gagal get data billing");
      console.log(error);
      setLoading(false);
    }
  }

  React.useEffect(() => {
    const getDataBilingByQuery = async () => {
      if (query.length > 0) {
        setLoading(true);
        try {
          const res = await axios.get(`${urlApi}/search?q=${query}`);
          const payload = res.data.users.map((user) => ({
            id: user.id,
            nama: user.firstName,
            alamat: user.address.address,
            noHp: user.phone,
            paket: user.bloodGroup,
            bulan: getMonth(new Date(user.birthDate).getMonth()),
            tahun: new Date(user.birthDate).getFullYear(),
            status: user.gender === "male" ? true : false,
            tanggal: user.birthDate,
          }));

          setDataBilling(payload);
          setLoading(false);
        } catch (error) {
          alert("Gagal get data billing");
          console.error("Error fetching data:", error);
        }
        setLoading(false);
      } else {
        setLoading(true);
        getDataBilling();
      }
    };

    const delayDebounceFn = setTimeout(() => {
      getDataBilingByQuery();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <main className="container mx-auto mb-10 px-5">
      <SearchBar setQuery={setQuery} />
      <div className="overflow-x-auto max-h-80">
        <table className="table table-md table-pin-rows ">
          <thead>
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
          </thead>
          <tbody>
            {loading ? (
              <tr className="border-b border-secondary">
                <td colSpan={9} className="text-center text-yellow-300">
                  <span className="loading loading-dots loading-lg"></span>
                </td>
              </tr>
            ) : dataBilling.length < 1 ? (
              <tr className="border-b border-secondary">
                <td colSpan={9} className="text-center text-lg font-semibold">
                  Data Kosong
                </td>
              </tr>
            ) : (
              dataBilling.map((user, index) => (
                <tr key={user.id} className="border-b border-secondary">
                  <th className="lg:text-sm text-xs">{index + 1}</th>
                  <td className="lg:text-sm text-xs">{user.nama}</td>
                  <td className="lg:text-sm text-xs">{user.alamat}</td>
                  <td className="lg:text-sm text-xs">{user.noHp}</td>
                  <td className="lg:text-sm text-xs text-center">
                    {user.paket}
                  </td>
                  <td className="lg:text-sm text-xs">{user.bulan}</td>
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
function SearchBar({ setQuery }) {
  return (
    <label className="lg:w-[50%] lg:ml-auto input input-bordered lg:input-md input-sm flex items-center gap-2 bg-header_footer mb-3">
      <input
        type="text"
        className="grow"
        placeholder="Cari nama..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="w-5 opacity-70"
      >
        <path
          fillRule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clipRule="evenodd"
        />
      </svg>
    </label>
  );
}
SearchBar.propTypes = {
  setQuery: PropTypes.func.isRequired,
};
function getMonth(month) {
  switch (month) {
    case 0:
      return "Januari";
    case 1:
      return "Februari";
    case 2:
      return "Maret";
    case 3:
      return "April";
    case 4:
      return "Mei";
    case 5:
      return "Juni";
    case 6:
      return "Juli";
    case 7:
      return "Agustus";
    case 8:
      return "September";
    case 9:
      return "Oktober";
    case 10:
      return "November";
    case 11:
      return "Desember";
    default:
      return "";
  }
}
