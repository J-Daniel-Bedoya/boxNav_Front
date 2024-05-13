import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import AddUser from "./adminOptions/user/AddUser";
import EditUser from "./adminOptions/user/EditUser";
import RemoveUser from "./adminOptions/user/RemoveUser";

const NewUser = ({ option }) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submit = (data) => {
    const i = data;
  };

  return (
    <div className="user">
      <Header />
      {option === "add" && <AddUser />}
      {option === "edit" && <EditUser />}
      {option === "remove" && <RemoveUser />}
      <div>
        <button onClick={() => navigate(-1)}>Exit</button>
      </div>
    </div>
  );
};

export default NewUser;
