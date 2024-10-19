import React, { useState } from "react";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [identifier, setIdentifier] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!identifier || !password) {
      setErrorMessage("All fields are required!");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post(
        "http://localhost:4000/api/accounts/login",
        {
          identifier,
          password,
        }
      );

      const { token } = response.data;
      localStorage.setItem("token", token);

      // Trigger an immediate state update for login status
      window.dispatchEvent(new Event("storage"));

      setIsSubmitting(false);
      navigate("/");
    } catch (error) {
      setIsSubmitting(false);
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message || "An error occurred.");
      } else {
        setErrorMessage("An error occurred while logging in.");
      }
    }
  };

  return (
    <div className="auth-container-fluid-unique">
      <div className="row-unique">
        <div className="logo-container-unique">
          <h1 className="title-unique">Welcome to</h1>
          <img
            src="/dungeon-delver-logo.png"
            className="logo-unique"
            alt="Dungeon Delver Logo"
          />
        </div>
        <div className="auth-form-container-unique">
          <div className="auth-form-unique card">
            <form onSubmit={handleSubmit}>
              <h2>Log in to your account</h2>
              {errorMessage && (
                <div className="alert alert-danger-unique">{errorMessage}</div>
              )}
              <input
                type="text"
                placeholder="Username"
                className="form-control-unique mb-3"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="form-control-unique mb-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="btn-primary-unique btn-block-unique"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging In..." : "Log In"}
              </button>
              <p>
                Don't have an account? <Link to="/register">Register here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
