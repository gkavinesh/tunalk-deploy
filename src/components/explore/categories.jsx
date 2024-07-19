import React from 'react';

const CategoryCard = ({ image, title }) => {
  return (
    <div className="font-medium border border-gray-300 bg-white text-gray-500 w-28 h-28 rounded-full p-2 text-center flex flex-col justify-center shadow-md">
      <img src={image} alt={title} className="w-12 h-12 mx-auto rounded-full" />
      <div className="mt-2 text-[10px]">{title}</div>
    </div>
  );
};

export default CategoryCard;

