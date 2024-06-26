import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/login.slice";
import boxSlice from "./slices/box.slice";
import userSlice from "./slices/user.slice";
import portSlice from "./slices/port.slice";
import townSlice from "./slices/town.slice";
import sectorSlice from "./slices/sector.slice";
import optionsSlice from "./slices/adminOptions.slice";
import serviceSlice from "./slices/service.slice";
import isDetailSlice from "./slices/isDetail.slice";
import serviceArraySlice from "./slices/serviceArray.slice";

export default configureStore({
  reducer: {
    login: loginSlice,
    box: boxSlice,
    user: userSlice,
    port: portSlice,
    town: townSlice,
    sector: sectorSlice,
    options: optionsSlice,
    service: serviceSlice,
    isDetail: isDetailSlice,
    serviceArray: serviceArraySlice,
  },
});
