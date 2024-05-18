import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTownsThunk } from "../../store/slices/town.slice";
import { useNavigate } from "react-router-dom";

const Options = () => {
  const town = useSelector((state) => state.town);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTownsThunk());
  }, []);

  const selectTown = (data) => {
    navigate(`/start/town/${data}`);
  };

  return (
    <div className="options">
      {town.map((town) => (
        <button
          key={town.id}
          className="options__button"
          onClick={() => selectTown(town.id)}
        >
          {town.name}
        </button>
      ))}
    </div>
  );
};

export default Options;
