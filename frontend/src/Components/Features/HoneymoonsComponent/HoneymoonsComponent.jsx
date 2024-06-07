import * as React from "react";
import { useDispatch } from "react-redux";
import { retriveUser } from "../../APIs/API";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import image1 from "../../Images/honeymoonpicture1.jpeg";
import image2 from "../../Images/honeymoonpicture2.jpeg";
import image3 from "../../Images/honeymoonpicture3.jpeg";
import image4 from "../../Images/honeymoonpicture4.jpeg";
import image5 from "../../Images/honeymoonpicture5.jpeg";
import styless from "./HoneymoonsComponent.module.scss";
import FooterComponent from "../FooterComponent/FooterComponent";

const honeymoonImages = [image1, image2, image3, image4, image5];

const cardData = [
  {
    image: image1,
    title: "Honeymoon at Best Place",
    details:
      "We will arrange your mehndi ceremony Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui accusamus dolorum sequi rem, at odio minima! Dolore at cum ad laboriosam porro officiis sed, nostrum ratione non harum consectetur corporis? We will arrange your mehndi ceremony Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui accusamus dolorum sequi rem, at odio minima! Dolore at cum ad laboriosam porro officiis sed, nostrum ratione non harum consectetur corporis?",
  },
  {
    image: image2,
    title: "Honeymoon in Spain",
    details:
      "We will arrange your mehndi ceremony Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui accusamus dolorum sequi rem, at odio minima! Dolore at cum ad laboriosam porro officiis sed, nostrum ratione non harum consectetur corporis? We will arrange your mehndi ceremony Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui accusamus dolorum sequi rem, at odio minima! Dolore at cum ad laboriosam porro officiis sed, nostrum ratione non harum consectetur corporis?",
  },
  {
    image: image3,
    title: "Honeymoon in Maldives",
    details:
      "We will arrange your mehndi ceremony Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui accusamus dolorum sequi rem, at odio minima! Dolore at cum ad laboriosam porro officiis sed, nostrum ratione non harum consectetur corporis? We will arrange your mehndi ceremony Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui accusamus dolorum sequi rem, at odio minima! Dolore at cum ad laboriosam porro officiis sed, nostrum ratione non harum consectetur corporis?",
  },
  {
    image: image4,
    title: "Honeymoon in Tropical",
    details:
      "We will arrange your mehndi ceremony Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui accusamus dolorum sequi rem, at odio minima! Dolore at cum ad laboriosam porro officiis sed, nostrum ratione non harum consectetur corporis? We will arrange your mehndi ceremony Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui accusamus dolorum sequi rem, at odio minima! Dolore at cum ad laboriosam porro officiis sed, nostrum ratione non harum consectetur corporis?",
  },
  {
    image: image5,
    title: "Honeymoon in Goa",
    details:
      "We will arrange your mehndi ceremony Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui accusamus dolorum sequi rem, at odio minima! Dolore at cum ad laboriosam porro officiis sed, nostrum ratione non harum consectetur corporis? We will arrange your mehndi ceremony Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui accusamus dolorum sequi rem, at odio minima! Dolore at cum ad laboriosam porro officiis sed, nostrum ratione non harum consectetur corporis?",
  },
];

const HoneymoonsComponent = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    retriveUser(dispatch);
  }, [dispatch]);

  return (
    <>
      <HeaderComponent allImages={honeymoonImages} />
      <div className={styless["container1"]}>
        <div>
          <h2>Your Honeymoon Paradise</h2>
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

export default HoneymoonsComponent;
