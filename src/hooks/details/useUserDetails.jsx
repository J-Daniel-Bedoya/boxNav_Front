// useUserDetails.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserThunk, getUserThunk } from "../../store/slices/user.slice";
import { getBoxThunk } from "../../store/slices/box.slice";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import { setOptions } from "../../store/slices/adminOptions.slice";
import Swal from "sweetalert2";

const api = "https://nav-boxes-lis.up.railway.app/api/v1";

export const useUserDetails = (isDetail) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.users);
  const box = useSelector((state) => state.box);
  const [service, setService] = useState("");
  const [sector, setSector] = useState("");
  const [isViewEdit, setIsViewEdit] = useState(false);

  useEffect(() => {
    if (isDetail) {
      dispatch(getUserThunk(isDetail));
    }
  }, [isDetail, dispatch]);

  useEffect(() => {
    if (user && user.boxId) {
      dispatch(getBoxThunk(user.boxId));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (user && user.sectorId) {
      axios.get(`${api}/sector/${user.sectorId}`, getConfig()).then((res) => {
        setSector(res.data);
      });
    }
  }, [user, api]);

  useEffect(() => {
    if (user && user.serviceId) {
      axios.get(`${api}/service/${user.serviceId}`, getConfig()).then((res) => {
        setService(res.data.serviceName);
      });
    }
  }, [user, api]);

  const trash = (id, name) => {
    Swal.fire({
      title: "Eliminar usuario",
      html: `¿Estás seguro de que quieres eliminar al usuario <strong>${name}</strong>?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUserThunk(id)).then(() => {
          dispatch(setOptions("user"));
          Swal.fire({
            title: "Usuario eliminado",
            html: `El usuario <strong>${name}</strong> ha sido eliminado con éxito`,
            icon: "success",
            confirmButtonText: "OK",
            timer: 4000,
            timerProgressBar: true,
          });
        });
      }
    });
  };

  return { user, box, service, sector, isViewEdit, setIsViewEdit, trash };
};
