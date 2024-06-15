import PropTypes from "prop-types";
import React from "react";

export default function PageTableTemplate(props) {
  const {
    getData,
    getDataByQuery,
    data,
    colSpan,
    Thead,
    Tbody,
    placeholderSearch,
    handleClickCreate,
    sortByLatest,
    sortByOldest,
    sortByAZ,
    sortByZA,
  } = props;
  const [query, setQuery] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  async function fetchData() {
    setLoading(true);
    try {
      await getData();
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }
  async function fetchDataByQuery(query) {
    setLoading(true);
    try {
      await getDataByQuery(query);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  }
  async function fetchDataBySortLatest() {
    setLoading(true);
    try {
      await sortByLatest();
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  }
  async function fetchDataBySortOldest() {
    setLoading(true);
    try {
      await sortByOldest();
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  }
  async function fetchDataBySortAZ() {
    setLoading(true);
    try {
      await sortByAZ();
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  }
  async function fetchDataBySortZA() {
    setLoading(true);
    try {
      await sortByZA();
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  }
  React.useEffect(() => {
    const fetchResult = async () => {
      if (query.length > 0) {
        fetchDataByQuery(query);
      } else {
        fetchData();
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchResult();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
  return (
    <main>
      <div className="mb-3 lg:flex items-center justify-between grid grid-cols-1">
        <section className="flex lg:justify-start justify-end gap-2 w-full">
          <div
            className="tooltip w-fit lg:tooltip-top tooltip-left lg:z-30"
            data-tip="Tambah Data"
          >
            <button
              className="btn lg:btn-md btn-sm btn-ghost btn-circle bg-gray-300 my-2"
              onClick={handleClickCreate}
            >
              <img
                src="https://api.iconify.design/material-symbols:add-rounded.svg"
                alt="..."
                className="lg:w-6 w-4"
              />
            </button>
          </div>
          <div className="dropdown lg:dropdown-right dropdown-left">
            <div
              className="tooltip w-fit lg:tooltip-top tooltip-left lg:z-30"
              data-tip="Sorting Data"
            >
              <button
                tabIndex={0}
                className="btn lg:btn-md btn-sm btn-ghost btn-circle bg-gray-300 my-2"
              >
                <img
                  src="https://api.iconify.design/material-symbols:sort.svg"
                  alt="..."
                  className="lg:w-6 w-4"
                />
              </button>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[31] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <button onClick={fetchDataBySortLatest}>
                  Terbaru - Terlama
                </button>
              </li>
              <li>
                <button onClick={fetchDataBySortOldest}>
                  Terlama - Terbaru
                </button>
              </li>
              <li>
                <button onClick={fetchDataBySortAZ}>A - Z</button>
              </li>
              <li>
                <button onClick={fetchDataBySortZA}>Z - A</button>
              </li>
            </ul>
          </div>
        </section>
        <SearchBar setQuery={setQuery} placeholderSearch={placeholderSearch} />
      </div>
      <div className="overflow-x-auto max-h-80">
        <table className="table table-md table-pin-rows ">
          <thead>
            <Thead />
          </thead>
          <tbody>
            {loading ? (
              <tr className="border-b border-secondary">
                <td colSpan={colSpan} className="text-center text-yellow-300">
                  <span className="loading loading-dots loading-lg"></span>
                </td>
              </tr>
            ) : data.length < 1 ? (
              <tr className="border-b border-secondary">
                <td
                  colSpan={colSpan}
                  className="text-center text-lg font-semibold text-gray-700"
                >
                  Data Kosong
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <Tbody key={item.id} item={item} index={index} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
PageTableTemplate.propTypes = {
  getData: PropTypes.func,
  getDataByQuery: PropTypes.func,
  data: PropTypes.array,
  colSpan: PropTypes.number,
  Thead: PropTypes.elementType,
  Tbody: PropTypes.elementType,
  placeholderSearch: PropTypes.string,
  handleClickCreate: PropTypes.func,
  sortByLatest: PropTypes.func,
  sortByOldest: PropTypes.func,
  sortByAZ: PropTypes.func,
  sortByZA: PropTypes.func,
};

function SearchBar({ setQuery, placeholderSearch }) {
  return (
    <label className="lg:w-[50%] lg:ml-auto input input-bordered lg:input-md input-sm flex items-center gap-2 bg-header_footer">
      <input
        type="text"
        className="grow"
        placeholder={placeholderSearch}
        onChange={(e) => setQuery(e.target.value)}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="w-5 opacity-70"
      >
        <path
          fillRule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clipRule="evenodd"
        />
      </svg>
    </label>
  );
}
SearchBar.propTypes = {
  setQuery: PropTypes.func.isRequired,
  placeholderSearch: PropTypes.string,
};
