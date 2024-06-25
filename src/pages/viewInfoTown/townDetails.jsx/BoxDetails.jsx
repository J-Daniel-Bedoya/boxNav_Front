// BoxDetails.js
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setOptions } from "../../../store/slices/adminOptions.slice";
import { setIsDetail } from "../../../store/slices/isDetail.slice";
import { useBoxDetails } from "../../../hooks/details/useBoxDetails";
import Swal from "sweetalert2";
import FailPorts from "../../../components/failPorts/FailPorts";
import ViewPorts from "../../../components/failPorts/ViewPorts";

const BoxDetails = ({ id, setDataUser }) => {
  const dispatch = useDispatch();
  const { box, sector } = useBoxDetails(id);
  const [showForm, setShowForm] = useState(false);
  const [showViewPorts, setShowViewPorts] = useState(false);

  useEffect(() => {
    if (box.id) {
      setDataUser({ sectorId: box.sectorId, boxId: box.id });
    }
  }, [box, setDataUser]);

  const userDetail = (id) => {
    dispatch(setOptions("userDetail"));
    dispatch(setIsDetail(id));
  };

  const handleCoordinatesClick = (event, coordinates) => {
    event.preventDefault();
    Swal.fire({
      title: "Ir a Google Maps",
      text: "¿Quieres ver la ubicación en Google Maps?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Ver en Google Maps",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${coordinates}`;
        window.open(googleMapsUrl, "_blank");
      }
    });
  };

  const usedPorts = box.users?.length || 0;
  const badPortsCount = box.portsBad || 0;
  const availablePorts = box.numberPorts - usedPorts - badPortsCount;

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
          <div className="boxDetails__sector--coordinates">
            <i className="fa-solid fa-map-marked-alt"></i>
            <a
              href="#"
              onClick={(event) =>
                handleCoordinatesClick(event, box.coordinates)
              }
            >
              {box.coordinates}
            </a>
          </div>
          <div className="boxDetails__sector--ports">
            <i className="fa-solid fa-plug"></i>
            <p onClick={() => setShowViewPorts(true)}>
              Puertos disponibles: {availablePorts}
            </p>
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
            <button onClick={() => setShowForm(true)}>Puerto Malo</button>
          </div>
        </div>
        {showForm && (
          <FailPorts id={id} boxId={box.id} setShowForm={setShowForm} />
        )}
        {showViewPorts && (
          <ViewPorts boxId={box.id} setShowViewPorts={setShowViewPorts} />
        )}
      </div>
    </div>
  );
};

export default BoxDetails;
