import React from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  return (
    <div className="panel__header--content">
      <button className="option" onClick={() => navigate("/admin/town")}>
        Agregar un pueblo
      </button>
      <button className="option" onClick={() => navigate("/admin/sector")}>
        Agregar un sector
      </button>
      <button className="option" onClick={() => navigate("/admin/box")}>
        Crear una caja
      </button>
      <button className="option" onClick={() => navigate("/admin/user")}>
        Crear un usuario
      </button>
      <button className="option" onClick={() => navigate("/admin/portBad")}>
        Añadir un puerto malo
      </button>
    </div>
  );
};

export default Add;
