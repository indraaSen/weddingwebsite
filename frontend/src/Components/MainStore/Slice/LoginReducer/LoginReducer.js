import { createSlice } from "@reduxjs/toolkit";

const LoginReducer = createSlice({
  name: "loginData",
  initialState: {
    isSignUp: false,
    userdata: null,
    openLogout: false,
    openSidebar: false,
  },
  reducers: {
    setIsSignUp: (state, action) => {
      state.isSignUp = action.payload.isSignUp;
    },
    setUserData: (state, action) => {
      state.userdata = action.payload.userdata;
    },
    setOpenLogout: (state, action) => {
      state.openLogout = action.payload.openLogout;
    },
    setOpenSidebar: (state, action) => {
      state.openSidebar = action.payload.openSidebar;
    },
  },
});

export const { setIsSignUp, setUserData, setOpenLogout, setOpenSidebar } =
  LoginReducer.actions;
export default LoginReducer.reducer;
