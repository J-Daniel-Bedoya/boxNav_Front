import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUserThunk } from "../../../store/slices/user.slice";
import { getBoxThunk } from "../../../store/slices/box.slice";
import Swal from "sweetalert2";

const useAddUser = (id, dataUser, reset, setIsViewAdd) => {
  const dispatch = useDispatch();
  const town = useSelector((state) => state.town.towns);
  const box = useSelector((state) => state.box);

  useEffect(() => {
    dispatch(getBoxThunk(id));
  }, [id, dispatch]);

  const occupiedPorts = box.users.map((user) => user.portNumber);
  const badPorts = box.ports.map((port) => port.port);
  const maxPorts = box.numberPorts;

  const toCamelCase = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const submit = (data) => {
    const camelCaseFirstName = toCamelCase(data.firstName);
    const camelCaseLastName = toCamelCase(data.lastName);

    if (occupiedPorts.includes(parseInt(data.port))) {
      Swal.fire({
        title: "Error",
        text: `El puerto ${data.port} ya está ocupado.`,
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (badPorts.includes(parseInt(data.port))) {
      Swal.fire({
        title: "Error",
        text: `El puerto ${data.port} está reportado como malo.`,
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (parseInt(data.port) > maxPorts) {
      Swal.fire({
        title: "Error",
        text: `El puerto ${data.port} excede el número máximo de puertos (${maxPorts}).`,
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const create = {
      townId: parseInt(id),
      sectorId: dataUser?.sectorId,
      boxId: dataUser.boxId,
      serviceId: parseInt(data.service),
      userName: `${camelCaseFirstName} ${camelCaseLastName}`,
      portNumber: parseInt(data.port),
      tel: parseInt(data.tel),
      state: data.state === "true" ? true : false,
      coordinates: data.coordinates,
    };

    dispatch(createUserThunk(create));
    reset();

    Swal.fire({
      title: "Usuario creado con éxito",
      html: `El usuario <strong>${camelCaseFirstName} ${camelCaseLastName}</strong> ha sido añadido a la base de datos`,
      icon: "success",
      confirmButtonText: "OK",
      timer: 5000,
      timerProgressBar: true,
    }).then((result) => {
      if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
        setIsViewAdd(false);
      }
    });
  };

  return {
    town,
    occupiedPorts,
    badPorts,
    maxPorts,
    submit,
  };
};

export default useAddUser;
