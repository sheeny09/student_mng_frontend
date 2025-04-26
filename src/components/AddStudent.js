import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api';
import '../css/AddStudent.css';

const AddStudent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { refreshStudents } = location.state || {}; // Get the passed function
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

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!/^[a-zA-Z0-9]+$/.test(formData.studentId)) {
      newErrors.studentId = 'Student ID must be alphanumeric';
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (new Date(formData.dob) > new Date()) {
      newErrors.dob = 'Date of birth cannot be in the future';
    }

    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== 'isActive') {
        newErrors[key] = `${key} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      await api.post('/api/students', formData);
      console.log('Student added successfully!');
      if (refreshStudents) {
        refreshStudents(); // Call the function to re-fetch the list
      }
      navigate('/students');
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || 'Failed to add student');
    }
  };

  return (
    <div className="student-form-container">
      <h2>Add Student</h2>
      <form className="student-form" onSubmit={handleSubmit}>
        <label htmlFor="studentId">Student ID</label>
        <input
          type="text"
          id="studentId"
          name="studentId"
          placeholder="Student ID"
          value={formData.studentId}
          onChange={handleChange}
          required
        />
        {errors.studentId && <div className="error">{errors.studentId}</div>}

        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        {errors.firstName && <div className="error">{errors.firstName}</div>}

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        {errors.lastName && <div className="error">{errors.lastName}</div>}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <div className="error">{errors.email}</div>}

        <label htmlFor="dob">Date of Birth</label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />
        {errors.dob && <div className="error">{errors.dob}</div>}

        <label htmlFor="department">Department</label>
        <input
          type="text"
          id="department"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
        />
        {errors.department && <div className="error">{errors.department}</div>}

        <label htmlFor="enrollmentYear">Enrollment Year</label>
        <input
          type="number"
          id="enrollmentYear"
          name="enrollmentYear"
          placeholder="Enrollment Year"
          value={formData.enrollmentYear}
          onChange={handleChange}
          min="2000"
          max={new Date().getFullYear()}
          required
        />
        {errors.enrollmentYear && <div className="error">{errors.enrollmentYear}</div>}

        <label className="checkbox-label" htmlFor="isActive">
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />
          Active
        </label>

        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
