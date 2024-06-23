import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../utils/getConfig";

const api = "https://nav-boxes-lis.up.railway.app/api/v1";

const townSlice = createSlice({
  name: "town",
  initialState: {
    towns: [],
    pagination: {
      boxes: [],
      users: [],
      sectors: [],
    },
  },
  reducers: {
    setTown: (state, action) => {
      state.towns = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
  },
});

export const { setTown, setPagination } = townSlice.actions;

export const getTownsThunk = () => async (dispatch) => {
  return await axios
    .get(`${api}/town`, getConfig())
    .then((res) => {
      dispatch(setTown(res.data));
    })
    .catch((error) => console.log(error));
};

export const getTownThunk = (id) => async (dispatch) => {
  return await axios
    .get(`${api}/town/${id}`, getConfig())
    .then((res) => {
      dispatch(setTown(res.data));
    })
    .catch((error) => console.log(error));
};

export const getTownPaginationThunk =
  (id, offset, limit) => async (dispatch) => {
    return await axios
      .get(
        `${api}/town/pagination/${id}?offset=${offset}&limit=${limit}`,
        getConfig()
      )
      .then((res) => {
        dispatch(setPagination(res.data));
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
