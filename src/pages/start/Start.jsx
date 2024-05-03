import React from "react";
import Header from "../../components/startC/Header";
import Options from "../../components/startC/Options";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();

  const login = () => {
    navigate("/login");
  };

  return (
    <div className="start">
      <div className="start__btn">
        <button onClick={() => login()} className="start__btn--login">
          <i className="fa-solid fa-screwdriver-wrench"></i>
        </button>
      </div>
      <div className="start__space">
        <Header />
        <Options />
      </div>
      <div></div>
    </div>
  );
};

export default Start;
