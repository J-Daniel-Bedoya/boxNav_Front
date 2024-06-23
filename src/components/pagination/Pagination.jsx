import React from "react";
import PageNumbers from "./PageNumbers";
import usePagination from "../../hooks/pagination/usePagintaion";

const Pagination = ({ id, options }) => {
  const {
    currentPage,
    totalPages,
    handlePrevPage,
    handleNextPage,
    handlePageClick,
  } = usePagination(id, options);

  return (
    <div className="paginationSelect">
      <button
        className="paginationSelect__button"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        <i className="fa-solid fa-caret-left"></i>
      </button>
      <PageNumbers
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageClick={handlePageClick}
      />
      <button
        className="paginationSelect__button"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        <i className="fa-solid fa-caret-right"></i>
      </button>
    </div>
  );
};

export default Pagination;
