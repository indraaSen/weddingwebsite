import * as React from "react";
import { useSelector } from "react-redux";
import SignUpComponent from "./SignUpComponent/SignUpComponent";
import SignInComponent from "./SignInComponent/SignInComponent";

const AuthComponent = () => {
  const { isSignUp } = useSelector((state) => state.login);
  return <>{isSignUp ? <SignUpComponent /> : <SignInComponent />}</>;
};

export default AuthComponent;
