import "./EncounterPage.css";
import { useState } from "react";
import EncounterPlayer from "../../Components/EncounterPlayer/EncounterPlayer";
import EncounterMonster from "../../Components/EncounterMonster/EncounterMonster";
import { useEncounter } from "../../Context/EncounterContext";
import axios from "axios";

function EncounterPage() {
  const [playerHp, setPlayerHp] = useState<number>(25);
  const [monsterHp, setMonsterHp] = useState<number>(25);
  const { encounter } = useEncounter();
  const [success, setSuccess] = useState(false);

  // #region request/response interceptors
  // Request Interceptor
  axios.interceptors.request.use(
    (config: any): any => {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  axios.interceptors.response.use(
    (response: any): any => {
      return response;
    },
    (error) => {
      console.error(error);
      return Promise.reject(error);
    }
  );
  // #endregion

  const saveEncounter = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/encounters/encounter`,
        {
          monsters: encounter.roster,
          encounter_title: encounter.title,
          setting: encounter.setting,
        }
      );

      // Alerts when successful or errors occur
      if (response.status === 201) {
        setSuccess(true);
        console.log("Encounter saved");
      } else {
        console.log("Encounter not saved");
      }
    } catch (err) {
      console.error("Error submitting comment:", err);
    }
  };

  if (success) {
    setTimeout(() => setSuccess(false), 3000);
  }

  return (
    <div className="encounter-page- d-flex flex-column m-5 p-1">
      <div className="encounter-title d-flex justify-content-between">
        <h2>{encounter.title}</h2>
      </div>
      <div className="encounter d-flex justify-content-evenly">
        <EncounterPlayer
          name={localStorage.getItem("username")}
          hp={playerHp}
          updateHp={setPlayerHp}
        ></EncounterPlayer>
        <div className="monster-info-container d-flex col-7 flex-column align-self-center black-border">
          <div className="monster-info d-flex gap-4 px-3 mt-1 flex-wrap">
            {encounter.roster.map((monster: any, index: any) => (
              <EncounterMonster
                key={index}
                name={monster.name}
                hp={monster.hp}
                img={monster.image}
                updateHp={setMonsterHp}
              />
            ))}
          </div>
          <textarea
            placeholder="Monster Notes"
            className="monster-notes"
          ></textarea>
        </div>
        <div className="event-info d-flex flex-column col-2 text-start p-2 gap-2">
          {encounter.setting && <div>{encounter.setting}</div>}
        </div>
      </div>
      <div className="d-flex justify-content-end gap-4">
        {success && (
          <div className="alert alert-success mt-2 pt-2 success-alert">
            Successfully saved encounter!
          </div>
        )}
        {localStorage.getItem("token") && (
          <div className="save-encounter-button d-flex justify-content-end pt-2 gap-2 flex-column col-2 align-content-end align-self-end">
            <button onClick={saveEncounter}>Save Encounter</button>
            <button>Edit Encounter</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EncounterPage;
