import React from 'react'
import './Navbar.css'
import {assets} from '../../../public/admin_assets/assets'
const Navbar = () => {
  return (
    <div className='admin-navbar'>
        <img className='admin-logo' src={assets.logo} alt="" />
        <img className='admin-profile' src={assets.profile_image} alt="" />
    </div>
  )
}

export default Navbar