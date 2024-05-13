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

export const getTownThunk = () => async (dispatch) => {
  //   dispatch(setLoading(true));
  return await axios.get(`${api}/town`, getConfig()).then((res) => {
    dispatch(setTown(res.data));
  });
  // .finally(dispatch(setLoading(false)));
};

export const createTownThunk = (data) => async (dispatch) => {
  return await axios
    .post(`${api}/town`, data, getConfig())
    .then((res) => dispatch(getTownThunk()));
};

export const updateTownThunk = (townId, data) => async (dispatch) => {
  return await axios
    .patch(`${api}/town/${townId}`, data, getConfig())
    .then(dispatch(getTownThunk()));
};

export const deleteTownThunk = (townId) => async (dispatch) => {
  return await axios
    .delete(`${api}/town/${townId}`, getConfig())
    .then(dispatch(getTownThunk()))
    .catch((error) => console.log(error));
};

export default townSlice.reducer;
