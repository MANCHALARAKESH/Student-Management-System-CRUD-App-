import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admindashboard");
      } else {
        navigate("/studentdashboard");
      }
    }
  }, [user, navigate]);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (

    <div style={styles.container}>

      <form style={styles.form} onSubmit={onSubmit}>

        <h2 style={styles.heading}>Login</h2>

        {isError && (
          <p style={{ color: "red", textAlign: "center" }}>
            {message}
          </p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={onChange}
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={onChange}
          style={styles.input}
        />

        <button
          type="submit"
          style={styles.button}
        >
          {isLoading ? "Loading..." : "Login"}
        </button>

        <div style={styles.bottom}>

          <p>Don't have an account?</p>

          <Link to="/register" style={styles.link}>
            Register here
          </Link>

        </div>

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

  bottom: {
    marginTop: "15px",
    textAlign: "center",
  },

  link: {
    color: "blue",
    marginLeft: "5px",
    cursor: "pointer",
    textDecoration: "none",
  },
};

export default Login;
