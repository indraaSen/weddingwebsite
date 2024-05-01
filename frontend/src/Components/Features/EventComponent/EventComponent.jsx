import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { retriveUser } from "../../APIs/API";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import { setOpenLogout } from "../../MainStore/Slice/LoginReducer/LoginReducer";
import LogoutComponent from "../LogoutComponent/LogoutComponent";
import SidebarComponent from "../SidebarComponent/SidebarComponent";

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
      <div>
        {openSidebarBtn && <SidebarComponent position="absolute z-20" />}
      </div>
      <div>
        <h1>There is no video available.</h1>
      </div>
    </>
  );
};

export default EventComponent;
