import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useEncounter } from "../../Context/EncounterContext";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const { setEncounter } = useEncounter();

  const updateLoginStatus = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // !! converts token to a boolean (true/false)
  };

  useEffect(() => {
    updateLoginStatus();
    window.addEventListener("storage", updateLoginStatus);
    return () => {
      window.removeEventListener("storage", updateLoginStatus);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    updateLoginStatus(); // Update the state after removing token (solve refresh issue)
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-sm bg-body-tertiary nav-border">
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          onClick={() => setEncounter(null)}
          to="/"
        >
          Dungeon Delver
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    onClick={() => setEncounter(null)}
                    to="/post-creation"
                  >
                    Create New Post
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/encounter-creation">
                    Create New Encounter
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    data-bs-offset="0,10" // Adjust position
                  >
                    Profile
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end" // Align to the right
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link
                        className="dropdown-item"
                        onClick={() => setEncounter(null)}
                        to="/profile"
                      >
                        <img
                          src="/profile-icon.png"
                          alt="Profile"
                          className="profile-icon"
                          style={{ width: "20px", marginRight: "10px" }} // Ensure proper spacing
                        />
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          setEncounter(null);
                          handleLogout();
                        }}
                      >
                        <img
                          src="/logout-icon.png"
                          alt="Logout"
                          className="logout-icon"
                          style={{ width: "20px", marginRight: "10px" }} // Ensure proper spacing
                        />
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    onClick={() => setEncounter(null)}
                    to="/login"
                  >
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    onClick={() => setEncounter(null)}
                    to="/register"
                  >
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
