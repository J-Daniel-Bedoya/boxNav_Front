// UserDetails.js
import React from "react";
import { useUserDetails } from "../../../hooks/details/useUserDetails";
import Edit from "../../../components/crud/Edit";
import { useDispatch } from "react-redux";
import { setOptions } from "../../../store/slices/adminOptions.slice";

const UserDetails = ({ isDetail, id }) => {
  const dispatch = useDispatch();
  const { user, box, service, sector, isViewEdit, setIsViewEdit, trash } =
    useUserDetails(isDetail);

  if (!user) {
    return <div>Loading...</div>;
  }

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
