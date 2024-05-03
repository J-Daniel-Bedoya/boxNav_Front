import React from "react";
import { useForm } from "react-hook-form";

const NewTown = () => {
  const { register, handleSubmit } = useForm();

  const submit = (data) => {
    const i = data;
  };

  return (
    <div className="town">
      <h1>Registrar un Pueblo</h1>
      <form onSubmit={handleSubmit(submit)} className="town__form">
        <div className="town__form--input">
          <input type="text" placeholder="Nombre" {...register("name")} />
        </div>
        <div className="town__form--input">
          <input
            type="text"
            placeholder="Número de cajas"
            {...register("boxes")}
          />
        </div>
        <div className="town__form--input">
          <input
            type="text"
            placeholder="Número de usuarios"
            {...register("users")}
          />
        </div>

        <div className="town__form--input">
          <input type="submit" value="Agregar" id="formButton" />
        </div>
      </form>
    </div>
  );
};

export default NewTown;
