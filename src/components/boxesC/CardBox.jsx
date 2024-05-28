import React, { useEffect, useState } from "react";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import { useDispatch } from "react-redux";
import { setOptions } from "../../store/slices/adminOptions.slice";
import { setIsDetail } from "../../store/slices/isDetail.slice";

const CardBox = ({ box }) => {
  const [sector, setSector] = useState();
  const api = "https://nav-boxes-lis.up.railway.app/api/v1";
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${api}/sector/${box.sectorId}`, getConfig()).then((res) => {
      setSector(res.data);
    });
  }, [box.sectorId]);

  const boxDetail = (id) => {
    dispatch(setOptions("boxDetail"));
    dispatch(setIsDetail(id));
  };

  return (
    <tr className="cards__list" onClick={() => boxDetail(box.id)}>
      <td className="box">{box.numberBox}</td>
      <td className="port">{box.numberPorts}</td>
      <td className="portsUsed">{box.numberUsers}</td>
      <td className="sector">{sector?.sectorName}</td>
    </tr>
  );
};

export default CardBox;
