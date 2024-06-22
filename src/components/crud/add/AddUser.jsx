import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createUserThunk } from "../../../store/slices/user.slice";
import Swal from "sweetalert2";
import { getBoxThunk } from "../../../store/slices/box.slice";

const AddUser = ({ id, setIsViewAdd, dataUser }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const town = useSelector((state) => state.town);
  const box = useSelector((state) => state.box);

  useEffect(() => {
    dispatch(getBoxThunk(id));
  }, [id, dispatch]);

  const occupiedPorts = box.users.map((user) => user.portNumber);
  const maxPorts = box.numberPorts; // Número máximo de puertos (8 o 16)

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

  return (
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
            {...register("lastName", { required: "El apellido es requerido" })}
            placeholder="Apellido"
            className="add__form--text"
          />
          {errors.lastName && <span>{errors.lastName.message}</span>}
        </div>
        <div className="add__form--input">
          <label htmlFor="port">Puerto</label>
          <input
            type="number"
            name="port"
            {...register("port", {
              required: "El puerto es requerido",
              min: { value: 1, message: "El puerto debe ser mayor a 0" },
              max: {
                value: maxPorts,
                message: `El puerto no puede exceder de ${maxPorts}`,
              },
              validate: (value) =>
                !occupiedPorts.includes(parseInt(value)) ||
                "Este puerto ya está ocupado",
            })}
            placeholder="0"
            className="add__form--text"
          />
          {errors.port && <span>{errors.port.message}</span>}
        </div>
        <div className="add__form--input">
          <label>Tipo de Servicio</label>
          <div className="check-flex">
            {town.service.map((service) => (
              <div className="add__form--checkbox" key={service.id}>
                <label>
                  <input
                    type="radio"
                    value={service.id}
                    {...register("service", {
                      required: "Seleccione un servicio",
                    })}
                  />
                  {service.serviceName}
                </label>
              </div>
            ))}
          </div>
          {errors.service && <span>{errors.service.message}</span>}
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
            onClick={() => setIsViewAdd(false)}
          >
            Cancelar
          </button>
          <input type="submit" value="Create" className="submit" />
        </div>
      </form>
    </div>
  );
};

export default AddUser;
