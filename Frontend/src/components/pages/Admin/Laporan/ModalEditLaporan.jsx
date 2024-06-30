import { useState } from "react";
import DialogModal from "../../../DialogModal";
import PropTypes from "prop-types";
import { useAppState } from "../../../../context/AppStateContext";
import PelangganApi from "../../../../api/src/pelanggan";
import AutoComplete from "../../../AutoComplete";
import { IconImageUpload } from "../../../icons";

export default function ModalEditLaporan(props) {
  const { item, handleEdit } = props;
  const { HandleToast } = useAppState();
  const { getPelangganById, getPelangganByQuery } = PelangganApi();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    teknisi: {
      label: "Teknisi : ",
      type: "text",
      name: "teknisi",
      value: "",
      placeholder: "Samsul Bin Samsu",
    },
    pelanggan: {
      label: "Pelanggan : ",
      type: "text",
      name: "pelanggan",
      value: "",
      placeholder: "Ismail Bin Mail",
    },
    tgl_pengerjaan: {
      label: "Tanggal Pengerjaan : ",
      type: "date",
      name: "tgl_pengerjaan",
      value: "",
      placeholder: "dd-mm-yyyy",
    },
    keterangan: {
      label: "Ket. Gangguan : ",
      type: "text",
      name: "keterangan",
      value: "",
      placeholder: "Wifi tidak terhubung",
    },
    foto_sebelum_perbaikan: {
      label: "Foto Sebelum Perbaikan : ",
      type: "text",
      name: "foto_sebelum_perbaikan",
      value: "",
      placeholder: "",
    },
    foto_sesudah_perbaikan: {
      label: "Foto Sesudah Perbaikan : ",
      type: "text",
      name: "foto_sesudah_perbaikan",
      value: "",
      placeholder: "",
    },
  };
  const [formComponent, setFormComponent] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (
      name === "foto_sebelum_perbaikan" ||
      name === "foto_sesudah_perbaikan"
    ) {
      setFormComponent((prevForm) => ({
        ...prevForm,
        [name]: {
          ...prevForm[name],
          value: files[0],
        },
      }));
    } else {
      setFormComponent((prevForm) => ({
        ...prevForm,
        [name]: {
          ...prevForm[name],
          value: value,
        },
      }));
    }
  };
  const handleResetSelectedPelanggan = async () => {
    setFormComponent((prevForm) => ({
      ...prevForm,
      pelanggan: {
        value: "",
      },
      alamat_pelanggan: {
        value: "",
      },
      longitude: {
        value: "",
      },
      latitude: {
        value: "",
      },
    }));
  };
  const handleSelectedPelanggan = async (item) => {
    try {
      const res = await getPelangganById(item.id);
      const pelanggan = res.data;

      setFormComponent((prevForm) => ({
        ...prevForm,
        pelanggan: {
          value: pelanggan.nama,
        },
        alamat_pelanggan: {
          value: pelanggan.alamat,
        },
        longitude: {
          value: pelanggan.longitude,
        },
        latitude: {
          value: pelanggan.latitude,
        },
      }));
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {};
    for (const key in formComponent) {
      payload[key] = formComponent[key].value;
    }

    if (payload.pelanggan === "") {
      setLoading(false);
      return HandleToast.error("Pelanggan tidak ditemukan!");
    }
    payload.tgl_pengerjaan = new Date(payload.tgl_pengerjaan).toISOString();
    payload.latitude = Number(payload.latitude);
    payload.longitude = Number(payload.longitude);
    console.log(payload);

    const formData = new FormData();
    formData.append("teknisi", payload.teknisi);
    formData.append("pelanggan", payload.pelanggan);
    formData.append("tgl_pengerjaan", payload.tgl_pengerjaan);
    formData.append("alamat_pelanggan", payload.alamat_pelanggan);
    formData.append("keterangan", payload.keterangan);
    formData.append("longitude", payload.longitude);
    formData.append("latitude", payload.latitude);
    formData.append("foto_sebelum_perbaikan", payload.foto_sebelum_perbaikan);
    formData.append("foto_sesudah_perbaikan", payload.foto_sesudah_perbaikan);
    try {
      await handleEdit(formData);
      setFormComponent(initialValues);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormComponent(initialValues);
  };

  const className = {
    input:
      "input input-bordered input-warning bg-gray-100 lg:text-base text-sm",
    select: "select select-warning bg-gray-100 lg:text-base text-sm",
    textarea: "textarea textarea-warning bg-gray-100 lg:text-base text-sm",
    label: "form-control w-full mb-4",
  };
  const {
    teknisi,
    tgl_pengerjaan,
    keterangan,
    foto_sebelum_perbaikan,
    foto_sesudah_perbaikan,
  } = formComponent;
  return (
    <DialogModal id={`modal-confirm-edit-laporan`}>
      <h3 className="lg:text-2xl px-4 pt-4 font-medium text-xl text-gray-700 text-center lg:text-start">
        Edit Laporan
      </h3>
      <form className="bg-inherit p-4" onSubmit={handleSubmit}>
        {/* pelangganId */}
        <AutoComplete
          className={className.input}
          placeholder="Cari Pelanggan..."
          label="Pelanggan :"
          getDataByQuery={getPelangganByQuery}
          setSelectedItem={handleSelectedPelanggan}
          resetSelectedItem={handleResetSelectedPelanggan}
        />
        {/* teknisi */}
        <label className={className.label}>
          <div className="label">
            <span className="label-text">{teknisi.label}</span>
          </div>
          <input
            type={teknisi.type}
            name={teknisi.name}
            value={teknisi.value}
            required
            onChange={handleChange}
            placeholder={teknisi.placeholder}
            className={className.input}
          />
        </label>
        {/* tgl_pengerjaan */}
        <div className="label">
          <span className="label-text">{tgl_pengerjaan.label}</span>
        </div>
        <label
          className={`input input-bordered input-warning bg-gray-100 lg:text-base text-sm flex items-center gap-2 mb-4`}
        >
          <input
            type={tgl_pengerjaan.type}
            name={tgl_pengerjaan.name}
            value={tgl_pengerjaan.value}
            required
            onChange={handleChange}
            placeholder={tgl_pengerjaan.placeholder}
            className={`grow`}
          />
        </label>
        {/* keterangan */}
        <label className={className.label}>
          <div className="label">
            <span className="label-text">{keterangan.label}</span>
          </div>
          <textarea
            className={className.textarea}
            name={keterangan.name}
            value={keterangan.value}
            required
            onChange={handleChange}
            placeholder={keterangan.placeholder}
          ></textarea>
        </label>
        <div className="label">
          <span className="label-text">Upload Foto Perbaikan: </span>
        </div>
        <div className="flex items-center justify-center lg:flex-row flex-col gap-3">
          <div className="indicator">
            <span className="indicator-item badge badge-secondary"></span>
            <label
              htmlFor={foto_sebelum_perbaikan.name}
              className="btn btn-primary lg:text-sm text-xs text-white lg:w-fit w-full"
            >
              <IconImageUpload />
              Sebelum
            </label>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            name={foto_sebelum_perbaikan.name}
            id={foto_sebelum_perbaikan.name}
            onChange={handleChange}
          />
          <div className="indicator">
            <span className="indicator-item badge badge-secondary"></span>
            <label
              htmlFor={foto_sesudah_perbaikan.name}
              className="btn btn-primary lg:text-sm text-xs text-white lg:w-fit w-full"
            >
              <IconImageUpload />
              Sesudah
            </label>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            name={foto_sesudah_perbaikan.name}
            id={foto_sesudah_perbaikan.name}
            onChange={handleChange}
          />
        </div>

        {/* button */}
        <div className="flex lg:justify-end justify-between lg:gap-4 mt-8">
          <button
            type="button"
            className="btn btn-secondary text-white lg:text-sm text-xs"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            type="submit"
            className="btn btn-primary text-white lg:text-sm text-xs"
          >
            {loading ? (
              <span className="loading loading-bars lg:loading-md loading-sm"></span>
            ) : (
              "Simpan"
            )}
          </button>
        </div>
      </form>
    </DialogModal>
  );
}

ModalEditLaporan.propTypes = {
  item: PropTypes.object,
  handleEdit: PropTypes.func.isRequired,
};
