import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../Images/pngtree-shaadi-mubarak-hindi-calligraphy-png-image_256436.png";
import {
  setOpenProfile,
  setUserData,
} from "../../MainStore/Slice/LoginReducer/LoginReducer";
import styless from "./HeaderComponent.module.scss";
import LogoutComponent from "../LogoutComponent/LogoutComponent";

const HeaderComponent = ({ allImages }) => {
  const openProfile = useSelector((state) => state.login.openProfile);
  const userdata = useSelector((state) => state.login.userdata);
  const dispatch = useDispatch();
  const [count, setCount] = React.useState(0);
  const [background, setBackground] = React.useState();
  const [color, setColor] = React.useState();
  const [openSidebar, setOpenSidebar] = React.useState(false);
  const [active, setActive] = React.useState("");
  const navigate = useNavigate();

  const backgroundOnScroll = () => {
    if (window.scrollY > 5) {
      setBackground("#fffaf6dc");
      setColor("black");
    } else {
      setBackground("transparent");
      setColor("white");
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", backgroundOnScroll);
  }, [background]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1);
    }, 3000);
    if (count > allImages.length - 1) {
      setCount(0);
    }
    return () => clearInterval(interval);
  }, [allImages.length, count]);

  React.useEffect(() => {
    switch (window.location.pathname.split("/").pop()) {
      case "home":
        setActive("home");
        break;
      case "honeymoons":
        setActive("honeymoons");
        break;
      case "services":
        setActive("services");
        break;
      case "gallery":
        setActive("gallery");
        break;
      case "offers":
        setActive("offers");
        break;

      default:
        setActive("");
        break;
    }
  }, [active]);

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    dispatch(setUserData({ userdata: null }));
    navigate("/home");
  };

  const sidebarHandle = () => {
    setOpenSidebar(!openSidebar);
  };

  const handleProfileClick = () => {
    dispatch(setOpenProfile({ openProfile: !openProfile }));
  };

  return (
    <>
      <header
        className={`${styless["container-header"]} bg-cover bg-center`}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${allImages[count]})`,
          transition: "3s ease",
        }}
      >
        <nav style={{ background: background }}>
          <NavLink to="/">
            <img
              className={styless["logo-img"]}
              src={logo}
              alt="shadi-mubarak"
            />
          </NavLink>
          <NavLink
            className={`${
              styless["home"]
            } hover:border-b-[1px] border-${color} ${
              active === "home" ? `border-b-[1px] border-${color}` : ""
            }`}
            to="/home"
            style={{
              color: color,
              fontWeight: 600,
            }}
            onClick={() => setActive("home")}
          >
            Home
          </NavLink>
          <NavLink
            className={`${
              styless["honeymoons"]
            } hover:border-b-[1px] border-${color} ${
              active === "honeymoons" ? `border-b-[1px] border-${color}` : ""
            }`}
            to="/honeymoons"
            style={{ color: color, fontWeight: 600 }}
            onClick={() => setActive("honeymoons")}
          >
            Honeymoons
          </NavLink>
          <NavLink
            className={`${
              styless["services"]
            } hover:border-b-[1px] border-${color} ${
              active === "services" ? `border-b-[1px] border-${color}` : ""
            }`}
            to="/services"
            style={{ color: color, fontWeight: 600 }}
            onClick={() => setActive("services")}
          >
            Services
          </NavLink>
          <NavLink
            className={`${
              styless["gallery"]
            } hover:border-b-[1px] border-${color} ${
              active === "gallery" ? `border-b-[1px] border-${color}` : ""
            }`}
            to="/gallery"
            style={{ color: color, fontWeight: 600 }}
            onClick={() => setActive("gallery")}
          >
            Gallery
          </NavLink>
          <NavLink
            className={`${
              styless["offers"]
            } hover:border-b-[1px] border-${color} ${
              active === "offers" ? `border-b-[1px] border-${color}` : ""
            }`}
            to="/offers"
            style={{ color: color, fontWeight: 600 }}
            onClick={() => setActive("offers")}
          >
            Offers
          </NavLink>

          <label onClick={() => sidebarHandle()}>
            <i
              className="fa fa-bars"
              style={{ color: color, fontSize: "30px" }}
            ></i>
          </label>
          <div
            className={styless["sidebar"]}
            style={{ left: openSidebar ? "0%" : "100%", transition: "1s ease" }}
          >
            {userdata?.user === "user" || userdata?.user === "admin" ? (
              <ul>
                <li>
                  <NavLink
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    to="/"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? styless["isActive"]
                        : ""
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    to="/honeymoons"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? styless["isActive"]
                        : ""
                    }
                  >
                    Honeymoons
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    to="/services"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? styless["isActive"]
                        : ""
                    }
                  >
                    Services
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    to="/gallery"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? styless["isActive"]
                        : ""
                    }
                  >
                    Gallery
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    to="/offers"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? styless["isActive"]
                        : ""
                    }
                  >
                    Offers
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    to="/"
                    onClick={() => handleLogoutClick()}
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? styless["isActive"]
                        : ""
                    }
                  >
                    Logout
                  </NavLink>
                </li>
              </ul>
            ) : (
              <ul>
                <li>
                  <NavLink
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    to="/"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? styless["isActive"]
                        : ""
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    to="/honeymoons"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? styless["isActive"]
                        : ""
                    }
                  >
                    Honeymoons
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    to="/services"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? styless["isActive"]
                        : ""
                    }
                  >
                    Services
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    to="/gallery"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? styless["isActive"]
                        : ""
                    }
                  >
                    Gallery
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    to="/offers"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? styless["isActive"]
                        : ""
                    }
                  >
                    Offers
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    to="/signin"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? styless["isActive"]
                        : ""
                    }
                  >
                    Sign In
                  </NavLink>
                </li>
              </ul>
            )}
          </div>

          <div className="flex">
            {userdata?.user === "user" || userdata?.user === "admin" ? (
              <>
                <div className=" absolute h-full w-[60px] flex items-center justify-center right-16 md:right-5 z-10">
                  <button
                    className={`${styless["profile-icon"]} right-6 md:right-36`}
                    onClick={() => handleProfileClick()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className={`w-10 h-10 md:w-16 md:h-16 text-${color}`}
                    >
                      <path
                        fillRule="evenodd"
                        d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </>
            ) : (
              <div className=" hidden md:flex md:h-full md:w-32 md:justify-center md:items-center md:ml-48">
                {" "}
                <NavLink
                  to="/signin"
                  className={styless["sign-in-button"]}
                  style={{
                    color: color,
                    fontWeight: 600,
                    border: `1px solid ${color}`,
                  }}
                >
                  SignIn
                </NavLink>
              </div>
            )}
          </div>
        </nav>
        {openProfile ? <LogoutComponent /> : ""}
      </header>
    </>
  );
};

export default HeaderComponent;
