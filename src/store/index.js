import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/login.slice";
import boxSlice from "./slices/box.slice";
import userSlice from "./slices/user.slice";
import portSlice from "./slices/port.slice";
import townSlice from "./slices/town.slice";

export default configureStore({
  reducer: {
    login: loginSlice,
    box: boxSlice,
    user: userSlice,
    port: portSlice,
    town: townSlice,
  },
});
