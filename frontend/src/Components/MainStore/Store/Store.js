import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "../Slice/LoginReducer/LoginReducer";

const Store = configureStore({
  reducer: {
    login: LoginReducer,
  },
});

export default Store;
