import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../utils/getConfig";

const api = "https://nav-boxes-lis.up.railway.app/api/v1";
// const api = "http://localhost:8000/api/v1";

export const serviceSlice = createSlice({
  name: "service",
  initialState: [],
  reducers: {
    setService: (state, actions) => {
      return actions.payload;
    },
  },
});

export const { setService } = serviceSlice.actions;

export const getServicesThunk = () => async (dispatch) => {
  //   dispatch(setLoading(true));
  return await axios.get(`${api}/service/`, getConfig()).then((res) => {
    dispatch(setService(res.data));
  });
  // .finally(dispatch(setLoading(false)));
};
export const getServiceThunk = (serviceId) => async (dispatch) => {
  return await axios
    .get(`${api}/service/${serviceId}`, getConfig())
    .then((res) => {
      dispatch(setService(res.data));
    });
};

export default serviceSlice.reducer;
