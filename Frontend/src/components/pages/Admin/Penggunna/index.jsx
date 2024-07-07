import React from "react";
import PropTypes from "prop-types";
import AdminLayout from "../../../layout/admin";
import PageTableTemplate from "../../../layout/admin/PageTableTemplate";
import HeaderContent from "../../../layout/admin/HeaderContent";
import PenggunaApi from "../../../../api/src/pengguna";
import { useAppState } from "../../../../context/AppStateContext";
import ModalEditPengguna from "./ModalEditPengguna";
import ModalDeletePengguna from "./ModalDeletePengguna";
import ModalCreatePengguna from "./ModalCreatePengguna";
import { tipeAkses } from "../../../../../constants";

export default function Pengguna({ canCreate, canEdit, canDelete }) {
  const { HandleModal } = useAppState();
  const {
    getAllPengguna,
    getPenggunaByQuery,
    createPengguna,
    updatePengguna,
    deletePengguna,
  } = PenggunaApi();
  const [data, setData] = React.useState([]);
  const [item, setItem] = React.useState({
    id: null,
    nama: "",
    username: "",
    password: "",
  });
  async function handleGetAllDataPengguna() {
    const response = await getAllPengguna();
    setData(response.data);
  }
  async function handleGetDataPenggunaByQuery(query) {
    const response = await getPenggunaByQuery(query);
    setData(response.data);
  }
  async function handleCreatePengguna(payload) {
    await createPengguna(payload);
    await handleGetAllDataPengguna();
    HandleModal.close(`modal-confirm-create-pengguna`);
  }
  async function handleEditPengguna(id, payload) {
    const res = await updatePengguna(id, payload);
    await handleGetAllDataPengguna();
    return res;
  }
  async function handleDeletePengguna(id) {
    await deletePengguna(id);
    await handleGetAllDataPengguna();
    HandleModal.close(`modal-confirm-hapus-pengguna`);
  }
  async function handleSortPenggunaByLatest() {
    const response = await getAllPengguna();
    const sorted = response.data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setData(sorted);
  }
  async function handleSortPenggunaByOldest() {
    const response = await getAllPengguna();
    const sorted = response.data.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
    setData(sorted);
  }
  async function handleSortPenggunaByAZ() {
    const response = await getAllPengguna();
    const sorted = response.data.sort((a, b) => a.nama.localeCompare(b.nama));
    setData(sorted);
  }
  async function handleSortPenggunaByZA() {
    const response = await getAllPengguna();
    const sorted = response.data.sort((a, b) => b.nama.localeCompare(a.nama));
    setData(sorted);
  }
  function handleClickCreate() {
    HandleModal.open(`modal-confirm-create-pengguna`);
  }
  function handleClickEdit(value) {
    setItem(value);
    HandleModal.open(`modal-confirm-edit-pengguna`);
  }
  function handleClickDelete(value) {
    setItem(value);
    HandleModal.open(`modal-confirm-hapus-pengguna`);
  }
  function Thead() {
    return (
      <tr className="bg-header_footer text-gray-700 lg:text-sm text-xs border-b-8 border-secondary">
        <th>No</th>
        <td>Nama</td>
        <td>Username</td>
        <td>Role</td>
        {canEdit && canDelete && <td className="text-center">Aksi</td>}
      </tr>
    );
  }
  function Tbody({ item, index }) {
    return (
      tipeAkses.includes(item.tipeAkses) && (
        <tr className="border-b border-secondary text-gray-700">
          <th className="lg:text-sm text-xs">{index + 1}</th>
          <td className="lg:text-sm text-xs">{item.nama}</td>
          <td className="lg:text-sm text-xs">{item.username}</td>
          <td className="lg:text-sm text-xs capitalize">{item.tipeAkses}</td>
          <td className="flex justify-center gap-4">
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
      )
    );
  }
  Tbody.propTypes = {
    item: PropTypes.object,
    index: PropTypes.number,
  };
  return (
    <AdminLayout>
      <HeaderContent title="Data Pengguna" />
      <main>
        <PageTableTemplate
          getData={handleGetAllDataPengguna}
          getDataByQuery={handleGetDataPenggunaByQuery}
          data={data}
          colSpan={9}
          Thead={Thead}
          Tbody={Tbody}
          placeholderSearch="Cari Akun Pengguna..."
          handleClickCreate={handleClickCreate}
          sortByLatest={handleSortPenggunaByLatest}
          sortByOldest={handleSortPenggunaByOldest}
          sortByAZ={handleSortPenggunaByAZ}
          sortByZA={handleSortPenggunaByZA}
          canCreate={canCreate}
        />
        <ModalCreatePengguna handleCreate={handleCreatePengguna} />
        <ModalEditPengguna item={item} handleEdit={handleEditPengguna} />
        <ModalDeletePengguna
          item={item}
          HandleModal={HandleModal}
          handleDelete={handleDeletePengguna}
        />
      </main>
    </AdminLayout>
  );
}

Pengguna.propTypes = {
  canCreate: PropTypes.bool,
  canDelete: PropTypes.bool,
  canEdit: PropTypes.bool,
};
