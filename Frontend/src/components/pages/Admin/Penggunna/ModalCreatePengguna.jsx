import { useEffect, useState } from "react";
import DialogModal from "../../../DialogModal";
import PropTypes from "prop-types";
import { useAppState } from "../../../../context/AppStateContext";
import constants from "../../../../../constants";
import { IconViewHide, IconViewShow } from "../../../icons";

export default function ModalCreatePengguna(props) {
  const { handleCreate } = props;
  const { HandleToast, showModal } = useAppState();
  const { tipeAkses } = constants;
  const [loading, setLoading] = useState(false);
  const initialValues = [
    {
      label: "Nama : ",
      type: "text",
      name: "nama",
      value: "",
      placeholder: "Ismail Bin Mail",
    },
    {
      label: "Username : ",
      type: "text",
      name: "username",
      value: "",
      placeholder: "mailtampan69",
    },
    {
      label: "Tipe Akses : ",
      type: "select",
      name: "tipeAkses",
      value: tipeAkses[0],
    },
    {
      label: "Password : ",
      type: "password",
      name: "password",
      value: "",
      visible: true,
      placeholder: "*****",
    },
    {
      label: "Konfirmasi Password : ",
      type: "password",
      name: "confirmPassword",
      value: "",
      visible: true,
      placeholder: "*****",
    },
  ];
  const [formComponent, setFormComponent] = useState(initialValues);

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
    if (payload.password !== payload.confirmPassword) {
      setLoading(false);
      return HandleToast.error("Password dan Konfirmasi Password tidak sama!");
    }
    if (payload.password.length < 5) {
      setLoading(false);
      return HandleToast.error("Password harus lebih dari 5 karakter!");
    }
    delete payload.confirmPassword;
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

  const handleVisible = (inputName) => {
    const updatedFormComponent = formComponent.map((input) => {
      if (input.name === inputName) {
        return { ...input, visible: !input.visible };
      }
      return input;
    });
    setFormComponent(updatedFormComponent);
  };
  return (
    <DialogModal id={`modal-confirm-create-pengguna`}>
      <h3 className="lg:text-2xl px-4 pt-4 font-medium text-xl text-gray-700 text-center lg:text-start">
        Tambah Data Pengguna
      </h3>
      <form className="bg-inherit p-4" onSubmit={handleSubmit}>
        {formComponent.map((input) => {
          if (input.type === "select") {
            return (
              <label key={input.name} className="form-control w-full mb-4">
                <div className="label">
                  <span className="label-text">{input.label}</span>
                </div>
                <select
                  name={input.name}
                  value={input.value}
                  required
                  onChange={handleChange}
                  className="select select-warning capitalize bg-gray-100 lg:text-base text-sm"
                >
                  {tipeAkses.map((tipe) => (
                    <option key={tipe} value={tipe} className="capitalize">
                      {tipe}
                    </option>
                  ))}
                </select>
              </label>
            );
          } else if (input.type === "password") {
            return (
              <label key={input.name} className="form-control w-full mb-4">
                <div className="label">
                  <span className="label-text">{input.label}</span>
                </div>
                <div className="input input-bordered input-warning bg-gray-100 lg:text-base text-sm flex items-center gap-2">
                  <input
                    type={input.visible ? "password" : "text"}
                    name={input.name}
                    value={input.value}
                    required
                    onChange={handleChange}
                    placeholder={input.placeholder}
                    className="grow"
                  />
                  <div
                    className="cursor-pointer"
                    onClick={() => handleVisible(input.name)}
                  >
                    {input.visible ? <IconViewHide /> : <IconViewShow />}
                  </div>
                </div>
              </label>
            );
          } else {
            return (
              <label key={input.name} className="form-control w-full mb-4">
                <div className="label">
                  <span className="label-text">{input.label}</span>
                </div>
                <div className="input input-bordered input-warning bg-gray-100 lg:text-base text-sm flex items-center gap-2">
                  <input
                    type={input.type}
                    name={input.name}
                    value={input.value}
                    required
                    onChange={handleChange}
                    placeholder={input.placeholder}
                    className="grow"
                  />
                </div>
              </label>
            );
          }
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

ModalCreatePengguna.propTypes = {
  handleCreate: PropTypes.func.isRequired,
};
