import { useState } from "react";
import PropTypes from "prop-types";
import PelangganApi from "../../../../api/src/pelanggan";

const AutoCompleteSearchPelanggan = ({ setFormComponent, formComponent }) => {
  const [results, setResults] = useState([]);
  const { getPelangganByQuery } = PelangganApi();

  async function handleGetDataPelangganByQuery(query) {
    try {
      const response = await getPelangganByQuery(query);
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }

  const handleSearchChange = async (event) => {
    const query = event.target.value;
    setFormComponent((prevForm) => ({
      ...prevForm,
      pelangganId: {
        ...prevForm.pelangganId,
        value: "",
      },
    }));
    setFormComponent((prevForm) => ({
      ...prevForm,
      pelangganName: {
        ...prevForm.pelangganName,
        value: query,
      },
    }));
    if (query.length > 0) {
      // Panggil API jika query lebih dari 2 karakter
      await handleGetDataPelangganByQuery(query);
    } else {
      setResults([]);
    }
  };

  const handleSelectItem = (item) => {
    setFormComponent((prevForm) => ({
      ...prevForm,
      pelangganId: {
        ...prevForm.pelangganId,
        value: Number(item.id),
      },
    }));
    setFormComponent((prevForm) => ({
      ...prevForm,
      pelangganName: {
        ...prevForm.pelangganName,
        value: item.nama,
      },
    }));
    setResults([]); // Sembunyikan dropdown setelah memilih item
  };

  return (
    <div className="relative">
      <label className="form-control w-full mb-4">
        <div className="label">
          <span className="label-text">Pelanggan:</span>
        </div>
        <input
          type="text"
          value={formComponent.pelangganName.value}
          onChange={handleSearchChange}
          required
          placeholder="Cari pelanggan..."
          className="input input-bordered input-warning bg-gray-100 lg:text-base text-sm w-full"
        />
      </label>

      {results.length > 0 && (
        <ul className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {results.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelectItem(item)}
              className="cursor-pointer py-2 px-4 hover:bg-blue-50"
            >
              {item.nama}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

AutoCompleteSearchPelanggan.propTypes = {
  setFormComponent: PropTypes.func,
  formComponent: PropTypes.object,
};

export default AutoCompleteSearchPelanggan;
