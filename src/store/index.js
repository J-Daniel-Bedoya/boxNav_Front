import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/login.slice";

export default configureStore({
  reducer: {
    login: loginSlice,
  },
});
