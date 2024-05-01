import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { retriveUser } from "../../APIs/API";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import { setOpenLogout } from "../../MainStore/Slice/LoginReducer/LoginReducer";
import LogoutComponent from "../LogoutComponent/LogoutComponent";
import SidebarComponent from "../SidebarComponent/SidebarComponent";
import email from "../../Images/email.png";
import number from "../../Images/number.png";

const ContactComponent = () => {
  const openLogoutBtn = useSelector((state) => state.login.openLogout);
  const openSidebarBtn = useSelector((state) => state.login.openSidebar);
  const dispatch = useDispatch();

  React.useEffect(() => {
    retriveUser(dispatch);
  }, [dispatch]);

  const handleLogoutClick = () => {
    dispatch(setOpenLogout({ openLogout: false }));
  };

  return (
    <>
      <HeaderComponent />
      <div
        onClick={() => handleLogoutClick()}
        className={` absolute z-20 h-screen w-full ${
          openLogoutBtn ? "block" : "hidden"
        }`}
      >
        {openLogoutBtn && <LogoutComponent />}
      </div>

      <div className="h-screen w-full relative">
        {openSidebarBtn && <SidebarComponent position="absolute z-20" />}

        <div className="w-full h-20 flex items-center justify-center border-b-2 border-yellow-300">
          <h1 className="text-2xl font-bold">Welcome!</h1>
        </div>
        <div className="ml-3 mt-3 ">
          <h3 className="text-[16px] font-bold mb-3 flex justify-center">
            Contact Details:
          </h3>
          <div className="md:flex md:place-content-around ">
            <div className="mb-3">
              <h2 className="font-semibold mb-5">
                <span className="font-bold">Email Address</span>:
                sample@gmail.com
              </h2>
              <span>
                <img
                  src={email}
                  className=" h-56 w-[350px] md:h-72 md:w-[500px]"
                  alt="email img"
                />
              </span>
            </div>
            <div>
              <h2 className="font-semibold mb-5">
                <span className="font-bold">Contact Number</span>: 1234567890{" "}
              </h2>
              <span>
                <img
                  src={number}
                  className=" h-56 w-[450px] md:h-72 md:w-[500px]"
                  alt="number img"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactComponent;
