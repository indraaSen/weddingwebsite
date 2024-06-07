import * as React from "react";
import { useDispatch } from "react-redux";
import { retriveUser } from "../../APIs/API";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import FooterComponent from "../FooterComponent/FooterComponent";
import styless from "./GalleryComponent.module.scss";
import image1 from "../../Images/bodyBg.jpg";
import image2 from "../../Images/weddingPhoto2.jpg";
import mehndi from "../../Images/mehndiceremony.jpg";
import sangeet from "../../Images/sangeetceremony.jpg";
import haldi from "../../Images/haldiceremony.jpg";
import wedding from "../../Images/weddingimg.jpg";
import image3 from "../../Images/honeymoonpicture3.jpeg";
import image4 from "../../Images/honeymoonpicture4.jpeg";
import image5 from "../../Images/honeymoonpicture5.jpeg";

const allImages = [image1, image2];
const images = [
  mehndi,
  sangeet,
  haldi,
  wedding,
  image1,
  image2,
  image3,
  image4,
  image5,
];
const GalleryComponent = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    retriveUser(dispatch);
  }, [dispatch]);

  return (
    <>
      <HeaderComponent allImages={allImages} />
      <div className={styless["container1"]}>
        <div className={styless["container1-div"]}>
          <h1>Timeless Wedding Captures</h1>
        </div>
        <div className={styless["container1-images"]}>
          {images.map((data) => (
            <img src={data} alt={data} />
          ))}
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default GalleryComponent;
