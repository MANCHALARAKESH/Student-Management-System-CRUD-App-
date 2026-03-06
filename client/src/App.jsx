import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const StudentDashboard = lazy(() => import("./pages/StudentDashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

function App() {
  return (
    <Router>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/studentdashboard"
              element={
                <ProtectedRoute>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
          <Route
              path="/admindashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
             </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
