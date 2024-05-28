import React from "react";
import { useDispatch } from "react-redux";
import { setOptions } from "../../../store/slices/adminOptions.slice";

const SectorDetails = ({ id }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Sector {id}</h1>
      <div>
        <button onClick={() => dispatch(setOptions("sector"))}>Atras</button>
      </div>
    </div>
  );
};

export default SectorDetails;
