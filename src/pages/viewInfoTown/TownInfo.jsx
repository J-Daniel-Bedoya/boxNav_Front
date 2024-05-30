import React, { useState } from "react";
import { useParams } from "react-router-dom";
import MenuTown from "../../components/menuTownC/MenuTown";
import BoxTable from "../../components/boxesC/BoxTable";
import UserTable from "../../components/usersC/UserTable";
import SectorTable from "../../components/sectorsC/SectorTable";
import Total from "../../components/total/Total";
import HeaderTown from "../../components/headerTown/HeaderTown";
import BoxDetails from "./townDetails.jsx/BoxDetails";
import { useSelector } from "react-redux";
import UserDetails from "./townDetails.jsx/UserDetails";
import SectorDetails from "./townDetails.jsx/SectorDetails";

const TownInfo = () => {
  const { id } = useParams();
  const [isviewMenu, setIsViewMenu] = useState(false);

  const options = useSelector((state) => state.options);
  const isDetail = useSelector((state) => state.isDetail);

  return (
    <div className="townInfo">
      <HeaderTown isviewMenu={isviewMenu} setIsViewMenu={setIsViewMenu} />
      <Total />
      {isviewMenu && (
        <MenuTown isviewMenu={isviewMenu} setIsViewMenu={setIsViewMenu} />
      )}
      {options === "box" && <BoxTable id={id} />}
      {options === "user" && <UserTable id={id} />}
      {options === "sector" && <SectorTable id={id} />}
      {options === "boxDetail" && <BoxDetails id={isDetail} />}
      {options === "userDetail" && <UserDetails id={isDetail} />}
      {options === "sectorDetail" && <SectorDetails id={isDetail} />}
    </div>
  );
};

export default TownInfo;
