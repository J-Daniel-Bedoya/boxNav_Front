import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserThunk } from "../../../store/slices/user.slice";
import { getSectorThunk } from "../../../store/slices/sector.slice";
import { getServiceThunk } from "../../../store/slices/service.slice";
import { getBoxThunk } from "../../../store/slices/box.slice";
import axios from "axios";
import getConfig from "../../../utils/getConfig";
import { setOptions } from "../../../store/slices/adminOptions.slice";

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

  return (
    <div className="card-userDetail">
      <div className="userDetails">
        <div className="userDetails__return">
          <button onClick={() => dispatch(setOptions("user"))}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="userDetails__sector">
          <div className="userDetails__sector--title">{user.userName}</div>
          <div></div>
          <div className="userDetails__info">
            <div className="userDetails__info--text">
              <i className="fas fa-map-marker-alt"></i>
              <p>Sector:</p>
              <p>{sector.sectorName}</p>
            </div>
            <div className="userDetails__info--text">
              <i className="fas fa-phone"></i>
              <p>Cel:</p>
              <p>{user.tel}</p>
            </div>
            <div className="userDetails__info--text">
              <i className="fas fa-box"></i>
              <p>Caja:</p>
              <p>{box.numberBox}</p>
            </div>
            <div className="userDetails__info--text">
              <i className="fa-solid fa-diagram-project"></i>
              <p>Puerto:</p>
              <p>{user.portNumber}</p>
            </div>
            <div className="userDetails__info--text">
              <i className="fa-solid fa-bell-concierge"></i>
              <p>Servicio:</p>
              <i className="fas fa-wifi"></i>
            </div>
            <div className="userDetails__info--state">
              <i className="fa-solid fa-satellite-dish"></i>
              <p>Estado:</p>
              <div
                className="state-indicator"
                style={{ backgroundColor: `${user.state ? "green" : "red"}` }}
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
