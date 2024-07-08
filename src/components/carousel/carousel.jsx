import React, { useEffect } from "react";
import "./carousel.css";
import { assets } from "../../assets/assets";
import Image1 from './b1.jpg';
import Image2 from './b2.jpg';

const Carousel = () => {
  useEffect(() => {
    autoSlide();
  }, []);

  const autoSlide = () => {
    setInterval(() => {
      slide(getItemActiveIndex() + 1);
    }, 2000); // slide speed = 3s
  };

  const slide = (toIndex) => {
    const itemsArray = Array.from(document.querySelectorAll(".carousel_item"));
    const itemActive = document.querySelector(".carousel_item__active");

    if (toIndex >= itemsArray.length) {
      toIndex = 0;
    }

    const newItemActive = itemsArray[toIndex];

    newItemActive.classList.add("carousel_item__pos_next");
    setTimeout(() => {
      newItemActive.classList.add("carousel_item__next");
      itemActive.classList.add("carousel_item__next");
    }, 20);

    newItemActive.addEventListener("transitionend", () => {
      itemActive.className = "carousel_item";
      newItemActive.className = "carousel_item carousel_item__active";
    }, {
      once: true
    });
  };

  const getItemActiveIndex = () => {
    const itemsArray = Array.from(document.querySelectorAll(".carousel_item"));
    const itemActive = document.querySelector(".carousel_item__active");
    const itemActiveIndex = itemsArray.indexOf(itemActive);
    return itemActiveIndex;
  };

  return (
    <div className="carousel">
      <div className="carousel_inner">
        <div className="carousel_item carousel_item__active">
          <img src={Image1} alt="" className="carousel_img" />
        </div>
        <div className="carousel_item">
          <img src={Image2} alt="" className="carousel_img" />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
