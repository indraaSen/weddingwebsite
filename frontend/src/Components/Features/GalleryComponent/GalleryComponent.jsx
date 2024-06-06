import * as React from "react";
import { useDispatch } from "react-redux";
import { retriveUser } from "../../APIs/API";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import FooterComponent from "../FooterComponent/FooterComponent";
import video1 from "../../Videos/salmanKhanVid.mp4";
import video2 from "../../Videos/sardarKhanVid.mp4";
import video3 from "../../Videos/randomGirlVid.mp4";
import video4 from "../../Videos/cillianMurphyVid.mp4";
import styless from "./GalleryComponent.module.scss";

const GalleryComponent = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    retriveUser(dispatch);
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-[100vh] ">
      <div>
        <HeaderComponent />
      </div>
      <div className="bg-red-500">
        <div className=" md:flex justify-center items-center">
          <h1 className="m-5 p-2 rounded-md text-2xl font-semibold border-2 border-gray-500 flex justify-center w-[90%] md:w-[40%]">
            Moments of our happy customers
          </h1>
        </div>
        <div className=" w-full h-auto flex-1">
          <div className={styless["videos"]}>
            <div className="grid justify-center items-center pt-12 bg-slate-50 m-2 rounded-md">
              <video className="h-40 w-80 border-2 border-black" controls>
                <source
                  src={video1}
                  type="video/mp4"
                  className="border-2 border-black"
                />
              </video>
              <span className="flex items-center justify-center m-5 font-semibold">
                Salman Khan - 19/05/2024
              </span>
            </div>
            <div className="grid justify-center items-center pt-12 bg-slate-50 m-2 rounded-md">
              <video className="h-40 w-80 border-2 border-black" controls>
                <source
                  src={video2}
                  type="video/mp4"
                  className="border-2 border-black"
                />
              </video>
              <span className="flex items-center justify-center m-5 font-semibold">
                sardar Khan - 19/05/2024
              </span>
            </div>
            <div className="grid justify-center items-center pt-12 bg-slate-50 m-2 rounded-md">
              <video className="h-40 w-80 border-2 border-black" controls>
                <source
                  src={video3}
                  type="video/mp4"
                  className="border-2 border-black"
                />
              </video>
              <span className="flex items-center justify-center m-5 font-semibold">
                Random Girl - 19/05/2024
              </span>
            </div>
            <div className="grid justify-center items-center pt-12 bg-slate-50 m-2 rounded-md">
              <video className="h-40 w-80 border-2 border-black" controls>
                <source
                  src={video4}
                  type="video/mp4"
                  className="border-2 border-black"
                />
              </video>
              <span className="flex items-center justify-center m-5 font-semibold">
                Cillian Murphy - 19/05/2024
              </span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <FooterComponent />
      </div>
    </div>
  );
};

export default GalleryComponent;
