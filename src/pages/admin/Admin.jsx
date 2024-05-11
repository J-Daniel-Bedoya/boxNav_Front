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
      <div className="panel__header">
        <div className="panel__header--logo"></div>
        <div>
          <button
            className="panel__header--menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="menu">
          <div className="menu__indi">
            <div className="menu__indi--triangle"></div>
          </div>
          <nav className="menu__list">
            <ul>
              <li onClick={() => select("town")}>Pueblo</li>
              <li onClick={() => select("sector")}>Sector</li>
              <li onClick={() => select("box")}>Caja</li>
              <li onClick={() => select("user")}>Usuario</li>
              <li onClick={() => select("port")}>Puerto malo</li>
            </ul>
          </nav>
        </div>
      )}

      <div className="panel__closed">
        <button onClick={() => navigate("/")}>
          <i className="fa-solid fa-right-from-bracket"></i>
        </button>
      </div>
      <div className="panel__content">
        {isSelect === "town" && <NewTown />}
        {isSelect === "sector" && <NewSector />}
        {isSelect === "box" && <NewBox />}
        {isSelect === "user" && <NewUser />}
        {isSelect === "port" && <NewPort />}
      </div>
    </div>
  );
};

export default Admin;
