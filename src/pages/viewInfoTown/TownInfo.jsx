import React, { useState } from "react";
import { useParams } from "react-router-dom";
import MenuTown from "../../components/menuTownC/MenuTown";
import NavList from "../../components/menuTownC/NavList";
import BoxTable from "../../components/boxesC/BoxTable";
import UserTable from "../../components/usersC/UserTable";
import SectorTable from "../../components/sectorsC/SectorTable";
import Total from "../../components/total/Total";

const TownInfo = () => {
  const { id } = useParams();
  const [isviewMenu, setIsViewMenu] = useState(false);
  const [isviewOptions, setIsViewOptions] = useState("box");

  return (
    <div className="townInfo">
      <header className="townInfo__header">
        <nav>
          <div className="logo"></div>
          {/* Mostrar el icono de hamburguesa solo en dispositivos pequeños */}
          <div className="menu">
            <div
              onClick={() => setIsViewMenu(!isviewMenu)}
              setIsViewOptions={setIsViewOptions}
            >
              <i className="fa-solid fa-bars"></i>
            </div>
          </div>
          <NavList
            setIsViewMenu={setIsViewMenu}
            setIsViewOptions={setIsViewOptions}
          />
        </nav>
      </header>
      <Total />
      {isviewMenu && (
        <MenuTown
          isviewMenu={isviewMenu}
          setIsViewMenu={setIsViewMenu}
          setIsViewOptions={setIsViewOptions}
        />
      )}
      {isviewOptions === "box" && <BoxTable id={id} />}
      {isviewOptions === "user" && <UserTable id={id} />}
      {isviewOptions === "sector" && <SectorTable id={id} />}
    </div>
  );
};

export default TownInfo;
