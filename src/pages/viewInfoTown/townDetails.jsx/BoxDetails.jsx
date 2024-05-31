import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOptions } from "../../../store/slices/adminOptions.slice";
import { getBoxThunk } from "../../../store/slices/box.slice";
import { getSectorThunk } from "../../../store/slices/sector.slice";

const BoxDetails = ({ id }) => {
  const dispatch = useDispatch();
  const box = useSelector((state) => state.box);
  const sector = useSelector((state) => state.sector);

  useEffect(() => {
    dispatch(getBoxThunk(id));
    dispatch(getSectorThunk(box.sectorId));
  }, [dispatch, id, box.sectorId]);

  return (
    <div className="boxDetails">
      <div className="card">
        <div className="boxDetails__return">
          <button onClick={() => dispatch(setOptions("box"))}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="boxDetails__sector">
          <div className="boxDetails__sector--title">
            <i className="fa-solid fa-box"></i> <b>Caja {box.numberBox}</b>
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
              <div key={user.id}>
                <b>{user.portNumber}</b>
                <p>{user.userName}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="boxDetails__options">
          <div className="boxDetails__options--button">
            <button>Puerto</button>
          </div>
          <div className="boxDetails__options--button">
            <button>Editar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxDetails;