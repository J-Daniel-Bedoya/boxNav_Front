import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setOptions } from "../../store/slices/adminOptions.slice";
import { setIsDetail } from "../../store/slices/isDetail.slice";
import getConfig from "../../utils/getConfig";

const SearchUser = () => {
  const { register, handleSubmit, watch } = useForm();
  const dispatch = useDispatch();
  const [suggestions, setSuggestions] = useState([]);
  const userName = watch("userName");

  useEffect(() => {
    if (userName) {
      axios
        .get(
          `https://nav-boxes-lis.up.railway.app/api/v1/user/search?query=${userName}`,
          getConfig()
        )
        .then((res) => setSuggestions(res.data))
        .catch((error) => console.error("Error al buscar usuarios:", error));
    } else {
      setSuggestions([]);
    }
  }, [userName]);

  const onSubmit = (data) => {
    dispatch(setOptions("user"));
    dispatch(setIsDetail(data.userName));
  };

  const handleSuggestionClick = (userName) => {
    dispatch(setOptions("user"));
    dispatch(setIsDetail(userName));
  };

  return (
    <div className="search-user">
      <form onSubmit={handleSubmit(onSubmit)} className="search-user__form">
        <input
          type="text"
          {...register("userName", { required: true })}
          placeholder="Buscar por Usuario"
          className="search-user__input"
        />
        <button type="submit" className="search-user__button">
          Buscar
        </button>
      </form>
      {suggestions.length > 0 && (
        <ul className="search-user__suggestions">
          {suggestions.map((user) => (
            <li
              key={user.id}
              onClick={() => handleSuggestionClick(user.userName)}
            >
              {user.userName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchUser;
