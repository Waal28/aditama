import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAppState } from "../context/AppStateContext";

const AutoComplete = ({
  getDataByQuery,
  setSelectedItem,
  resetSelectedItem,
  className,
  placeholder,
  label,
  labelList,
  defaultValue = "",
  value,
  setValue,
}) => {
  const { showModal } = useAppState();
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
    setValue(item[labelList]);
    setResults([]);
  };
  useEffect(() => {
    setValue(defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal]);
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
              {item[labelList]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

AutoComplete.propTypes = {
  getDataByQuery: PropTypes.func.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
  resetSelectedItem: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  labelList: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default AutoComplete;
