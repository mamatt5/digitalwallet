import React from 'react'

import '../../components/LogoHeader/LogoHeader.css'
import PayPathLogo from '../../assets/PayPathLogo.png'

const LogoHeader = () => {
  return (
    <div className="logo-header-container">
      <div className="logo-and-name-container">
        <img 
          src={PayPathLogo} 
          alt="PayPath logo"
          className="logo-container"
        />
        <h3>PayPath</h3>
      </div>  
    </div>
  )
}

export default LogoHeader