import React from 'react';
import './ExploreProducts.css';
import { menu_list } from '../../assets/assets';

const Breadcrumbs = ({ currentCategory }) => (
  <nav aria-label="Breadcrumb">
    <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <li>
        <div className="flex items-center">
          <a href="/" className="mr-2 text-sm font-medium text-gray-900">Home</a>
          <svg
            fill="currentColor"
            width={16}
            height={20}
            viewBox="0 0 16 20"
            aria-hidden="true"
            className="h-5 w-4 text-gray-300"
          >
            <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
          </svg>
        </div>
      </li>
      <li>
        <div className="flex items-center">
          <a href="/products" className="mr-2 text-sm font-medium text-gray-900">Products</a>
          <svg
            fill="currentColor"
            width={16}
            height={20}
            viewBox="0 0 16 20"
            aria-hidden="true"
            className="h-5 w-4 text-gray-300"
          >
            <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
          </svg>
        </div>
      </li>
      <li className="text-sm">
        <a href="#" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
          {currentCategory}
        </a>
      </li>
    </ol>
  </nav>
);

const ExploreProducts = ({ category, setCategory }) => {
  return (
    <div>
      <Breadcrumbs currentCategory={category} />
      <div className='explore-menu' id='explore-menu'>
        <div className="explore-menu-list">
          {menu_list.map((item, index) => (
            <div
              onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
              key={index}
              className='explore-menu-list-item'
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt=""
              />
              <p>{item.menu_name}</p>
            </div>
          ))}
        </div>
        <hr />
      </div>
    </div>
  );
};

export default ExploreProducts;

