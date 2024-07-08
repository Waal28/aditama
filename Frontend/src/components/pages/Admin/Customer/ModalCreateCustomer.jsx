import { useEffect, useState } from "react";
import WifiApi from "../../../../api/src/wifi";
import DialogModal from "../../../DialogModal";
import PropTypes from "prop-types";
import MapsPicker from "./MapsPicker";
import { IconAddLocation, IconViewHide } from "../../../icons";
import { useAppState } from "../../../../context/AppStateContext";

export default function ModalCreateCustomer(props) {
  const { handleCreate } = props;
  const { showModal, HandleToast } = useAppState();
  const { getAllWifi } = WifiApi();
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [latLong, setLatLong] = useState("");
  const [formComponent, setFormComponent] = useState(null);

  const handleLocationSelected = (loc) => {
    setLatLong(loc.lat + "," + loc.lng);
    setFormComponent((prevForm) => ({
      ...prevForm,
      latitude: {
        ...prevForm.latitude,
        value: loc.lat,
      },
      longitude: {
        ...prevForm.longitude,
        value: loc.lng,
      },
    }));

    setShowMap(false); // hide map after selecting location
  };

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
  const handleGetAllWifi = async () => {
    const res = await getAllWifi();
    const wifi = res.data.map((item) => item.nama);

    const initialValues = {
      nama: {
        label: "Nama : ",
        type: "text",
        name: "nama",
        value: "",
        placeholder: "Nama bin nama",
      },
      email: {
        label: "Email : ",
        type: "email",
        name: "email",
        value: "",
        placeholder: "contoh@gmail.com",
      },
      alamat: {
        label: "Alamat : ",
        type: "text",
        name: "alamat",
        value: "",
        placeholder: "Alamat",
      },
      no_hp: {
        label: "No Hp : ",
        type: "text",
        name: "no_hp",
        value: "",
        placeholder: "No Hp",
      },
      paketWifi: {
        label: "Paket :",
        type: "select",
        name: "paketWifi",
        value: wifi ? wifi[0] : "",
        options: wifi ? wifi : [],
      },
      latitude: {
        type: "text",
        name: "latitude",
        value: "",
        readOnly: true,
        placeholder: "Latitude",
      },
      longitude: {
        type: "text",
        name: "longitude",
        value: "",
        readOnly: true,
        placeholder: "Longitude",
      },
    };
    setLatLong("");
    setFormComponent(initialValues);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {};
    for (const key in formComponent) {
      payload[key] = formComponent[key].value;
    }
    if (payload.latitude === "" || payload.longitude === "") {
      setLoading(false);
      return HandleToast.error("Lokasi harus dipilih!");
    }
    payload.latitude = parseFloat(payload.latitude);
    payload.longitude = parseFloat(payload.longitude);
    try {
      await handleCreate(payload);
      handleGetAllWifi();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleReset = () => {
    handleGetAllWifi();
  };

  const handleCombinedLocation = (e) => {
    const value = e.target.value;
    setLatLong(value);
    const [lat, lon] = value.split(",").map((coord) => coord.trim());
    setFormComponent((prevForm) => ({
      ...prevForm,
      latitude: {
        ...prevForm.latitude,
        value: lat,
      },
      longitude: {
        ...prevForm.longitude,
        value: lon,
      },
    }));
  };

  useEffect(() => {
    handleGetAllWifi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  const { nama, email, alamat, no_hp, paketWifi } = formComponent || {};
  return (
    <DialogModal id={`modal-confirm-create-pelanggan`}>
      <h3 className="lg:text-2xl px-4 pt-4 font-medium text-xl text-gray-700 text-center lg:text-start">
        Tambah Pelanggan
      </h3>
      <form className="bg-inherit p-4" onSubmit={handleSubmit}>
        {formComponent && (
          <>
            {/* nama */}
            <label className={className.label}>
              <div className="label">
                <span className="label-text">{nama.label}</span>
              </div>
              <input
                type={nama.type}
                name={nama.name}
                value={nama.value}
                required
                onChange={handleChange}
                placeholder={nama.placeholder}
                className={className.input}
              />
            </label>
            {/* email */}
            <label className={className.label}>
              <div className="label">
                <span className="label-text">{email.label}</span>
              </div>
              <input
                type={email.type}
                name={email.name}
                value={email.value}
                required
                onChange={handleChange}
                placeholder={email.placeholder}
                className={className.input}
              />
            </label>
            {/* alamat */}
            <label className={className.label}>
              <div className="label">
                <span className="label-text">{alamat.label}</span>
              </div>
              <input
                type={alamat.type}
                name={alamat.name}
                value={alamat.value}
                required
                onChange={handleChange}
                placeholder={alamat.placeholder}
                className={className.input}
              />
            </label>
            {/* no_hp */}
            <label className={className.label}>
              <div className="label">
                <span className="label-text">{no_hp.label}</span>
              </div>
              <input
                type={no_hp.type}
                name={no_hp.name}
                value={no_hp.value}
                required
                onChange={handleChange}
                placeholder={no_hp.placeholder}
                className={className.input}
              />
            </label>
            {/* paket */}
            <label className={className.label}>
              <div className="label">
                <span className="label-text">{paketWifi.label}</span>
              </div>
              <select
                name={paketWifi.name}
                value={paketWifi.value}
                required
                onChange={handleChange}
                className={className.select}
              >
                {paketWifi.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            {/* lokasi */}
            <label className={className.label}>
              <div className="label">
                <span className="label-text">Lokasi (pisah dengan koma) :</span>
              </div>
              <div className="grid grid-cols-3 gap-4 items-center">
                <input
                  type="text"
                  value={latLong}
                  required
                  onChange={handleCombinedLocation}
                  placeholder="latitude, longitude"
                  className={`${className.input} col-span-2`}
                />
                <button
                  type="button"
                  onClick={() => setShowMap(!showMap)}
                  className="btn btn-sm w-fit btn-primary text-white lg:text-sm text-xs"
                >
                  {showMap ? (
                    <>
                      <IconViewHide />
                      Hide Map
                    </>
                  ) : (
                    <>
                      <IconAddLocation />
                      Show Map
                    </>
                  )}
                </button>
              </div>
              <div className="my-4">
                {showMap && (
                  <MapsPicker onLocationSelected={handleLocationSelected} />
                )}
              </div>
            </label>
          </>
        )}

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

ModalCreateCustomer.propTypes = {
  handleCreate: PropTypes.func.isRequired,
};
