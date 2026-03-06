import React from "react";

const Navbar = ({ handleLogout }) => {
  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

      <div className="container-fluid">

        <span className="navbar-brand">
          Student Management
        </span>

        <button
          className="btn btn-danger"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>

  );
};

export default Navbar;
