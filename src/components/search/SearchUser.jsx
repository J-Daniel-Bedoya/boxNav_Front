import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import SearchResults from "./SearchResults";
import useSearchUser from "../../hooks/search/useSearchUser";
import { setSearchResults } from "../../store/slices/user.slice";

const SearchUser = () => {
  const { register, handleSubmit, watch } = useForm();
  const dispatch = useDispatch();
  const { query, setQuery, results, loading, fetchResults } = useSearchUser();

  const onSubmit = (data) => {
    // Limpiar resultados antes de realizar una nueva búsqueda
    dispatch(setSearchResults([]));
    fetchResults(data.username);
  };

  const inputValue = watch("username");

  return (
    <div className="search-user">
      <form className="search-user__form" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("username")}
          placeholder="Buscar por Usuario"
          className="search-user__input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="search-user__button"
          disabled={loading}
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </form>
      {inputValue && results.length > 0 && <SearchResults results={results} />}
    </div>
  );
};

export default SearchUser;
