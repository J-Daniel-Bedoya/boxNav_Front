import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createUserThunk } from "../../../store/slices/user.slice";
import Swal from "sweetalert2";

const AddUser = ({ id, setIsViewAdd, dataUser }) => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const submit = (data) => {
    const create = {
      townId: parseInt(id),
      sectorId: dataUser?.sectorId,
      boxId: dataUser.boxId,
      serviceId: parseInt(data.service),
      userName: `${data.firstName} ${data.lastName}`,
      portNumber: parseInt(data.port),
      tel: data.tel,
      state: data.state === "true" ? true : false,
      coordinates: data.coordinates,
    };
    dispatch(createUserThunk(create));
    console.log(create);
    reset();

    Swal.fire({
      title: "Usuario creado con éxito",
      html: `El usuario <strong>${data.firstName} ${data.lastName}</strong> a sido añadido a la base de datos`,
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
        <button
          type="button"
          className="add__form--close"
          onClick={() => setIsViewAdd(false)}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="add__form--input">
          <label htmlFor="firstName">Nombre</label>
          <input
            type="text"
            name="firstName"
            {...register("firstName")}
            placeholder="Carlos"
            className="add__form--text"
          />
        </div>
        <div className="add__form--input">
          <label htmlFor="lastName">Apellido</label>
          <input
            type="text"
            name="lastName"
            {...register("lastName")}
            placeholder="Gonzales"
            className="add__form--text"
          />
        </div>
        <div className="add__form--input">
          <label htmlFor="port">Puerto</label>
          <input
            type="number"
            name="port"
            {...register("port")}
            placeholder="1"
            className="add__form--text"
          />
        </div>
        <div className="add__form--input">
          <label>Tipo de Servicio</label>
          <div className="check-flex">
            <div className="add__form--checkbox">
              <label>
                <input type="radio" value="2" {...register("service")} />
                TV
              </label>
            </div>
            <div className="add__form--checkbox">
              <label>
                <input type="radio" value="1" {...register("service")} />
                Internet
              </label>
            </div>
            <div className="add__form--checkbox">
              <label>
                <input type="radio" value="3" {...register("service")} />
                Combo
              </label>
            </div>
          </div>
        </div>

        <div className="add__form--input">
          <label htmlFor="tel">Celular</label>
          <input
            type="tel"
            name="tel"
            {...register("tel")}
            placeholder="(316)2021020"
            className="add__form--text"
          />
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
                />
                Suspendido
              </label>
            </div>
          </div>
        </div>
        <div className="add__form--input">
          <label htmlFor="coordinates">Coordenadas</label>
          <input
            type="text"
            name="coordinates"
            {...register("coordinates")}
            placeholder="6.2070286 -75.7331088"
            className="add__form--text"
          />
        </div>
        <div className="add__form--input">
          <input type="submit" value="Create" className="add__form--submit" />
        </div>
      </form>
    </div>
  );
};

export default AddUser;
