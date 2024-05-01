import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signupUser } from "../../APIs/API";
import { setIsSignUp } from "../../MainStore/Slice/LoginReducer/LoginReducer";
import { NavLink } from "react-router-dom";
import PopupComponent from "../../Module/PopupComponent/PopupComponent";

const SignUpComponent = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contact, setContact] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    await signupUser(
      name,
      email,
      password,
      confirmPassword,
      contact,
      setName,
      setEmail,
      setPassword,
      setConfirmPassword,
      setContact,
      setOpen,
      setMessage
    );
  };

  return (
    <>
      <main className=" flex items-center justify-center pt-10 pb-10 bg-green-50">
        <form
          onSubmit={handleSignUp}
          className=" overflow-y-scroll md:overflow-y-hidden rounded-md bg-white shadow-2xl h-auto md:h-auto w-[400px] md:w-[550px] flex flex-col pb-5"
        >
          <h3 className=" text-2xl font-bold m-6">Sign up</h3>
          <div className=" flex flex-col">
            <label className="  md:text-[18px] font-semibold ml-6 mt-5 text-[14px]">
              Name:
            </label>
            <input
              value={name}
              className=" border-gray-400 border-2 h-14 w-[85%] ml-6 mt-3 p-3 rounded-md"
              type="text"
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
            />
            <label className="  md:text-[18px] font-semibold ml-6 mt-5 text-[14px]">
              Email:
            </label>
            <input
              value={email}
              className=" border-gray-400 border-2 h-14 w-[85%] ml-6 mt-3 p-3 rounded-md"
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="  md:text-[18px] font-semibold ml-6 mt-5 text-[14px]">
              Password:
            </label>
            <input
              value={password}
              className=" border-gray-400 border-2 h-14 w-[85%] ml-6 mt-3 p-3 rounded-md"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="  md:text-[18px] font-semibold ml-6 mt-5 text-[14px]">
              Confirm Password:
            </label>
            <input
              value={confirmPassword}
              className=" border-gray-400 border-2 h-14 w-[85%] ml-6 mt-3 p-3 rounded-md"
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label className="  md:text-[18px] font-semibold ml-6 mt-5 text-[14px]">
              Contact:
            </label>
            <input
              value={contact}
              className=" border-gray-400 border-2 h-14 w-[85%] ml-6 mt-3 p-3 rounded-md"
              type="text"
              placeholder="Contact"
              minLength={10}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          <div className=" flex justify-center mt-7">
            <button
              type="submit"
              className=" h-10 w-[95%] border-2 rounded-md border-none bg-green-700 text-white font-semibold hover:bg-green-600"
            >
              Sign Up
            </button>
          </div>

          <div className=" mt-4 ml-3 text-[14px] md:text-[17px] ">
            Already have an Account!{" "}
            <button
              className=" font-semibold underline text-blue-700"
              onClick={() => dispatch(setIsSignUp({ isSignUp: false }))}
            >
              Sign In
            </button>
          </div>
          <div className="relative h-10 w-full">
            <NavLink
              to="/"
              className=" text-xs mt-5 text-blue-500 absolute right-0 md:mt-3"
            >
              Go back to home Page{">>>>"}
            </NavLink>
          </div>
        </form>
      </main>
      <PopupComponent open={open} setOpen={setOpen} message={message} />
    </>
  );
};

export default SignUpComponent;
