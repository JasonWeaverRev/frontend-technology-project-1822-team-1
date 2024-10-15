import React, { useState } from "react";
import "./RegisterPage.css";
import axios from "axios";

function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Form submission handler

  const handleSubmit = async (event: React.FormEvent) => {
    console.log(username + email + password);
    event.preventDefault();
    if (!email || !username || !password) {
      setErrorMessage("All fields are required!");
    } else {
      setErrorMessage(""); // Clear error if inputs are valid
      // Handle registration logic here
    }

    try {
      // Send the form data to your backend using Axios
      const response = await axios.post(
        "http://localhost:4000/api/accounts/register",
        {
          email,
          username,
          password,
        }
      );
      // Handle successful response
      setSuccessMessage("Registration successful!");
      setEmail("");
      setUsername("");
      setPassword("");
    } catch (error) {
      // Handle errors (like validation or server errors)
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error response:", error.response); // Log full response
        setErrorMessage(error.response.data.message || "An error occurred.");
      } else {
        setErrorMessage("An error occurred while registering.");
      }
    }
  };

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
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="auth-form card p-4">
            <h2>Register for an account</h2>
            {/* Error message */}
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
            {/* Success message */}
            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )}
            {/* Form inputs */}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control mb-3"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Username"
                  className="form-control mb-3"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control mb-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button className="btn btn-primary btn-block" type="submit">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
