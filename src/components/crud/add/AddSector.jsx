import React from "react";
import { useForm } from "react-hook-form";
import { createSectorThunk } from "../../../store/slices/sector.slice";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";

const AddSector = ({ id, setIsViewAdd }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const toCamelCase = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const submit = (data) => {
    const camelCaseName = toCamelCase(data.name);

    const create = {
      townId: parseInt(id),
      sectorName: camelCaseName,
    };
    dispatch(createSectorThunk(create));
    reset();

    Swal.fire({
      title: "Sector creado con éxito",
      text: "Haz añadido un nuevo sector",
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
    <div className="pagination__add--sector">
      <form onSubmit={handleSubmit(submit)} className="add__form">
        <div className="add__form--input">
          <label htmlFor="sector">Digite el nombre del sector</label>
          <input
            type="text"
            name="sector"
            {...register("name", {
              required: "El nombre del sector es requerido",
            })}
            placeholder="El Parque"
            className="add__form--text"
          />
          {errors.name && <span>{errors.name.message}</span>}
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

export default AddSector;
