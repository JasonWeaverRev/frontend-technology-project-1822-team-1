import React from "react";
import "./RegisterPage.css";

function RegisterPage() {
  return (
    <div>
      <h2>Register for an account</h2>
      <input type="email" placeholder="Email" />
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button>Register</button>
    </div>
  );
}
 

export default RegisterPage;
