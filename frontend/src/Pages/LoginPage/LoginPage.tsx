import React from "react";
import "./LoginPage.css";
import { Link } from 'react-router-dom';


// Separate Login Form Component

  function LoginPage() {
    return (
      <div className="auth-container">
        <h1>Welcome to Dungeon Delver</h1>
        <div className="auth-form">
          <h2>Log in to your account</h2>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button>Log In</button>
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
          <button>Continue as Guest</button>
        </div>
      </div>
    );
  }


export default LoginPage;



