import { useEffect, useState } from "react";
import DialogModal from "../../../DialogModal";
import PropTypes from "prop-types";
import { useAppState } from "../../../../context/AppStateContext";
import { IonTrash } from "../../../icons";

export default function ModalCreateWifi(props) {
  const { handleCreate } = props;
  const { showModal } = useAppState();
  const [loading, setLoading] = useState(false);
  const [diskon, setDiskon] = useState(0);
  const [hargaDicoret, setHargaDicoret] = useState(0);
  const [fiturs, setFiturs] = useState([""]);
  const initialValues = [
    {
      label: "Nama Paket: ",
      type: "text",
      name: "nama",
      value: "",
      placeholder: "Paket A..",
    },
    {
      label: "Paket (Mbps) : ",
      type: "number",
      name: "mbps",
      value: "",
      placeholder: "100",
    },
    {
      label: "Tarif/Bulan (Rp) : ",
      type: "number",
      name: "tarifPerBulan",
      value: "",
      placeholder: "1000000",
    },
  ];
  const [formComponent, setFormComponent] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormComponent = formComponent.map((input) => {
      if (input.name === name) {
        if (input.name === "tarifPerBulan") {
          if (Number(value) < 0) {
            return { ...input, value: 0 };
          }
          const newHargaDicoret = Number(value) / (1 - Number(diskon) / 100);
          setHargaDicoret(Math.round(newHargaDicoret));
        }
        return { ...input, value };
      }
      return input;
    });

    setFormComponent(updatedFormComponent);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = formComponent.reduce((acc, input) => {
      acc[input.name] = input.value;
      return acc;
    }, {});
    payload.diskon = Number(diskon);
    payload.fitur = fiturs;
    // payload.fitur = [
    //   "Internet UNLIMITED",
    //   "Ideal untuk 1 - 3 perangkat",
    //   "Gratis instalasi",
    // ];
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
    setDiskon(0);
    setHargaDicoret(0);
    setFiturs([""]);
  };
  const handleDiskon = (e) => {
    const diskonValue = Number(e.target.value);
    const tarifPerBulan = formComponent[2].value;
    if (diskonValue >= 0 && diskonValue <= 100) {
      if (diskonValue === 100) {
        setHargaDicoret(0);
      } else {
        const newHargaDicoret = tarifPerBulan / (1 - diskonValue / 100);
        setHargaDicoret(Math.round(newHargaDicoret));
      }
      setDiskon(e.target.value);
    }
  };
  const handleFiturChange = (e, index) => {
    const { value } = e.target;
    const updatedFiturs = [...fiturs];
    updatedFiturs[index] = value;
    setFiturs(updatedFiturs);
  };
  const handleAddFitur = () => {
    setFiturs([...fiturs, ""]);
  };

  const handleRemoveFitur = (index) => {
    const updatedFiturs = [...fiturs];
    if (updatedFiturs.length === 1) {
      setFiturs([""]);
      return;
    }
    updatedFiturs.splice(index, 1);
    setFiturs(updatedFiturs);
  };
  useEffect(() => {
    handleReset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal]);

  return (
    <DialogModal id={`modal-confirm-create-wifi`}>
      <h3 className="lg:text-2xl px-4 pt-4 font-medium text-xl text-gray-700 text-center lg:text-start">
        Tambah Data Wifi
      </h3>
      <form className="bg-inherit p-4" onSubmit={handleSubmit}>
        {formComponent.map((input) => {
          return input.type === "select" ? (
            <label key={input.name} className="form-control w-full mb-4">
              <div className="label">
                <span className="label-text">{input.label}</span>
              </div>
              <select
                name={input.name}
                value={input.value}
                required
                onChange={handleChange}
                className="select select-warning bg-gray-100 lg:text-base text-sm"
              >
                {input.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <label key={input.name} className="form-control w-full mb-4">
              <div className="label">
                <span className="label-text">{input.label}</span>
              </div>
              <div className="input input-bordered input-warning bg-gray-100 lg:text-base text-sm flex items-center gap-2">
                {input.name === "tarifPerBulan" ? "Rp. " : null}
                <input
                  type={input.type}
                  name={input.name}
                  value={input.value}
                  required
                  onChange={handleChange}
                  placeholder={input.placeholder}
                  className="grow"
                />
                {input.name === "mbps" ? "Mbps" : null}
              </div>
            </label>
          );
        })}
        <div className="w-full grid grid-cols-6 gap-3 mb-4">
          <label className="form-control w-full mb-4 col-span-2">
            <div className="label">
              <span className="label-text">Diskon %</span>
            </div>
            <input
              type="number"
              name="diskon"
              value={diskon}
              required
              onChange={handleDiskon}
              className="input input-bordered input-warning bg-gray-100 lg:text-base text-sm"
            />
          </label>
          <label className="form-control w-full mb-4 col-span-4">
            <div className="label">
              <span className="label-text">Harga Yang Dicoret</span>
            </div>
            <div className="input input-bordered input-warning bg-gray-100 lg:text-base text-sm flex items-center gap-2">
              Rp.
              <input
                type="number"
                name="hargaDicoret"
                value={hargaDicoret}
                required
                readOnly
                className="grow line-through"
              />
            </div>
          </label>
        </div>
        <div className="mb-4">
          <span className="label-text me-2">Fitur Wifi</span>
          <span className="btn btn-warning btn-xs" onClick={handleAddFitur}>
            +
          </span>
        </div>
        {fiturs.map((fitur, index) => (
          <label key={index} className="form-control w-full mb-4 col-span-4">
            <div className="input input-bordered input-warning bg-gray-100 lg:text-base text-sm flex items-center gap-2">
              <input
                type="text"
                name={"fitur-" + index + 1}
                value={fitur}
                required
                onChange={(e) => handleFiturChange(e, index)}
                placeholder={"Masukkan fitur ke " + (index + 1)}
                className="grow"
              />
              <span
                className="btn btn-ghost"
                onClick={() => handleRemoveFitur(index)}
              >
                <IonTrash />
              </span>
            </div>
          </label>
        ))}
        <div className="flex lg:justify-end justify-between lg:gap-4 mt-5">
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

ModalCreateWifi.propTypes = {
  handleCreate: PropTypes.func.isRequired,
};
