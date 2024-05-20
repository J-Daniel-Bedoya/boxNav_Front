import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../utils/getConfig";

// const api = "https://nav-boxes-lis.up.railway.app/api/v1";
const api = "http://localhost:8000/api/v1";

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

export const getPortsThunk = () => async (dispatch) => {
  //   dispatch(setLoading(true));
  return await axios.get(`${api}/port/`, getConfig()).then((res) => {
    dispatch(setPort(res.data));
  });
  // .finally(dispatch(setLoading(false)));
};
export const getPortThunk = (portId) => async (dispatch) => {
  return await axios.get(`${api}/port/${portId}`, getConfig()).then((res) => {
    dispatch(setPort(res.data));
  });
};

export const createPortThunk = (data) => async (dispatch) => {
  return await axios
    .post(`${api}/port/`, data, getConfig())
    .then((res) => dispatch(getPortsThunk()));
};

export const updatePortThunk = (portId, data) => async (dispatch) => {
  return await axios
    .patch(`${api}/port/${portId}`, data, getConfig())
    .then(dispatch(getPortsThunk()));
};

export const deletePortThunk = (portId) => async (dispatch) => {
  return await axios
    .delete(`${api}/port/${portId}`, getConfig())
    .then(dispatch(getPortsThunk()))
    .catch((error) => console.log(error));
};

export default portSlice.reducer;
