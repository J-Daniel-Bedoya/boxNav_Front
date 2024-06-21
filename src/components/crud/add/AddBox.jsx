import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { createBoxThunk, getBoxesThunk } from "../../../store/slices/box.slice";
import Swal from "sweetalert2";

const AddBox = ({ id, setIsViewAdd }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const town = useSelector((state) => state.town);

  useEffect(() => {
    dispatch(getBoxesThunk(id));
  }, [id, dispatch]);

  // Obtener el siguiente número de caja disponible
  const getNextBoxNumber = () => {
    if (town.boxes?.length > 0) {
      const lastBoxNumber = Math.max(...town.boxes.map((box) => box.numberBox));
      return lastBoxNumber + 1;
    }
    return 1;
  };
  const nextBoxNumber = getNextBoxNumber();

  const submit = (data) => {
    const create = {
      townId: parseInt(id),
      sectorId: parseInt(data.sectorId),
      numberBox: nextBoxNumber,
      numberPorts: parseInt(data.numberPorts),
      coordinates: data.coordinates,
    };

    dispatch(createBoxThunk(create));
    reset();

    Swal.fire({
      title: "Caja creada con éxito",
      text: `Haz añadido una nueva caja con el número ${nextBoxNumber}`,
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
            {...register("sectorId", {
              required: "Debe seleccionar un sector",
            })}
            className="add__form--select"
          >
            <option value="">Seleccionar</option>
            {town.sectors?.map((sector) => (
              <option key={sector.id} value={sector.id}>
                {sector.sectorName}
              </option>
            ))}
          </select>
          {errors.sectorId && (
            <span className="error-message">{errors.sectorId.message}</span>
          )}
          {!town.sectors?.length && (
            <span className="error-message">Debe crear un nuevo sector</span>
          )}
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
                {...register("numberPorts", {
                  required: "Debe seleccionar el número de puertos",
                })}
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
                {...register("numberPorts", {
                  required: "Debe seleccionar el número de puertos",
                })}
              />
              16
            </label>
          </div>
          {errors.numberPorts && (
            <span className="error-message">{errors.numberPorts.message}</span>
          )}
        </div>
        <div className="add__form--input">
          <label htmlFor="coordinates">Coordenadas</label>
          <input
            type="text"
            id="coordinates"
            placeholder="6.2070286, -75.7331088"
            {...register("coordinates", {
              required: "Las coordenadas son requeridas",
              pattern: {
                value:
                  /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?((1[0-7]\d)|(\d{1,2}))(\.\d+)?$/,
                message: "Formato de coordenadas inválido",
              },
            })}
            className="add__form--text"
          />
          {errors.coordinates && (
            <span className="error-message">{errors.coordinates.message}</span>
          )}
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
