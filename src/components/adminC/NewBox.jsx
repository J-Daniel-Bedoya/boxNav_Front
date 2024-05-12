import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const NewBox = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submit = (data) => {
    const i = data;
  };

  return (
    <div className="box">
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
      <div>
        <button onClick={() => navigate("/admin")}>Exit</button>
      </div>
    </div>
  );
};

export default NewBox;
