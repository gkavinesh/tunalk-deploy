// Categories.js
import React from 'react';
import CategoryCard from './categories'; // Assuming CategoryCard component is properly imported
import './categories.css'; // Assuming you have a CSS file for styling
import { assets } from '../../assets/assets';


const categories = [
  { image: assets.fishcat, title: 'FISH' },
  { image: assets.crabcat, title: 'CRABS' },
  { image: assets.prawncat, title: 'PRAWNS' },
  { image: assets.prawncat, title: 'PRAWNS' },
  { image: assets.crabcat, title: 'CRABS' },
  { image: assets.lobstercat, title: 'LOBSTERS' },
  { image: assets.slicecat, title: 'SLICES' },
  { image: assets.dealcat, title: 'TODAY DEALS' },
  { image: assets.lobstercat, title: 'LOBSTERS' },
  { image: assets.slicecat, title: 'SLICES' }
];

const Categories = () => {
  return (
    <div className="categories-container">
      {categories.map((category, index) => (
        <div key={index} className="category-wrapper">
          <CategoryCard image={category.image} title={category.title} />
        </div>
      ))}
    </div>
  );
};

export default Categories;

