import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { createBoxThunk } from "../../../store/slices/box.slice";
import Swal from "sweetalert2";

const AddBox = ({ id, setIsViewAdd }) => {
  const { register, handleSubmit, reset } = useForm();
  const town = useSelector((state) => state.town);
  const dispatch = useDispatch();

  const submit = (data) => {
    const create = {
      townId: parseInt(id),
      sectorId: parseInt(data.sectorId),
      numberPorts: parseInt(data.numberPorts),
      coordinates: data.coordinates,
    };
    dispatch(createBoxThunk(create));
    reset();

    Swal.fire({
      title: "Caja creada con éxito",
      text: "Haz añadido una nueva caja",
      icon: "success",
      confirmButtonText: "OK",
      timer: 3000,
      timerProgressBar: true,
    }).then((result) => {
      if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
        setIsViewAdd(false);
      }
    });
  };

  return (
    <div className="pagination__add--box">
      <form onSubmit={handleSubmit(submit)} className="add__form">
        <div className="add__form--input">
          <label htmlFor="add">Sector</label>
          <select
            name="add"
            {...register("sectorId")}
            className="add__form--select"
          >
            <option value="">Seleccionar</option>
            {town.sectors?.map((sector) => (
              <option key={sector.id} value={sector.id}>
                {sector.sectorName}
              </option>
            ))}
          </select>
        </div>
        <div className="add__form--input">
          <label htmlFor="ports">Número de puertos</label>
          <div className="add__form--checkbox">
            <label htmlFor="ports8">
              <input
                type="radio"
                id="ports8"
                name="ports"
                value="8"
                {...register("numberPorts")}
              />
              8
            </label>
          </div>
          <div className="add__form--checkbox">
            <label htmlFor="ports16">
              <input
                type="radio"
                id="ports16"
                name="ports"
                value="16"
                {...register("numberPorts")}
              />
              16
            </label>
          </div>
        </div>
        <div className="add__form--input">
          <label htmlFor="coordinates">Coordenadas {"(opcional)"}</label>
          <input
            type="text"
            id="coordinates"
            placeholder="6.2070286 -75.7331088"
            {...register("coordinates")}
            className="add__form--text"
          />
        </div>
        <div className="add__form--buttons">
          <button
            type="button"
            className="close"
            onClick={() => setIsViewAdd(false)}
          >
            Cancelar
          </button>
          <input type="submit" value="Crear" className="submit" />
        </div>
      </form>
    </div>
  );
};

export default AddBox;
