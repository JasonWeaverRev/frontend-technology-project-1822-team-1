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
import GlobalContext from "./Context/GlobalContext";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <GlobalContext>
      <div className="App d-flex flex-column min-vh-100">
        <div className="flex-grow-1">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/forum-post" element={<PostPage />} />
            <Route path="/profile/:username/:campaign-title" element={<CampaignPage />} />
            <Route
              path="/encounter-creation"
              element={<EncounterCreationPage />}
            />
            <Route path="/encounter" element={<EncounterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/post-creation" element={<PostCreationPage />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/posts/:postId" element={<PostPage />} />
          </Routes>
        </div>
        <Footer/>
      </div>
    </GlobalContext>
  );
}

export default App;
