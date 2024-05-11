import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginThunk } from "../../store/slices/login.slice";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const submit = (data) => {
    dispatch(loginThunk(data));
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit(submit)} className="login__form">
        <div className="login__form--logo"></div>

        <div className="login__form--input">
          <label htmlFor="email">Email</label>
          <br />
          <input type="email" id="email" {...register("email")} />
        </div>
        <br />
        <div className="login__form--input">
          <label htmlFor="password">Password</label>
          <br />
          <input type="text" id="password" {...register("password")} />
        </div>

        <input type="submit" value="Ingresar" className="login__form--button" />
      </form>
    </div>
  );
};

export default Login;
