import { useState } from "react";
import PropTypes from "prop-types";

const TagsInput = ({
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
  const [tags, setTags] = useState([]);

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
    setResults([]);
    const findTag = tags.length > 0 && tags.find((t) => t.id === item.id);
    if (!findTag) {
      setTags([...tags, item]);
    }
  };
  const removeTag = (id) => {
    setTags(tags.filter((t) => t.id !== id));
  };
  return (
    <div className="relative">
      {tags.length > 0 &&
        tags.map((tag) => (
          <Tag
            key={tag.id}
            title={tag.nama}
            id={tag.id}
            removeTag={removeTag}
          />
        ))}
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

TagsInput.propTypes = {
  getDataByQuery: PropTypes.func,
  setSelectedItem: PropTypes.func,
  resetSelectedItem: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func,
};

export default TagsInput;

function Tag({ title, id, removeTag }) {
  return (
    <div className="badge badge-success gap-2 text-white m-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block h-3 w-3 stroke-current cursor-pointer"
        onClick={() => removeTag(id)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
      {title}
    </div>
  );
}
Tag.propTypes = {
  title: PropTypes.string,
  id: PropTypes.number,
  removeTag: PropTypes.func,
};
