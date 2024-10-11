import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-sm bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Dungeon Delver
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link
                className="nav-link"
                aria-current="page"
                to="/encounter-creation"
              >
                Create New Encounter
              </Link>
            </li>
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
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/profile">
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
