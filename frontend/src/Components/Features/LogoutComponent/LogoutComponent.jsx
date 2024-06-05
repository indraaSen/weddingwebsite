import { useDispatch, useSelector } from "react-redux";
import {
  setOpenProfile,
  setUserData,
} from "../../MainStore/Slice/LoginReducer/LoginReducer";
import { NavLink, useNavigate } from "react-router-dom";
import styless from "./LogoutComponent.module.scss";

const LogoutComponent = () => {
  const userVal = useSelector((state) => state.login.userdata);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setUserData({ userdata: null }));
    navigate("/home");
    dispatch(setOpenProfile({ openProfile: false }));
  };

  return (
    <>
      <div className={styless["main-div"]}>
        <div className={styless["main-div-inner-div"]}>
          <ul>
            <li>
              <NavLink className={styless["navlinks"]} to="/profile">
                Profile
              </NavLink>
              <NavLink className={styless["navlinks"]} to="/setting">
                Setting
              </NavLink>
              <NavLink className={styless["navlinks"]} to="/Privacyandpolicy">
                Privacy And Policy
              </NavLink>
              <NavLink className={styless["navlinks"]} to="/datasaver">
                Data Saver
              </NavLink>
              <NavLink className={styless["navlinks"]} onClick={handleLogout}>
                Log out
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default LogoutComponent;
