import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import useEditUser from "../../../hooks/crud/edit/useEdit"; // Importa el custom hook
import InputField from "./InputField";
import RadioGroup from "./RadioGroup";

const EditForm = ({ setIsViewEdit, userId, id }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const town = useSelector((state) => state.town);
  const box = useSelector((state) => state.box);

  const { serviceId, state, currentPort, setServiceId, setState, submit } =
    useEditUser(userId, id, reset, setValue);

  const handleFormSubmit = (data) => {
    submit(data);
    setIsViewEdit(false);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="add__form"
      id="user-form"
    >
      <InputField
        label="Nombre"
        name="userName"
        register={register}
        errors={errors}
        placeholder="Nombre Completo"
        validation={{ required: "El nombre es requerido" }}
      />
      <InputField
        label="Puerto"
        name="portNumber"
        type="number"
        register={register}
        errors={errors}
        placeholder="1"
        validation={{
          required: "El puerto es requerido",
          validate: (value) =>
            (value !== 0 &&
              (value === currentPort ||
                !box.users
                  .filter((user) => user.id !== userId)
                  .map((user) => user.portNumber)
                  .includes(parseInt(value)))) ||
            "Este puerto ya está ocupado",
        }}
      />
      <RadioGroup
        label="Tipo de Servicio"
        name="serviceId"
        options={town.service.map((service) => ({
          value: service.id,
          label: service.serviceName,
        }))}
        register={register}
        errors={errors}
        selectedValue={serviceId}
        onChange={setServiceId}
      />
      <InputField
        label="Celular"
        name="tel"
        type="tel"
        register={register}
        errors={errors}
        placeholder="(316)2021020"
        validation={{
          required: "El número de celular es requerido",
          pattern: {
            value: /^[0-9]{10}$/,
            message: "El número de celular debe contener 10 dígitos",
          },
        }}
      />
      <RadioGroup
        label="Estado"
        name="state"
        options={[
          { value: true, label: "Activo" },
          { value: false, label: "Suspendido" },
        ]}
        register={register}
        errors={errors}
        selectedValue={state}
        onChange={setState}
      />
      <InputField
        label="Dirección"
        name="coordinates"
        register={register}
        errors={errors}
        placeholder="Serca de la panadería"
        validation={{ required: "La dirección es requerida" }}
      />
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
  );
};

export default EditForm;
