import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createTownThunk } from "../../../../store/slices/town.slice";
import { useNavigate } from "react-router-dom";

const AddTown = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = (data) => {
    dispatch(createTownThunk(data));
    navigate(-1);
  };
  return (
    <div>
      <h1>Registrar un Pueblo</h1>
      <form onSubmit={handleSubmit(submit)} className="town__form">
        <div className="town__form--input">
          <input type="text" placeholder="Nombre" {...register("name")} />
        </div>

        <div className="town__form--input">
          <input type="submit" value="Agregar" id="formButton" />
        </div>
      </form>
    </div>
  );
};

export default AddTown;
