import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTownThunk } from "../../store/slices/town.slice";
import CardUser from "./CardUser";

const UserTable = ({ id }) => {
  const town = useSelector((state) => state.town.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTownThunk(id));
  }, [id, dispatch]);

  return (
    <div className="townInfo__content">
      <h2>Usuarios</h2>
      <div className="townInfo__content--tablet">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Caja</th>
              <th>Puerto</th>
              <th>Sector</th>
            </tr>
          </thead>
          <tbody>
            {town?.map((user) => (
              <CardUser key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
