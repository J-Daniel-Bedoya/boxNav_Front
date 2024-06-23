// BoxDetails.js
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOptions } from "../../../store/slices/adminOptions.slice";
import { setIsDetail } from "../../../store/slices/isDetail.slice";
import { useBoxDetails } from "../../../hooks/details/useBoxDetails";

const BoxDetails = ({ id, setDataUser }) => {
  const dispatch = useDispatch();
  const { box, sector } = useBoxDetails(id);

  useEffect(() => {
    if (box.id) {
      setDataUser({ sectorId: box.sectorId, boxId: box.id });
    }
  }, [box, setDataUser]);

  const userDetail = (id) => {
    dispatch(setOptions("userDetail"));
    dispatch(setIsDetail(id));
  };

  return (
    <div className="boxDetails">
      <div className="card-boxDetail">
        <div className="boxDetails__return">
          <button onClick={() => dispatch(setOptions("box"))}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="boxDetails__sector">
          <div className="boxDetails__sector--title">
            <b>Caja {box.numberBox}</b>
          </div>
          <div className="boxDetails__sector--address">
            <i className="fa-solid fa-location-dot"></i>
            <p>{sector.sectorName}</p>
          </div>
        </div>
        <div className="boxDetails__users">
          <b>Conectados</b>
          <div className="boxDetails__users--name">
            {box.users?.map((user) => (
              <div key={user.id} onClick={() => userDetail(user.id)}>
                <b>{user.portNumber}</b>
                <p>{user.userName}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="boxDetails__options">
          <div className="boxDetails__options--button">
            <button>Puerto Malo</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxDetails;
