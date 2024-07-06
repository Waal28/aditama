import { useEffect, useState } from "react";
import DialogModal from "../../../DialogModal";
import PropTypes from "prop-types";
import AutoCompleteSearchPelanggan from "./AutoCompleteSearchPelanggan";
import { useAppState } from "../../../../context/AppStateContext";

export default function ModalCreateTransaksi(props) {
  const { handleCreate } = props;
  const { HandleToast, showModal } = useAppState();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    pelangganName: {
      label: "Pelanggan : ",
      type: "text",
      name: "pelangganName",
      value: "",
      placeholder: "Ismail Bin Mail",
    },
    pelangganId: {
      label: "Cari pelanggan : ",
      type: "text",
      name: "pelanggan",
      value: "",
      placeholder: "Ismail Bin Mail",
    },
    bulan: {
      label: "Pilih bulan :",
      type: "select",
      name: "bulan",
      value: "Januari",
      options: [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ],
    },
    tahun: {
      label: "Tahun : ",
      type: "number",
      name: "tahun",
      value: "",
      placeholder: "1945",
    },
  };
  const [formComponent, setFormComponent] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormComponent((prevForm) => ({
      ...prevForm,
      [name]: {
        ...prevForm[name],
        value: value,
      },
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {};
    for (const key in formComponent) {
      payload[key] = formComponent[key].value;
    }
    delete payload.pelangganName;
    console.log(payload);
    if (payload.pelangganId === "") {
      setLoading(false);
      return HandleToast.error("Pelanggan tidak ditemukan!");
    }
    try {
      await handleCreate(payload);
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

  useEffect(() => {
    handleReset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal]);

  const className = {
    input:
      "input input-bordered input-warning bg-gray-100 lg:text-base text-sm",
    select: "select select-warning bg-gray-100 lg:text-base text-sm",
    label: "form-control w-full mb-4",
  };
  const { bulan, tahun } = formComponent;
  return (
    <DialogModal id={`modal-confirm-create-transaksi`}>
      <h3 className="lg:text-2xl px-4 pt-4 font-medium text-xl text-gray-700 text-center lg:text-start">
        Tambah Tagihan
      </h3>
      <form className="bg-inherit p-4" onSubmit={handleSubmit}>
        {/* pelangganId */}
        <AutoCompleteSearchPelanggan
          setFormComponent={setFormComponent}
          formComponent={formComponent}
        />
        {/* bulan */}
        <label className={className.label}>
          <div className="label">
            <span className="label-text">{bulan.label}</span>
          </div>
          <select
            name={bulan.name}
            value={bulan.value}
            required
            onChange={handleChange}
            className={className.select}
          >
            {bulan.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
        {/* tahun */}
        <label className={className.label}>
          <div className="label">
            <span className="label-text">{tahun.label}</span>
          </div>
          <input
            type={tahun.type}
            name={tahun.name}
            value={tahun.value}
            required
            onChange={handleChange}
            placeholder={tahun.placeholder}
            className={className.input}
          />
        </label>

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

ModalCreateTransaksi.propTypes = {
  handleCreate: PropTypes.func.isRequired,
};
