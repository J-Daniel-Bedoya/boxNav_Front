import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTownPaginationThunk } from "../../store/slices/town.slice";
import CardBox from "./CardBox";

const BoxTable = ({ id, currentPage, itemsPerPage }) => {
  const boxes = useSelector((state) => state.town.pagination?.boxes);
  const dispatch = useDispatch();

  useEffect(() => {
    const offset = (currentPage - 1) * itemsPerPage;
    dispatch(getTownPaginationThunk(id, offset, itemsPerPage));
  }, [id, currentPage, itemsPerPage, dispatch]);

  const sortedBoxes = Array.isArray(boxes)
    ? boxes.slice().sort((a, b) => a.numberBox - b.numberBox)
    : [];

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
              {sortedBoxes?.map((box) => (
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
