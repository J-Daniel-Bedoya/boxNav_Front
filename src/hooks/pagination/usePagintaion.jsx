import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import getConfig from "../../utils/getConfig";
import { getTownPaginationThunk } from "../../store/slices/town.slice";

const api = "https://nav-boxes-lis.up.railway.app/api/v1";

const usePagination = (id, options, itemsPerPage = 10) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchTownData = async () => {
    try {
      const response = await axios.get(`${api}/town/${id}`, getConfig());
      const { boxes, users, sectors } = response.data;

      if (options === "box") {
        setTotalPages(Math.ceil(boxes.length / itemsPerPage));
      } else if (options === "user") {
        setTotalPages(Math.ceil(users.length / itemsPerPage));
      } else if (options === "sector") {
        setTotalPages(Math.ceil(sectors.length / itemsPerPage));
      }
    } catch (error) {
      console.error("Error fetching town data:", error);
    }
  };

  useEffect(() => {
    fetchTownData();
  }, [id, options]);

  useEffect(() => {
    const offset = (currentPage - 1) * itemsPerPage;
    dispatch(getTownPaginationThunk(id, offset, itemsPerPage));
  }, [currentPage, id, dispatch, itemsPerPage]);

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

  return {
    currentPage,
    totalPages,
    handlePrevPage,
    handleNextPage,
    handlePageClick,
  };
};

export default usePagination;
