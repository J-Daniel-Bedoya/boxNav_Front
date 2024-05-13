import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../utils/getConfig";

const api = "https://nav-boxes-lis.up.railway.app/app/v1";

export const boxSlice = createSlice({
  name: "box",
  initialState: [],
  reducers: {
    setBox: (state, actions) => {
      return actions.payload;
    },
  },
});

export const { setBox } = boxSlice.actions;

export const getBoxesThunk = () => async (dispatch) => {
  //   dispatch(setLoading(true));
  return await axios.get(`${api}/box/`, getConfig()).then((res) => {
    dispatch(setBox(res.data));
  });
  // .finally(dispatch(setLoading(false)));
};
export const getBoxThunk = (boxId) => async (dispatch) => {
  return await axios.get(`${api}/box/${boxId}`, getConfig()).then((res) => {
    dispatch(setBox(res.data));
  });
};

export const createBoxThunk = (data) => async (dispatch) => {
  return await axios
    .post(`${api}/box/`, data, getConfig())
    .then((res) => dispatch(getBoxesThunk()));
};

export const updateboxThunk = (boxId, data) => async (dispatch) => {
  return await axios
    .patch(`${api}/box/${boxId}`, data, getConfig())
    .then(dispatch(getBoxesThunk()));
};

export const deleteBoxThunk = (boxId) => async (dispatch) => {
  return await axios
    .delete(`${api}/box/${boxId}`, getConfig())
    .then(dispatch(getBoxesThunk()))
    .catch((error) => console.log(error));
};

export default boxSlice.reducer;
