import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserThunk,
  getUserThunk,
} from "../../../store/slices/user.slice";
import { getBoxThunk } from "../../../store/slices/box.slice";
import axios from "axios";
import getConfig from "../../../utils/getConfig";
import { setOptions } from "../../../store/slices/adminOptions.slice";
import Swal from "sweetalert2";
import Edit from "../../../components/crud/Edit";

const UserDetails = ({ isDetail, id }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const box = useSelector((state) => state.box);
  const api = "https://nav-boxes-lis.up.railway.app/api/v1";
  const [service, setService] = useState("");
  const [sector, setSector] = useState("");
  const [isViewEdit, setIsViewEdit] = useState(false);

  useEffect(() => {
    dispatch(getUserThunk(isDetail));
    dispatch(getBoxThunk(user.boxId));
    axios.get(`${api}/sector/${user.sectorId}`, getConfig()).then((res) => {
      setSector(res.data);
    });
    axios.get(`${api}/service/${user.serviceId}`, getConfig()).then((res) => {
      setService(res.data.serviceName);
    });
  }, [user]);

  const trash = (id, name) => {
    Swal.fire({
      title: "Eliminar usuario",
      html: `¿Estás seguro de que quieres eliminar al usuario <strong>${name}</strong>?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUserThunk(id)).then(() => {
          dispatch(setOptions("user"));
          Swal.fire({
            title: "Usuario eliminado",
            html: `El usuario <strong>${name}</strong> ha sido eliminado con éxito`,
            icon: "success",
            confirmButtonText: "OK",
            timer: 4000,
            timerProgressBar: true,
          });
        });
      }
    });
  };

  // useEffect(() => {}, [user, box]);

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
              {service === "Tv" && <i className="fa-solid fa-tv"></i>}
              {service === "Internet" && <i className="fas fa-wifi"></i>}
              {service === "Combo" && (
                <>
                  <i className="fa-solid fa-tv"></i>{" "}
                  <i className="fas fa-wifi"></i>
                </>
              )}
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
            <button onClick={() => setIsViewEdit(!isViewEdit)}>Editar</button>
            <button onClick={() => trash(user.id, user.userName)}>
              Eliminar
            </button>
          </div>
        </div>
      </div>
      {isViewEdit && (
        <div className="pagination">
          <Edit setIsViewEdit={setIsViewEdit} userId={user.id} id={id} />
        </div>
      )}
    </div>
  );
};

export default UserDetails;
