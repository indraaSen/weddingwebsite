import { createSlice } from "@reduxjs/toolkit";

const LoginReducer = createSlice({
  name: "loginData",
  initialState: {
    isSignUp: false,
    userdata: null,
    openProfile: false,
  },
  reducers: {
    setIsSignUp: (state, action) => {
      state.isSignUp = action.payload.isSignUp;
    },
    setUserData: (state, action) => {
      state.userdata = action.payload.userdata;
    },
    setOpenProfile: (state, action) => {
      state.openProfile = action.payload.openProfile;
    },
  },
});

export const { setIsSignUp, setUserData, setOpenProfile } =
  LoginReducer.actions;
export default LoginReducer.reducer;
