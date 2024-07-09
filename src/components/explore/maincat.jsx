import React from 'react';
import CategoryCard from './categories'; // Assuming CategoryCard component is properly imported
import './categories.css'; // Assuming you have a CSS file for styling
import { assets } from '../../assets/assets';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const categories = [
  { image: assets.icon1, title: 'FISH' },
  { image: assets.icon2, title: 'CRABS' },
  { image: assets.icon3, title: 'PRAWNS' },
  { image: assets.icon2, title: 'CRABS' },
  { image: assets.icon4, title: 'LOBSTERS' },
  { image: assets.icon5, title: 'TODAY DEALS' },
  { image: assets.icon4, title: 'LOBSTERS' },
  { image: assets.icon6, title: 'SLICES' }
];

const scroll = (direction) => {
  const container = document.querySelector('.categories-container');
  const scrollAmount = direction === 'left' ? -200 : 200; // Adjust scroll amount as needed
  container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
};

const Categories = () => {
  return (
    <div className="categories-container-wrapper">
      <div className="arrow-icon left-arrow" onClick={() => scroll('left')}>
        <FaArrowLeft />
      </div>
      <div className="categories-container">
        {categories.map((category, index) => (
          <div key={index} className="category-wrapper">
            <CategoryCard image={category.image} title={category.title} />
          </div>
        ))}
      </div>
      <div className="arrow-icon right-arrow" onClick={() => scroll('right')}>
        <FaArrowRight />
      </div>
    </div>
  );
};

export default Categories;



