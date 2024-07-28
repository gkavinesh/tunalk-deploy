import React from "react";
import Slider from "react-slick";
import './maincat.css';
import { assets } from "../../assets/assets";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

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
      <IoIosArrowForward />{/* Right arrow icon */}
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
      <IoIosArrowBack /> {/* Left arrow icon */}
    </div>
  );
}

function SwipeToSlide() {
  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "30px",
    slidesToShow: 9,
    swipeToSlide: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    afterChange: function(index) {
      console.log(
        `Slider Changed to: ${index + 1}`
      );
    },
    responsive: [
      {
        breakpoint: 1024, // Tablet breakpoint
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 768, // Mobile breakpoint
        settings: {
          slidesToShow: 3,
        }
      }
    ]
  };

  return (
    <div className="carousel-container">
    <div className="slider-container">
      <Slider {...settings}>
        <div className="border-gray-200 slide">
          <img src={assets.one} className='slide-img' alt="Image 1" />
        </div>
        <div className="border-gray-200 slide">
          <img src={assets.two} className='slide-img' alt="Image 2" />
        </div>
        <div className="border-gray-200 slide">
          <img src={assets.three} className='slide-img' alt="Image 3" />
        </div>
        <div className="border-gray-200 slide">
          <img src={assets.four} className='slide-img' alt="Image 4" />
        </div>
        <div className="border-gray-200 slide">
          <img src={assets.five} className='slide-img' alt="Image 5" />
        </div>
        <div className="border-gray-200 slide">
          <img src={assets.six} className='slide-img' alt="Image 6" />
        </div>
        <div className="border-gray-200 slide">
          <img src={assets.seven} className='slide-img' alt="Image 7" />
        </div>
        <div className="border-gray-200 slide">
          <img src={assets.eight} className='slide-img' alt="Image 8" />
        </div>
        <div className="border-gray-200 slide">
          <img src={assets.nine} className='slide-img' alt="Image 9" />
        </div>
        <div className="border-gray-200 slide">
          <img src={assets.ten} className='slide-img' alt="Image 10" />
        </div>
        <div className="border-gray-200 slide">
          <img src={assets.eleven} className='slide-img' alt="Image 11" />
        </div>
        <div className="border-gray-200 slide">
          <img src={assets.twelve} className='slide-img' alt="Image 12" />
        </div>
        <div className="border-gray-200 slide">
          <img src={assets.thirteen} className='slide-img' alt="Image 13" />
        </div>
      </Slider>
    </div>
    </div>
  );
}

export default SwipeToSlide;












