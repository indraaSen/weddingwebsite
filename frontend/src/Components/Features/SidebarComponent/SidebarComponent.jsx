import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styless from "./SidebarComponent.module.scss";
import { setOpenSidebar } from "../../MainStore/Slice/LoginReducer/LoginReducer";

const tabs = [
  { name: "Home", path: "/home" },
  { name: "Event", path: "/event" },
  { name: "Contact Us", path: "/contactus" },
  { name: "Sign In", path: "/signin" },
  { name: "Sign up", path: "/signup" },
];
const tabs2 = [
  { name: "Home", path: "/home" },
  { name: "Event", path: "/event" },
  { name: "Contact Us", path: "/contactus" },
];

const SidebarComponent = ({ position }) => {
  const userdata = useSelector((state) => state.login.userdata);
  const dispatch = useDispatch();

  const handleSidebarClick = () => {
    dispatch(setOpenSidebar({ openSidebar: false }));
  };
  return (
    <>
      <div
        className={` w-full h-full  ${position}`}
        onClick={() => handleSidebarClick()}
      >
        <div className={` bg-black w-full h-auto text-white p-2 `}>
          <div className="w-full md:hidden">
            <ul className="">
              {userdata?.user
                ? tabs2.map((tab) => (
                    <NavLink
                      to={tab.path}
                      className={({ isActive, isPending }) =>
                        isPending
                          ? "pending"
                          : isActive
                          ? styless["isActive"]
                          : styless["default"]
                      }
                    >
                      {tab.name}
                    </NavLink>
                  ))
                : tabs.map((tab) => (
                    <NavLink
                      to={tab.path}
                      className={({ isActive, isPending }) =>
                        isPending
                          ? "pending"
                          : isActive
                          ? styless["isActive"]
                          : styless["default"]
                      }
                    >
                      {tab.name}
                    </NavLink>
                  ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarComponent;
