import React from "react";
import { useSelector } from "react-redux";

const Pagination = () => {
  const town = useSelector((state) => state.town);

  const townPagination = town.boxes?.length;

  return (
    <div className="pagination__buttons">
      <button>
        <i className="fa-solid fa-caret-left"></i>
      </button>
      <div>
        {/* {numbers.map((i) => (
          <button className="button-list" key={i}>
            {i}
          </button>
        ))} */}
      </div>
      <button>
        <i className="fa-solid fa-caret-right"></i>
      </button>
    </div>
  );
};

export default Pagination;
