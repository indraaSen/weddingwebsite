import React, { useState } from "react";
import { forgotPassword } from "../../APIs/API";
import PopupComponent from "../../Module/PopupComponent/PopupComponent";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const changePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Password is not matching!");
    } else {
      await forgotPassword(
        email,
        confirmPassword,
        navigate,
        setMessage,
        setOpen
      );
    }
  };
  return (
    <>
      <main className="w-full flex items-center justify-center h-screen border-2 bg-blue-50">
        <form
          onSubmit={(e) => changePassword(e)}
          className=" bg-white rounded-md shadow-2xl h-[550px] w-[350px] md:w-[450px] flex flex-col"
        >
          <h3 className=" text-2xl font-bold m-6">Forgot Password</h3>

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
              New Password:
            </label>
            <input
              value={newPassword}
              className="border-gray-400 border-2 h-14 w-[85%] ml-6 mt-3 p-3 rounded-md"
              type="password"
              placeholder="password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label className=" md:text-[18px] font-semibold ml-6 mt-5 text-[13px]">
              Confirm Password:
            </label>
            <input
              value={confirmPassword}
              className="border-gray-400 border-2 h-14 w-[85%] ml-6 mt-3 p-3 rounded-md"
              type="password"
              placeholder="Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className=" flex justify-center mt-7">
            <button
              type="submit"
              className=" h-10 w-[95%] border-2 rounded-md border-none bg-blue-600 text-white font-semibold hover:bg-blue-500"
            >
              Change Password
            </button>
          </div>
        </form>
        <PopupComponent open={open} setOpen={setOpen} message={message} />
      </main>
    </>
  );
};
export default ForgotPassword;
