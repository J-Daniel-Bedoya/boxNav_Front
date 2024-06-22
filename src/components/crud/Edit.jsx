import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import { useDispatch, useSelector } from "react-redux";
import { updateUserThunk } from "../../store/slices/user.slice"; // Importación correcta de updateUserThunk

const Edit = ({ setIsViewEdit, userId, id }) => {
  const dispatch = useDispatch();
  const api = "https://nav-boxes-lis.up.railway.app/api/v1";
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [serviceId, setServiceId] = useState(null);
  const [state, setState] = useState(null);
  const [sectorId, setSectorId] = useState(0);
  const [boxId, setBoxId] = useState(0);
  const town = useSelector((state) => state.town);
  const box = useSelector((state) => state.box);
  const [currentPort, setCurrentPort] = useState(null);

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

    console.log(userId);

    const occupiedPorts = box.users
      .filter((user) => user.id !== userId) // Excluir al usuario actual
      .map((user) => user.portNumber);

    if (edit.portNumber === 0 || occupiedPorts.includes(edit.portNumber)) {
      alert("El puerto no puede ser 0 o ya está ocupado.");
      return;
    }

    dispatch(updateUserThunk(userId, edit));
    setIsViewEdit(false);
  };

  return (
    <div className="pagination__add">
      <div className="pagination__add--user">
        <form
          onSubmit={handleSubmit(submit)}
          className="add__form"
          id="user-form"
        >
          <div className="add__form--input">
            <label htmlFor="userName">Nombre</label>
            <input
              type="text"
              name="userName"
              {...register("userName", { required: "El nombre es requerido" })}
              placeholder="Nombre Completo"
              className="add__form--text"
            />
            {errors.userName && <span>{errors.userName.message}</span>}
          </div>
          <div className="add__form--input">
            <label htmlFor="portNumber">Puerto</label>
            <input
              type="number"
              name="portNumber"
              {...register("portNumber", {
                required: "El puerto es requerido",
                validate: (value) =>
                  (value !== 0 &&
                    (value === currentPort ||
                      !box.users
                        .filter((user) => user.id !== userId)
                        .map((user) => user.portNumber)
                        .includes(parseInt(value)))) ||
                  "Este puerto ya está ocupado",
              })}
              placeholder="1"
              className="add__form--text"
            />
            {errors.portNumber && <span>{errors.portNumber.message}</span>}
          </div>
          <div className="add__form--input">
            <label>Tipo de Servicio</label>
            <div className="check-flex">
              {town.service.map((service) => (
                <div key={service.id} className="add__form--checkbox">
                  <label>
                    <input
                      type="radio"
                      value={service.id}
                      {...register("serviceId")}
                      checked={serviceId === service.id}
                      onChange={() => setServiceId(service.id)}
                    />
                    {service.serviceName}
                  </label>
                </div>
              ))}
            </div>
            {errors.serviceId && <span>{errors.serviceId.message}</span>}
          </div>
          <div className="add__form--input">
            <label htmlFor="tel">Celular</label>
            <input
              type="tel"
              name="tel"
              {...register("tel", {
                required: "El número de celular es requerido",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "El número de celular debe contener 10 dígitos",
                },
              })}
              placeholder="(316)2021020"
              className="add__form--text"
            />
            {errors.tel && <span>{errors.tel.message}</span>}
          </div>
          <div className="add__form--input">
            <label htmlFor="state">Estado</label>
            <div className="check-flex">
              <div className="add__form--checkbox">
                <label htmlFor="stateA">
                  <input
                    type="radio"
                    id="stateA"
                    name="state"
                    {...register("state")}
                    value="true"
                    checked={state === true}
                    onChange={() => setState(true)}
                  />
                  Activo
                </label>
              </div>
              <div className="add__form--checkbox">
                <label htmlFor="stateS">
                  <input
                    type="radio"
                    id="stateS"
                    name="state"
                    {...register("state")}
                    value="false"
                    checked={state === false}
                    onChange={() => setState(false)}
                  />
                  Suspendido
                </label>
              </div>
            </div>
            {errors.state && <span>{errors.state.message}</span>}
          </div>
          <div className="add__form--input">
            <label htmlFor="coordinates">Dirección</label>
            <input
              type="text"
              name="coordinates"
              {...register("coordinates", {
                required: "La dirección es requerida",
              })}
              placeholder="Serca de la panadería"
              className="add__form--text"
            />
            {errors.coordinates && <span>{errors.coordinates.message}</span>}
          </div>

          <div className="add__form--buttons">
            <button
              type="button"
              className="close"
              onClick={() => setIsViewEdit(false)}
            >
              Cancelar
            </button>
            <input type="submit" value="Editar" className="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
