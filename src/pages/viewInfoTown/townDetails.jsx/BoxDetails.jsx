import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOptions } from "../../../store/slices/adminOptions.slice";
import { getBoxThunk } from "../../../store/slices/box.slice";

const BoxDetails = ({ id }) => {
  const dispatch = useDispatch();
  const box = useSelector((state) => state.box);

  useEffect(() => {
    dispatch(getBoxThunk(id));
  }, [getBoxThunk]);
  console.log(box);

  return (
    <div>
      <h1>Caja {box.numberBox}</h1>
      <div>
        <p>Usuarios</p>
      </div>
      <div>
        <button onClick={() => dispatch(setOptions("box"))}>Atras</button>
      </div>
    </div>
  );
};

export default BoxDetails;
