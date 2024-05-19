import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../utils/getConfig";

const api = "https://nav-boxes-lis.up.railway.app/api/v1";

const townSlice = createSlice({
  name: "town",
  initialState: [],
  reducers: {
    setTown: (state, actions) => {
      return actions.payload;
    },
  },
});

export const { setTown } = townSlice.actions;

export const getTownsThunk = () => async (dispatch) => {
  return await axios
    .get(`${api}/town`, getConfig())
    .then((res) => {
      dispatch(setTown(res.data));
      console.log(res.data);
    })
    .catch((error) => console.log(error));
};
export const getTownThunk = (id) => async (dispatch) => {
  return await axios
    .get(`${api}/town/${id}`, getConfig())
    .then((res) => {
      dispatch(setTown(res.data));
      console.log(res);
    })
    .catch((error) => console.log(error));
};

export const createTownThunk = (data) => async (dispatch) => {
  return await axios
    .post(`${api}/town`, data, getConfig())
    .then((res) => dispatch(getTownsThunk()));
};

export const updateTownThunk = (townId, data) => async (dispatch) => {
  return await axios
    .patch(`${api}/town/${townId}`, data, getConfig())
    .then(dispatch(getTownsThunk()));
};

export const deleteTownThunk = (townId) => async (dispatch) => {
  return await axios
    .delete(`${api}/town/${townId}`, getConfig())
    .then(dispatch(getTownsThunk()))
    .catch((error) => console.log(error));
};

export default townSlice.reducer;
