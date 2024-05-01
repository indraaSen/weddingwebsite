import { loginUser } from "../../APIs/API";
import {
  setIsSignUp,
  setUserData,
} from "../../MainStore/Slice/LoginReducer/LoginReducer";
import * as React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const SignInComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email && !password) {
      alert("Fields should not be empty!");
    } else {
      loginUser(email, password, navigate, dispatch, setUserData);
    }
  };

  return (
    <>
      <main className="w-full flex items-center justify-center h-screen border-2 bg-blue-50">
        <form
          onSubmit={(e) => handleLogin(e)}
          className=" bg-white rounded-md shadow-2xl h-[450px] w-[350px] md:w-[450px] flex flex-col"
        >
          <h3 className=" text-2xl font-bold m-6">Sign In</h3>

          <div className=" flex flex-col">
            <label className=" md:text-[18px] font-semibold ml-6 mt-5 text-[13px]">
              Email:
            </label>
            <input
              value={email}
              className=" border-gray-400 border-2 h-14 w-[85%] ml-6 mt-3 p-3 rounded-md"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className=" md:text-[18px] font-semibold ml-6 mt-5 text-[13px]">
              Password:
            </label>
            <input
              value={password}
              className="border-gray-400 border-2 h-14 w-[85%] ml-6 mt-3 p-3 rounded-md"
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className=" flex justify-center mt-7">
            <button
              type="submit"
              className=" h-10 w-[95%] border-2 rounded-md border-none bg-blue-600 text-white font-semibold hover:bg-blue-500"
            >
              Sign In
            </button>
          </div>

          <div className="mt-4 ml-3 text-[14px] md:text-[17px]">
            Don't have an Account?{" "}
            <button
              className=" font-semibold underline text-blue-700"
              onClick={() => dispatch(setIsSignUp({ isSignUp: true }))}
            >
              Sign Up
            </button>
          </div>
          <div className="relative h-10 w-full">
            <NavLink
              to="/"
              className=" text-xs mt-5 text-blue-500 absolute right-0 md:mt-0"
            >
              Go back to home Page{">>>>"}
            </NavLink>
          </div>
        </form>
      </main>
    </>
  );
};

export default SignInComponent;
