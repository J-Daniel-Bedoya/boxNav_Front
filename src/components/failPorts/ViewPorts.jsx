import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deletePortThunk, getPortsThunk } from "../../store/slices/port.slice";
import { getUsersThunk } from "../../store/slices/user.slice";
import { getBoxThunk } from "../../store/slices/box.slice";
import { useEffect } from "react";

const ViewPorts = ({ boxId, setShowViewPorts }) => {
  const dispatch = useDispatch();
  const box = useSelector((state) => state.box);

  useEffect(() => {
    dispatch(getBoxThunk(boxId));
    dispatch(getUsersThunk());
  }, [dispatch, boxId]);

  const handleRemoveBadPort = (portId) => {
    Swal.fire({
      title: "Eliminar Puerto Malo",
      text: "¿Estás seguro de que quieres eliminar este puerto malo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePortThunk(portId));
        Swal.fire({
          title: "Eliminado",
          text: "El puerto malo ha sido eliminado.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
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
        >
          {isBadPort ? (
            <button
              className="port__bad"
              onClick={() => handleRemoveBadPort(badPort.id)}
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
    </div>
  );
};

export default ViewPorts;
