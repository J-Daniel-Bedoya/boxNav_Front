import React from "react";
import { useDispatch } from "react-redux";
import { setOptions } from "../../store/slices/adminOptions.slice";

const NavList = ({ setIsViewMenu }) => {
  const select = (data) => {
    dispatch(setOptions(data));
    setIsViewMenu(false);
  };
  const dispatch = useDispatch();
  return (
    <div className="navList">
      <button onClick={() => select("box")}>Cajas</button>
      <button onClick={() => select("user")}>Usuarios</button>
      <button onClick={() => select("sector")}>Sectores</button>
    </div>
  );
};

export default NavList;
