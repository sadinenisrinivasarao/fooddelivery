import React from 'react'
import './Sidebar.css'
import { assets } from '../../../public/admin_assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='admin-sidebar'>
        <div className="admin-sidebar-options">
            <NavLink to='/add' className="admin-sidebar-option" >
                <img src={assets.add_icon} alt="Add Food Icon" />
                <p>Add Food Items</p>
            </NavLink>
            <NavLink to='/list' className="admin-sidebar-option" >
                <img src={assets.order_icon} alt="List Items Icon" />
                <p>List Items</p>
            </NavLink>
            <NavLink to='/orders' className="admin-sidebar-option" >
                <img src={assets.order_icon} alt="Orders Icon" />
                <p>Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar
