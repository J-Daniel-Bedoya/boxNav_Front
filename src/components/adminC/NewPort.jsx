import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import AddPort from "./adminOptions/port/AddPort";
import EditPort from "./adminOptions/port/EditPort";
import RemovePort from "./adminOptions/port/RemovePort";

const NewPort = ({ option }) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submit = (data) => {
    const i = data;
  };

  return (
    <div className="port">
      <Header />
      {option === "add" && <AddPort />}
      {option === "edit" && <EditPort />}
      {option === "remove" && <RemovePort />}

      <div>
        <button onClick={() => navigate(-1)}>Exit</button>
      </div>
    </div>
  );
};

export default NewPort;
