import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTownThunk } from "../../store/slices/town.slice";
import CardSector from "./CardSector";

const SectorTable = ({ id }) => {
  const town = useSelector((state) => state.town.sectors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTownThunk(id));
  }, [id, dispatch]);

  console.log(town);

  return (
    <div className="townInfo__content">
      <h2>Sectores</h2>
      <div className="townInfo__content--tablet">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cajas</th>
              <th>Usuarios</th>
            </tr>
          </thead>
          <tbody>
            {town?.map((sector) => (
              <CardSector key={sector.id} sector={sector} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SectorTable;
