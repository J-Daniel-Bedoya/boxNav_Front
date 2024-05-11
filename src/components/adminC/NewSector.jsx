import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createSectorThunk } from "../../store/slices/sector.slice";

const NewSector = () => {
  const { register, handleSubmit, reset } = useForm();

  const dispatch = useDispatch();
  const submit = (data) => {
    console.log(data);

    dispatch(createSectorThunk(data));
    reset();
  };

  return (
    <div className="sector">
      <h1>Agregar un nuevo sector</h1>
      <form onSubmit={handleSubmit(submit)} className="sector__form">
        <div className="sector__form--input">
          <input type="text" placeholder="Nombre" {...register("name")} />
        </div>

        <div className="sector__form--input">
          <input type="submit" value="Agregar" id="formButton" />
        </div>
      </form>
    </div>
  );
};

export default NewSector;
