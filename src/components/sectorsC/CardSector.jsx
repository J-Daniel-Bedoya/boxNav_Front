import React from "react";
import { setIsDetail } from "../../store/slices/isDetail.slice";
import { setOptions } from "../../store/slices/adminOptions.slice";
import { useDispatch } from "react-redux";

const CardSector = ({ sector }) => {
  const dispatch = useDispatch();
  const sectorDetail = (id) => {
    dispatch(setOptions("sectorDetail"));
    dispatch(setIsDetail(id));
  };

  return (
    <tr className="cards__list" onClick={() => sectorDetail(sector.id)}>
      <td className="user">{sector.sectorName}</td>
      <td className="box">{sector.numberBoxes}</td>
      <td className="port">{sector.numberUsers}</td>
    </tr>
  );
};

export default CardSector;
