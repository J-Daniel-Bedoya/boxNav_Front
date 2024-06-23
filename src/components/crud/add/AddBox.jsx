import React from "react";
import { useForm } from "react-hook-form";
import useAddBox from "../../../hooks/useAddBox"; // Importa el custom hook

const AddBox = ({ id, setIsViewAdd, currentPage, itemsPerPage }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { town, submit } = useAddBox(
    id,
    currentPage,
    itemsPerPage,
    reset,
    setIsViewAdd
  );

  return (
    <div className="pagination__add--box">
      <form onSubmit={handleSubmit(submit)} className="add__form">
        <div className="add__form--input">
          <label htmlFor="add">Sector</label>
          <select
            name="add"
            {...register("sectorId", {
              required: "Debe seleccionar un sector",
            })}
            className="add__form--select"
          >
            <option value="">Seleccionar</option>
            {town?.sectors?.map((sector) => (
              <option key={sector.id} value={sector.id}>
                {sector.sectorName}
              </option>
            ))}
          </select>
          {errors.sectorId && (
            <span className="error-message">{errors.sectorId.message}</span>
          )}
          {!town?.sectors?.length && (
            <span className="error-message">Debe crear un nuevo sector</span>
          )}
        </div>
        <div className="add__form--input">
          <label htmlFor="ports">Número de puertos</label>
          <div className="add__form--checkbox">
            <label htmlFor="ports8">
              <input
                type="radio"
                id="ports8"
                name="ports"
                value="8"
                {...register("numberPorts", {
                  required: "Debe seleccionar el número de puertos",
                })}
              />
              8
            </label>
          </div>
          <div className="add__form--checkbox">
            <label htmlFor="ports16">
              <input
                type="radio"
                id="ports16"
                name="ports"
                value="16"
                {...register("numberPorts", {
                  required: "Debe seleccionar el número de puertos",
                })}
              />
              16
            </label>
          </div>
          {errors.numberPorts && (
            <span className="error-message">{errors.numberPorts.message}</span>
          )}
        </div>
        <div className="add__form--input">
          <label htmlFor="coordinates">Coordenadas</label>
          <input
            type="text"
            id="coordinates"
            placeholder="6,2077917 -75,7328986"
            {...register("coordinates", {
              required: "Las coordenadas son requeridas",
              pattern: {
                value: /^[-+]?[\d.,\s-]+$/,
                message: "Formato de coordenadas inválido",
              },
            })}
            className="add__form--text"
          />
          {errors.coordinates && (
            <span className="error-message">{errors.coordinates.message}</span>
          )}
        </div>
        <div className="add__form--buttons">
          <button
            type="button"
            className="close"
            onClick={() => setIsViewAdd(false)}
          >
            Cancelar
          </button>
          <input type="submit" value="Crear" className="submit" />
        </div>
      </form>
    </div>
  );
};

export default AddBox;
