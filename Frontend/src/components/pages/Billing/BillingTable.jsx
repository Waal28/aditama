import React from "react";
import PropTypes from "prop-types";
import TransaksiApi from "../../../api/src/transaksi";
import { formatDateSlash } from "../../../utils/format";
import PaginationComponent from "../../Pagination";

export default function BillingTable() {
  const { getAllTransaksi, getTransaksiByQuery } = TransaksiApi();
  const [dataBilling, setDataBilling] = React.useState([]);
  const [query, setQuery] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  async function getDataBilling() {
    try {
      const res = await getAllTransaksi();
      setDataBilling(res.data);
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
          const res = await getTransaksiByQuery(query);
          setDataBilling(res.data);
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <main className="container mx-auto mb-10 px-5">
      <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-3 items-center">
        <div className="flex items-center gap-1">
          <img
            src="https://api.iconify.design/ic:round-check.svg?color=%2307d600"
            alt="..."
            className="w-5"
          />
          <span className="lg:text-sm text-xs me-5">Lunas</span>
          <img
            src="https://api.iconify.design/material-symbols:close-rounded.svg?color=%23d60006"
            alt="..."
            className="w-5"
          />
          <span className="lg:text-sm text-xs me-5">Belum Lunas</span>
        </div>
        <SearchBar setQuery={setQuery} />
      </div>
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
                  <td className="lg:text-sm text-xs">{user.pelanggan.nama}</td>
                  <td className="lg:text-sm text-xs">
                    {user.pelanggan.alamat}
                  </td>
                  <td className="lg:text-sm text-xs">{user.pelanggan.no_hp}</td>
                  <td className="lg:text-sm text-xs text-center">
                    {user.pelanggan.paketWifi}
                  </td>
                  <td className="lg:text-sm text-xs">{user.bulan}</td>
                  <td className="lg:text-sm text-xs">{user.tahun}</td>
                  <th className="lg:text-sm text-xs">
                    <img
                      src={
                        user.status.toLowerCase() === "lunas"
                          ? "https://api.iconify.design/ic:round-check.svg?color=%2307d600"
                          : "https://api.iconify.design/material-symbols:close-rounded.svg?color=%23d60006"
                      }
                      alt="..."
                      className="w-5 mx-auto"
                    />
                  </th>
                  <th className="lg:text-sm text-xs">
                    {formatDateSlash(user.createdAt)}
                  </th>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <PaginationComponent data={dataBilling} />
    </main>
  );
}
function SearchBar({ setQuery }) {
  return (
    <label className="w-full input input-bordered lg:input-md input-sm flex items-center gap-2 bg-gray-200 mb-3">
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
