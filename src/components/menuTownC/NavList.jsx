import React from "react";

const NavList = ({ setIsViewMenu, setIsViewOptions }) => {
  const select = (data) => {
    setIsViewOptions(data);
    setIsViewMenu(false);
  };

  return (
    <div className="navList">
      <button onClick={() => select("box")}>Cajas</button>
      <button onClick={() => select("user")}>Usuarios</button>
      <button onClick={() => select("sector")}>Sectores</button>
    </div>
  );
};

export default NavList;
