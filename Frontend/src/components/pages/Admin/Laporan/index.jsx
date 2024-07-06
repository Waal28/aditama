import React from "react";
import AdminLayout from "../../../layout/admin";
import PropTypes from "prop-types";
import PageTableTemplate from "../../../layout/admin/PageTableTemplate";
import HeaderContent from "../../../layout/admin/HeaderContent";
import LaporanApi from "../../../../api/src/laporan";
import { useAppState } from "../../../../context/AppStateContext";
import ModalDeleteLaporan from "./ModalDeleteLaporan";
import ModalCreateLaporan from "./ModalCreateLaporan";
import { IconViewShow } from "../../../icons";
import ModalViewImage from "./ModalViewImage";
import ModalEditLaporan from "./ModalEditLaporan";

export default function Laporan({ canCreate, canEdit, canDelete }) {
  const {
    getAllLaporan,
    getLaporanByQuery,
    createLaporan,
    updateLaporan,
    deleteLaporan,
  } = LaporanApi();
  const { HandleModal } = useAppState();
  const [data, setData] = React.useState([]);
  const [pathImage, setPathImage] = React.useState("");
  const [item, setItem] = React.useState({
    id: null,
    teknisi: [],
    pelanggan: "",
    tgl_pengerjaan: null,
    alamat_pelanggan: "",
    longitude: "",
    latitude: "",
    keterangan: "",
    foto_sebelum_perbaikan: "",
    foto_sesudah_perbaikan: "",
  });

  async function handleGetAllDataLaporan() {
    const response = await getAllLaporan();
    setData(response.data);
  }
  async function handleGetDataLaporanByQuery(query) {
    const response = await getLaporanByQuery(query);
    setData(response.data);
  }
  async function handleCreateLaporan(payload) {
    await createLaporan(payload);
    await handleGetAllDataLaporan();
    HandleModal.close(`modal-confirm-create-laporan`);
  }
  async function handleEditLaporan(id, payload) {
    await updateLaporan(id, payload);
    await handleGetAllDataLaporan();
    HandleModal.close(`modal-confirm-edit-laporan`);
  }
  async function handleDeleteLaporan(id) {
    await deleteLaporan(id);
    await handleGetAllDataLaporan();
    HandleModal.close(`modal-confirm-hapus-laporan`);
  }
  async function handleSortLaporanByLatest() {
    const response = await getAllLaporan();
    const sorted = response.data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setData(sorted);
  }
  async function handleSortLaporanByOldest() {
    const response = await getAllLaporan();
    const sorted = response.data.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
    setData(sorted);
  }
  async function handleSortLaporanByAZ() {
    const response = await getAllLaporan();
    const sorted = response.data.sort((a, b) =>
      a.pelanggan.localeCompare(b.pelanggan)
    );
    setData(sorted);
  }
  async function handleSortLaporanByZA() {
    const response = await getAllLaporan();
    const sorted = response.data.sort((a, b) =>
      b.pelanggan.localeCompare(a.pelanggan)
    );
    setData(sorted);
  }
  function handleClickCreate() {
    HandleModal.open(`modal-confirm-create-laporan`);
  }
  function handleClickEdit(value) {
    setItem(value);
    HandleModal.open(`modal-confirm-edit-laporan`);
  }
  function handleClickDelete(value) {
    setItem(value);
    HandleModal.open(`modal-confirm-hapus-laporan`);
  }
  function handleClickShowImage(value) {
    setPathImage(value);
    HandleModal.open(`modal-view-image`);
  }
  function Thead() {
    return (
      <tr className="bg-header_footer text-gray-700 lg:text-sm text-xs border-b-8 border-secondary">
        <th>No</th>
        <td>Teknisi</td>
        <td>Pelanggan</td>
        <td>Tgl Pengerjaan</td>
        <td>Alamat</td>
        <td>Kordinat</td>
        <td>Keterangan</td>
        <td className="text-center">Foto Perbaikan</td>
        {canEdit && canDelete && <td className="text-center">Aksi</td>}
      </tr>
    );
  }
  function Tbody({ item, index }) {
    return (
      <tr className="border-b border-secondary text-gray-700">
        <th className="lg:text-sm text-xs">{index + 1}</th>
        <td className="lg:text-sm text-xs">
          <ol className="list-disc">
            {item.teknisi.length > 0 &&
              item.teknisi.map((user) => <li key={user.id}>{user.nama}</li>)}
          </ol>
        </td>
        <td className="lg:text-sm text-xs">{item.pelanggan}</td>
        <td className="lg:text-sm text-xs">
          {new Date(item.tgl_pengerjaan).toLocaleDateString("id-ID")}
        </td>
        <td className="lg:text-sm text-xs">{item.alamat_pelanggan}</td>
        <td className="lg:text-sm text-xs">
          {item.latitude}, {item.longitude}
        </td>
        <td className="lg:text-sm text-xs line-clamp-2">{item.keterangan}</td>
        <td>
          <div className="flex items-center justify-center gap-3">
            <button
              className="btn btn-primary lg:text-sm text-xs text-white flex justify-center items-center flex-col"
              onClick={() => handleClickShowImage(item.foto_sebelum_perbaikan)}
            >
              Sebelum
              <IconViewShow />
            </button>
            <button
              className="btn btn-primary lg:text-sm text-xs text-white flex justify-center items-center flex-col"
              onClick={() => handleClickShowImage(item.foto_sesudah_perbaikan)}
            >
              Sesudah
              <IconViewShow />
            </button>
          </div>
        </td>
        <td>
          <div className="flex items-center justify-center gap-3">
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
      <HeaderContent title="Laporan" />
      <main>
        <PageTableTemplate
          tableName="laporan"
          getData={handleGetAllDataLaporan}
          getDataByQuery={handleGetDataLaporanByQuery}
          data={data}
          colSpan={9}
          Thead={Thead}
          Tbody={Tbody}
          placeholderSearch="Cari Laporan..."
          handleClickCreate={handleClickCreate}
          sortByLatest={handleSortLaporanByLatest}
          sortByOldest={handleSortLaporanByOldest}
          sortByAZ={handleSortLaporanByAZ}
          sortByZA={handleSortLaporanByZA}
          canCreate={canCreate}
        />
        <ModalViewImage path={pathImage} />
        <ModalCreateLaporan handleCreate={handleCreateLaporan} />
        <ModalEditLaporan item={item} handleEdit={handleEditLaporan} />
        <ModalDeleteLaporan
          item={item}
          HandleModal={HandleModal}
          handleDelete={handleDeleteLaporan}
        />
      </main>
    </AdminLayout>
  );
}
Laporan.propTypes = {
  canCreate: PropTypes.bool,
  canEdit: PropTypes.bool,
  canDelete: PropTypes.bool,
};

const Tabs = ({ handleFilterLaporanByStatus }) => {
  const [radioButtons, setRadioButtons] = React.useState([
    { label: "Belum Lunas", active: true },
    { label: "Lunas", active: false },
  ]);
  const handleChange = (event) => {
    const newRadioButtons = radioButtons.map((button) => ({
      ...button,
      active: button.label === event.target.value,
    }));
    handleFilterLaporanByStatus(event.target.value);
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
  handleFilterLaporanByStatus: PropTypes.func,
};
