import React from "react";
import { useForm } from "react-hook-form";
import { createSectorThunk } from "../../../store/slices/sector.slice";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";

const AddSector = ({ id, setIsViewAdd }) => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const submit = (data) => {
    const create = {
      townId: parseInt(id),
      sectorName: data.name,
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
        <button
          type="button"
          className="add__form--close"
          onClick={() => setIsViewAdd(false)}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="add__form--input">
          <label htmlFor="sector">Digite el nombre del sector</label>
          <input
            type="text"
            name="sector"
            {...register("name")}
            placeholder="El Parque"
            className="add__form--text"
          />
        </div>
        <div className="add__form--input">
          <input type="submit" value="Crear" className="add__form--submit" />
        </div>
      </form>
    </div>
  );
};

export default AddSector;
