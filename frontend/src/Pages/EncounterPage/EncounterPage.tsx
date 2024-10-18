import React, { useEffect } from "react";
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

  return (
    <div className="encounter-page- d-flex flex-column m-5 p-1">
      <div className="encounter-title d-flex justify-content-between">
        <h2>{encounter.title}</h2>
      </div>
      <div className="encounter d-flex justify-content-evenly">
        <EncounterPlayer
          name={"Username"}
          hp={playerHp}
          updateHp={setPlayerHp}
        ></EncounterPlayer>
        <div className="monster-info-container d-flex col-7 flex-column">
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
          <div>{encounter.setting.split(":")[0]}:</div>
          <div>{encounter.setting.split(":")[1]}</div>
        </div>
      </div>
      <div className="save-encounter-button d-flex justify-content-end pt-2 gap-2 flex-column col-2 align-content-end align-self-end">
        <button>Save Encounter</button>
        <button>Edit Encounter</button>
      </div>
    </div>
  );
}

export default EncounterPage;
