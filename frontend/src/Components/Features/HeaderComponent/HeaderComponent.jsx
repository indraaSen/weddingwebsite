import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import logo from "../../Images/logo.jpg";
import {
  setOpenLogout,
  setOpenSidebar,
} from "../../MainStore/Slice/LoginReducer/LoginReducer";
import styless from "./HeaderComponent.module.scss";

const tabs = [
  { name: "Home", path: "/home" },
  { name: "Event", path: "/event" },
  { name: "Contact Us", path: "/contactus" },
];
const tabs2 = [
  { name: "Home", path: "/home" },
  { name: "Event", path: "/event" },
  { name: "Contact Us", path: "/contactus" },
  { name: "Payment History", path: "/paymenthistory" },
];

const HeaderComponent = () => {
  const userdata = useSelector((state) => state.login.userdata);
  const openLogoutBtn = useSelector((state) => state.login.openLogout);
  const openSidebarBtn = useSelector((state) => state.login.openSidebar);
  const dispatch = useDispatch();

  const [headerValues, setHeaderValues] = React.useState(tabs);

  React.useEffect(() => {
    if (userdata?.user) {
      setHeaderValues(tabs2);
    } else {
      setHeaderValues(tabs);
    }
  }, [userdata]);

  const handleLogoutClick = () => {
    dispatch(setOpenLogout({ openLogout: !openLogoutBtn }));
  };

  const handleSidebarClick = () => {
    dispatch(setOpenSidebar({ openSidebar: !openSidebarBtn }));
  };

  return (
    <>
      <div className=" w-full sticky z-50 top-0 bg-gray-300 h-[60px] flex ">
        {/* left side  */}
        <div className=" h-full w-20 flex items-center justify-center md:flex md:items-center md:justify-center md:min-w-[370px] ">
          <div>
            <img
              className=" h-10 w-10 md:-ml-3 md:h-10 md:w-10 rounded-full mr-4"
              src={logo}
              alt="Logo"
            />
          </div>
          <div className=" md:h-full md:flex md:items-center">
            <NavLink to="/" className=" text-xl font-semibold hidden md:block ">
              Bada Event Management wale
            </NavLink>
          </div>
        </div>
        {/* left side ends here */}

        {/* middle part starts here */}
        <div className=" h-full hidden  md:w-[800px] pl-2 pr-2 md:flex md:justify-center md:items-center">
          <div className="w-[500px]">
            <div className="flex md:place-content-between">
              {headerValues.map((tab) => (
                <NavLink
                  to={tab.path}
                  key={tab.name}
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
            </div>
          </div>
        </div>
        {/* middle part end here */}

        {/* right side starts here */}
        <div className="flex ">
          {userdata?.user === "user" || userdata?.user === "admin" ? (
            <div className=" absolute h-full w-[60px] flex items-center justify-center right-16 md:right-5 ">
              <button onClick={() => handleLogoutClick()}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className={` ${openLogoutBtn ? "block" : "hidden"} `}>
                  {/** up arrow*/}
                </div>
              </button>
            </div>
          ) : (
            <div className=" hidden md:flex md:h-full md:w-32 md:justify-center md:items-center md:ml-48">
              {" "}
              <NavLink
                to="/signin"
                className=" md:text-xl md:font-semibold md:text-blue-600 md:border-2 md:border-blue-600 md:pt-1 md:pb-2 md:pl-4 md:pr-4 md:rounded-md md:hover:text-blue-500 md:hover:border-blue-500"
              >
                SignIn
              </NavLink>
            </div>
          )}
          <div className=" absolute h-full w-[60px] flex items-center justify-center right-0 md:hidden">
            <button
              className=" text-5xl pb-2"
              onClick={() => handleSidebarClick()}
            >
              &#8801;
            </button>
          </div>
        </div>
        {/* right side starts here */}
      </div>
    </>
  );
};

export default HeaderComponent;
