import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../utils/getConfig";

const api = "https://nav-boxes-lis.up.railway.app/app/v1";

export const townSlice = createSlice({
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
  //   dispatch(setLoading(true));
  return await axios.get(`${api}/town`, getConfig()).then((res) => {
    dispatch(setTown(res.data));
  });
  // .finally(dispatch(setLoading(false)));
};
export const getTownThunk = (townId) => async (dispatch) => {
  return await axios.get(`${api}/town/${townId}`, getConfig()).then((res) => {
    dispatch(setTown(res.data));
  });
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
