import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../utils/getConfig";

const api = "https://nav-boxes-lis.up.railway.app/app/v1";

export const sectorSlice = createSlice({
  name: "sector",
  initialState: [],
  reducers: {
    setSector: (state, actions) => {
      return actions.payload;
    },
  },
});

export const { setSector } = sectorSlice.actions;

export const getSectorsThunk = () => async (dispatch) => {
  //   dispatch(setLoading(true));
  return await axios.get(`${api}/sector/`, getConfig()).then((res) => {
    dispatch(setSector(res.data));
  });
  // .finally(dispatch(setLoading(false)));
};
export const getSectorThunk = (sectorId) => async (dispatch) => {
  return await axios
    .get(`${api}/sector/${sectorId}`, getConfig())
    .then((res) => {
      dispatch(setSector(res.data));
    });
};

export const createSectorThunk = (data) => async (dispatch) => {
  return await axios
    .post(`${api}/sector/`, data, getConfig())
    .then((res) => dispatch(getSectorsThunk()));
};

export const updateSectorThunk = (sectorId, data) => async (dispatch) => {
  return await axios
    .patch(`${api}/sector/${sectorId}`, data, getConfig())
    .then(dispatch(getSectorsThunk()));
};

export const deleteSectorThunk = (sectorId) => async (dispatch) => {
  return await axios
    .delete(`${api}/sector/${sectorId}`, getConfig())
    .then(dispatch(getSectorsThunk()))
    .catch((error) => console.log(error));
};

export default sectorSlice.reducer;
