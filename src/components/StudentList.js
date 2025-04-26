import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import '../css/StudentList.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const res = await api.get('/students');
      setStudents(res.data);
    } catch (error) {
      console.error("Failed to fetch students", error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await api.delete(`/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Failed to delete student", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="student-list-container">
      <h2>Student List</h2>

      <div className="student-list-buttons">
        <Link to="/add"><button>Add New Student</button></Link>
        
      </div>

      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Department</th>
            <th>Enrollment Year</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td>{s.studentId}</td>
              <td>{s.firstName} {s.lastName}</td>
              <td>{s.email}</td>
              <td>{s.dob?.slice(0, 10)}</td>
              <td>{s.department}</td>
              <td>{s.enrollmentYear}</td>
              <td>{s.isActive ? 'Active' : 'Inactive'}</td>
              <td>
  <button  className="edit" onClick={() => navigate(`/edit/${s._id}`)}>Edit</button>{' '}
  |{' '}
  <button className="delete"onClick={() => deleteStudent(s._id)}>Delete</button>
</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;