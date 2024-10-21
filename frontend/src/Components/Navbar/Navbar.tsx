import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Pages/LoginPage/auth/authContext";
import "./Navbar.css";

function Navbar() {
  const { token, logout } = useAuth(); // Access token to determine if user is logged in and logout function

  return (
    <nav className="navbar navbar-expand-sm bg-body-tertiary nav-border">
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
          <ul className="navbar-nav ms-auto ">
            <li className="nav-item">
              <Link
                className="nav-link"
                aria-current="page"
                to="/post-creation"
              >
                Create New Post
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                aria-current="page"
                to="/encounter-creation"
              >
                Create New Encounter
              </Link>
            </li>
            {token ? (
              <>
                {/* Logout button if user is logged in */}
                <li className="nav-item">
                  <button className="nav-link btn" onClick={logout}>
                    Logout
                  </button>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/profile">
                    Profile
                  </Link>
                </li>
              </>
            ) : (
              <>
                {/* Show Sign In and Sign Up if user is not logged in */}
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/login">
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/register">
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
