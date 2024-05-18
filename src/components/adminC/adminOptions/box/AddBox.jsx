import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getTownsThunk } from "../../../../store/slices/town.slice";

const AddBox = () => {
  const dispatch = useDispatch();
  const api = "https://nav-boxes-lis.up.railway.app/api/v1";
  const town = useSelector((state) => state.town);

  const submit = (id) => {
    axios.get(`${api}/town/${id}`).then((res) => {
      setBoxes(res.data);
    });
  };

  useEffect(() => {
    dispatch(getTownsThunk());
  }, []);

  console.log(town);

  return (
    <div>
      {town?.map((town) => (
        <p key={town.id} onClick={() => submit(town.id)}>
          {town.name}
        </p>
      ))}
    </div>
  );
};

export default AddBox;
