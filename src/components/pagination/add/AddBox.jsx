import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { createBoxThunk } from "../../../store/slices/box.slice";

const AddBox = ({ id, setIsViewAdd }) => {
  const { register, handleSubmit, reset } = useForm();
  const sectors = useSelector((state) => state.sector);
  const dispatch = useDispatch();

  const submit = (data) => {
    const create = {
      townId: parseInt(id),
      sectorId: parseInt(data.sectorId),
      numberPorts: parseInt(data.numberPorts[0]),
      coordinates: data.coordinates,
    };
    dispatch(createBoxThunk(create));
    reset();
    setIsViewAdd(false);
  };
  const closeForm = () => {
    setIsViewAdd(false);
  };

  return (
    <div className="pagination__add--box">
      <form onSubmit={handleSubmit(submit)} className="add__form">
        <button type="button" className="add__form--close" onClick={closeForm}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="add__form--input">
          <label htmlFor="add">Sector</label>
          <select
            name="add"
            {...register("sectorId")}
            className="add__form--select"
          >
            <option value="">Seleccionar</option>
            {sectors?.map((sector) => (
              <option key={sector.id} value={sector.id}>
                {sector.sectorName}
              </option>
            ))}
          </select>
        </div>
        <div className="add__form--input">
          <label htmlFor="ports">Número de puertos</label>
          <div className="add__form--checkbox">
            <label htmlFor="ports8">
              <input
                type="checkbox"
                id="ports8"
                name="ports"
                value="8"
                {...register("numberPorts")}
              />
              8
            </label>
          </div>
          <div className="add__form--checkbox">
            <label htmlFor="ports16">
              <input
                type="checkbox"
                id="ports16"
                name="ports"
                value="16"
                {...register("numberPorts")}
              />
              16
            </label>
          </div>
        </div>
        <div className="add__form--input">
          <label htmlFor="coordinates">Coordenadas {"(opcional)"}</label>
          <input
            type="text"
            id="coordinates"
            placeholder="6.2070286 -75.7331088"
            {...register("coordinates")}
            className="add__form--text"
          />
        </div>
        <div className="add__form--input">
          <input type="submit" value="Crear" className="add__form--submit" />
        </div>
      </form>
    </div>
  );
};

export default AddBox;
