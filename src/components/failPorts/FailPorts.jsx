import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { createPortThunk } from "../../store/slices/port.slice";
import { getBoxThunk } from "../../store/slices/box.slice";

const FailPorts = ({ id, boxId, setShowForm }) => {
  const dispatch = useDispatch();
  const box = useSelector((state) => state.box); // Obtiene la caja del estado global
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(getBoxThunk(id));
  }, []);

  const onSubmit = (data) => {
    const failPort = {
      townId: id,
      boxId: boxId,
      port: parseInt(data.portNumber),
      signal: parseInt(data.signal),
    };
    console.log(failPort);
    dispatch(createPortThunk(failPort))
      .then(() => {
        Swal.fire({
          title: "Reporte Enviado",
          text: "El reporte ha sido enviado exitosamente.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          setShowForm(false);
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al enviar el reporte. Por favor, inténtalo de nuevo.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };
  const occupiedPorts = box.users.map((user) => user.portNumber);
  const maxPorts = box.numberPorts;

  return (
    <div className="fail-ports">
      <form onSubmit={handleSubmit(onSubmit)} className="fail-ports__form">
        <h3>Reportar Puerto Malo</h3>
        <input type="hidden" {...register("boxId")} value={boxId} />
        <div>
          <label htmlFor="portNumber">Número de Puerto</label>
          <input
            type="number"
            id="portNumber"
            {...register("portNumber", {
              required: "El número de puerto es requerido",
              min: { value: 1, message: "El puerto debe ser mayor a 0" },
              max: {
                value: maxPorts,
                message: `El puerto no puede exceder de ${maxPorts}`,
              },
              validate: (value) =>
                !occupiedPorts.includes(parseInt(value)) ||
                "Este puerto ya está ocupado",
            })}
            placeholder="Número de Puerto"
          />
          {errors.portNumber && <span>{errors.portNumber.message}</span>}
        </div>
        <div>
          <label htmlFor="signal">Señal</label>
          <input
            type="number"
            id="signal"
            {...register("signal", {
              required: "La señal es requerida",
              validate: (value) =>
                value < 0 || "La señal debe ser un número negativo",
            })}
            placeholder="Señal del puerto"
          />
          {errors.signal && <span>{errors.signal.message}</span>}
        </div>
        <div className="fail-ports__buttons">
          <button type="submit">Enviar Reporte</button>
          <button type="button" onClick={() => setShowForm(false)}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FailPorts;
