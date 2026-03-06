import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.heading}>Register</h2>

        {isError && (
          <p style={{ color: "red", textAlign: "center" }}>
            {message}
          </p>
        )}

        <input
          style={styles.input}
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
        />

        <input
          style={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          style={styles.input}
          type="text"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
        />

        <select
          style={styles.input}
          name="gender"
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          style={styles.input}
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <input
          style={styles.input}
          type="string"
          name="role"
          placeholder="Role (admin/student)"
          onChange={handleChange}
        />

        <button style={styles.button} type="submit">
          {isLoading ? "Registering..." : "Register"}
        </button>

        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Already have account?
          <span
            style={styles.link}
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f9",
  },
  form: {
    width: "350px",
    padding: "30px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  link: {
    color: "blue",
    marginLeft: "5px",
    cursor: "pointer",
  },
};

export default Register;
