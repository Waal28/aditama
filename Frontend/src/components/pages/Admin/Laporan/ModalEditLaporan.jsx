import { useEffect, useState } from "react";
import DialogModal from "../../../DialogModal";
import PropTypes from "prop-types";
import { useAppState } from "../../../../context/AppStateContext";
import PelangganApi from "../../../../api/src/pelanggan";
import AutoComplete from "../../../AutoComplete";
import { IconsUpload } from "../../../icons";
import TagsInput from "../../../TagsInput";
import PenggunaApi from "../../../../api/src/pengguna";
import { formatDate } from "../../../../utils/format";

export default function ModalEditLaporan(props) {
  const { item, handleEdit } = props;
  const { HandleToast, showModal } = useAppState();
  const { getPelangganById, getPelangganByQuery } = PelangganApi();
  const { getPenggunaByQuery } = PenggunaApi();
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState([]);
  const [input, setInput] = useState({
    pelanggan: "",
    teknisi: "",
  });
  const [formComponent, setFormComponent] = useState({
    teknisi: {
      label: "Teknisi : ",
      type: "text",
      name: "teknisi",
      value: [],
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
      value: new Date(),
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
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (
      name === "foto_sebelum_perbaikan" ||
      name === "foto_sesudah_perbaikan"
    ) {
      if (files[0].size > 3 * 1024 * 1024) {
        HandleToast.error("Ukuran gambar tidak boleh lebih dari 3MB");
        return;
      }
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
  const handleSelectedTeknisi = async (items) => {
    const newItems = items.map((item) => ({ id: item.id, nama: item.nama }));
    setFormComponent((prevForm) => ({
      ...prevForm,
      teknisi: {
        value: newItems,
      },
    }));
  };
  const getTeknisiByQuery = async (query) => {
    const res = await getPenggunaByQuery(query);
    const teknisi = res.data.filter((user) => user.tipeAkses === "teknisi");
    return { data: teknisi };
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

    if (payload.teknisi.length === 0) {
      setLoading(false);
      return HandleToast.error("Teknisi tidak ditemukan!");
    }

    payload.tgl_pengerjaan = new Date(payload.tgl_pengerjaan).toISOString();
    payload.latitude = Number(payload.latitude);
    payload.longitude = Number(payload.longitude);

    const formData = new FormData();
    formData.append("teknisi", JSON.stringify(payload.teknisi));
    formData.append("pelanggan", payload.pelanggan);
    formData.append("tgl_pengerjaan", payload.tgl_pengerjaan);
    formData.append("alamat_pelanggan", payload.alamat_pelanggan);
    formData.append("keterangan", payload.keterangan);
    formData.append("longitude", payload.longitude);
    formData.append("latitude", payload.latitude);
    formData.append("foto_sebelum_perbaikan", payload.foto_sebelum_perbaikan);
    formData.append("foto_sesudah_perbaikan", payload.foto_sesudah_perbaikan);
    try {
      await handleEdit(item.id, formData);
      setFormComponent(initialValues);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormComponent(initialValues);
    setInput({
      pelanggan: "",
      teknisi: "",
    });
  };

  const handleResetFile = (name) => {
    setFormComponent((prevForm) => ({
      ...prevForm,
      [name]: {
        ...prevForm[name],
        value: "",
      },
    }));
  };

  useEffect(() => {
    const initialFormValues = {
      teknisi: {
        label: "Teknisi : ",
        type: "text",
        name: "teknisi",
        value: item.teknisi || [],
        placeholder: "Samsul Bin Samsu",
      },
      pelanggan: {
        label: "Pelanggan : ",
        type: "text",
        name: "pelanggan",
        value: item.pelanggan || "",
        placeholder: "Ismail Bin Mail",
      },
      tgl_pengerjaan: {
        label: "Tanggal Pengerjaan : ",
        type: "date",
        name: "tgl_pengerjaan",
        value: item.tgl_pengerjaan || new Date(),
        placeholder: "dd-mm-yyyy",
      },
      alamat_pelanggan: {
        label: "Alamat Pelanggan : ",
        type: "text",
        name: "alamat_pelanggan",
        value: item.alamat_pelanggan || "",
        placeholder: "",
      },
      longitude: {
        label: "Longitude : ",
        type: "text",
        name: "longitude",
        value: item.longitude || "",
        placeholder: "",
      },
      latitude: {
        label: "Latitude : ",
        type: "text",
        name: "latitude",
        value: item.latitude || "",
        placeholder: "",
      },
      keterangan: {
        label: "Ket. Gangguan : ",
        type: "text",
        name: "keterangan",
        value: item.keterangan || "",
        placeholder: "Wifi tidak terhubung",
      },
      foto_sebelum_perbaikan: {
        label: "Foto Sebelum Perbaikan : ",
        type: "text",
        name: "foto_sebelum_perbaikan",
        value: item.foto_sebelum_perbaikan || "",
        placeholder: "",
      },
      foto_sesudah_perbaikan: {
        label: "Foto Sesudah Perbaikan : ",
        type: "text",
        name: "foto_sesudah_perbaikan",
        value: item.foto_sesudah_perbaikan || "",
        placeholder: "",
      },
    };

    setInitialValues(initialFormValues);
    setFormComponent(initialFormValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, showModal]);

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
        {/* pelanggan */}
        <AutoComplete
          className={className.input}
          placeholder="Cari Pelanggan..."
          label="Pelanggan :"
          labelList="nama"
          value={input.pelanggan}
          setValue={(value) => setInput({ ...input, pelanggan: value })}
          getDataByQuery={getPelangganByQuery}
          setSelectedItem={handleSelectedPelanggan}
          resetSelectedItem={handleResetSelectedPelanggan}
          defaultValue={item.pelanggan}
        />
        <TagsInput
          className={className.input}
          placeholder="Cari Teknisi..."
          label="Teknisi :"
          labelList="nama"
          value={input.teknisi}
          setValue={(value) => setInput({ ...input, teknisi: value })}
          getDataByQuery={getTeknisiByQuery}
          setSelectedItem={handleSelectedTeknisi}
          defaultTags={teknisi.value}
        />
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
            value={formatDate(tgl_pengerjaan.value)}
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
        <div className="flex items-center justify-start lg:flex-row flex-col gap-3">
          <div className="indicator lg:w-fit w-full">
            <span
              onClick={() => handleResetFile(foto_sebelum_perbaikan.name)}
              className={
                foto_sebelum_perbaikan.value !== ""
                  ? "indicator-item badge badge-secondary text-white cursor-pointer"
                  : ""
              }
            >
              {foto_sebelum_perbaikan.value !== "" ? "x" : ""}
            </span>
            <label
              htmlFor={foto_sebelum_perbaikan.name + "-edit"}
              className="btn btn-primary lg:text-sm text-xs text-white lg:w-fit w-full"
            >
              <IconsUpload />
              Sebelum
            </label>
          </div>
          <input
            type="file"
            className="hidden"
            accept=".jpg,.jpeg,.png"
            name={foto_sebelum_perbaikan.name}
            id={foto_sebelum_perbaikan.name + "-edit"}
            onChange={handleChange}
          />
          <div className="indicator lg:w-fit w-full">
            <span
              onClick={() => handleResetFile(foto_sesudah_perbaikan.name)}
              className={
                foto_sesudah_perbaikan.value !== ""
                  ? "indicator-item badge badge-secondary text-white cursor-pointer"
                  : ""
              }
            >
              {foto_sesudah_perbaikan.value !== "" ? "x" : ""}
            </span>
            <label
              htmlFor={foto_sesudah_perbaikan.name + "-edit"}
              className="btn btn-primary lg:text-sm text-xs text-white lg:w-fit w-full"
            >
              <IconsUpload />
              Sesudah
            </label>
          </div>
          <input
            type="file"
            className="hidden"
            accept=".jpg,.jpeg,.png"
            name={foto_sesudah_perbaikan.name}
            id={foto_sesudah_perbaikan.name + "-edit"}
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
  item: PropTypes.object.isRequired,
  handleEdit: PropTypes.func.isRequired,
};
