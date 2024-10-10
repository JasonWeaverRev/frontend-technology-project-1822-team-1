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

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<LandingPage></LandingPage>}></Route>
        <Route path="/forum-post" element={<PostPage></PostPage>}></Route>
        <Route path="/campaign" element={<CampaignPage></CampaignPage>}></Route>
        <Route
          path="/encounter-creation"
          element={<EncounterCreationPage></EncounterCreationPage>}
        ></Route>
        <Route
          path="/encounter"
          element={<EncounterPage></EncounterPage>}
        ></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route
          path="/post-creation"
          element={<PostCreationPage></PostCreationPage>}
        ></Route>
        <Route path="/profile" element={<ProfilePage></ProfilePage>}></Route>
        <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
      </Routes>
    </div>
  );
}

export default App;
