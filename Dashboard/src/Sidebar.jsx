import React, { useState } from 'react';
import {
  BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill,
  BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill
} from 'react-icons/bs';
import { Link } from 'react-router-dom';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const [showProductDropdown, setShowProductDropdown] = useState(false);
    const [showOfferDropdown, setShowOfferDropdown] = useState(false);


  const toggleProductDropdown = () => {
    setShowProductDropdown(!showProductDropdown);
  };
    const toggleOfferDropdown = () => {
    setShowOfferDropdown(!showOfferDropdown);
  };

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand text-dark'>
          <BsCart3 className='icon_header' /> Q-MART
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <Link to='/'>
            <BsGrid1X2Fill className='icon' /> Dashboard
          </Link>
        </li>

       <li className='sidebar-list-item'>
  <div
    onClick={toggleProductDropdown}
    style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
  >
    <span><BsFillArchiveFill className='icon' /> Products</span>
    <span style={{ fontSize: '12px', marginLeft: '10px' }}>
      {showProductDropdown ? '▲' : '▼'}
    </span>
  </div>
  

  {showProductDropdown && (
    <ul className="sidebar-dropdown">
      <li ><Link to='/products'>List Products</Link></li>
      <li><Link to="/add-product">Add Product</Link></li>
    </ul>
  )}
  

  
</li>
        <li className='sidebar-list-item'>
          <a href="#" onClick={toggleOfferDropdown}>
            <BsFillGrid3X3GapFill className='icon' /> Offer Products
          </a>
              <span style={{ fontSize: '12px', marginLeft: '10px' }}>
      {showOfferDropdown ? '▲' : '▼'}
    </span>
        </li>
          {showOfferDropdown && (
    <ul className="sidebar-dropdown">
      <li><Link to="/list-offer">Offer Products</Link></li>
    </ul>
  )}
        <li className='sidebar-list-item'>
            <Link to={'/orders'}><BsPeopleFill className='icon' /> Orders</Link>
        </li>
        <li className='sidebar-list-item'>
          <a href="#">
            <BsListCheck className='icon' /> Inventory
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="#">
            <BsMenuButtonWideFill className='icon' /> Reports
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="#">
            <BsFillGearFill className='icon' /> Setting
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
