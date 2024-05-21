import React, { useEffect, useState } from "react";
import axios from "axios";
import getConfig from "../../utils/getConfig";

const CardUser = ({ user }) => {
  const [sector, setSector] = useState();
  const [box, setBox] = useState();
  const api = "https://nav-boxes-lis.up.railway.app/api/v1";

  useEffect(() => {
    axios.get(`${api}/sector/${user.sectorId}`, getConfig()).then((res) => {
      setSector(res.data);
    });

    axios.get(`${api}/box/${user.boxId}`, getConfig()).then((res) => {
      setBox(res.data);
    });
  }, [user.sectorId, user.boxId]);

  return (
    <tr className="cards__list">
      <td className="user">{user.userName}</td>
      <td className="box">{box?.numberBox}</td>
      <td className="port">{user.portNumber}</td>
      <td className="sector">{sector?.sectorName}</td>
    </tr>
  );
};

export default CardUser;
