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
          <h1 className="register-mb-3">Welcome to</h1>
          <img
            src="/dungeon-delver-logo.png"
            className="logo-unique"
            alt="Dungeon Delver Logo"
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="register-auth-form ">
            <form onSubmit={handleSubmit}>
              <h2 className="register-title-text">Log in to your account</h2>
              {errorMessage && (
                <div className="alert alert-danger-unique">{errorMessage}</div>
              )}
              <input
                type="text"
                placeholder="Username"
                className="form-control-login mb-3"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="form-control-login mb-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="register-btn btn btn-primary btn-block-register"
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
