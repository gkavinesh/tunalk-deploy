import React from 'react';

const CategoryCard = ({ image, title }) => {
  return (
    <div className="font-medium border-2 border-lime-200 bg-slate-50 text-gray-500 w-32 h-20 rounded-md text-center flex flex-col justify-center shadow-md">
      <img src={image} alt={title} className="w-32 h-20 mx-auto" />
    </div>

  );
};

export default CategoryCard;

