import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../utils/getConfig";

const api = "https://nav-boxes-lis.up.railway.app/app/v1";

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
  //   dispatch(setLoading(true));
  return await axios.get(`${api}/user/`, getConfig()).then((res) => {
    dispatch(setUser(res.data));
  });
  // .finally(dispatch(setLoading(false)));
};
export const getUserThunk = (userId) => async (dispatch) => {
  return await axios.get(`${api}/user/${userId}`, getConfig()).then((res) => {
    dispatch(setUser(res.data));
  });
};

export const createUserThunk = (data) => async (dispatch) => {
  return await axios
    .post(`${api}/user/`, data, getConfig())
    .then((res) => dispatch(getUsersThunk()));
};

export const updateUserThunk = (userId, data) => async (dispatch) => {
  return await axios
    .patch(`${api}/user/${userId}`, data, getConfig())
    .then(dispatch(getUsersThunk()));
};

export const deleteUserThunk = (userId) => async (dispatch) => {
  return await axios
    .delete(`${api}/user/${userId}`, getConfig())
    .then(dispatch(getUsersThunk()))
    .catch((error) => console.log(error));
};

export default userSlice.reducer;
