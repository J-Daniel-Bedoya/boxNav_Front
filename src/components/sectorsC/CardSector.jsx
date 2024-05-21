import React, { useEffect, useState } from "react";
import axios from "axios";
import getConfig from "../../utils/getConfig";

const CardSector = ({ sector }) => {
  //   const [sector, setSector] = useState();
  //   const [box, setBox] = useState();
  //   const api = "https://nav-boxes-lis.up.railway.app/api/v1";

  //   useEffect(() => {
  //     axios.get(`${api}/sector/${user.sectorId}`, getConfig()).then((res) => {
  //       setSector(res.data);
  //     });

  //     axios.get(`${api}/box/${user.boxId}`, getConfig()).then((res) => {
  //       setBox(res.data);
  //     });
  //   }, [user.sectorId, user.boxId]);
  console.log(sector);
  return (
    <tr className="cards__list">
      <td className="user">{sector.sectorName}</td>
      <td className="box">{sector.numberBoxes}</td>
      <td className="port">{sector.numberUsers}</td>
    </tr>
  );
};

export default CardSector;
