import React from 'react';
import { Link } from 'react-router-dom';
import "../css/Home.css";

const Home = () => (
  <div className="home-container">
    <h2>Welcome to Student Management System</h2>
    <div className="home-buttons">
      <Link to="/students" className="btn">View Students</Link>
      <Link to="/add" className="btn">Add Student</Link>
    </div>
  </div>
);

export default Home;