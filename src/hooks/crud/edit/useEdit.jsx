import { useEffect, useState } from "react";
import axios from "axios";
import getConfig from "../../../utils/getConfig";
import { useDispatch, useSelector } from "react-redux";
import { updateUserThunk } from "../../../store/slices/user.slice";

const api = "https://nav-boxes-lis.up.railway.app/api/v1";

const useEditUser = (userId, id, reset, setValue) => {
  const dispatch = useDispatch();
  const [serviceId, setServiceId] = useState(null);
  const [state, setState] = useState(null);
  const [sectorId, setSectorId] = useState(0);
  const [boxId, setBoxId] = useState(0);
  const [currentPort, setCurrentPort] = useState(null);
  const box = useSelector((state) => state.box);

  useEffect(() => {
    axios
      .get(`${api}/user/${userId}`, getConfig())
      .then((res) => {
        const userData = res.data;
        setValue("userName", userData.userName);
        setValue("portNumber", userData.portNumber);
        setCurrentPort(userData.portNumber);
        setValue("tel", userData.tel);
        setValue("coordinates", userData.coordinates);
        setServiceId(userData.serviceId);
        setState(userData.state);
        setSectorId(userData.sectorId);
        setBoxId(userData.boxId);
      })
      .catch((error) => {
        console.error("Error al obtener los datos del usuario:", error);
      });
  }, [userId, reset, setValue]);

  const submit = async (data) => {
    const camelCaseName = data.userName
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    const edit = {
      townId: parseInt(id),
      sectorId: sectorId,
      boxId: boxId,
      serviceId: data.serviceId ? parseInt(data.serviceId) : serviceId,
      userName: camelCaseName,
      portNumber: parseInt(data.portNumber),
      tel: parseInt(data.tel),
      state: data.state ? data.state === "true" : state,
      coordinates: data.coordinates,
    };

    dispatch(updateUserThunk(userId, edit));
  };
  const occupiedPorts = box.users.map((user) => user.portNumber);
  const badPorts = box.ports.map((port) => port.port);
  const maxPorts = box.numberPorts;

  return {
    serviceId,
    state,
    sectorId,
    boxId,
    currentPort,
    setServiceId,
    setState,
    submit,
    occupiedPorts,
    badPorts,
    maxPorts,
  };
};

export default useEditUser;
