import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setOptions } from "../../store/slices/adminOptions.slice";
import { setIsDetail } from "../../store/slices/isDetail.slice";
import getConfig from "../../utils/getConfig";

const SearchBox = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const validateBoxExists = async (boxNumber) => {
    try {
      const res = await axios.get(
        `https://nav-boxes-lis.up.railway.app/api/v1/box/${boxNumber}`,
        getConfig()
      );
      return res.data && res.data.id === parseInt(boxNumber); // Asegurarse de que el ID de la caja coincida con el número buscado
    } catch (error) {
      return false;
    }
  };

  const onSubmit = async (data) => {
    const { boxNumber } = data;

    if (boxNumber <= 0) {
      setError("boxNumber", {
        type: "manual",
        message: "El número de caja no puede ser 0 o negativo",
      });
      return;
    }

    setLoading(true);
    const boxExists = await validateBoxExists(boxNumber);
    setLoading(false);

    if (!boxExists) {
      setError("boxNumber", {
        type: "manual",
        message: "La caja no existe",
      });
      return;
    }

    dispatch(setOptions("boxDetail"));
    dispatch(setIsDetail(boxNumber));
  };

  return (
    <div className="search-box">
      <form onSubmit={handleSubmit(onSubmit)} className="search-box__form">
        <input
          type="text"
          {...register("boxNumber", {
            required: "El número de caja es requerido",
          })}
          placeholder="Buscar por Caja"
          className="search-box__input"
        />
        <button type="submit" className="search-box__button" disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </form>
      {errors.boxNumber && (
        <span className="search-box__error">{errors.boxNumber.message}</span>
      )}
    </div>
  );
};

export default SearchBox;
