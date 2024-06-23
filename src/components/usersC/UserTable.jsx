import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTownPaginationThunk } from "../../store/slices/town.slice";
import CardUser from "./CardUser";

const UserTable = ({ id, currentPage, itemsPerPage }) => {
  const users = useSelector((state) => state.town.pagination.users);
  const dispatch = useDispatch();

  useEffect(() => {
    const offset = (currentPage - 1) * itemsPerPage;
    dispatch(getTownPaginationThunk(id, offset, itemsPerPage));
  }, [id, currentPage, itemsPerPage, dispatch]);

  return (
    <div className="townInfo__content">
      <h2>Usuarios</h2>
      <div className="townInfo__content--tablet">
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Caja</th>
                <th>Puerto</th>
                <th className="sector">Sector</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <CardUser key={user.id} user={user} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
