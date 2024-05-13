import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createPortThunk } from "../../../../store/slices/port.slice";

const AddPort = () => {
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const submit = (data) => {
    dispatch(createPortThunk(data));
  };
  return (
    <div>
      <h1>Registrar un Pueblo</h1>
      <form onSubmit={handleSubmit(submit)} className="port__form">
        <div className="port__form--input">
          <select name="town" {...register("address")}>
            <option value="">Selecciona una dirección</option>
            <option value="ebéjico">Ebéjico</option>
            <option value="heliconia">Heliconia</option>
          </select>
        </div>
        <div className="port__form--input">
          <input type="text" placeholder="Caja" {...register("box")} />
        </div>
        <div className="port__form--input">
          <input type="text" placeholder="Puerto" {...register("users")} />
        </div>
        <div className="port__form--input">
          <input type="text" placeholder="Medida" {...register("signal")} />
        </div>

        <div className="port__form--input">
          <input type="submit" value="Registrar" id="formButton" />
        </div>
      </form>
    </div>
  );
};

export default AddPort;
