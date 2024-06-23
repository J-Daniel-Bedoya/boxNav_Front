import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useLogin from "../../hooks/login/useLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useLogin();

  const submit = (data) => {
    login(data, setError);
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit(submit)} className="login__form">
        <div className="login__form--logo"></div>

        <div className="login__form--input">
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            id="email"
            {...register("email", { required: "El correo es requerido" })}
            onFocus={() => clearErrors("apiError")} // Clear apiError on focus
          />
          {errors.email && (
            <span className="error-message">{errors.email.message}</span>
          )}
        </div>
        <br />
        <div className="login__form--input">
          <label htmlFor="password">Password</label>
          <br />
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password", {
                required: "La contraseña es requerida",
              })}
              onFocus={() => clearErrors("apiError")} // Clear apiError on focus
            />
            <button
              type="button"
              className="show-password-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <i className="fa-regular fa-eye-slash"></i>
              ) : (
                <i className="fa-regular fa-eye"></i>
              )}
            </button>
          </div>
          {errors.password && (
            <span className="error-message">{errors.password.message}</span>
          )}
        </div>
        {errors.apiError && (
          <span className="error-message">{errors.apiError.message}</span>
        )}

        <input
          type="submit"
          value={loading ? "Ingresando..." : "Ingresar"}
          className="login__form--button"
          disabled={loading}
        />
      </form>
    </div>
  );
};

export default Login;
