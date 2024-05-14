import React from "react";
import axios from "axios";
import getConfig from "../../../../../utils/getConfig";
import { useForm } from "react-hook-form";

const SelectedSector = ({ api, sector, setBoxes, setIsNext }) => {
  const { register, handleSubmit } = useForm();
  const selectSector = (data) => {
    const id = parseInt(data.sectorId);
    axios.get(`${api}/sector/${id}`, getConfig()).then((res) => {
      setBoxes(res.data.boxes);
    });
    setIsNext("boxes");
  };
  return (
    <form onSubmit={handleSubmit(selectSector)}>
      <div>
        <select name="sector" id="sector" {...register("sectorId")}>
          <option value="">Sector al que pertenece</option>
          {sector?.map((sector) => (
            <option value={sector.id} key={sector.id}>
              {sector.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <input type="submit" value="Siguiente" />
      </div>
    </form>
  );
};

export default SelectedSector;
