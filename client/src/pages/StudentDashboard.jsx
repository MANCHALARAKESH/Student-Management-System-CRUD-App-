import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getStudents,
  addStudent
} from "../features/student/studentSlice";

import { logout } from "../features/auth/authSlice";
import Navbar from "../components/Navbar";

const Dashboard = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { students, isLoading } = useSelector(
    (state) => state.students
  );

  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  const handleAdd = (e) => {
    e.preventDefault();

    dispatch(addStudent({ name, age }));

    setName("");
    setAge("");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>

      {/* Pass logout function */}
      <Navbar handleLogout={handleLogout} />

      <div className="container mt-4">

        <h2>Student Dashboard</h2>

        {isLoading && <p>Loading...</p>}

        <form onSubmit={handleAdd} className="mb-3">

          <input
            type="text"
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <button type="submit">Add Student</button>

        </form>

        <ul>
          {students.map((student) => (
            <li key={student._id}>
              {student.name} - {student.age}
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
};

export default Dashboard;
