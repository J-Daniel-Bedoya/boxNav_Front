import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTownPaginationThunk,
  getTownThunk,
} from "../../store/slices/town.slice";
import CardSector from "./CardSector";

const SectorTable = ({ id }) => {
  const town = useSelector((state) => state.town.pagination.sectors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTownPaginationThunk(id));
  }, [id, dispatch]);

  const sortedSectors = Array.isArray(town)
    ? town.slice().sort((a, b) => {
        if (a.sectorName !== undefined && b.sectorName !== undefined) {
          return a.sectorName.localeCompare(b.sectorName);
        }
        return 0;
      })
    : [];

  return (
    <div className="townInfo__content">
      <h2>Sectores</h2>
      <div className="townInfo__content--tablet">
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cajas</th>
                <th>Usuarios</th>
              </tr>
            </thead>
            <tbody>
              {sortedSectors.map((sector) => (
                <CardSector key={sector.id} sector={sector} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SectorTable;
