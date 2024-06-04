import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import getConfig from "../../utils/getConfig";
import { getTownThunk } from "../../store/slices/town.slice";
import PageNumbers from "./PageNumbers";

const Pagination = ({ id, options }) => {
  const api = "https://nav-boxes-lis.up.railway.app/api/v1";
  const [townBoxes, setTownBoxes] = useState([]);
  const [townUsers, setTownUsers] = useState([]);
  const [townSectors, setTownSectors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const dispatch = useDispatch();
  const itemsPerPage = 10;

  useEffect(() => {
    axios.get(`${api}/town/${id}`, getConfig()).then((res) => {
      setTownBoxes(res.data.boxes);
      setTownUsers(res.data.users);
      setTownSectors(res.data.sectors);
    });
  }, [id]);

  useEffect(() => {
    const adjustedOffset =
      currentPage === 1 ? 0 : (currentPage - 1) * itemsPerPage;
    dispatch(getTownThunk(id, adjustedOffset));
  }, [currentPage, id, dispatch]);

  useEffect(() => {
    if (options === "box") {
      setTotalPages(Math.ceil(townBoxes.length / itemsPerPage));
    } else if (options === "user") {
      setTotalPages(Math.ceil(townUsers.length / itemsPerPage));
    } else if (options === "sector") {
      setTotalPages(Math.ceil(townSectors.length / itemsPerPage));
    }
  }, [options, townBoxes, townUsers, townSectors]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
