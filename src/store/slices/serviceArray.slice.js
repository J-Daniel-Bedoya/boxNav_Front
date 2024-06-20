import { createSlice } from "@reduxjs/toolkit";

export const serviceArraySlice = createSlice({
  name: "serviceArray",
  initialState: [],
  reducers: {
    setServiceArray: (state, actions) => {
      return actions.payload;
    },
  },
});

export const { setServiceArray } = serviceArraySlice.actions;

export default serviceArraySlice.reducer;
