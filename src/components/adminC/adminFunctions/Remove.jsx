import React from "react";
import { useNavigate } from "react-router-dom";

const Remove = () => {
  const navigate = useNavigate();
  return (
    <div className="panel__header--content">
      <button className="option" onClick={() => navigate("/admin/user")}>
        Eliminar un usuario
      </button>
      <button className="option" onClick={() => navigate("/admin/portBad")}>
        Eliminar un puerto malo
      </button>
    </div>
  );
};

export default Remove;
