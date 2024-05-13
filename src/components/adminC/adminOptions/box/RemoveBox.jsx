import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTownsThunk } from "../../../../store/slices/town.slice";
import { useForm } from "react-hook-form";
import axios from "axios";
import getConfig from "../../../../utils/getConfig";
import { deleteBoxThunk } from "../../../../store/slices/box.slice";

const RemoveBox = () => {
  const town = useSelector((state) => state.town);
  const dispatch = useDispatch();
  const [isNext, setIsNext] = useState("town");
  const [sector, setSector] = useState([]);
  const [boxes, setBoxes] = useState([]);
  const api = "https://nav-boxes-lis.up.railway.app/app/v1";
  const { register, handleSubmit } = useForm();

  const selectTown = (data) => {
    const id = parseInt(data.townId);
    axios.get(`${api}/town/${id}`, getConfig()).then((res) => {
      setSector(res.data.sectors);
    });
    setIsNext("sector");
  };

  const selectSector = (data) => {
    const id = parseInt(data.sectorId);
    axios.get(`${api}/sector/${id}`, getConfig()).then((res) => {
      setBoxes(res.data.boxes);
      console.log(res);
    });
    setIsNext("boxes");
  };

  const selectBox = (data) => {
    const id = parseInt(data.boxId);
    dispatch(deleteBoxThunk(id));
  };

  useEffect(() => {
    dispatch(getTownsThunk());
  }, []);

  return (
    <div>
      {isNext === "town" && (
        <form onSubmit={handleSubmit(selectTown)}>
          <div>
            <select name="town" id="town" {...register("townId")}>
              <option value="">Pueblo al que pertenece</option>
              {town.map((town) => (
                <option value={town.id} key={town.id}>
                  {town.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <input type="submit" value="siguiente" />
          </div>
        </form>
      )}
      {isNext === "sector" && (
        <form onSubmit={handleSubmit(selectSector)}>
          <div>
            <select name="sector" id="sector" {...register("sectorId")}>
              <option value="">Sector al que pertenece</option>
              {sector?.map((sector) => (
                <option
                  onClick={() => dispatch(getSectorThunk(sector.id))}
                  value={sector.id}
                  key={sector.id}
                >
                  {sector.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <input type="submit" value="siguiente" />
          </div>
        </form>
      )}
      {isNext === "boxes" && (
        <form onSubmit={handleSubmit(selectBox)}>
          <div>
            <select name="sector" id="sector" {...register("boxId")}>
              <option value="">Sector al que pertenece</option>
              {boxes?.map((sector) => (
                <option
                  onClick={() => dispatch(getSectorThunk(sector.id))}
                  value={sector.id}
                  key={sector.id}
                >
                  {sector.number}
                </option>
              ))}
            </select>
          </div>
          <div>
            <input type="submit" value="Eliminar" />
          </div>
        </form>
      )}
    </div>
  );
};

export default RemoveBox;
