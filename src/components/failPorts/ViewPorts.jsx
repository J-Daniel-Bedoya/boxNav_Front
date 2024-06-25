import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  deletePortThunk,
  getPortsThunk,
  addBadPortThunk,
} from "../../store/slices/port.slice";
import { getUsersThunk } from "../../store/slices/user.slice";
import { getBoxThunk } from "../../store/slices/box.slice";

const ViewPorts = ({ boxId, setShowViewPorts }) => {
  const dispatch = useDispatch();
  const box = useSelector((state) => state.box);
  const [showAddBadPortModal, setShowAddBadPortModal] = useState(false);
  const [selectedPort, setSelectedPort] = useState(null);
  const [signal, setSignal] = useState("");

  useEffect(() => {
    dispatch(getBoxThunk(boxId));
    dispatch(getUsersThunk());
  }, [dispatch, boxId]);

  const handleRemoveBadPort = (portId) => {
    Swal.fire({
      title: "Eliminar Puerto Malo",
      text: `¿Estás seguro de que quieres eliminar este puerto malo?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePortThunk(portId));
        Swal.fire({
          title: "Eliminado",
          text: `El puerto malo ha sido eliminado.`,
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    });
  };

  const handleAddBadPort = () => {
    dispatch(addBadPortThunk({ boxId, port: selectedPort, signal }));
    setShowAddBadPortModal(false);
    Swal.fire({
      title: "Añadido",
      text: `El puerto malo número ${selectedPort} ha sido añadido.`,
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const renderPorts = () => {
    const occupiedPorts = box.users.map((user) => user.portNumber);
    const badPorts = box.ports.map((port) => port.port);

    return Array.from({ length: box.numberPorts }, (_, index) => {
      const portNumber = index + 1;
      const isOccupied = occupiedPorts.includes(portNumber);
      const isBadPort = badPorts.includes(portNumber);

      const badPort = box.ports.find((port) => port.port === portNumber);

      return (
        <div
          key={portNumber}
          className={`port ${isOccupied ? "occupied" : ""} ${
            isBadPort ? "bad" : "available"
          }`}
          onClick={() =>
            !isOccupied && !isBadPort && handlePortClick(portNumber)
          }
        >
          {isBadPort ? (
            <button
              className="port__bad"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveBadPort(badPort.id);
              }}
            >
              {portNumber}
            </button>
          ) : (
            <p className="port__number">{portNumber}</p>
          )}
        </div>
      );
    });
  };

  const handlePortClick = (portNumber) => {
    setSelectedPort(portNumber);
    setShowAddBadPortModal(true);
  };

  return (
    <div className="view-ports">
      <div className="view-ports__container">
        <div className="view-ports__container--header">
          <h3>Puertos Disponibles</h3>
          <button onClick={() => setShowViewPorts(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="view-ports__container--content">{renderPorts()}</div>
      </div>
      {showAddBadPortModal && (
        <div className="modal">
          <div className="modal__content">
            <h3>Añadir Puerto Malo</h3>
            <label>
              Señal:
              <input
                type="text"
                value={signal}
                onChange={(e) => setSignal(e.target.value)}
              />
            </label>
            <button onClick={handleAddBadPort}>Añadir</button>
            <button onClick={() => setShowAddBadPortModal(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPorts;
