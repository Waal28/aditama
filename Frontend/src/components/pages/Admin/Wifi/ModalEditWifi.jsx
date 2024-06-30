import { useState, useEffect } from "react";
import DialogModal from "../../../DialogModal";
import PropTypes from "prop-types";

export default function ModalEditWifi(props) {
  const { item, handleEdit } = props;
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState([]);
  const [formComponent, setFormComponent] = useState([]);

  const handleChange = (e) => {
    const updatedFormComponent = formComponent.map((input) => {
      if (input.name === e.target.name) {
        return { ...input, value: e.target.value };
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
    try {
      await handleEdit(item.id, payload);
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
    const initialFormValues = [
      {
        label: "Nama Paket: ",
        type: "text",
        name: "nama",
        value: item.nama || "",
        placeholder: "Paket A..",
      },
      {
        label: "Paket (Mbps) : ",
        type: "number",
        name: "mbps",
        value: item.mbps || "",
        placeholder: "100",
      },
      {
        label: "Tarif/Bulan (Rp) : ",
        type: "number",
        name: "tarifPerBulan",
        value: item.tarifPerBulan || 0,
        placeholder: "1000000",
      },
    ];

    setInitialValues(initialFormValues);
    setFormComponent(initialFormValues);
  }, [item]);
  return (
    <DialogModal id={`modal-confirm-edit-wifi`}>
      <h3 className="lg:text-2xl px-4 pt-4 font-medium text-xl text-gray-700 text-center lg:text-start">
        Edit Data Wifi
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

ModalEditWifi.propTypes = {
  item: PropTypes.object.isRequired,
  handleEdit: PropTypes.func.isRequired,
};