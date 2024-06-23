import React from "react";

const InputField = ({
  label,
  name,
  register,
  errors,
  placeholder,
  type = "text",
  validation,
}) => (
  <div className="add__form--input">
    <label htmlFor={name}>{label}</label>
    <input
      type={type}
      name={name}
      {...register(name, validation)}
      placeholder={placeholder}
      className="add__form--text"
    />
    {errors[name] && <span>{errors[name].message}</span>}
  </div>
);

export default InputField;
