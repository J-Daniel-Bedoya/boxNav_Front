import React, { useEffect, useState } from "react";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import { setIsDetail } from "../../store/slices/isDetail.slice";
import { setOptions } from "../../store/slices/adminOptions.slice";
import { useDispatch } from "react-redux";

const CardUser = ({ user }) => {
  const [sector, setSector] = useState();
  const [box, setBox] = useState();
  const dispatch = useDispatch();
  const api = "https://nav-boxes-lis.up.railway.app/api/v1";

  useEffect(() => {
    axios.get(`${api}/sector/${user.sectorId}`, getConfig()).then((res) => {
      setSector(res.data);
    });

    axios.get(`${api}/box/${user.boxId}`, getConfig()).then((res) => {
      setBox(res.data);
    });
  }, [user.sectorId, user.boxId]);

  const userDetail = (id) => {
    dispatch(setOptions("userDetail"));
    dispatch(setIsDetail(id));
  };

  return (
    <tr className="cards__list" onClick={() => userDetail(user.id)}>
      <td className="user">{user.userName}</td>
      <td className="box">{box?.numberBox}</td>
      <td className="port">{user.portNumber}</td>
      <td className="sector">{sector?.sectorName}</td>
    </tr>
  );
};

export default CardUser;
