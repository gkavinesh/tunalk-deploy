import React from 'react'
import Banner from '../banner/banner'
import Navbar from '../navbar/navbar'
import Categories from '../explore/maincat'
import Carousel from '../carousel/carousel'
import Shopby from '../Shopby/shop'
import './header.css'

const header = () => {
  return (
    <div className='tuna-lk'>
        <Carousel/>
        <Shopby/>
    </div>
  )
}

export default header
