import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import AddSector from "./adminOptions/sector/AddSector";

const NewSector = ({ option }) => {
  const navigate = useNavigate();

  return (
    <div className="sector">
      <Header />
      {option === "add" && <AddSector />}

      <div>
        <button onClick={() => navigate(-1)}>Exit</button>
      </div>
    </div>
  );
};

export default NewSector;
