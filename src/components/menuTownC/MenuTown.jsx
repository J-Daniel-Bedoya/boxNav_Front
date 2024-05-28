import React from "react";
import { useDispatch } from "react-redux";
import { setOptions } from "../../store/slices/adminOptions.slice";

const MenuTown = ({ isviewMenu, setIsViewMenu }) => {
  const dispatch = useDispatch();

  return (
    <div className="menuTown">
      <div className="menuTown__content">
        <div className="logo"></div>
        <div className="menuTown__content--options">
          <button onClick={() => dispatch(setOptions("box"))}>Cajas</button>
          <button onClick={() => dispatch(setOptions("user"))}>Usuarios</button>
          <button onClick={() => dispatch(setOptions("sector"))}>
            Sectores
          </button>
        </div>
        <div className="menuTown__content--button">
          <button onClick={() => setIsViewMenu(!isviewMenu)}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default MenuTown;
