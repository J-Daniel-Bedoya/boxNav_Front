import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createTownThunk } from "../../store/slices/town.slice";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import AddTown from "./adminOptions/town/AddTown";
import EditTown from "./adminOptions/town/EditTown";
import RemoveTown from "./adminOptions/town/RemoveTown";

const NewTown = ({ option }) => {
  const { register, handleSubmit, reset } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = (data) => {
    dispatch(createTownThunk(data));
    reset();
  };

  return (
    <div className="town">
      <Header />
      {option === "add" && <AddTown />}
      {option === "edit" && <EditTown />}
      {option === "remove" && <RemoveTown />}
      <div>
        <button onClick={() => navigate(-1)}>Exit</button>
      </div>
    </div>
  );
};

export default NewTown;
