import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { deletePortThunk } from "../../store/slices/port.slice";

const ViewPorts = ({ box, setShowViewPorts }) => {
  const dispatch = useDispatch();
  const { numberPorts, users, portsBad } = box;

  const handleRemoveBadPort = (portNumber) => {
    Swal.fire({
      title: "Eliminar Puerto Malo",
      text: `¿Estás seguro de que quieres eliminar el puerto malo número ${portNumber}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePortThunk(portNumber));
        Swal.fire({
          title: "Eliminado",
          text: `El puerto malo número ${portNumber} ha sido eliminado.`,
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    });
  };

  const occupiedPorts = users.map((user) => user.portNumber);
  const badPorts = Array.isArray(portsBad) ? portsBad : [];

  return (
    <div className="view-ports">
      <div className="view-ports__container">
        <div className="view-ports__header">
          <h3>Puertos Disponibles</h3>
          <button onClick={() => setShowViewPorts(false)}>Cerrar</button>
        </div>
        <div className="view-ports__content">
          {Array.from({ length: numberPorts }, (_, i) => i + 1).map((port) => {
            const isOccupied = occupiedPorts.includes(port);
            const isBadPort = badPorts.includes(port);

            return (
              <div
                key={port}
                className={`port ${isOccupied ? "occupied" : ""} ${
                  isBadPort ? "bad" : ""
                }`}
              >
                {port}
                {isBadPort && (
                  <button
                    className="remove-bad-port"
                    onClick={() => handleRemoveBadPort(port)}
                  >
                    Eliminar
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ViewPorts;
