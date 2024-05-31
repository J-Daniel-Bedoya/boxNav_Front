import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOptions } from "../../../store/slices/adminOptions.slice";
import { getUserThunk } from "../../../store/slices/user.slice";
import { getSectorThunk } from "../../../store/slices/sector.slice";
import { getServiceThunk } from "../../../store/slices/service.slice";
import { getBoxThunk } from "../../../store/slices/box.slice";
import axios from "axios";
import getConfig from "../../../utils/getConfig";

const UserDetails = ({ id }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const sector = useSelector((state) => state.sector);
  const box = useSelector((state) => state.box);
  const [service, setService] = useState();
  const api = "https://nav-boxes-lis.up.railway.app/api/v1";

  useEffect(() => {
    dispatch(getUserThunk(id));
    dispatch(getBoxThunk(user.boxId));
    dispatch(getSectorThunk(user.sectorId));

    axios.get(`${api}/service/${user.serviceId}`, getConfig()).then((res) => {
      setService(res.data.serviceName);
    });
  }, [user, getServiceThunk]);

  console.log(service);

  return (
    <div className="card">
      <div className="userDetails">
        <div className="userDetails__return">
          <button>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="userDetails__sector">
          <div className="userDetails__sector--title">{user.userName}</div>
          <div className="userDetails__info">
            <div className="userDetails__info--text">
              <i className="fas fa-map-marker-alt"></i>
              <p>{sector.sectorName}</p>
            </div>
            <div className="userDetails__info--text">
              <i className="fas fa-phone"></i>
              <p>{user.tel}</p>
            </div>
            <div className="userDetails__info--text">
              <i className="fas fa-box"></i>
              <p>Caja</p>
              <p>{box.numberBox}</p>
            </div>
            <div className="userDetails__info--text">
              <i className="fa-solid fa-diagram-project"></i>
              <p>Puerto</p>
              <p>{user.portNumber}</p>
            </div>
            <div className="userDetails__info--text">
              <p>Servicio</p>
              <i className="fas fa-wifi"></i>
            </div>
            <div>
              <p>Estado</p>
              <div
                className="userDetails__info--state"
                style={{ backgroundColor: "green" }}
              ></div>
            </div>
          </div>
        </div>
        <div className="userDetails__options">
          <div className="userDetails__options--button">
            <button>Editar</button>
            <button>Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
