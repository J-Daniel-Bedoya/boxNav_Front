import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import { useDispatch, useSelector } from "react-redux";

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
  const [serviceId, setServiceId] = useState(1);
  const [state, setState] = useState(false);
  const town = useSelector((state) => state.town);
  const box = useSelector((state) => state.box);

  useEffect(() => {
    axios
      .get(`${api}/user/${userId}`, getConfig())
      .then((res) => {
        console.log(res.data);
        const userData = res.data;
        const [firstName, lastName] = userData.userName.split(" ");
        setValue("firstName", firstName);
        setValue("lastName", lastName);
        setValue("portNumber", userData.portNumber);
        setValue("tel", userData.tel);
        setValue("coordinates", userData.coordinates);
        setServiceId(userData.serviceId);
        setState(userData.state);
      })
      .catch((error) => {
        console.error("Error al obtener los datos del usuario:", error);
      });
  }, [userId, reset, setValue]);

  const occupiedPorts = box.users.map((user) => user.portNumber);

  const submit = async (data) => {
    const camelCaseName = `${
      data.firstName[0].toUpperCase() + data.firstName.slice(1).toLowerCase()
    } ${data.lastName[0].toUpperCase() + data.lastName.slice(1).toLowerCase()}`;

    const edit = {
      townId: id,
      sectorId: data.sectorId,
      boxId: data.boxId,
      serviceId: parseInt(data.serviceId),
      userName: camelCaseName,
      portNumber: parseInt(data.portNumber),
      tel: data.tel,
      state: data.state === "true" ? true : false,
      coordinates: data.coordinates,
    };

    if (edit.portNumber === 0 || occupiedPorts.includes(edit.portNumber)) {
      alert("El puerto no puede ser 0 o ya está ocupado.");
      return;
    }

    dispatch(userId, edit);
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
            <label htmlFor="firstName">Nombre</label>
            <input
              type="text"
              name="firstName"
              {...register("firstName", { required: "El nombre es requerido" })}
              placeholder="Nombre"
              className="add__form--text"
            />
            {errors.firstName && <span>{errors.firstName.message}</span>}
          </div>
          <div className="add__form--input">
            <label htmlFor="lastName">Apellido</label>
            <input
              type="text"
              name="lastName"
              {...register("lastName", {
                required: "El apellido es requerido",
              })}
              placeholder="Apellido"
              className="add__form--text"
            />
            {errors.lastName && <span>{errors.lastName.message}</span>}
          </div>
          <div className="add__form--input">
            <label htmlFor="portNumber">Puerto</label>
            <input
              type="number"
              name="portNumber"
              {...register("portNumber", {
                required: "El puerto es requerido",
                validate: (value) =>
                  (value !== 0 && !occupiedPorts.includes(parseInt(value))) ||
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
              <div className="add__form--checkbox">
                <label>
                  <input
                    type="radio"
                    value={town.service[0].id}
                    {...register("serviceId", {
                      required: "Seleccione un servicio",
                    })}
                    checked={serviceId === town.service[0].id}
                    onChange={() => setServiceId(town.service[0].id)}
                  />
                  TV
                </label>
              </div>
              <div className="add__form--checkbox">
                <label>
                  <input
                    type="radio"
                    value={town.service[1].id}
                    {...register("serviceId", {
                      required: "Seleccione un servicio",
                    })}
                    checked={serviceId === town.service[1].id}
                    onChange={() => setServiceId(town.service[1].id)}
                  />
                  Internet
                </label>
              </div>
              <div className="add__form--checkbox">
                <label>
                  <input
                    type="radio"
                    value={town.service[2].id}
                    {...register("serviceId", {
                      required: "Seleccione un servicio",
                    })}
                    checked={serviceId === town.service[2].id}
                    onChange={() => setServiceId(town.service[2].id)}
                  />
                  Combo
                </label>
              </div>
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
                    {...register("state", { required: "Seleccione el estado" })}
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
                    {...register("state", { required: "Seleccione el estado" })}
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
