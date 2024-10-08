// Navbar.js
import React from "react";
import "./FacultyNavbar.css";  // Import custom CSS for styling
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Left side links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to='/'>Faculty LIst</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/map'>Faculty Card</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/addfaculty'>Add Faculty</Link>
            </li>
          </ul>
        </div>

        {/* Right side logo */}
        <div className="navbar-brand ms-auto">
          <a href="#" className="navbar-logo">
            <img
              src="https://darshan.ac.in/Content/media/DU_Logo.svg"  // Replace with your logo
              alt="Logo"
            />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
