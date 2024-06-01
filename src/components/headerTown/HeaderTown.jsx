import React from "react";
import NavList from "../menuTownC/NavList";

const HeaderTown = ({ isviewMenu, setIsViewMenu, setIsViewOptions }) => {
  return (
    <div>
      <header className="townInfo__header">
        <nav className="townInfo__header--nav">
          <div className="logo"></div>

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
    </div>
  );
};

export default HeaderTown;
