// useBoxDetails.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBoxThunk } from "../../../store/slices/box.slice";
import { getSectorsThunk } from "../../../store/slices/sector.slice";
import axios from "axios";
import getConfig from "../../../utils/getConfig";

const api = "https://nav-boxes-lis.up.railway.app/api/v1";

export const useBoxDetails = (id) => {
  const dispatch = useDispatch();
  const box = useSelector((state) => state.box);
  const [sector, setSector] = useState("");

  useEffect(() => {
    dispatch(getBoxThunk(id));
    dispatch(getSectorsThunk());
  }, [id, dispatch]);

  useEffect(() => {
    if (box.sectorId) {
      axios.get(`${api}/sector/${box.sectorId}`, getConfig()).then((res) => {
        setSector(res.data);
      });
    }
  }, [box]);

  return { box, sector };
};
