import React from "react";
import { useParams } from "react-router-dom";
import "./CampaignPage.css";

interface Encounter {
  encounter_id: string;
  encounter_title: string;
  monsters: Monster[];
  saves: number;
  creation_time: string;
  campaign_title: string;
  created_by: string;
  setting: string;
}

interface Monster {
  name: string;
  type: string;
}

function CampaignPage() {
  const { username, "campaign-title": campaignTitle } = useParams();
  const TOKEN = localStorage.getItem("token") || "";
  const loggedInUser = localStorage.getItem("username") || "";
  const isCurrentUser = loggedInUser === username;


  return (
    <>
      <h1 id="campaign-title">{campaignTitle}</h1>

      <div id="card-container" className="col-8 col-md-5">

      </div>
    </>
  );
}

export default CampaignPage;
