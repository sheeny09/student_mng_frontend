import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';
import Home from "./components/Home";
import Navbar from "./components/Navbar"; // Import Navbar
import StudentList from "./components/StudentList";

function App() {
  return (
    <Router>
      <Navbar /> {/* Add Navbar here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/add" element={<AddStudent />} />
        <Route path="/edit/:id" element={<EditStudent />} />
      </Routes>
    </Router>
  );
}

export default App;
