import React from "react";
import PropTypes from "prop-types";
import AdminLayout from "../../../layout/admin";
import PageTableTemplate from "../../../layout/admin/PageTableTemplate";
import HeaderContent from "../../../layout/admin/HeaderContent";
import PelangganApi from "../../../../api/src/pelanggan";
import { useAppState } from "../../../../context/AppStateContext";
import ModalEditCustomer from "./ModalEditCustomer";
import ModalDeleteCustomer from "./ModalDeleteCustomer";
import ModalCreateCustomer from "./ModalCreateCustomer";
import { IconAddLocation } from "../../../icons";

export default function Customer({ canCreate, canEdit, canDelete }) {
  const { HandleModal } = useAppState();
  const {
    getAllPelanggan,
    getPelangganByQuery,
    createPelanggan,
    updatePelanggan,
    deletePelanggan,
  } = PelangganApi();
  const [data, setData] = React.useState([]);
  const [item, setItem] = React.useState({
    id: null,
    nama: "",
    alamat: "",
    no_hp: "",
    email: "",
    paketWifi: "",
    longitude: "",
    latitude: "",
  });
  async function handleGetAllDataPelanggan() {
    const response = await getAllPelanggan();
    setData(response.data);
  }
  async function handleGetDataPelangganByQuery(query) {
    const response = await getPelangganByQuery(query);
    setData(response.data);
  }
  async function handleCreatePelanggan(payload) {
    await createPelanggan(payload);
    await handleGetAllDataPelanggan();
    HandleModal.close(`modal-confirm-create-pelanggan`);
  }
  async function handleEditPelanggan(id, payload) {
    await updatePelanggan(id, payload);
    await handleGetAllDataPelanggan();
    HandleModal.close(`modal-confirm-edit-pelanggan`);
  }
  async function handleDeletePelanggan(id) {
    await deletePelanggan(id);
    await handleGetAllDataPelanggan();
    HandleModal.close(`modal-confirm-hapus-pelanggan`);
  }
  async function handleSortCustomerByLatest() {
    const response = await getAllPelanggan();
    const sorted = response.data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setData(sorted);
  }
  async function handleSortCustomerByOldest() {
    const response = await getAllPelanggan();
    const sorted = response.data.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
    setData(sorted);
  }
  async function handleSortCustomerByAZ() {
    const response = await getAllPelanggan();
    const sorted = response.data.sort((a, b) => a.nama.localeCompare(b.nama));
    setData(sorted);
  }
  async function handleSortCustomerByZA() {
    const response = await getAllPelanggan();
    const sorted = response.data.sort((a, b) => b.nama.localeCompare(a.nama));
    setData(sorted);
  }
  function handleClickCreate() {
    HandleModal.open(`modal-confirm-create-pelanggan`);
  }
  function handleClickEdit(value) {
    setItem(value);
    HandleModal.open(`modal-confirm-edit-pelanggan`);
  }
  function handleClickDelete(value) {
    setItem(value);
    HandleModal.open(`modal-confirm-hapus-pelanggan`);
  }
  const handleClickKordinat = (latitude, longitude) => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(url, "_blank");
  };
  function Thead() {
    return (
      <tr className="bg-header_footer text-gray-700 lg:text-sm text-xs border-b-8 border-secondary">
        <th>No</th>
        <td>Nama</td>
        <td>Alamat</td>
        <td>No. Hp</td>
        <td>Email</td>
        <td>Paket</td>
        <td>Kordinat</td>
        <td className="text-center">Aksi</td>
      </tr>
    );
  }
  function Tbody({ item, index }) {
    return (
      <tr className="border-b border-secondary text-gray-700">
        <th className="lg:text-sm text-xs">{index + 1}</th>
        <td className="lg:text-sm text-xs">{item.nama}</td>
        <td className="lg:text-sm text-xs">{item.alamat}</td>
        <td className="lg:text-sm text-xs">{item.no_hp}</td>
        <td className="lg:text-sm text-xs">{item.email}</td>
        <td className="lg:text-sm text-xs">{item.paketWifi}</td>
        <td className="lg:text-sm text-xs">
          {item.latitude}, {item.longitude}
        </td>
        <td className="flex justify-center gap-4">
          <div
            className="tooltip w-fit lg:tooltip-top tooltip-left"
            data-tip="Lihat Lokasi"
            onClick={() => handleClickKordinat(item.latitude, item.longitude)}
          >
            <button className="btn btn-circle lg:btn-md btn-sm btn-primary text-white">
              <IconAddLocation />
            </button>
          </div>
          {canEdit && (
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
          )}
          {canDelete && (
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
          )}
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
      <HeaderContent title="Pelanggan" />
      <main>
        <PageTableTemplate
          tableName="pelanggan"
          getData={handleGetAllDataPelanggan}
          getDataByQuery={handleGetDataPelangganByQuery}
          data={data}
          colSpan={9}
          Thead={Thead}
          Tbody={Tbody}
          placeholderSearch="Cari pelanggan..."
          handleClickCreate={handleClickCreate}
          sortByLatest={handleSortCustomerByLatest}
          sortByOldest={handleSortCustomerByOldest}
          sortByAZ={handleSortCustomerByAZ}
          sortByZA={handleSortCustomerByZA}
          canCreate={canCreate}
        />
        <ModalCreateCustomer handleCreate={handleCreatePelanggan} />
        <ModalEditCustomer item={item} handleEdit={handleEditPelanggan} />
        <ModalDeleteCustomer
          item={item}
          HandleModal={HandleModal}
          handleDelete={handleDeletePelanggan}
        />
      </main>
    </AdminLayout>
  );
}

Customer.propTypes = {
  canCreate: PropTypes.bool,
  canEdit: PropTypes.bool,
  canDelete: PropTypes.bool,
};
