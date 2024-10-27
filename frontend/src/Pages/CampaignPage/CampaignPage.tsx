import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./CampaignPage.css";
import { useEncounter } from "../../Context/EncounterContext";

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
  console.log()
  const TOKEN = localStorage.getItem("token") || "";
  const loggedInUser = localStorage.getItem("username") || "";
  const isCurrentUser = loggedInUser === username;

  const [encounters, setEncounters] = useState<Encounter[]>([]);
  const [titleToRemove, setTitleToRemove] = useState<string | null>(null); // ID of the encounter to delete
  const [showRemovePopup, setShowRemovePopup] = useState(false); // Whether to show the confirmation popup

  const { setEncounter } = useEncounter();

  // Fetch encounters function
  const getUserEncounters = async () => {
    try {
      const response = await axios.get(
        `http://3.81.216.218:4000/api/encounters/${username}`,
        {
          // sends get request to the backend thru URL
        }
      );

      const filteredEncounters = response.data.encounters.filter((encounter : Encounter) => 
        encounter.campaign_title == campaignTitle // Adjust this condition as needed, e.g., check for a specific title
      );

      setEncounters(filteredEncounters); // encounters = response.data
    } catch (error) {
      console.error("Error fetching user encounters: ", error);
    }
  };

  useEffect(() => {
    getUserEncounters();
  }, []);

  const removeEncounterCampaign = async (
    encounter_id: string,
    campaign_title: string
  ) => {
    console.log(encounter_id);
    console.log(campaign_title);
    try {
      const response = await axios.patch(
        'http://3.81.216.218:4000/api/encounters/campaign',
        {
          action: "remove",
          campaign_title,
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
          params: { encounter_id },
        }
      );

      getUserEncounters()
  
      setTitleToRemove(null);
      setShowRemovePopup(false);
    } catch (error) {
      console.error("Error modifying encounter campaign:", error);
    }
  };

  const handleRemove = () => {
    if (titleToRemove) {
      removeEncounterCampaign(titleToRemove, campaignTitle!);
    }
  };

  return (
    <>
      <h1 id="campaign-title">{campaignTitle}</h1>

      <div id="card-container" className="col-10 col-md-7 col-lg-5">
        {encounters.map((entry) => {
          const date = new Date(entry.creation_time);
          const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          return (
            <div key={entry.encounter_id} className="content-card">
              <Link
                className="title-link"
                onClick={() => {
                  const thisEncounter = {
                    title: entry.encounter_title,
                    setting: entry.setting,
                    roster: entry.monsters,
                    id: entry.encounter_id,
                  };

                  setEncounter(thisEncounter);
                }}
                to={"/encounter"}
              >
                <h3>{entry.encounter_title}</h3>
              </Link>
              <p>
                {entry.monsters.length > 0
                  ? entry.monsters.map((monster) => monster.name).join(", ")
                  : "No monsters in this encounter."}
              </p>

              <div id="remove-button-container">
                {isCurrentUser ? (
                  <button
                    onClick={() => {
                      setTitleToRemove(entry.encounter_id);
                      setShowRemovePopup(true);
                    }}
                    className="delete-button"
                  >
                    &times;
                  </button>
                ) : (
                  <div className="button-placeholder"></div>
                )}
                <p className="encounter-date">{formattedDate}</p>
              </div>
            </div>
          );
        })}

        {showRemovePopup && (
          <div className="confirmation-popup">
            <div className="popup-content">
              <h2>Remove Encounter from Campaign</h2>
              <p>
                If a campaign has no encounters it will be deleted from your
                profile.
              </p>

              <div className="popup-buttons">
                <button onClick={handleRemove} className="confirm-delete-btn">
                  Confirm
                </button>
                <button
                  onClick={() => setShowRemovePopup(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CampaignPage;
