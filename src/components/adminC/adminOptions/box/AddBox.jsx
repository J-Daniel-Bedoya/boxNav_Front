import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createBoxThunk } from "../../../../store/slices/box.slice";

const AddBox = () => {
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const submit = (data) => {
    dispatch(createBoxThunk(data));
  };
  return (
    <div>
      <h1>Nueva Caja Nav</h1>
      <form onSubmit={handleSubmit(submit)} className="box__form">
        <div className="box__form--input">
          <select name="box" {...register("address")}>
            <option value="">Selecciona una dirección</option>
            <option value="ebéjico">Ebéjico</option>
            <option value="heliconia">Heliconia</option>
          </select>
        </div>
        <div className="box__form--input">
          <input
            type="text"
            placeholder="Numero identificador"
            {...register("number")}
          />
        </div>
        <div className="box__form--input">
          <input
            type="text"
            placeholder="Numero de puertos"
            {...register("ports")}
          />
        </div>
        <div className="box__form--input">
          <input
            type="text"
            placeholder="Sector o dirección"
            {...register("addres")}
          />
        </div>

        <div className="box__form--input">
          <input type="submit" value="Registrar" id="formButton" />
        </div>
      </form>
    </div>
  );
};

export default AddBox;
