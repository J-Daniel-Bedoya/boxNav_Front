import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const api = "https://nav-boxes-lis.up.railway.app/api/v1";
  const navigate = useNavigate();

  const submit = async (data) => {
    try {
      const res = await axios.post(`${api}/auth/login`, data);
      localStorage.setItem("login", res.data.admin.password);
      localStorage.setItem("token", res.data.token);
      navigate("/start");
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 404)
      ) {
        setError("apiError", {
          type: "manual",
          message: "Credenciales incorrectas",
        });
      } else {
        setError("apiError", {
          type: "manual",
          message: "Credenciales incorrectas",
        });
      }
    }
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

        <input type="submit" value="Ingresar" className="login__form--button" />
      </form>
    </div>
  );
};

export default Login;
