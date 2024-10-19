import React, { useState } from "react";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./auth/authContext"; // Import the useAuth hook to access context

function LoginPage() {
  const [identifier, setIdentifier] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  //Form Submission handler
  const handleSubmit = async (event: React.FormEvent) => {
    console.log(`Identifier: ${identifier}, Password: ${password}`);
    event.preventDefault();
    if (!identifier || !password) {
      setErrorMessage("All fields are required!");
      return;
    } else {
      setErrorMessage(""); // Clear error if inputs are valid
      setIsSubmitting(true);
    }

    try {
      // Send the form data to your backend using Axios
      const response = await axios.post(
        "http://localhost:4000/api/accounts/login",
        {
          identifier,
          password,
        }
      );

      const { token } = response.data;

      // Save token to localStorage (or use context)
      localStorage.setItem("token", token);

      // You can also store user info if needed
      //localStorage.setItem("user", JSON.stringify(user));

      // Handle successful response
      setSuccessMessage("Login successful!");
      setIdentifier("");
      setPassword("");

      // Get user data for local storage
      await storeLoggedInUser();
      
      navigate("/LandingPage");
    } catch (err) {
      setIsSubmitting(false);
      if (axios.isAxiosError(err) && err.response) {
        console.error("Error response:", err.response); // Log full response
        console.log("Error details: ", err.response.data);
        setErrorMessage(err.response.data.message || "An error occurred.");
      } else {
        setErrorMessage("An error occurred while logging in.");
      }
    }
  };

  const storeLoggedInUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/accounts/profile`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      localStorage.setItem("username", response.data.userProfile.username);
      localStorage.setItem("role", response.data.userProfile.role);
    } catch (error) {
      console.error("Error fetching user profile: ", error);
    }
  };

  // Separate Login Form Component

  return (
    <div className="auth-container-fluid d-flex justify-content-center text-center align-items-center vh-100">
      <div className="row w-100">
        <div className="col-lg-6 col-md-6 col-sm-12 text-center mb-4 mb-lg-0">
          <h1 className="mb-3">Welcome to</h1>
          {/* Dungeon Delver Image */}
          <img
            src={"/dungeon-delver-logo.png"}
            className="img-fluid"
            alt="Dungeon Delver Logo"
            // style={{ maxWidth: "100%", height: "auto" }}
          />
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="auth-form card p-4">
              <form onSubmit={handleSubmit}>
                <h2>Log in to your account</h2>
                {/* Error message */}
                {errorMessage && (
                  <div className="alert alert-danger">{errorMessage}</div>
                )}
                <input
                  type="text"
                  placeholder="Username"
                  className="form-control mb-3"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control mb-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="btn btn-primary btn-block"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging In..." : "Log In"}
                </button>
                <p>
                  Don't have an account?{" "}
                  <Link to="/register">Register here</Link>
                </p>
                <button className="btn btn-secondary btn-block">
                  Continue as Guest
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
