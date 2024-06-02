import React, { useEffect } from "react";
import { getTownThunk } from "../../store/slices/town.slice";
import { useDispatch, useSelector } from "react-redux";
import CardBox from "./CardBox";

const BoxTable = ({ id }) => {
  const town = useSelector((state) => state.town.boxes);
  const dispatch = useDispatch();

  const sortedTown = Array.isArray(town)
    ? town.slice().sort((a, b) => {
        if (a.numberBox !== undefined && b.numberBox !== undefined) {
          return a.numberBox - b.numberBox;
        }
        return 0;
      })
    : [];
  useEffect(() => {
    dispatch(getTownThunk(id));
  }, [id, dispatch]);

  return (
    <div className="townInfo__content">
      <h2>Cajas</h2>
      <div className="townInfo__content--tablet">
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Caja</th>
                <th>Puertos</th>
                <th>Usuarios</th>
                <th className="sector">Sector</th>
              </tr>
            </thead>
            <tbody>
              {sortedTown?.map((box) => (
                <CardBox key={box.id} box={box} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BoxTable;
