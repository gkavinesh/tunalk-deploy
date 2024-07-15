import React from 'react'
import './ExploreProducts.css'
import {menu_list} from '..//..//assets/assets'

const ExploreProducts = ({category,setCategory}) => {

  return (
    <div className='explore-menu' id='explore-menu'>
        <h2>Shop by Category</h2>
        <p className='explore-menu-text'>Discover the ocean's finest with our premium raw seafood. Sourced directly from pristine waters, our selection guarantees top-quality freshness. Perfect for culinary enthusiasts and seafood lovers alike, experience the unmatched natural flavors and elevate your dining with the best the sea has to offer.</p>
        <div className="explore-menu-list">
            {menu_list.map((item,index)=>{
                return (
                    <div onClick={()=> setCategory(prev=>prev===item.menu_name?"All":item.menu_name)}key={index} className='explore-menu-list-item'> 
                       <img className={category===item.menu_name?"active":""} src={item.menu_image} alt=""/>
                       <p>{item.menu_name}</p>
                    </div>

                )
            })}
        </div>
        <hr/>
    </div>
  )
}

export default ExploreProducts
