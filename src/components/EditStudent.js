import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import "../css/AddStudent.css";

const EditStudent = () => {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await api.get(`/students/${id}`);
        const student = res.data;
        setFormData({
          studentId: student.studentId || '',
          firstName: student.firstName || '',
          lastName: student.lastName || '',
          email: student.email || '',
          dob: student.dob ? student.dob.substring(0, 10) : '',
          department: student.department || '',
          enrollmentYear: student.enrollmentYear || '',
          isActive: student.isActive ?? true,
        });
      } catch (error) {
        console.error('Error loading student:', error);
      }
    };

    fetchStudent();
  }, [id]);

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
      await api.put(`/students/${id}`, formData);
      navigate('/students');
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to update student');
    }
  };

  return (
    <div className="student-form-container">
      <h2>Edit Student</h2>
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

        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
          minLength={2}
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
          minLength={2}
        />

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

        <label htmlFor="dob">Date of Birth</label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />

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

        <div className="checkbox-group">
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />
          <label htmlFor="isActive">Active</label>
        </div>

        <button type="submit">Update Student</button>
      </form>
    </div>
  );
};

export default EditStudent;