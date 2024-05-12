import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createTownThunk } from "../../store/slices/town.slice";
import { useNavigate } from "react-router-dom";

const NewTown = () => {
  const { register, handleSubmit, reset } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = (data) => {
    dispatch(createTownThunk(data));
    reset();
  };

  return (
    <div className="town">
      <h1>Registrar un Pueblo</h1>
      <form onSubmit={handleSubmit(submit)} className="town__form">
        <div className="town__form--input">
          <input type="text" placeholder="Nombre" {...register("name")} />
        </div>

        <div className="town__form--input">
          <input type="submit" value="Agregar" id="formButton" />
        </div>
      </form>
      <div>
        <button onClick={() => navigate("/admin")}>Exit</button>
      </div>
    </div>
  );
};

export default NewTown;
