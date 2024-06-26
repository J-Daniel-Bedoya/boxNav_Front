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
import Add from "../../components/crud/Add";
import Pagination from "../../components/pagination/Pagination";
import SearchBox from "../../components/search/SearchBox";
import SearchUser from "../../components/search/SearchUser";

const TownInfo = () => {
  const { id } = useParams();
  const [isviewMenu, setIsViewMenu] = useState(false);
  const [dataUser, setDataUser] = useState({});
  const options = useSelector((state) => state.options);
  const isDetail = useSelector((state) => state.isDetail);

  return (
    <div className="townInfo">
      <HeaderTown isviewMenu={isviewMenu} setIsViewMenu={setIsViewMenu} />

      <Total id={id} />
      {isviewMenu && (
        <MenuTown isviewMenu={isviewMenu} setIsViewMenu={setIsViewMenu} />
      )}

      {options === "box" && (
        <>
          <SearchBox /> <BoxTable id={id} />
        </>
      )}
      {options === "user" && (
        <>
          <SearchUser />
          <UserTable id={id} />
        </>
      )}
      {options === "sector" && <SectorTable id={id} />}
      {options === "boxDetail" && (
        <BoxDetails id={isDetail} setDataUser={setDataUser} />
      )}
      {options === "userDetail" && <UserDetails isDetail={isDetail} id={id} />}
      <section className="pagination">
        {options === "box" && (
          <>
            <Pagination id={id} options={options} /> <Add id={id} />
          </>
        )}
        {options === "sector" && (
          <>
            <Pagination id={id} options={options} /> <Add id={id} />
          </>
        )}
        {options === "user" && <Pagination id={id} options={options} />}
        {options === "boxDetail" && <Add id={id} dataUser={dataUser} />}
      </section>
    </div>
  );
};

export default TownInfo;
