import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAppState } from "../context/AppStateContext";

const TagsInput = ({
  getDataByQuery,
  setSelectedItem,
  className,
  placeholder,
  label,
  labelList,
  defaultTags = [],
  value,
  setValue,
}) => {
  const { showModal } = useAppState();
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
    if (query.length > 0) {
      await handleGetDataByQuery(query);
    } else {
      setResults([]);
    }
  };

  const handleSelectItem = (item) => {
    setResults([]);
    setValue("");
    const findTag = tags.length > 0 && tags.find((t) => t.id === item.id);
    if (!findTag) {
      setTags([...tags, item]);
      setSelectedItem([...tags, item]);
    }
  };
  const removeTag = (id) => {
    const newTags = tags.filter((t) => t.id !== id);
    setTags(newTags);
    setSelectedItem(newTags);
  };

  useEffect(() => {
    setTags(defaultTags);
    setValue("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal]);
  return (
    <div className="relative">
      {tags.length > 0 &&
        tags.map((tag, index) => (
          <Tag
            key={index}
            title={tag[labelList]}
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

TagsInput.propTypes = {
  getDataByQuery: PropTypes.func.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  labelList: PropTypes.string.isRequired,
  defaultTags: PropTypes.array,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
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
