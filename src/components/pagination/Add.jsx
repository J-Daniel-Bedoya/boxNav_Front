import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSectorsThunk } from "../../store/slices/sector.slice";
import AddBox from "./add/AddBox";
import AddSector from "./add/AddSector";
import AddUser from "./add/AddUser";

const Add = ({ id, dataUser }) => {
  const dispatch = useDispatch();

  const [isViewAdd, setIsViewAdd] = useState(false);
  const options = useSelector((state) => state.options);

  useEffect(() => {
    dispatch(getSectorsThunk());
  }, []);

  return (
    <div className="pagination__add">
      <button onClick={() => setIsViewAdd(true)}>
        <i className="fa-solid fa-plus"></i>
      </button>
      {isViewAdd && options === "box" && (
        <AddBox id={id} setIsViewAdd={setIsViewAdd} />
      )}
      {isViewAdd && options === "sector" && (
        <AddSector id={id} setIsViewAdd={setIsViewAdd} />
      )}
      {isViewAdd && options === "boxDetail" && (
        <AddUser id={id} setIsViewAdd={setIsViewAdd} dataUser={dataUser} />
      )}
    </div>
  );
};

export default Add;
