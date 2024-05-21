import React, { useEffect, useState } from "react";
import axios from "axios";
import getConfig from "../../utils/getConfig";

const CardBox = ({ box }) => {
  const [sector, setSector] = useState();
  const api = "https://nav-boxes-lis.up.railway.app/api/v1";

  useEffect(() => {
    axios.get(`${api}/sector/${box.sectorId}`, getConfig()).then((res) => {
      setSector(res.data);
    });
  }, [box.sectorId]);

  return (
    <tr className="cards__list">
      <td className="box">{box.numberBox}</td>
      <td className="port">{box.numberPorts}</td>
      <td className="portsUsed">{box.numberUsers}</td>
      <td className="sector">{sector?.sectorName}</td>
    </tr>
  );
};

export default CardBox;
