import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import { useDispatch } from "react-redux";
import { getServiceThunk } from "../../store/slices/service.slice";

const Options = () => {
  const api = "https://nav-boxes-lis.up.railway.app/api/v1";
  const [town, setTown] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${api}/town`, getConfig()).then((res) => {
      setTown(res.data);
    });
  }, []);

  const selectTown = (data) => {
    navigate(`/start/town/${data}`);
    dispatch(getServiceThunk());
  };
  console.log(town);

  return (
    <div className="options">
      {town?.map((town) => (
        <button
          key={town.id}
          className="options__button"
          onClick={() => selectTown(town.id)}
        >
          {town.townName}
        </button>
      ))}
    </div>
  );
};

export default Options;
