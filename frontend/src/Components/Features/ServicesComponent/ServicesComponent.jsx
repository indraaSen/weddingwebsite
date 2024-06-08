import React from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import FooterComponent from "../FooterComponent/FooterComponent";
import weddingphoto3 from "../../Images/weddingphoto3.jpeg";
import cuisine from "../../Images/cuisine.jpg";
import bridemakeup from "../../Images/bridemakeup.jpg";
import decore from "../../Images/decore.jpg";
import honeymoon from "../../Images/honeymoonpicture2.jpeg";
import styless from "./ServicesComponent.module.scss";

const allImages = [weddingphoto3];
const cardData = [
  {
    image: cuisine,
    title: "Cuisine",
    details:
      "We will arrange your mehndi ceremony Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui accusamus dolorum sequi rem, at odio minima! Dolore at cum ad laboriosam porro officiis sed, nostrum ratione non harum consectetur corporis? We will arrange your mehndi ceremony Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui accusamus dolorum sequi rem, at odio minima! Dolore at cum ad laboriosam porro officiis sed, nostrum ratione non harum consectetur corporis?",
  },
  {
    image: bridemakeup,
    title: "Beauty Rituals",
    details:
      "We will arrange your mehndi ceremony Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui accusamus dolorum sequi rem, at odio minima! Dolore at cum ad laboriosam porro officiis sed, nostrum ratione non harum consectetur corporis? We will arrange your mehndi ceremony Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui accusamus dolorum sequi rem, at odio minima! Dolore at cum ad laboriosam porro officiis sed, nostrum ratione non harum consectetur corporis?",
  },
  {
    image: decore,
    title: "Decore",
    details:
      "We will arrange your mehndi ceremony Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui accusamus dolorum sequi rem, at odio minima! Dolore at cum ad laboriosam porro officiis sed, nostrum ratione non harum consectetur corporis? We will arrange your mehndi ceremony Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui accusamus dolorum sequi rem, at odio minima! Dolore at cum ad laboriosam porro officiis sed, nostrum ratione non harum consectetur corporis?",
  },
  {
    image: honeymoon,
    title: "Honeymoon",
    details:
      "We will arrange your mehndi ceremony Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui accusamus dolorum sequi rem, at odio minima! Dolore at cum ad laboriosam porro officiis sed, nostrum ratione non harum consectetur corporis? We will arrange your mehndi ceremony Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui accusamus dolorum sequi rem, at odio minima! Dolore at cum ad laboriosam porro officiis sed, nostrum ratione non harum consectetur corporis?",
  },
];
const custom_gradient = "linear-gradient(120deg, #fffaf6 50%, #ffffff 50%)";
const ServicesComponent = () => {
  return (
    <>
      <HeaderComponent allImages={allImages} />
      <div className={styless["container1"]}>
        <div>
          <h2>We Make it Happen</h2>
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
          <div className={`${styless["card"]}`}>
            <div className={styless["card-image"]}>
              <img src={data.image} alt="image1" />
            </div>
            <div className={styless["card-text"]}>
              <h2>{data.title}</h2>
              <p>{data.details}</p>
              <button>CONTACT US</button>
            </div>
          </div>
        ))}
      </div>
      <FooterComponent />
    </>
  );
};

export default ServicesComponent;
