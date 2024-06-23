// SearchResults.js
import React from "react";
import { useDispatch } from "react-redux";
import { setOptions } from "../../store/slices/adminOptions.slice";
import { setIsDetail } from "../../store/slices/isDetail.slice";

const SearchResults = ({ results }) => {
  const dispatch = useDispatch();

  const handleClick = (userId) => {
    dispatch(setOptions("userDetail"));
    dispatch(setIsDetail(userId));
  };

  return (
    <ul className="search-user__list">
      {results.map((user) => (
        <li
          key={user.id}
          className="search-user__item"
          onClick={() => handleClick(user.id)}
        >
          {user.userName}
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
