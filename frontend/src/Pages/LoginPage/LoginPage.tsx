import React, { useState } from "react";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New state variable
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!identifier || !password) {
      setErrorMessage("All fields are required!");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post(
        "http://3.81.216.218:4000/api/accounts/login",
        {
          identifier: identifier.trim(),
          password,
        }
      );

      const { token } = response.data;

      localStorage.setItem("token", token);

      // Trigger an immediate state update for login status
      window.dispatchEvent(new Event("storage"));

      setIsSubmitting(false);
      await storeLoggedInUser();
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

  const storeLoggedInUser = async () => {
    try {
      const response = await axios.get(
        "http://3.81.216.218:4000/api/accounts/profile",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      localStorage.setItem("username", response.data.userProfile.username);
      localStorage.setItem("role", response.data.userProfile.role);
      if (!response.data.userProfile.profile_pic) {
        localStorage.setItem("profile_pic", "/profile-icon.png");
      } else {
        localStorage.setItem(
          "profile_pic",
          response.data.userProfile.profile_pic
        );
      }
    } catch (error) {
      console.error("Error fetching user profile: ", error);
    }
  };

  // Toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="auth-container-fluid-unique">
      <div className="row-unique">
        <div className="logo-container-unique">
          <h1 className="register-mb-3">Welcome to</h1>
          <img
            src="/grey-DDlogo.png"
            className="logo-unique"
            alt="Dungeon Delver Logo"
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="authForm-container">
            <div className="register-auth-form">
              <form onSubmit={handleSubmit}>
                <h2 className="register-title-text">Log in to your account</h2>
                {errorMessage && (
                  <div className="register-error-message">{errorMessage}</div>
                )}
                <input
                  type="text"
                  placeholder="Username or Email"
                  className="form-control-login mb-3"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="form-control-login mb-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <button
                  className="register-btn btn btn-primary btn-block-register"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging In..." : "Log In"}
                </button>
                <p className="prelink-text">
                  Don't have an account?{" "}
                  <Link className="register-here" to="/register">
                    Register here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
