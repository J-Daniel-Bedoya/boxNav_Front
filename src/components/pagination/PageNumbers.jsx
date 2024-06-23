import React from "react";

const PageNumbers = ({ totalPages, currentPage, handlePageClick }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={
              currentPage === i
                ? "paginationSelect__button paginationSelect__button--active"
                : "paginationSelect__button"
            }
          >
            {i}
          </button>
        );
      }
    } else {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => handlePageClick(1)}
          className={
            currentPage === 1
              ? "paginationSelect__button paginationSelect__button--active"
              : "paginationSelect__button"
          }
        >
          1
        </button>
      );

      if (currentPage > 2) {
        pageNumbers.push(
          <span key="dots1" className="paginationSelect__dots">
            ...
          </span>
        );
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={
              currentPage === i
                ? "paginationSelect__button paginationSelect__button--active"
                : "paginationSelect__button"
            }
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - 1) {
        pageNumbers.push(
          <span key="dots2" className="paginationSelect__dots">
            ...
          </span>
        );
      }

      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handlePageClick(totalPages)}
          className={
            currentPage === totalPages
              ? "paginationSelect__button paginationSelect__button--active"
              : "paginationSelect__button"
          }
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return <div className="paginationSelect__numbers">{renderPageNumbers()}</div>;
};

export default PageNumbers;
