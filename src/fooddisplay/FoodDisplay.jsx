import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../context/StoreContext';
import FoodItem from '../fooditem/FoodItem';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  // Check if food_list is available
  if (!food_list) {
    console.error('food_list is not defined');
    return <div>Loading...</div>; // or some other fallback UI
  }

  return (
    <div className='food-display' id='food-display'>
      <div className="food-display-list">
        {food_list.map((item) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={item._id} // Ensure a unique key
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                offer={item.offer} // Include the offer prop
              />
            );
          }
          return null; // Handle cases where no items match the category
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;




