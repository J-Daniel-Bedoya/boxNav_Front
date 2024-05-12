import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const NewUser = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submit = (data) => {
    const i = data;
  };

  return (
    <div className="user">
      <h1>Registrar usuario</h1>
      <form onSubmit={handleSubmit(submit)} className="user__form">
        <div className="user__form--input">
          <input type="text" placeholder="Nombre" {...register("name")} />
        </div>
        <div className="user__form--input">
          <input type="text" placeholder="Caja" {...register("box")} />
        </div>
        <div className="user__form--input">
          <input type="text" placeholder="Puerto" {...register("port")} />
        </div>
        <div className="user__form--input">
          <input type="text" placeholder="Celular" {...register("tel")} />
        </div>
        <div className="user__form--input">
          <input
            type="text"
            placeholder="Tipo de servicio"
            {...register("service")}
          />
        </div>
        <div className="user__form--input">
          <select name="state" {...register("state")}>
            <option value="">Estado</option>
            <option value="Activo">Activo</option>
            <option value="Suspendido">Suspendido</option>
          </select>
        </div>
        <div className="user__form--input">
          <select name="user" {...register("address")}>
            <option value="">Selecciona una dirección</option>
            <option value="ebéjico">Ebéjico</option>
            <option value="heliconia">Heliconia</option>
          </select>
        </div>
        <div className="user__form--input">
          <input
            type="text"
            placeholder="Sector o dirección"
            {...register("address")}
          />
        </div>

        <div className="user__form--input">
          <input type="submit" value="Registrar" id="formButton" />
        </div>
      </form>

      <div>
        <button onClick={() => navigate("/admin")}>Exit</button>
      </div>
    </div>
  );
};

export default NewUser;
