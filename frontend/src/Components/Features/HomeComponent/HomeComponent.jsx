import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makePayment, retriveUser } from "../../APIs/API";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import beach from "../../Images/beachwedding.jpg";
import hillwedding from "../../Images/hillwedding.png";
import destinationwedding from "../../Images/destinationwedding.jpg";
import weddingimg from "../../Images/weddingimg.jpg";
import brideimg from "../../Images/brideimg.jpg";
import wedding1 from "../../Images/wedding1.jpg";
import borderdesign from "../../Images/borderdesign.png";
import logo from "../../Images/logo.jpg";
import PopupComponent from "../../Module/PopupComponent/PopupComponent";
import useRazorpay from "react-razorpay";
import FooterComponent from "../FooterComponent/FooterComponent";
import styless from "./HomeComponent.module.scss";
import image1 from "../../Images/bodyBg.jpg";
import image2 from "../../Images/weddingPhoto2.jpg";

const allImages = [image1, image2];

const comments = [
  {
    name: "SURAJ AND CHANDNI",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus molestias corrupti debitis nostrum? Inventore, repellendus perspiciatis! Quasi at voluptatem earum pariatur vitae officia dignissimos quam, oremque officiis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, unde.",
    image: wedding1,
  },
  {
    name: "SANJAY AND SUMITRA",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus molestias corrupti debitis nostrum? Inventore, repellendus perspiciatis! Quasi at voluptatem earum pariatur vitae officia dignissimos quam, oremque officiis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, unde.",
    image: brideimg,
  },
];
const HomeComponent = () => {
  const userData = useSelector((state) => state.login.userdata);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isLoading3, setIsLoading3] = useState(false);
  const [isLoading4, setIsLoading4] = useState(false);
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    retriveUser(dispatch);
  }, [dispatch]);

  const [Razorpay] = useRazorpay();

  const handlePayment = (data) => {
    if (userData?.user && data.amount === "500") {
      setIsLoading1(true);
    } else if (userData?.user && data.amount === "700") {
      setIsLoading2(true);
    } else if (userData?.user && data.amount === "1000") {
      setIsLoading3(true);
    } else if (userData?.user && data.amount === "1500") {
      setIsLoading4(true);
    } else {
      setIsLoading1(false);
      setIsLoading2(false);
      setIsLoading3(false);
      setIsLoading4(false);
    }
    makePayment(
      userData,
      setMessage,
      setOpen,
      setIsLoading1,
      setIsLoading2,
      setIsLoading3,
      setIsLoading4,
      logo,
      Razorpay,
      data
    );
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1);
    }, 3000);
    if (count > comments.length - 1) {
      setCount(0);
    }
    return () => clearInterval(interval);
  }, [count]);

  return (
    <>
      <HeaderComponent allImages={allImages} />
      {/* container 2 start  */}
      <div className={styless["container2"]}>
        <span className={styless["container2-text1"]}>
          BEAUTIFUL DESTINATION WEDDINGS IN INDIA
        </span>
        <span className={styless["container2-text2"]}>BY NW-SHADIWALE</span>
        <span className={styless["container2-text3"]}>
          WE CAN MAKE YOUR DREAM <br />
          WEDDING SUCCESSFUL <br />
          TRUST US
        </span>
        <p className={styless["container2-text4"]}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum ex iste
          quasi blanditiis dicta neque quae voluptatem, laborum molestiae
          dolorem itaque? Animi iure, voluptatum quaerat eveniet corrupti ullam
          incidunt nisi officiis doloremque repellat nostrum, hic suscipit
          distinctio. Ratione dolor, commodi, ut, esse sed quaerat repudiandae
          delectus officia tenetur deserunt accusantium! Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Cum ex iste quasi blanditiis dicta
          neque quae voluptatem, laborum molestiae dolorem itaque? Animi iure.
        </p>
      </div>
      {/* container 2 end  */}
      {/* container 3  */}
      <div className={styless["container3"]}>
        <div className={styless["container3-col-1"]}>
          <span className={styless["container3-col-1-text-1"]}>
            Shubh-mangal <br />
            Savdhan <br />
            on beach
          </span>
          <img
            className={styless["container3-col-1-img-1"]}
            src={beach}
            alt="wedding image"
          />
          <h3 className={styless["container3-col-1-text-2"]}>
            GET THE WEDDING OF <br />
            YOUR DREAMS
          </h3>
          <p className={styless["container3-col-1-text-3"]}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat,
            quis. Nesciunt aperiam repellat, tempore labore dolorum asperiores,
            possimus alias, maxime vel deleniti doloribus! Sapiente ducimus
            sequi beatae, iure excepturi fuga!
          </p>
          <img
            className={styless["container3-col-1-img-2"]}
            src={weddingimg}
            alt="wedding image"
          />
        </div>
        <div className={styless["container3-col-2"]}>
          <h2 className={styless["container3-col-2-text-1"]}>
            DESTINATION <br />
            WEDDING
          </h2>
          <span className={styless["container3-col-2-text-2"]}>
            Wedding in Hills
          </span>
          <img
            className={styless["container3-col-2-img-1"]}
            src={hillwedding}
            alt="wedding image"
          />
          <span className={styless["container3-col-2-text-3"]}>
            Vows on Destination
          </span>
          <img
            className={styless["container3-col-2-img-2"]}
            src={destinationwedding}
            alt="wedding image"
          />
        </div>
      </div>
      {/* container 3 end  */}
      {/* container 4  */}
      <div className={styless["container4"]}>
        <span className={styless["container4-text-1"]}>
          LEAVE YOUR WEDDING PLANNING TO OUR EXPERT <br />
          PLANNERS AND ENJOY YOUR WEDDING FESTIVITIES.
        </span>
        <h2 className={styless["container4-text-2"]}>SHAADI SPECIALIST</h2>
        <img
          className={styless["container4-img-1"]}
          src={borderdesign}
          alt="border img"
        />
        <img
          className={styless["container4-img-2"]}
          src={brideimg}
          alt="bride img"
        />
        <div className={styless["container4-div-1"]}>
          <button className={styless["container4-text-3"]}>Learn More</button>
        </div>
      </div>
      {/* container 4 end */}
      {/* container 5  */}
      <div
        className={`h-auto w-full border-r-4 border-b-4 border-t-0 border-l-0 rounded-r-2xl border-yellow-300 grid justify-center items-center md:flex md:place-content-between md:p-5`}
      >
        <div
          className={`${styless["scroll-offercard1"]} h-96 w-64 grid items-center justify-center p-5`}
        >
          <div
            className={`h-16 w-16 border-4 border-yellow-900 flex items-center justify-center rounded-full`}
          >
            <h1 className={`text-2xl font-bold text-yellow-900`}>B</h1>
          </div>
          <div
            className={`h-72 w-56 border-8 rounded-2xl border-r-yellow-800 border-b-yellow-800 border-l-0 border-t-0`}
          >
            <div className="h-full w-full border-l-4 rounded-xl ">
              <h1
                className={`w-full h-[75px] flex justify-center items-center text-xl font-semibold text-yellow-800`}
              >
                Bronze Plan
              </h1>
              <p className="w-full h-16 font-medium flex items-center justify-center ">
                Help in Haldi, Shadi.
              </p>
              <p className="w-full h-12 flex items-center justify-center font-semibold">
                ₹ 500/-
              </p>

              <div className="flex items-center justify-center ">
                <button
                  onClick={() =>
                    handlePayment({
                      amount: "500",
                      currency: "INR",
                      receipt: `bronze plan ${Math.random()}`,
                      userdata: userData,
                    })
                  }
                  className={`h-10 w-24 border-2 bg-yellow-900 rounded-md text-white hover:bg-yellow-700 hover:text-black font-medium`}
                >
                  {isLoading1 ? (
                    <i className="fa fa-spinner fa-spin"></i>
                  ) : (
                    "Buy Now"
                  )}
                </button>
              </div>
              <div className=" pl-5 h-14 flex items-center">
                <p className="text-xs text-blue-600">T&C Apply!</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${styless["scroll-offercard2"]} h-96 w-64  grid items-center justify-center p-5`}
        >
          <div className="  h-16 w-16 border-4 border-slate-500 flex items-center justify-center rounded-full">
            <h1 className="text-2xl font-bold text-slate-500">S</h1>
          </div>
          <div className="h-72 w-56 border-8 rounded-2xl border-r-slate-500 border-b-slate-500 border-l-0 border-t-0">
            <div className="h-full w-full border-l-4 rounded-xl ">
              <h1 className="  w-full h-[75px] flex justify-center items-center text-xl font-semibold text-slate-500">
                Silver Plan
              </h1>
              <p className="w-full h-16 font-medium text-center flex items-center justify-center ">
                Help in Sangeet, Haldi, Shadi.
              </p>
              <p className="w-full h-12 flex items-center justify-center font-semibold">
                ₹ 700/-
              </p>

              <div className="flex items-center justify-center ">
                <button
                  onClick={() =>
                    handlePayment({
                      amount: "700",
                      currency: "INR",
                      receipt: `silver plan ${Math.random()}`,
                      userdata: userData,
                    })
                  }
                  className="h-10 w-24 border-2 bg-slate-500 rounded-md text-white hover:bg-slate-300 hover:text-black font-medium"
                >
                  {isLoading2 ? (
                    <i className="fa fa-spinner fa-spin"></i>
                  ) : (
                    "Buy Now"
                  )}
                </button>
              </div>
              <div className=" pl-5 h-14 flex items-center">
                <p className="text-xs text-blue-600">T&C Apply!</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${styless["scroll-offercard3"]} h-96 w-64  grid items-center justify-center p-5`}
        >
          <div className="  h-16 w-16 border-4 border-yellow-500 flex items-center justify-center rounded-full">
            <h1 className="text-2xl font-bold text-yellow-500">G</h1>
          </div>
          <div className="h-72 w-56 border-8 rounded-2xl border-r-yellow-500 border-b-yellow-500 border-l-0 border-t-0">
            <div className="h-full w-full border-l-4 rounded-xl ">
              <h1 className="  w-full h-[75px] flex justify-center items-center text-xl font-semibold text-yellow-500">
                Gold Plan
              </h1>
              <p className="w-full h-16 font-medium flex items-center justify-center text-center">
                Help in Mehndi, Sangeet, Haldi, Shadi.
              </p>
              <p className="w-full h-12 flex items-center justify-center font-semibold">
                ₹ 1000/-
              </p>

              <div className="flex items-center justify-center ">
                <button
                  onClick={() =>
                    handlePayment({
                      amount: "1000",
                      currency: "INR",
                      receipt: `Gold plan ${Math.random()}`,
                      userdata: userData,
                    })
                  }
                  className="h-10 w-24 border-2 bg-yellow-500 rounded-md text-white hover:bg-yellow-300 hover:text-black font-medium "
                >
                  {isLoading3 ? (
                    <i className="fa fa-spinner fa-spin"></i>
                  ) : (
                    "Buy Now"
                  )}
                </button>
              </div>
              <div className="pt-5 pl-5">
                <p className="text-xs text-blue-600">T&C Apply!</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${styless["scroll-offercard4"]} "h-96 w-64  grid items-center justify-center p-5"`}
        >
          <div className="  h-16 w-16 border-4 border-gray-400 flex items-center justify-center rounded-full">
            <h1 className="text-2xl font-bold text-gray-400">P</h1>
          </div>
          <div className="h-72 w-56 border-8 rounded-2xl border-r-gray-400 border-b-gray-400 border-l-0 border-t-0">
            <div className="h-full w-full border-l-4 rounded-xl ">
              <h1 className=" w-full h-[75px] flex justify-center items-center text-xl font-semibold text-gray-400">
                Platinum Plan
              </h1>
              <p className="w-full h-16 font-medium flex items-center justify-center text-center ">
                Help in Mehndi, Sangeet, Haldi, Shadi, Reception.
              </p>
              <p className="w-full h-12 flex items-center justify-center font-semibold">
                ₹ 1500/-
              </p>

              <div className=" flex items-center justify-center ">
                <button
                  onClick={() =>
                    handlePayment({
                      amount: "1500",
                      currency: "INR",
                      receipt: `Platinum plan ${Math.random()}`,
                      userdata: userData,
                    })
                  }
                  className="h-10 w-24 border-2 bg-gray-400 rounded-md text-white hover:bg-gray-200 hover:text-black font-medium"
                >
                  {isLoading4 ? (
                    <i className="fa fa-spinner fa-spin"></i>
                  ) : (
                    "Buy Now"
                  )}
                </button>
              </div>
              <div className=" pl-5 h-14 flex items-center">
                <p className="text-xs text-blue-600">T&C Apply!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* container 5 end */}
      {/* container 6 Feedback  */}
      <div className={styless["container6"]}>
        <div className={styless["container6-div-1"]}>
          <h1>OUR HAPPY CUSTOMERS</h1>
        </div>
        <div className={styless["container6-div-2"]}>
          <span>{comments[count]?.name}</span>
          <p>{comments[count]?.comment}</p>
          <img src={comments[count]?.image} alt="wedding 1" />
        </div>
      </div>
      {/* container 6 Feedback end  */}
      <FooterComponent />
      <PopupComponent open={open} setOpen={setOpen} message={message} />
    </>
  );
};

export default HomeComponent;
