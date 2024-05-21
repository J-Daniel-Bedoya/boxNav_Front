import React from "react";

const MenuTown = ({ isviewMenu, setIsViewMenu, setIsViewOptions }) => {
  const select = (data) => {
    setIsViewOptions(data);
    setIsViewMenu(false);
  };

  return (
    <div className="menuTown">
      <div className="menuTown__content">
        <div className="logo"></div>
        <div className="menuTown__content--options">
          <button onClick={() => select("box")}>Cajas</button>
          <button onClick={() => select("user")}>Usuarios</button>
          <button onClick={() => select("sector")}>Sectores</button>
        </div>
        <div className="menuTown__content--button">
          <button onClick={() => setIsViewMenu(!isviewMenu)}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default MenuTown;