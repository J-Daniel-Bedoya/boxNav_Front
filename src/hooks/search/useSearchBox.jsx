import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOptions } from "../../store/slices/adminOptions.slice";
import { setIsDetail } from "../../store/slices/isDetail.slice";

const useSearchBox = () => {
  const dispatch = useDispatch();
  const boxes = useSelector((state) => state.town.towns.boxes);
  const [loading, setLoading] = useState(false);

  const validateBoxExists = (boxNumber) => {
    const box = boxes?.find((box) => box?.numberBox === parseInt(boxNumber));
    return box?.id;
  };

  const searchBox = async (boxNumber, setError) => {
    if (boxNumber <= 0) {
      setError("boxNumber", {
        type: "manual",
        message: "El número de caja no puede ser 0 o negativo",
      });
      return;
    }

    setLoading(true);
    const boxExists = validateBoxExists(boxNumber);
    setLoading(false);

    if (!boxExists) {
      setError("boxNumber", {
        type: "manual",
        message: "La caja no existe",
      });
      return;
    }

    dispatch(setOptions("boxDetail"));
    dispatch(setIsDetail(boxExists));
  };

  return {
    searchBox,
    loading,
  };
};

export default useSearchBox;
