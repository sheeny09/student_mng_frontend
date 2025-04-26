import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import '../css/AddStudent.css';

const AddStudent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    department: '',
    enrollmentYear: '',
    isActive: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/students', formData);
      navigate('/students');
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to add student');
    }
  };

  return (
    <div className="student-form-container">
      <h2>Add Student</h2>
      <form className="student-form" onSubmit={handleSubmit}>
        <label htmlFor="studentId">Student ID</label>
        <input type="text" id="studentId" name="studentId" placeholder="Student ID" value={formData.studentId} onChange={handleChange} required />

        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required minLength={2} />

        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required minLength={2} />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />

        <label htmlFor="dob">Date of Birth</label>
        <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required />

        <label htmlFor="department">Department</label>
        <input type="text" id="department" name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />

        <label htmlFor="enrollmentYear">Enrollment Year</label>
        <input type="number" id="enrollmentYear" name="enrollmentYear" placeholder="Enrollment Year" value={formData.enrollmentYear} onChange={handleChange} min="2000" max={new Date().getFullYear()} required />

        <label className="checkbox-label" htmlFor="isActive">
          <input type="checkbox" id="isActive" name="isActive" checked={formData.isActive} onChange={handleChange} />
          Active
        </label>

        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
