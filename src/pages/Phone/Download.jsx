import React from 'react'
import { assets } from '../../assets/assets'
import './Download.css' // Import the CSS file

const App = () => {
  return (
    <div className="responsive-image-container">
      <img src={assets.bg} className="responsive-image" alt="Background" />
    </div>
  )
}

export default App

