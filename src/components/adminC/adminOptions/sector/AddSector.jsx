import React from "react";
import { useForm } from "react-hook-form";

const AddSector = () => {
  const { register, handleSubmit } = useForm();

  const submit = (data) => {
    const i = data;
  };
  return (
    <div>
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

export default AddSector;
