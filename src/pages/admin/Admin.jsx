import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOptions } from "../../store/slices/adminOptions.slice";
import Add from "../../components/adminC/adminFunctions/Add";
import Edit from "../../components/adminC/adminFunctions/Edit";
import Remove from "../../components/adminC/adminFunctions/Remove";

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const options = useSelector((state) => state.options);

  const [isSelect, setIsSelect] = useState("add");

  const select = (info) => {
    setIsSelect(info);
    dispatch(setOptions(info));
  };

  useEffect(() => {
    setIsSelect(options);
  }, []);

  return (
    <div className="panel">
      <div className="panel__header">
        <div className="logo" id="logoAdmin"></div>
        <div>
          <button onClick={() => select("add")}>Agregar</button>
          <button onClick={() => select("edit")}>Editar</button>
          <button onClick={() => select("remove")}>Eliminar</button>
        </div>
        {isSelect === "add" && <Add />}
        {isSelect === "edit" && <Edit />}
        {isSelect === "remove" && <Remove />}
      </div>
      <div>
        <button onClick={() => navigate("/")}>Exit</button>
      </div>
    </div>
  );
};

export default Admin;
