import React, { useRef } from 'react';
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

const Categories = () => {
  const containerRef = useRef(null);

  const scroll = (direction) => {
    const container = containerRef.current;
    if (!container) return;
    const scrollAmount = direction === 'left' ? -200 : 200; // Adjust scroll amount as needed
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });

    // Implement logic for looping carousel
    if (direction === 'left' && container.scrollLeft === 0) {
      container.scrollLeft = container.scrollWidth;
    } else if (direction === 'right' && container.scrollLeft + container.clientWidth === container.scrollWidth) {
      container.scrollLeft = 0;
    }
  };

  return (
    <div className="relative flex items-center py-5 w-full">
      <div ref={containerRef} className="flex gap-2 bg-white overflow-x-auto md:px-8 flex-1 whitespace-nowrap">
        {categories.map((category, index) => (
          <div key={index} className="inline-block w-36 md:w-40">
            <CategoryCard image={category.image} title={category.title} />
          </div>
        ))}
      </div>
      <br></br>
    </div>
  ); 
};

export default Categories;









