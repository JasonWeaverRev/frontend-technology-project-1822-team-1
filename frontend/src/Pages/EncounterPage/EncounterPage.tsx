import React, { useEffect } from "react";
import "./EncounterPage.css";
import { useState } from "react";
import EncounterPlayer from "../../Components/EncounterPlayer/EncounterPlayer";
import EncounterMonster from "../../Components/EncounterMonster/EncounterMonster";
import { useEncounter } from "../../Context/EncounterContext";

function EncounterPage() {
  const [playerHp, setPlayerHp] = useState<number>(25);
  const [monsterHp, setMonsterHp] = useState<number>(25);
  const { encounter } = useEncounter();

  return (
    <div className="encounter-page- d-flex  flex-column m-5 p-1 ">
      <div className="encounter-title d-flex justify-content-between">
        <h2>{encounter.title}</h2>
      </div>
      <div className="encounter d-flex justify-content-evenly">
        <EncounterPlayer
          name={"Username"}
          hp={playerHp}
          updateHp={setPlayerHp}
        ></EncounterPlayer>
        <div className="monster-info d-flex gap-4  col-7 px-3 flex-wrap">
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
        <div className="event-info d-flex flex-column col-2 text-start p-2 gap-2">
          <div>{encounter.setting.split(":")[0]}:</div>
          <div>{encounter.setting.split(":")[1]}</div>
        </div>
      </div>
    </div>
  );
}

export default EncounterPage;
