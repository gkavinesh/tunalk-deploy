import React from 'react';

const CategoryCard = ({ image, title }) => {
  return (
    <div className="font-medium border border-gray-300 bg-white text-gray-500 h-20 rounded-md p-2 text-center flex flex-col justify-center shadow-md">
      <img src={image} alt={title} className="max-w-full h-12 mx-auto" />
      <div className="mt-2 text-xs">{title}</div>
    </div>
  );
};

export default CategoryCard;
