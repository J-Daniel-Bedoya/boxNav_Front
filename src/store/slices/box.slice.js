import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api = "https://boxnav-back.onrender.com/app/v1/";

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

export const getBoxThunk = () => async (dispatch) => {
  //   dispatch(setLoading(true));
  return await axios
    .get(
      `${api}/box/`
      // getConfig()
    )
    .then((res) => {
      dispatch(setBox(res.data));
    });
  // .finally(dispatch(setLoading(false)));
};

export const createBoxThunk = (data) => async (dispatch) => {
  return await axios
    .post(
      `${api}/box/`,
      data
      // getConfig()
    )
    .then((res) => dispatch(getBoxThunk()));
};

export const updateboxThunk = (boxId, data) => async (dispatch) => {
  return await axios
    .patch(
      `${api}/box/${boxId}`,
      data
      // getConfig()
    )
    .then(dispatch(getBoxThunk()));
};

export const deleteBoxThunk = (boxId) => async (dispatch) => {
  return await axios
    .delete(
      `${api}/box/${boxId}`
      // getConfig()
    )
    .then(dispatch(getBoxThunk()))
    .catch((error) => console.log(error));
};

export default boxSlice.reducer;
