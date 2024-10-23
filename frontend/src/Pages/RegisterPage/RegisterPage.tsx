import React, { useState } from "react";
import "./RegisterPage.css"; // Your specific styles
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !username || !password) {
      setErrorMessage("All fields are required!");
    } else {
      setErrorMessage("");
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post(
        "http://localhost:4000/api/accounts/register",
        { email, username, password }
      );
      setSuccessMessage("Registration successful!");
      setEmail("");
      setUsername("");
      setPassword("");
    } catch (error) {
      setIsSubmitting(false);
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message || "An error occurred.");
      } else {
        setErrorMessage("An error occurred while registering.");
      }
    }
  };

  return (
    <div className="auth-container-fluid-unique">
      <div className="row-unique">
        <div className="logo-container-unique">
          <h1 className="register-mb-3">Welcome to</h1>
          <img
            src={"/dungeon-delver-logo.png"}
            className="logo-unique"
            alt="Dungeon Delver Logo"
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="register-auth-form">
            <h2 className="register-title-text">Register for an account</h2>
            {errorMessage && (
              <div className="register-error-message">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="register-form-group">
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control-register mb-3"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Username"
                  className="form-control-register mb-3"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control-register mb-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="register-btn btn btn-primary btn-block-register"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register"}
              </button>
              <p className="prelink-text">
                Already have an account? <Link to="/login">Login here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
