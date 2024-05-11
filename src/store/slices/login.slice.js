import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const api = "nav-boxes-lis.up.railway.app/app/v1";
const navigate = useNavigate();

export const loginSlice = createSlice({
  name: "login",
  initialState: false,
  reducers: {
    setLogin: (state, actions) => {
      return actions.payload;
    },
  },
});

export const { setLogin } = loginSlice.actions;

export const loginThunk = (data) => {
  axios.post(`${api}/auth/login`, data).then((res) => {
    localStorage.setItem("login", data.password);
    localStorage.setItem("token", res.data.token);
    navigate("/admin");
  });
};

export default loginSlice.reducer;
