import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../utils/getConfig";

const api = "https://nav-boxes-lis.up.railway.app/api/v1";
// const api = "http://localhost:8000/api/v1";

export const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    setUser: (state, actions) => {
      return actions.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const getUsersThunk = () => async (dispatch) => {
  return await axios.get(`${api}/user/`, getConfig()).then((res) => {
    dispatch(setUser(res.data));
  });
};
export const getUserThunk = (userId) => async (dispatch) => {
  return await axios.get(`${api}/user/${userId}`, getConfig()).then((res) => {
    dispatch(setUser(res.data));
  });
};

export const createUserThunk = (data) => async (dispatch) => {
  return await axios
    .post(`${api}/user`, data, getConfig())
    .then((res) => dispatch(getUsersThunk()));
};

export const updateUserThunk = (userId, data) => async (dispatch) => {
  return await axios
    .put(`${api}/user/${userId}`, data, getConfig())
    .then(dispatch(getUsersThunk()));
};

export const deleteUserThunk = (userId) => async (dispatch) => {
  return await axios
    .delete(`${api}/user/${userId}`, getConfig())
    .then(dispatch(getUsersThunk()))
    .catch((error) => console.log(error));
};

export default userSlice.reducer;
