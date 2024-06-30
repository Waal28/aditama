import React from "react";
import AdminLayout from "../../../layout/admin";
import PropTypes from "prop-types";
import PageTableTemplate from "../../../layout/admin/PageTableTemplate";
import HeaderContent from "../../../layout/admin/HeaderContent";
import TransaksiApi from "../../../../api/src/transaksi";
import { useAppState } from "../../../../context/AppStateContext";
import ModalDeleteTransaksi from "./ModalDeleteTransaksi";
import ModalCreateTransaksi from "./ModalCreateTransaksi";
import usePrint from "../../../../hooks/usePrint";
import { formatRupiah } from "../../../../utils/format";
import staticData from "../../../../../staticData";

export default function Transaksi() {
  const { printRef, handlePrint } = usePrint();
  const {
    getAllTransaksi,
    getTransaksiByQuery,
    createTransaksi,
    setLunasTransaksi,
    deleteTransaksi,
  } = TransaksiApi();
  const { HandleModal } = useAppState();
  const [data, setData] = React.useState([]);
  const [isLunas, setIsLunas] = React.useState(false);
  const [item, setItem] = React.useState({
    id: null,
    tagihan: "",
    status: "",
    pelangganId: null,
    createdAt: "",
    pelanggan: {
      id: null,
      nama: "",
      alamat: "",
      no_hp: "",
      email: "",
      paketWifi: "",
      longitude: "",
      latitude: "",
      createdAt: "",
    },
  });
  const filtered = (data) => {
    if (isLunas) {
      return data.length > 0
        ? data.filter((item) => item.status === "Lunas")
        : [];
    } else {
      return data.length > 0
        ? data.filter((item) => item.status === "Belum Lunas")
        : [];
    }
  };
  async function handleGetAllDataTransaksi() {
    const response = await getAllTransaksi();
    setData(filtered(response.data));
  }
  async function handleGetDataTransaksiByQuery(query) {
    const response = await getTransaksiByQuery(query);
    setData(filtered(response.data));
  }
  async function handleCreateTransaksi(payload) {
    await createTransaksi(payload);
    await handleGetAllDataTransaksi();
    HandleModal.close(`modal-confirm-create-transaksi`);
  }
  async function handleDeleteTransaksi(id) {
    await deleteTransaksi(id);
    await handleGetAllDataTransaksi();
    HandleModal.close(`modal-confirm-hapus-transaksi`);
  }
  async function handleClickLunas(id) {
    await setLunasTransaksi(id);
    await handleGetAllDataTransaksi();
  }
  async function handleSortTransaksiByLatest() {
    const response = await getAllTransaksi();
    const sorted = response.data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setData(filtered(sorted));
  }
  async function handleSortTransaksiByOldest() {
    const response = await getAllTransaksi();
    const sorted = response.data.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
    setData(filtered(sorted));
  }
  async function handleSortTransaksiByAZ() {
    const response = await getAllTransaksi();
    const sorted = response.data.sort((a, b) =>
      a.pelanggan.nama.localeCompare(b.pelanggan.nama)
    );
    setData(filtered(sorted));
  }
  async function handleSortTransaksiByZA() {
    const response = await getAllTransaksi();
    const sorted = response.data.sort((a, b) =>
      b.pelanggan.nama.localeCompare(a.pelanggan.nama)
    );
    setData(filtered(sorted));
  }
  async function handleFilterTransaksiByStatus(status) {
    const response = await getAllTransaksi();
    const filtered = response.data.filter((item) => item.status === status);
    setIsLunas(status === "Lunas" ? true : false);
    setData(filtered);
  }
  function handleClickCreate() {
    HandleModal.open(`modal-confirm-create-transaksi`);
  }
  function handleClickDelete(value) {
    setItem(value);
    HandleModal.open(`modal-confirm-hapus-transaksi`);
  }
  function handleClickPrint(value) {
    setItem(value);
    setTimeout(() => {
      handlePrint();
    }, 1000);
  }
  function Thead() {
    return (
      <tr className="bg-header_footer text-gray-700 lg:text-sm text-xs border-b-8 border-secondary">
        <th>No</th>
        <td>Nama</td>
        <td>Alamat</td>
        <td>Kordinat</td>
        <td>No Hp</td>
        <td>Email</td>
        <td>Paket</td>
        {isLunas ? <td>Bulan</td> : null}
        {isLunas ? <td>Tahun</td> : null}
        <td>Tanggal</td>
        <td className="text-center">Aksi</td>
      </tr>
    );
  }
  function Tbody({ item, index }) {
    return (
      <tr className="border-b border-secondary text-gray-700">
        <th className="lg:text-sm text-xs">{index + 1}</th>
        <td className="lg:text-sm text-xs">{item.pelanggan.nama}</td>
        <td className="lg:text-sm text-xs">{item.pelanggan.alamat}</td>
        <td className="lg:text-sm text-xs">
          {item.pelanggan.latitude}, {item.pelanggan.longitude}
        </td>
        <td className="lg:text-sm text-xs">{item.pelanggan.no_hp}</td>
        <td className="lg:text-sm text-xs">{item.pelanggan.email}</td>
        <td className="lg:text-sm text-xs">{item.pelanggan.paketWifi}</td>
        {isLunas && (
          <>
            <td className="lg:text-sm text-xs">{item.bulan}</td>
            <td className="lg:text-sm text-xs">{item.tahun}</td>
          </>
        )}
        <td className="lg:text-sm text-xs">
          {new Date(item.createdAt).toLocaleDateString("id-ID")}
        </td>
        <td>
          <div className="flex items-center justify-center gap-3">
            {isLunas ? (
              <div className="tooltip w-fit tooltip-left" data-tip="Print">
                <button
                  className="btn lg:btn-md btn-sm btn-ghost btn-square bg-gray-300"
                  onClick={() => handleClickPrint(item)}
                >
                  <img
                    src="https://api.iconify.design/material-symbols:print-rounded.svg"
                    alt="..."
                    className="lg:w-6 w-4"
                  />
                </button>
              </div>
            ) : (
              <div className="dropdown dropdown-top dropdown-end">
                <div
                  className="tooltip w-fit tooltip-left"
                  data-tip="Belum Lunas"
                >
                  <button
                    tabIndex={0}
                    className="btn lg:btn-md btn-sm btn-ghost btn-square bg-gray-300"
                  >
                    <img
                      src="https://api.iconify.design/fluent:money-off-24-regular.svg?color=%23ff0000"
                      alt="..."
                      className="lg:w-6 w-4"
                    />
                  </button>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[8] menu p-0 shadow bg-base-100 rounded-box lg:w-36 w-32"
                >
                  <li>
                    <button
                      onClick={() => handleClickLunas(item.id)}
                      className="btn lg:btn-md btn-sm btn-success lg:text-sm text-xs text-white"
                    >
                      <img
                        src="https://api.iconify.design/fluent:money-16-regular.svg?color=%23ffffff"
                        alt="..."
                        className="w-6 text-white"
                      />
                      <span>Lunaskan</span>
                    </button>
                  </li>
                </ul>
              </div>
            )}
            <div
              className="tooltip w-fit lg:tooltip-top tooltip-left"
              data-tip="Hapus"
            >
              <button
                className="btn lg:btn-md btn-sm btn-ghost btn-circle bg-gray-300"
                onClick={() => handleClickDelete(item)}
              >
                <img
                  src="https://api.iconify.design/material-symbols:delete-outline.svg?color=%23ff0000"
                  alt="..."
                  className="lg:w-6 w-4"
                />
              </button>
            </div>
          </div>
        </td>
      </tr>
    );
  }
  Tbody.propTypes = {
    item: PropTypes.object,
    index: PropTypes.number,
  };
  return (
    <AdminLayout>
      <HeaderContent title="Transaksi" />
      <main>
        <div ref={printRef} className="hidden">
          <PrintKwitansi item={item} />
        </div>
        <PageTableTemplate
          getData={handleGetAllDataTransaksi}
          getDataByQuery={handleGetDataTransaksiByQuery}
          data={data}
          colSpan={9}
          Thead={Thead}
          Tbody={Tbody}
          placeholderSearch="Cari Transaksi..."
          handleClickCreate={handleClickCreate}
          sortByLatest={handleSortTransaksiByLatest}
          sortByOldest={handleSortTransaksiByOldest}
          sortByAZ={handleSortTransaksiByAZ}
          sortByZA={handleSortTransaksiByZA}
          Tabs={
            <Tabs
              handleFilterTransaksiByStatus={handleFilterTransaksiByStatus}
            />
          }
        />
        <ModalCreateTransaksi handleCreate={handleCreateTransaksi} />
        <ModalDeleteTransaksi
          item={item}
          HandleModal={HandleModal}
          handleDelete={handleDeleteTransaksi}
        />
      </main>
    </AdminLayout>
  );
}

