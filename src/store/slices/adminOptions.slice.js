import { createSlice } from "@reduxjs/toolkit";

export const optionsSlice = createSlice({
  name: "options",
  initialState: "add",
  reducers: {
    setOptions: (state, actions) => {
      return actions.payload;
    },
  },
});

export const { setOptions } = optionsSlice.actions;

export default optionsSlice.reducer;
