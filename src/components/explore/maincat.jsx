import React from "react";
import Slider from "react-slick";
import './maincat.css';
import { assets } from "../../assets/assets";
import { TbArrowBadgeLeft,TbArrowBadgeRight } from "react-icons/tb";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow custom-arrow-next`} // Add custom classes for styling
      style={{
        ...style,
        display: 'block',
        color: '#048978', // Set arrow color
        fontSize: '30px', // Adjust font size as needed
        background: 'none', // Remove background
        cursor: 'pointer', // Add cursor pointer for better UX
      }}
      onClick={onClick}
    >
      <TbArrowBadgeRight />{/* Right arrow icon */}
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow custom-arrow-prev`} // Add custom classes for styling
      style={{
        ...style,
        display: 'block',
        color: '#048978', // Set arrow color
        fontSize: '30px', // Adjust font size as needed
        background: 'none', // Remove background
        cursor: 'pointer', // Add cursor pointer for better UX
      }}
      onClick={onClick}
    >
      <TbArrowBadgeLeft /> {/* Left arrow icon */}
    </div>
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
        <div className="border-gray-200 slide">
          <img src={assets.tunamini} className='slide-img' alt="Image 1"/>
        </div>
        <div className="border-gray-200 slide">
          <img src={assets.scadmini} className='slide-img' alt="Image 2" />
        </div>
        <div className="border-gray-200 slide">
          <img src={assets.sailmini} className='slide-img' alt="Image 3" />
        </div>
        <div className="border-gray-200 slide">
          <img src={assets.tunamini} className='slide-img' alt="Image 4" />
        </div>
        <div className="border-gray-200 slide">
          <img src={assets.scadmini} className='slide-img' alt="Image 5" />
        </div>
        <div className="border-gray-200 slide">
          <img src={assets.sailmini} className='slide-img' alt="Image 6" />
        </div>
        <div className="border-gray-200 slide">
          <img src={assets.tunamini} className='slide-img' alt="Image 7" />
        </div>
        <div className="border-gray-200 slide">
          <img src={assets.scadmini} className='slide-img' alt="Image 8" />
        </div>
        <div className="border-gray-200 slide">
          <img src={assets.sailmini} className='slide-img' alt="Image 9" />
        </div>
      </Slider>
    </div>
  );
}

export default SwipeToSlide;











