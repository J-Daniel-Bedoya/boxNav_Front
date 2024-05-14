import React from "react";
import { useDispatch } from "react-redux";
import { deleteBoxThunk } from "../../../../../store/slices/box.slice";
import { useForm } from "react-hook-form";

const SelectedBox = ({ boxes }) => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const selectBox = (data) => {
    const id = parseInt(data.boxId);
    dispatch(deleteBoxThunk(id));
  };

  return (
    <form onSubmit={handleSubmit(selectBox)}>
      <div>
        <select name="box" id="box" {...register("boxId")}>
          <option value="">Sector al que pertenece</option>
          {boxes?.map((box) => (
            <option value={box.id} key={box.id}>
              {box.number}
            </option>
          ))}
        </select>
      </div>
      <div>
        <input type="submit" value="Eliminar" />
      </div>
    </form>
  );
};

export default SelectedBox;
