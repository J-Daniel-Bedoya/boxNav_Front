import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import AddTown from "./adminOptions/town/AddTown";

const NewTown = ({ option }) => {
  const navigate = useNavigate();

  return (
    <div className="town">
      <Header />
      {option === "add" && <AddTown />}

      <div>
        <button onClick={() => navigate(-1)}>Exit</button>
      </div>
    </div>
  );
};

export default NewTown;
