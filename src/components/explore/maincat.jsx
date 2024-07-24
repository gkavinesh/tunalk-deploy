import React from "react";
import Slider from "react-slick";
import './maincat.css';
import { assets } from "../../assets/assets";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Arrow Components
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#048978" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#048978" }}
      onClick={onClick}
    />
  );
}

function SwipeToSlide() {
  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "30px",
    slidesToShow: 8,
    swipeToSlide: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    afterChange: function(index) {
      console.log(
        `Slider Changed to: ${index + 1}`
      );
    }
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="slide">
          <img src={assets.tunamini} className='slide-img' alt="Image 1"/>
        </div>
        <div className="slide">
          <img src={assets.scadmini} className='slide-img' alt="Image 2" />
        </div>
        <div className="slide">
          <img src={assets.sailmini} className='slide-img' alt="Image 3" />
        </div>
        <div className="slide">
          <img src={assets.tunamini} className='slide-img' alt="Image 4" />
        </div>
        <div className="slide">
          <img src={assets.scadmini} className='slide-img' alt="Image 5" />
        </div>
        <div className="slide">
          <img src={assets.sailmini} className='slide-img' alt="Image 6" />
        </div>
        <div className="slide">
          <img src={assets.tunamini} className='slide-img' alt="Image 7" />
        </div>
        <div className="slide">
          <img src={assets.scadmini} className='slide-img' alt="Image 8" />
        </div>
        <div className="slide">
          <img src={assets.sailmini} className='slide-img' alt="Image 9" />
        </div>
      </Slider>
    </div>
  );
}

export default SwipeToSlide;











