import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NewUser from "../../components/adminC/NewUser";
import NewTown from "../../components/adminC/NewTown";
import NewBox from "../../components/adminC/NewBox";
import NewPort from "../../components/adminC/NewPort";
import NewSector from "../../components/adminC/NewSector";

const Admin = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isSelect, setIsSelect] = useState("town");

  const select = (option) => {
    setIsSelect(option);
    setIsOpen(!isOpen);
  };

  return (
    <div className="panel">
      <div className="panel_header">
        <div className="panel_header--logo"></div>
        <div className="panel_content">
          <button
            className="panel_content--option"
            onClick={() => navigate("/town")}
          >
            Agregar un pueblo
          </button>
          <button
            className="panel_content--option"
            onClick={() => navigate("/sector")}
          >
            Agregar un sector
          </button>
          <button
            className="panel_content--option"
            onClick={() => navigate("/box")}
          >
            Crear una caja
          </button>
          <button
            className="panel_content--option"
            onClick={() => navigate("/user")}
          >
            Crear un usuario
          </button>
          <button
            className="panel_content--option"
            onClick={() => navigate("/portBad")}
          >
            Añadir un puerto malo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
