import React, { useEffect, useState } from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import FooterComponent from "../FooterComponent/FooterComponent";
import mehndi from "../../Images/mehndiceremony.jpg";
import sangeet from "../../Images/sangeetceremony.jpg";
import haldi from "../../Images/haldiceremony.jpg";
import wedding from "../../Images/weddingimg.jpg";
import styless from "./OffersComponent.module.scss";
import weddingimage1 from "../../Images/weddingPhoto1.jpg";
import logo from "../../Images/logo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { makePayment, retriveUser } from "../../APIs/API";
import useRazorpay from "react-razorpay";
import PopupComponent from "../../Module/PopupComponent/PopupComponent";

const allImages = [mehndi, sangeet, haldi, wedding];
const cardData = [
  {
    image: mehndi,
    package: "BRONZE PACKAGE",
    details: [
      {
        ceremony: "HALDI :",
        details:
          "We will arrange your Haldi ceremony Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui accusamus dolorum sequi rem, at odio minima! Dolore at cum ad laboriosam porro officiis sed, nostrum ratione non harum consectetur corporis?",
      },
      {
        ceremony: "Shadi :",
        details:
          "We will arrange your Wedding.Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui accusamus dolorum sequi rem, at odio minima! Dolore at cum ad laboriosam porro officiis sed, nostrum ratione non harum consectetur corporis?",
      },
    ],
    paymentData: {
      amount: "500",
      currency: "INR",
      receipt: `bronze plan ${Math.random()}`,
    },
  },
  {
    image: sangeet,
    package: "SILVER PACKAGE",
    details: [
      {
        ceremony: "SANGEET :",
        details:
          "We will arrange your sangeet ceremony Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui accusamus dolorum sequi rem, at odio minima! Dolore at cum ad laboriosam porro officiis sed, nostrum ratione non harum consectetur corporis?",
      },
      {
        ceremony: "HALDI :",
        details:
          "We will arrange your Haldi ceremony Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui accusamus dolorum sequi rem, at odio minima! Dolore at cum ad laboriosam porro officiis sed, nostrum ratione non harum consectetur corporis?",
      },
      {
        ceremony: "Shadi :",
        details:
          "We will arrange your Wedding.Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui accusamus dolorum sequi rem, at odio minima! Dolore at cum ad laboriosam porro officiis sed, nostrum ratione non harum consectetur corporis?",
      },
    ],
    paymentData: {
      amount: "700",
      currency: "INR",
      receipt: `silver plan ${Math.random()}`,
    },
  },
  {
    image: weddingimage1,
    package: "GOLD PACKAGE",
    details: [
      {
        ceremony: "MEHNDI :",
        details:
          "We will arrange your mehndi ceremony Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui accusamus dolorum sequi rem, at odio minima! Dolore at cum ad laboriosam porro officiis sed, nostrum ratione non harum consectetur corporis?",
      },
      {
        ceremony: "SANGEET :",
        details:
          "We will arrange your sangeet ceremony Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui accusamus dolorum sequi rem, at odio minima! Dolore at cum ad laboriosam porro officiis sed, nostrum ratione non harum consectetur corporis?",
      },
      {
        ceremony: "HALDI :",
        details:
          "We will arrange your Haldi ceremony Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui accusamus dolorum sequi rem, at odio minima! Dolore at cum ad laboriosam porro officiis sed, nostrum ratione non harum consectetur corporis?",
      },
      {
        ceremony: "SHADI :",
        details:
          "We will arrange your Wedding.Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui accusamus dolorum sequi rem, at odio minima! Dolore at cum ad laboriosam porro officiis sed, nostrum ratione non harum consectetur corporis?",
      },
    ],
    paymentData: {
      amount: "1000",
      currency: "INR",
      receipt: `Gold plan ${Math.random()}`,
    },
  },
  {
    image: haldi,
    package: "PLATINUM PACKAGE",
    details: [
      {
        ceremony: "MEHNDI :",
        details:
          "We will arrange your mehndi ceremony Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui accusamus dolorum sequi rem, at odio minima! Dolore at cum ad laboriosam porro officiis sed, nostrum ratione non harum consectetur corporis?",
      },
      {
        ceremony: "SANGEET :",
        details:
          "We will arrange your sangeet ceremony Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui accusamus dolorum sequi rem, at odio minima! Dolore at cum ad laboriosam porro officiis sed, nostrum ratione non harum consectetur corporis?",
      },
      {
        ceremony: "HALDI :",
        details:
          "We will arrange your Haldi ceremony Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui accusamus dolorum sequi rem, at odio minima! Dolore at cum ad laboriosam porro officiis sed, nostrum ratione non harum consectetur corporis?",
      },
      {
        ceremony: "SHADI :",
        details:
          "We will arrange your Wedding.Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui accusamus dolorum sequi rem, at odio minima! Dolore at cum ad laboriosam porro officiis sed, nostrum ratione non harum consectetur corporis?",
      },
      {
        ceremony: "RECEPTION :",
        details:
          "We will arrange your Reception.Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui accusamus dolorum sequi rem, at odio minima! Dolore at cum ad laboriosam porro officiis sed, nostrum ratione non harum consectetur corporis?",
      },
    ],
    paymentData: {
      amount: "1500",
      currency: "INR",
      receipt: `Platinum plan ${Math.random()}`,
    },
  },
];
const OffersComponent = () => {
  const userData = useSelector((state) => state.login.userdata);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isLoading3, setIsLoading3] = useState(false);
  const [isLoading4, setIsLoading4] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    retriveUser(dispatch);
  }, [dispatch]);

  const [Razorpay] = useRazorpay();

  const handlePayment = (data) => {
    console.log("Data", data);
    makePayment(
      data,
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
  return (
    <>
      <HeaderComponent allImages={allImages} />
      <div className={styless["container1"]}>
        <div>
          <h2>Wedding Offers by Shadi-Mubarak</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            quidem non, est, pariatur harum optio quaerat, doloribus rerum
            sapiente neque aliquam saepe quasi molestiae quo sed aut voluptas
            sint eligendi sit exercitationem excepturi distinctio. Officiis,
            tempora omnis. Perspiciatis commodi iusto exercitationem
            reprehenderit, tenetur ad perferendis, doloremque a ratione velit
            ipsa! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Necessitatibus libero ullam accusantium earum nam nulla iste quia,
            soluta delectus facilis!
          </p>
        </div>
      </div>
      <div className={styless["container2"]}>
        {cardData.map((data) => (
          <div className={styless["card"]}>
            <div className={styless["card-image"]}>
              <img src={data.image} alt="image1" />
            </div>
            <div className={styless["card-text"]}>
              <h2>{data.package}</h2>
              {data.details.map((cardDetails) => (
                <dl>
                  <dt>{cardDetails.ceremony}</dt>
                  <dd>{cardDetails.details}</dd>
                </dl>
              ))}
              <button
                onClick={() =>
                  handlePayment({ ...data.paymentData, userdata: userData })
                }
              >
                BUY NOW
              </button>
            </div>
          </div>
        ))}
      </div>
      <FooterComponent />
      <PopupComponent open={open} setOpen={setOpen} message={message} />
    </>
  );
};

export default OffersComponent;
