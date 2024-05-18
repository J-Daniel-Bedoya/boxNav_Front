import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTownThunk } from "../../store/slices/town.slice";

const TownInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const town = useSelector((state) => state.town.boxes);

  useEffect(() => {
    dispatch(getTownThunk(id));
    // set
  }, []);

  console.log(town);

  return (
    <div>
      {town?.map((box) => (
        <div key={box.id} box={box.id}>
          <p>{box.name}</p>
        </div>
      ))}
    </div>
  );
};

export default TownInfo;
