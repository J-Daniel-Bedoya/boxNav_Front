import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTownsThunk } from "../../../../store/slices/town.slice";
import SelectedTown from "./formsRemove/SelectedTown";
import SelectedSector from "./formsRemove/SelectedSector";
import SelectedBox from "./formsRemove/SelectedBox";

const RemoveBox = () => {
  const town = useSelector((state) => state.town);
  const dispatch = useDispatch();
  const [isNext, setIsNext] = useState("town");
  const [sector, setSector] = useState([]);
  const [boxes, setBoxes] = useState([]);
  const api = "https://nav-boxes-lis.up.railway.app/app/v1";

  useEffect(() => {
    dispatch(getTownsThunk());
  }, []);
  return (
    <div>
      {isNext === "town" && (
        <SelectedTown
          api={api}
          town={town}
          setSector={setSector}
          setIsNext={setIsNext}
        />
      )}
      {isNext === "sector" && (
        <SelectedSector
          api={api}
          sector={sector}
          setBoxes={setBoxes}
          setIsNext={setIsNext}
        />
      )}
      {isNext === "boxes" && <SelectedBox api={api} boxes={boxes} />}
    </div>
  );
};

export default RemoveBox;
