// SearchUser.js
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import SearchResults from "./SearchResults";
import useSearchUser from "../../hooks/search/useSearchUser";
import { setSearchResults } from "../../store/slices/user.slice";

const SearchUser = () => {
  const { register, watch } = useForm();
  const dispatch = useDispatch();
  const { query, setQuery, results, loading } = useSearchUser();

  const inputValue = watch("username");

  const handleChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value.length === 0) {
      dispatch(setSearchResults([]));
    }
  };

  return (
    <div className="search-user">
      <form className="search-user__form">
        <input
          type="text"
          {...register("username")}
          placeholder="Buscar por Usuario"
          className="search-user__input"
          value={query}
          onChange={handleChange}
        />
        <button
          type="button"
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
