import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate(); // Hook for redirection
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // Function to update login status
  const updateLoginStatus = () => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  };

  // Listen for storage changes (cross-tab)
  useEffect(() => {
    window.addEventListener("storage", updateLoginStatus);
    return () => {
      window.removeEventListener("storage", updateLoginStatus);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    updateLoginStatus(); // Update state to reflect logged out status
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="navbar navbar-expand-sm bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Dungeon Delver
        </Link>
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-toggle="collapse"
          data-target="navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/post-creation">
                Create New Post
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/encounter-creation">
                Create New Encounter
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <button className="nav-link btn" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
