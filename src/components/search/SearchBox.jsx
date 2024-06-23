import React from "react";
import { useForm } from "react-hook-form";
import useSearchBox from "../../hooks/search/useSearchBox";

const SearchBox = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const { searchBox, loading } = useSearchBox();

  const onSubmit = (data) => {
    searchBox(data.boxNumber, setError);
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
