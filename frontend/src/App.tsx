import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import PostPage from "./Pages/PostPage/PostPage";
import CampaignPage from "./Pages/CampaignPage/CampaignPage";
import EncounterCreationPage from "./Pages/EncounterCreationPage/EncounterCreationPage";
import EncounterPage from "./Pages/EncounterPage/EncounterPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import PostCreationPage from "./Pages/PostCreationPage/PostCreationPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import { AuthProvider } from "./Pages/LoginPage/auth/authContext"; // Adjust the path if necessary
import { EncounterProvider } from "./Context/EncounterContext";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/forum-post" element={<PostPage />} />
          <Route path="/campaign" element={<CampaignPage />} />
          <Route
            path="/encounter-creation"
            element={<EncounterCreationPage />}
          />
          <Route path="/encounter" element={<EncounterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/post-creation" element={<PostCreationPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/posts/:postId" element={<PostPage />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
