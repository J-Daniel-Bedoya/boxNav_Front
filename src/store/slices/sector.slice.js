import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

export const getSectorThunk = () => async (dispatch) => {
  //   dispatch(setLoading(true));
  return await axios.get(`${api}/sector/`, getConfig()).then((res) => {
    dispatch(setSector(res.data));
  });
  // .finally(dispatch(setLoading(false)));
};

export const createSectorThunk = (data) => async (dispatch) => {
  return await axios
    .post(`${api}/sector/`, data, getConfig())
    .then((res) => dispatch(getSectorThunk()));
};

export const updateSectorThunk = (sectorId, data) => async (dispatch) => {
  return await axios
    .patch(`${api}/sector/${sectorId}`, data, getConfig())
    .then(dispatch(getSectorThunk()));
};

export const deleteSectorThunk = (sectorId) => async (dispatch) => {
  return await axios
    .delete(`${api}/sector/${sectorId}`, getConfig())
    .then(dispatch(getSectorThunk()))
    .catch((error) => console.log(error));
};

export default sectorSlice.reducer;
