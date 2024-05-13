import React from "react";
import { useNavigate } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  return (
    <div className="panel__header--content">
      <button className="option" onClick={() => navigate("/admin/box")}>
        Editar una caja
      </button>
      <button className="option" onClick={() => navigate("/admin/user")}>
        Editar un usuario
      </button>
      <button className="option" onClick={() => navigate("/admin/portBad")}>
        Editar un puerto malo
      </button>
    </div>
  );
};

export default Edit;
