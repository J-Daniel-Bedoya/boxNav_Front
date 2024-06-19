import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import { useDispatch } from "react-redux";

const Edit = ({ setIsViewEdit, userId, id }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [serviceId, setServiceId] = useState(1);
  const [state, setState] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://nav-boxes-lis.up.railway.app/api/v1/user/${userId}`,
        getConfig()
      )
      .then((res) => {
        const userData = res.data;
        reset(userData);
        setServiceId(userData.serviceId);
        setState(userData.state);
        setValue("serviceId", userData.serviceId.toString());
        setValue("state", userData.state.toString());
      })
      .catch((error) => {
        console.error("Error al obtener los datos del usuario:", error);
      });
  }, [userId, reset, setValue]);

  const submit = async (data) => {
    const edit = {
      townId: id,
      sectorId: data.sectorId,
      boxId: data.boxId,
      serviceId: parseInt(data.service),
      userName: `${data.firstName} ${data.lastName}`,
      portNumber: parseInt(data.port),
      tel: data.tel,
      state: data.state === "true" ? true : false,
      coordinates: data.coordinates,
    };

    dispatch(userId, edit);
  };

  // console.log(id);

  return (
    <div className="pagination__add">
      <div className="pagination__add--user">
        <form
          onSubmit={handleSubmit(submit)}
          className="add__form"
          id="user-form"
        >
          <div className="add__form--input">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              name="name"
              {...register("userName")}
              placeholder="Marina Gonzales"
              className="add__form--text"
            />
          </div>
          <div className="add__form--input">
            <label htmlFor="port">Puerto</label>
            <input
              type="number"
              name="port"
              {...register("portNumber")}
              placeholder="1"
              className="add__form--text"
            />
          </div>
          <div className="add__form--input">
            <label>Tipo de Servicio</label>
            <div className="check-flex">
              <div className="add__form--checkbox">
                <label>
                  <input
                    type="radio"
                    value="2"
                    {...register("serviceId")}
                    checked={serviceId === 2}
                    onChange={() => setServiceId(2)}
                  />
                  TV
                </label>
              </div>
              <div className="add__form--checkbox">
                <label>
                  <input
                    type="radio"
                    value="1"
                    {...register("serviceId")}
                    checked={serviceId === 1}
                    onChange={() => setServiceId(1)}
                  />
                  Internet
                </label>
              </div>
              <div className="add__form--checkbox">
                <label>
                  <input
                    type="radio"
                    value="3"
                    {...register("serviceId")}
                    checked={serviceId === 3}
                    onChange={() => setServiceId(3)}
                  />
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
          </div>
          <div className="add__form--input">
            <label htmlFor="coordinates">Dirección</label>
            <input
              type="text"
              name="coordinates"
              {...register("coordinates")}
              placeholder="Serca de la panadería"
              className="add__form--text"
            />
          </div>

          <div className="add__form--buttons">
            <button className="close" onClick={() => setIsViewEdit(false)}>
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
