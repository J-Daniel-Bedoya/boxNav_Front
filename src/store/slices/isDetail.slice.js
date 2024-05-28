import { createSlice } from "@reduxjs/toolkit";

export const isDetailSlice = createSlice({
  name: "isDetail",
  initialState: 0,
  reducers: {
    setIsDetail: (state, actions) => {
      return actions.payload;
    },
  },
});

export const { setIsDetail } = isDetailSlice.actions;

export default isDetailSlice.reducer;
