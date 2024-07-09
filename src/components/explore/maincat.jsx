import React from 'react';
import CategoryCard from './categories'; // Assuming CategoryCard component is properly imported
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
  { image: assets.icon6, title: 'SLICES' },
  { image: assets.icon6, title: 'SLICES' }
];

const scroll = (direction) => {
  const container = document.querySelector('.categories-container');
  const scrollAmount = direction === 'left' ? -200 : 200; // Adjust scroll amount as needed
  container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
};

const Categories = () => {
  return (
    <div className="relative flex items-center py-5">
      <div className="absolute left-0 ml-16 z-10 p-2 cursor-pointer text-2xl text-gray-500" onClick={() => scroll('left')}>
        <FaArrowLeft />
      </div>
      <div className="flex gap-2 bg-white overflow-x-auto scroll-smooth px-12 ml-28 flex-1 whitespace-nowrap">
        {categories.map((category, index) => (
          <div key={index} className="inline-block w-40 my-4"> {/* Updated width */}
            <CategoryCard image={category.image} title={category.title} />
          </div>
        ))}
      </div>
      <div className="absolute right-0 mr-16 z-10 p-2 cursor-pointer text-2xl text-gray-500" onClick={() => scroll('right')}>
        <FaArrowRight />
      </div>
    </div>
  );
};

export default Categories;





