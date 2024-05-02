import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { retriveUser } from "../../APIs/API";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import { setOpenLogout } from "../../MainStore/Slice/LoginReducer/LoginReducer";
import LogoutComponent from "../LogoutComponent/LogoutComponent";
import SidebarComponent from "../SidebarComponent/SidebarComponent";
import FooterComponent from "../FooterComponent/FooterComponent";

const EventComponent = () => {
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
    <div className="flex flex-col min-h-[100vh] ">
      <div>
        <HeaderComponent />
        <div
          onClick={() => handleLogoutClick()}
          className={` absolute z-20 h-screen w-full ${
            openLogoutBtn ? "block" : "hidden"
          }`}
        >
          {openLogoutBtn && <LogoutComponent />}
        </div>
        <div>
          {openSidebarBtn && <SidebarComponent position="absolute z-20" />}
        </div>
      </div>
      <div className=" w-full h-auto flex-1">
        <h1 className="m-5 text-2xl font-semibold underline flex justify-center">
          No video available.
        </h1>
      </div>
      <div>
        <FooterComponent />
      </div>
    </div>
  );
};

export default EventComponent;
