import React from "react";
import axios from "axios";
import getConfig from "../../../../../utils/getConfig";
import { useForm } from "react-hook-form";

const SelectedTown = ({ api, town, setSector, setIsNext }) => {
  const { register, handleSubmit } = useForm();
  const selectTown = (data) => {
    const id = parseInt(data.townId);
    axios.get(`${api}/town/${id}`, getConfig()).then((res) => {
      setSector(res.data.sectors);
    });
    setIsNext("sector");
  };
  return (
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
  );
};

export default SelectedTown;
