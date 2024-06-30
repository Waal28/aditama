import { useState } from "react";
import PropTypes from "prop-types";

const AutoComplete = ({
  getDataByQuery,
  setSelectedItem,
  resetSelectedItem,
  className,
  placeholder,
  label,
  value,
  setValue,
}) => {
  const [results, setResults] = useState([]);

  async function handleGetDataByQuery(query) {
    try {
      const response = await getDataByQuery(query);
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }

  const handleSearchChange = async (event) => {
    const query = event.target.value;
    setValue(query);
    resetSelectedItem();
    if (query.length > 0) {
      await handleGetDataByQuery(query);
    } else {
      setResults([]);
    }
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setValue(item.nama);
    setResults([]);
  };

  return (
    <div className="relative">
      <label className="form-control w-full mb-4">
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
        <input
          type="text"
          value={value}
          onChange={handleSearchChange}
          required
          placeholder={placeholder}
          className={className}
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

AutoComplete.propTypes = {
  getDataByQuery: PropTypes.func,
  setSelectedItem: PropTypes.func,
  resetSelectedItem: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func,
};

export default AutoComplete;
