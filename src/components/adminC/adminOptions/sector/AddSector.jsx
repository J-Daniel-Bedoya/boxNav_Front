import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createSectorThunk } from "../../../../store/slices/sector.slice";
import { getTownsThunk } from "../../../../store/slices/town.slice";
import { useNavigate } from "react-router-dom";

const AddSector = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const town = useSelector((state) => state.town);
  const navigate = useNavigate();

  const submit = (data) => {
    const sector = {
      townId: parseInt(data.address),
      name: data.name,
      boxesNumber: 0,
      usersNumber: 0,
    };
    dispatch(createSectorThunk(sector));
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getTownsThunk());
  }, []);

  return (
    <div>
      <h1>Agregar un nuevo sector</h1>
      <form onSubmit={handleSubmit(submit)} className="sector__form">
        <div className="sector__form--input">
          <select name="box" {...register("address")}>
            <option value="">Selecciona un pueblo</option>
            {town.map((town) => (
              <option key={town.id} value={town.id}>
                {town.name}
              </option>
            ))}
          </select>
        </div>
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
