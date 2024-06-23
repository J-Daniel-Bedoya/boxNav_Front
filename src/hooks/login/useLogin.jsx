import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const api = "https://nav-boxes-lis.up.railway.app/api/v1";

  const login = async (data, setError) => {
    setLoading(true);
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
          message: "Error en la autenticación. Intente nuevamente.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
  };
};

export default useLogin;
