import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBoxThunk, getBoxesThunk } from "../../../store/slices/box.slice";
import Swal from "sweetalert2";
import {
  getTownThunk,
  getTownPaginationThunk,
} from "../../../store/slices/town.slice";

const useAddBox = (id, currentPage, itemsPerPage, reset, setIsViewAdd) => {
  const dispatch = useDispatch();
  const town = useSelector((state) => state.town.towns);

  useEffect(() => {
    dispatch(getTownThunk(id));
    dispatch(getBoxesThunk(id));
  }, [id, dispatch]);

  const getNextBoxNumber = () => {
    if (town?.boxes?.length > 0) {
      const lastBoxNumber = Math.max(...town.boxes.map((box) => box.numberBox));
      return lastBoxNumber + 1;
    }
    return 1;
  };

  const nextBoxNumber = getNextBoxNumber();

  const formatCoordinates = (value) => {
    return value.replace(/,(\s+)?/g, ".").replace(/\s+/g, ", ");
  };

  const submit = (data) => {
    const formattedCoordinates = formatCoordinates(data.coordinates);
    const create = {
      townId: parseInt(id),
      sectorId: parseInt(data.sectorId),
      numberBox: nextBoxNumber,
      numberPorts: parseInt(data.numberPorts),
      coordinates: formattedCoordinates,
    };
    console.log(create);

    dispatch(createBoxThunk(create)).then(() => {
      reset();
      Swal.fire({
        title: "Caja creada con éxito",
        text: `Haz añadido una nueva caja con el número ${nextBoxNumber}`,
        icon: "success",
        confirmButtonText: "OK",
        timer: 3000,
        timerProgressBar: true,
      }).then((result) => {
        if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
          const offset = (currentPage - 1) * itemsPerPage;
          dispatch(getTownPaginationThunk(id, offset, itemsPerPage));
          setIsViewAdd(false);
        }
      });
    });
  };

  return {
    town,
    submit,
  };
};

export default useAddBox;
