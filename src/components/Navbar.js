// src/components/Navbar.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">Student Management</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>

        <div 
          className="dropdown"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <button className="dropbtn">Students ▾</button>
          {dropdownOpen && (
            <div className="dropdown-content">
              <Link to="/students">View Students</Link>
              <Link to="/add">Add Student</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;