const Tabs = ({ handleFilterTransaksiByStatus }) => {
  const [radioButtons, setRadioButtons] = React.useState([
    { label: "Belum Lunas", active: true },
    { label: "Lunas", active: false },
  ]);
  const handleChange = (event) => {
    const newRadioButtons = radioButtons.map((button) => ({
      ...button,
      active: button.label === event.target.value,
    }));
    handleFilterTransaksiByStatus(event.target.value);
    setRadioButtons(newRadioButtons);
  };
  return (
    <div role="tablist" className="tabs tabs-lifted mx-auto mb-1">
      {radioButtons.map((button) => (
        <input
          key={button.label}
          type="radio"
          name="mytabs"
          role="tab"
          className={`${
            button.active ? "tab text-yellow-300" : "tab"
          } hover:text-yellow-400 input-sm duration-200 font-semibold tracking-wider`}
          aria-label={button.label}
          checked={button.active}
          value={button.label}
          onChange={handleChange}
        />
      ))}
    </div>
  );
};
Tabs.propTypes = {
  handleFilterTransaksiByStatus: PropTypes.func,
};

function PrintKwitansi({ item }) {
  const { kontak, nama_pt, logo_pjg, lokasi } = staticData;
  const generateInvoiceCode = (id) => {
    if (!id) return "#000";
    return `#${id.toString().padStart(3, "0")}`;
  };

  return (
    <>
      {/* component */}

      <div className="w-80 rounded bg-gray-50 px-6 pt-8 shadow-lg">
        <img
          src={logo_pjg}
          alt="chippz"
          className="mx-auto w-16 py-4 rounded-xl"
        />
        <div className="flex flex-col justify-center items-center gap-2">
          <h4 className="font-semibold">{nama_pt}</h4>
          <p className="text-xs text-center">{lokasi}</p>
        </div>
        <div className="flex flex-col gap-3 border-b py-6 text-xs">
          <p className="flex justify-between">
            <span className="text-gray-400">No. Kwitansi:</span>
            <span>{generateInvoiceCode(item.id)}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-400">Nama:</span>
            <span className="break-all whitespace-normal">
              {item.pelanggan.nama}
            </span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-400">Alamat:</span>
            <span className="break-all whitespace-normal">
              {item.pelanggan.alamat}
            </span>
          </p>
          <div className="flex justify-between">
            <span className="text-gray-400">Kordinat:</span>
            <div className="flex flex-col w-fit justify-end text-end">
              <span>{item.pelanggan.latitude}</span>
              <span>{item.pelanggan.longitude}</span>
            </div>
          </div>
          <p className="flex justify-between">
            <span className="text-gray-400">Email:</span>
            <span className="break-all whitespace-normal">
              {item.pelanggan.email}
            </span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-400">No Hp:</span>
            <span>{item.pelanggan.no_hp}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-400">Bulan:</span>
            <span>{item.bulan}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-400">Tahun:</span>
            <span>{item.tahun}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-400">Tanggal:</span>
            <span>{new Date(item.updatedAt).toLocaleDateString("id-ID")}</span>
          </p>
        </div>
        <div className="flex flex-col gap-3 pb-6 pt-2 text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="flex">
                <th className="w-[33%] py-2">Paket</th>
                <th className="w-[33%] text-center py-2">Tagihan</th>
                <th className="w-[33%] text-end py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="flex">
                <td className="w-[33%] flex-1 py-1 break-all whitespace-normal">
                  {item.pelanggan.paketWifi}
                </td>
                <td className="w-[33%] text-center">
                  Rp. {formatRupiah(item.tagihan)}
                </td>
                <td className="w-[33%] text-end text-green-500">
                  {item.status}
                </td>
              </tr>
            </tbody>
          </table>
          <div className=" border-b border border-dashed" />
          <div className="py-4 justify-center items-center flex flex-col gap-2">
            <p className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21.3 12.23h-3.48c-.98 0-1.85.54-2.29 1.42l-.84 1.66c-.2.4-.6.65-1.04.65h-3.28c-.31 0-.75-.07-1.04-.65l-.84-1.65a2.567 2.567 0 0 0-2.29-1.42H2.7c-.39 0-.7.31-.7.7v3.26C2 19.83 4.18 22 7.82 22h8.38c3.43 0 5.54-1.88 5.8-5.22v-3.85c0-.38-.31-.7-.7-.7ZM12.75 2c0-.41-.34-.75-.75-.75s-.75.34-.75.75v2h1.5V2Z"
                  fill="#000"
                />
                <path
                  d="M22 9.81v1.04a2.06 2.06 0 0 0-.7-.12h-3.48c-1.55 0-2.94.86-3.63 2.24l-.75 1.48h-2.86l-.75-1.47a4.026 4.026 0 0 0-3.63-2.25H2.7c-.24 0-.48.04-.7.12V9.81C2 6.17 4.17 4 7.81 4h3.44v3.19l-.72-.72a.754.754 0 0 0-1.06 0c-.29.29-.29.77 0 1.06l2 2c.01.01.02.01.02.02a.753.753 0 0 0 .51.2c.1 0 .19-.02.28-.06.09-.03.18-.09.25-.16l2-2c.29-.29.29-.77 0-1.06a.754.754 0 0 0-1.06 0l-.72.72V4h3.44C19.83 4 22 6.17 22 9.81Z"
                  fill="#000"
                />
              </svg>{" "}
              {kontak.email}
            </p>
            <p className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fill="#000"
                  d="M11.05 14.95L9.2 16.8c-.39.39-1.01.39-1.41.01-.11-.11-.22-.21-.33-.32a28.414 28.414 0 01-2.79-3.27c-.82-1.14-1.48-2.28-1.96-3.41C2.24 8.67 2 7.58 2 6.54c0-.68.12-1.33.36-1.93.24-.61.62-1.17 1.15-1.67C4.15 2.31 4.85 2 5.59 2c.28 0 .56.06.81.18.26.12.49.3.67.56l2.32 3.27c.18.25.31.48.4.7.09.21.14.42.14.61 0 .24-.07.48-.21.71-.13.23-.32.47-.56.71l-.76.79c-.11.11-.16.24-.16.4 0 .08.01.15.03.23.03.08.06.14.08.2.18.33.49.76.93 1.28.45.52.93 1.05 1.45 1.58.1.1.21.2.31.3.4.39.41 1.03.01 1.43zM21.97 18.33a2.54 2.54 0 01-.25 1.09c-.17.36-.39.7-.68 1.02-.49.54-1.03.93-1.64 1.18-.01 0-.02.01-.03.01-.59.24-1.23.37-1.92.37-1.02 0-2.11-.24-3.26-.73s-2.3-1.15-3.44-1.98c-.39-.29-.78-.58-1.15-.89l3.27-3.27c.28.21.53.37.74.48.05.02.11.05.18.08.08.03.16.04.25.04.17 0 .3-.06.41-.17l.76-.75c.25-.25.49-.44.72-.56.23-.14.46-.21.71-.21.19 0 .39.04.61.13.22.09.45.22.7.39l3.31 2.35c.26.18.44.39.55.64.1.25.16.5.16.78z"
                />
              </svg>{" "}
              {kontak.noHp}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
PrintKwitansi.propTypes = {
  item: PropTypes.object,
};
