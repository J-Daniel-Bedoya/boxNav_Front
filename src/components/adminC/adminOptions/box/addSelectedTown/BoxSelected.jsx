import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createBoxThunk } from "../../../../../store/slices/box.slice";
import { getTownsThunk } from "../../../../../store/slices/town.slice";
import { useNavigate } from "react-router-dom";
import { getSectorsThunk } from "../../../../../store/slices/sector.slice";

const BoxSelected = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const town = useSelector((state) => state.town);
  const sector = useSelector((state) => state.sector);

  const submit = (data) => {
    const box = {
      townId: parseInt(data.address1),
      number: parseInt(data.number),
      portsNumber: parseInt(data.ports),
      portsUsed: 0,
      portsBad: 0,
      sectorId: parseInt(data.address2),
      imgAddress: "",
    };
    dispatch(createBoxThunk(box));
    navigate(-1);
  };
  useEffect(() => {
    dispatch(getTownsThunk());
    dispatch(getSectorsThunk());
  }, []);

  return (
    <div>
      <h1>Nueva Caja Nav</h1>
      <form onSubmit={handleSubmit(submit)} className="box__form">
        <div className="box__form--input">
          <select name="box" {...register("address1")}>
            <option value="">Selecciona un pueblo</option>
            {town.map((town) => (
              <option key={town.id} value={town.id}>
                {town.name}
              </option>
            ))}
          </select>
        </div>
        <div className="box__form--input">
          <input
            type="number"
            placeholder="Numero identificador"
            {...register("number")}
          />
        </div>
        <div className="box__form--input">
          <input
            type="number"
            placeholder="Numero de puertos"
            {...register("ports")}
          />
        </div>
        <div className="box__form--input">
          <select name="box" {...register("address2")}>
            <option value="">Selecciona un sector</option>
            {sector.map((sector) => (
              <option key={sector.id} value={sector.id}>
                {sector.name}
              </option>
            ))}
          </select>
        </div>

        <div className="box__form--input">
          <input type="submit" value="Registrar" id="formButton" />
        </div>
      </form>
    </div>
  );
};

export default BoxSelected;
