import React from "react";

const RadioGroup = ({
  label,
  name,
  options,
  register,
  errors,
  selectedValue,
  onChange,
}) => (
  <div className="add__form--input">
    <label>{label}</label>
    <div className="check-flex">
      {options.map((option) => (
        <div key={option.value} className="add__form--checkbox">
          <label>
            <input
              type="radio"
              value={option.value}
              {...register(name)}
              checked={selectedValue === option.value}
              onChange={() => onChange(option.value)}
            />
            {option.label}
          </label>
        </div>
      ))}
    </div>
    {errors[name] && <span>{errors[name].message}</span>}
  </div>
);

export default RadioGroup;
