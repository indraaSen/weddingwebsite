import styless from "./FooterComponent.module.scss";
import logo from "../../Images/pngtree-shaadi-mubarak-hindi-calligraphy-png-image_256436.png";
const FooterComponent = () => {
  return (
    <footer className={styless["container7"]}>
      {/* container 7 footer  */}
      <div className={styless["container7-main-div"]}>
        <div className={styless["container7-main-div-sub-div-1"]}>
          <img src={logo} alt="ms wedding logo" />
        </div>
        <div className={styless["container7-main-div-sub-div-2"]}>
          <span>CONTACT</span>
          <ul>
            <li>+91 9999999999</li>
            <li>+91 1111111111</li>
            <li>exampleemail1@gmail.com</li>
            <li>exampleemail2@gmail.com</li>
          </ul>
        </div>
        <div className={styless["container7-main-div-sub-div-3"]}>
          <span>DESTINATIONS</span>
          <ul>
            <li>Wedding on Beach</li>
            <li>Wedding in Hills</li>
            <li>Vows on Destination</li>
            <li>Dream Wedding in your beloved city</li>
          </ul>
        </div>
        <div className={styless["container7-main-div-sub-div-4"]}>
          <span>MORE</span>
          <ul>
            <li>Contact</li>
            <li>Terms and Conditions</li>
            <li>Privacy and Policy</li>
          </ul>
        </div>
      </div>
      {/* container 7 footer end */}
    </footer>
  );
};

export default FooterComponent;
