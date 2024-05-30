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
  }, [getBoxThunk, getSectorThunk, box.sectorId]);

  return (
    <div className="boxDetails">
      <div className="card">
        <div className="boxDetails__sector">
          <b className="boxDetails__title">
            <i className="fa-solid fa-box"></i> Caja {box.numberBox}
          </b>
          <p>
            <i className="fa-solid fa-location-dot"></i> {sector.sectorName}
          </p>
        </div>
        <div className="boxDetails__users">
          <b>Conectados</b>
          <div className="boxDetails__users--name">
            {box.users?.map((user) => (
              <div key={user.id}>
                <p>{user.portNumber}</p>
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
        <div className="boxDetails__return">
          <button onClick={() => dispatch(setOptions("box"))}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoxDetails;
