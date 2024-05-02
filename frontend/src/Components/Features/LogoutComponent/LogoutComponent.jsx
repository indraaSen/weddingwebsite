import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../MainStore/Slice/LoginReducer/LoginReducer";
import { useNavigate } from "react-router-dom";

const LogoutComponent = () => {
  const userVal = useSelector((state) => state.login.userdata);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setUserData({ userdata: null }));
    navigate("/home");
  };

  return (
    <>
      <div className="fixed border-2 border-gray-400 h-36 w-[60%] text-center p-3 bg-white flex flex-col right-0 rounded-md md:w-[20%] ">
        <div className=" text-[16px] font-medium pb-2">Logged In :</div>{" "}
        <span className=" w-full  text-[18px] font-semibold pb-2">
          {userVal.email}
        </span>
        <div>
          <button
            onClick={handleLogout}
            className={` w-32 text-[18px] font-semibold hover:bg-red-300 rounded-md p-2 border-2 border-red-800`}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default LogoutComponent;
