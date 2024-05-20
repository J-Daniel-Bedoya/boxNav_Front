import React from "react";

const MenuTown = ({ view, setView }) => {
  const select = (data) => {
    if (data === "boxes") {
    } else if (data === "users") {
    } else {
    }
  };

  return (
    <div className="menuTown">
      <div className="menuTown__content">
        <div className="logo"> </div>
        <p onClick={() => select("boxes")}>Ver por Cajas</p>
        <p onClick={() => select("users")}>Ver por Usuarios</p>
        <p onClick={() => select("secotors")}>Ver por sectores</p>
        <button onClick={() => setView(!view)}>Cancelar</button>
      </div>
    </div>
  );
};

export default MenuTown;
