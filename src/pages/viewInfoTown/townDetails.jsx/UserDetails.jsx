import React from "react";
import { useDispatch } from "react-redux";
import { setOptions } from "../../../store/slices/adminOptions.slice";

const UserDetails = ({ id }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <h1>User {id}</h1>
      <div>
        <button onClick={() => dispatch(setOptions("user"))}>Atras</button>
      </div>
    </div>
  );
};

export default UserDetails;
