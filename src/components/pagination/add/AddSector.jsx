import React from "react";
import { useForm } from "react-hook-form";
import { createSectorThunk } from "../../../store/slices/sector.slice";

const AddSector = ({ id, setIsViewAdd }) => {
  const { register, handleSubmit, reset } = useForm();

  const submit = (data) => {
    const create = {
      townId: parseInt(id),
      sectorName: data.name,
    };
    dispatch(createSectorThunk(create));
    reset();
    setIsViewAdd(false);
  };

  const closeForm = () => {
    setIsViewAdd(false);
  };

  return (
    <div className="pagination__add--sector">
      <form onSubmit={handleSubmit(submit)} className="add__form">
        <button type="button" className="add__form--close" onClick={closeForm}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="add__form--input">
          <label htmlFor="sector">Digite el nombre del sector</label>
          <input
            type="text"
            name="sector"
            {...register("numberPorts")}
            placeholder="El Parque"
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

export default AddSector;
