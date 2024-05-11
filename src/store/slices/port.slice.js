import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api = "nav-boxes-lis.up.railway.app/app/v1";

export const portSlice = createSlice({
  name: "port",
  initialState: [],
  reducers: {
    setPort: (state, actions) => {
      return actions.payload;
    },
  },
});

export const { setPort } = portSlice.actions;

export const getPortThunk = () => async (dispatch) => {
  //   dispatch(setLoading(true));
  return await axios.get(`${api}/port/`, getConfig()).then((res) => {
    dispatch(setPort(res.data));
  });
  // .finally(dispatch(setLoading(false)));
};

export const createPortThunk = (data) => async (dispatch) => {
  return await axios
    .post(`${api}/port/`, data, getConfig())
    .then((res) => dispatch(getPortThunk()));
};

export const updatePortThunk = (portId, data) => async (dispatch) => {
  return await axios
    .patch(`${api}/port/${portId}`, data, getConfig())
    .then(dispatch(getPortThunk()));
};

export const deletePortThunk = (portId) => async (dispatch) => {
  return await axios
    .delete(`${api}/port/${portId}`, getConfig())
    .then(dispatch(getPortThunk()))
    .catch((error) => console.log(error));
};

export default portSlice.reducer;
