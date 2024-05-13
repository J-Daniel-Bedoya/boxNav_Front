import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

import AddBox from "./adminOptions/box/AddBox";
import EditBox from "./adminOptions/box/EditBox";
import RemoveBox from "./adminOptions/box/RemoveBox";

const NewBox = ({ option }) => {
  const navigate = useNavigate();

  const before = () => {
    navigate(-1);
  };

  return (
    <div className="box">
      <Header />
      {option === "add" && <AddBox />}
      {option === "edit" && <EditBox />}
      {option === "remove" && <RemoveBox />}
      <div>
        <button onClick={() => before()}>Exit</button>
      </div>
    </div>
  );
};

export default NewBox;
