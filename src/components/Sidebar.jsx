import React from 'react';
import { Link } from 'react-router-dom'; 
import { FaHome, FaUser, FaListAlt, FaSignOutAlt } from 'react-icons/fa'; 
import './Sidebar.css';

function Sidebar() {
  const handleLogout = () => {
    console.log('Logout clicked');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Cinema Elk</h3>
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/home">
            <FaHome /> Home
          </Link>
        </li>
        <li>
          <Link to="/profile/:name">
            <FaUser /> Profile
          </Link>
        </li>
        <li>
          <Link to="/user/reviews">
            <FaListAlt /> Reviews
          </Link>
        </li>
        <li>
          <Link to="/login">
            <button onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
