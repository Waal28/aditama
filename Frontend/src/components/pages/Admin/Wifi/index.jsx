import React from "react";
import AdminLayout from "../../../layout/admin";
import PropTypes from "prop-types";
import PageTableTemplate from "../../../layout/admin/PageTableTemplate";
import HeaderContent from "../../../layout/admin/HeaderContent";
import WifiApi from "../../../../api/src/wifi";
import { useAppState } from "../../../../context/AppStateContext";
import ModalEditWifi from "./ModalEditWifi";
import ModalDeleteWifi from "./ModalDeleteWifi";
import ModalCreateWifi from "./ModalCreateWifi";
import { formatRupiah } from "../../../../utils/format";

export default function Wifi() {
  const { HandleModal } = useAppState();
  const { getAllWifi, getWifiByQuery, createWifi, updateWifi, deleteWifi } =
    WifiApi();
  const [data, setData] = React.useState([]);
  const [item, setItem] = React.useState({
    id: null,
    nama: "",
    mbps: "",
    tarifPerBulan: "",
  });
  async function handleGetAllDataWifi() {
    const response = await getAllWifi();
    setData(response.data);
  }
  async function handleGetDataWifiByQuery(query) {
    const response = await getWifiByQuery(query);
    setData(response.data);
  }
  async function handleCreateWifi(payload) {
    await createWifi(payload);
    await handleGetAllDataWifi();
    HandleModal.close(`modal-confirm-create-wifi`);
  }
  async function handleEditWifi(id, payload) {
    await updateWifi(id, payload);
    await handleGetAllDataWifi();
    HandleModal.close(`modal-confirm-edit-wifi`);
  }
  async function handleDeleteWifi(id) {
    await deleteWifi(id);
    await handleGetAllDataWifi();
    HandleModal.close(`modal-confirm-hapus-wifi`);
  }
  async function handleSortWifiByLatest() {
    const response = await getAllWifi();
    const sorted = response.data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setData(sorted);
  }
  async function handleSortWifiByOldest() {
    const response = await getAllWifi();
    const sorted = response.data.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
    setData(sorted);
  }
  async function handleSortWifiByAZ() {
    const response = await getAllWifi();
    const sorted = response.data.sort((a, b) => a.nama.localeCompare(b.nama));
    setData(sorted);
  }
  async function handleSortWifiByZA() {
    const response = await getAllWifi();
    const sorted = response.data.sort((a, b) => b.nama.localeCompare(a.nama));
    setData(sorted);
  }
  function handleClickCreate() {
    HandleModal.open(`modal-confirm-create-wifi`);
  }
  function handleClickEdit(value) {
    setItem(value);
    HandleModal.open(`modal-confirm-edit-wifi`);
  }
  function handleClickDelete(value) {
    setItem(value);
    HandleModal.open(`modal-confirm-hapus-wifi`);
  }
  function Thead() {
    return (
      <tr className="bg-header_footer text-gray-700 lg:text-sm text-xs border-b-8 border-secondary">
        <th>No</th>
        <td>Nama Paket</td>
        <td>Paket (Mbps)</td>
        <td>Tarif/Bulan (Rp)</td>
        <td className="text-center">Aksi</td>
      </tr>
    );
  }
  function Tbody({ item, index }) {
    return (
      <tr className="border-b border-secondary text-gray-700">
        <th className="lg:text-sm text-xs">{index + 1}</th>
        <td className="lg:text-sm text-xs">{item.nama}</td>
        <td className="lg:text-sm text-xs">{item.mbps} Mbps</td>
        <td className="lg:text-sm text-xs">
          Rp. {formatRupiah(item.tarifPerBulan)}
        </td>
        <td className="flex justify-center gap-4">
          <div
            className="tooltip w-fit lg:tooltip-top tooltip-left"
            data-tip="Edit"
            onClick={() => handleClickEdit(item)}
          >
            <button className="btn lg:btn-md btn-sm btn-ghost btn-circle bg-gray-300">
              <img
                src="https://api.iconify.design/material-symbols:edit-outline.svg?color=%2300ff11"
                alt="..."
                className="lg:w-6 w-4"
              />
            </button>
          </div>
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
      <HeaderContent title="Data Wifi" />
      <main>
        <PageTableTemplate
          getData={handleGetAllDataWifi}
          getDataByQuery={handleGetDataWifiByQuery}
          data={data}
          colSpan={9}
          Thead={Thead}
          Tbody={Tbody}
          placeholderSearch="Cari paket wifi..."
          handleClickCreate={handleClickCreate}
          sortByLatest={handleSortWifiByLatest}
          sortByOldest={handleSortWifiByOldest}
          sortByAZ={handleSortWifiByAZ}
          sortByZA={handleSortWifiByZA}
        />
        <ModalCreateWifi handleCreate={handleCreateWifi} />
        <ModalEditWifi item={item} handleEdit={handleEditWifi} />
        <ModalDeleteWifi
          item={item}
          HandleModal={HandleModal}
          handleDelete={handleDeleteWifi}
        />
      </main>
    </AdminLayout>
  );
}
