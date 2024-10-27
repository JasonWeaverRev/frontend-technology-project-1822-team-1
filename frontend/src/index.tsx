import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/authContext"; // Import your AuthProvider
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Includes Popper.js


const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
