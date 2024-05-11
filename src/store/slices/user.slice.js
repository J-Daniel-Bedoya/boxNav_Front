import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

export const getUserThunk = () => async (dispatch) => {
  //   dispatch(setLoading(true));
  return await axios.get(`${api}/user/`, getConfig()).then((res) => {
    dispatch(setUser(res.data));
  });
  // .finally(dispatch(setLoading(false)));
};

export const createUserThunk = (data) => async (dispatch) => {
  return await axios
    .post(`${api}/user/`, data, getConfig())
    .then((res) => dispatch(getUserThunk()));
};

export const updateUserThunk = (userId, data) => async (dispatch) => {
  return await axios
    .patch(`${api}/user/${userId}`, data, getConfig())
    .then(dispatch(getUserThunk()));
};

export const deleteUserThunk = (userId) => async (dispatch) => {
  return await axios
    .delete(`${api}/user/${userId}`, getConfig())
    .then(dispatch(getUserThunk()))
    .catch((error) => console.log(error));
};

export default userSlice.reducer;
