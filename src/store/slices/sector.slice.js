import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../utils/getConfig";

const api = "https://nav-boxes-lis.up.railway.app/api/v1";
// const api = "http://localhost:8000/api/v1";

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
  return await axios.get(`${api}/sector`, getConfig()).then((res) => {
    dispatch(setSector(res.data));
  });
};
// export const getSectorThunk = (id) => async (dispatch) => {
//   return await axios.get(`${api}/sector/${id}`, getConfig()).then((res) => {
//     dispatch(setSector(res.data));
//     console.log(res);
//   });
// };

export const createSectorThunk = (data) => async (dispatch) => {
  return await axios
    .post(`${api}/sector`, data, getConfig())
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
