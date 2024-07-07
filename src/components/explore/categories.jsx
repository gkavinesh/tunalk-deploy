import './categories.css'
import React from 'react';

const CategoryCard = ({ image, title }) => {
  return (
    <div className="category-card">
      <img src={image} alt={title} />
      <p>{title}</p>
    </div>
  );
};

export default CategoryCard;
