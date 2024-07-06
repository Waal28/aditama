import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 10; // Tentukan jumlah item per halaman

const PaginationComponent = ({ data }) => {
  const [datas, setDatas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const totalItems = data.length;
    setDatas(data);
    setTotalPages(Math.ceil(totalItems / ITEMS_PER_PAGE));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fungsi untuk mengganti halaman
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Fungsi untuk merender tombol pagination
  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === currentPage) {
        buttons.push(
          <button
            key={i}
            className="join-item btn btn-xs btn-active"
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      } else {
        buttons.push(
          <button
            key={i}
            className="join-item btn btn-xs"
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }
    }
    return buttons;
  };

  // Fungsi untuk mendapatkan data yang ditampilkan di halaman saat ini
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return datas.slice(startIndex, endIndex);
  };

  return (
    <div>
      <div className="data-container">
        {getCurrentPageData().map((item, index) => (
          <div key={index} className="data-item">
            {/* Render data Anda di sini */}
            {item.name}
          </div>
        ))}
      </div>
      <div className="join">{renderPaginationButtons()}</div>
    </div>
  );
};

PaginationComponent.propTypes = {
  data: PropTypes.array.isRequired,
};

export default PaginationComponent;
