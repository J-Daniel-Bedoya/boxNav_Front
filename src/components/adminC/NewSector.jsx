import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createSectorThunk } from "../../store/slices/sector.slice";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import AddSector from "./adminOptions/sector/AddSector";
import EditSector from "./adminOptions/sector/EditSector";
import RemoveSector from "./adminOptions/sector/RemoveSector";

const NewSector = ({ option }) => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const submit = (data) => {
    console.log(data);

    dispatch(createSectorThunk(data));
    reset();
  };

  return (
    <div className="sector">
      <Header />
      {option === "add" && <AddSector />}
      {option === "edit" && <EditSector />}
      {option === "remove" && <RemoveSector />}

      <div>
        <button onClick={() => navigate(-1)}>Exit</button>
      </div>
    </div>
  );
};

export default NewSector;
