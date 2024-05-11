import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const api = "https://nav-boxes-lis.up.railway.app/app/v1";
  const navigate = useNavigate();

  const submit = (data) => {
    axios.post(`${api}/auth/login`, data).then((res) => {
      localStorage.setItem("login", res.data.admin.password);
      localStorage.setItem("token", res.data.token);
    });
    // console.log(da);
    navigate("/admin");
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
