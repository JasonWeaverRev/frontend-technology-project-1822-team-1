import React, { useState } from "react";
import "./EncounterMonster.css";

interface EncounterMonsterProps {
  monster: any;
  updateHp: any;
}

const EncounterMonster: React.FC<EncounterMonsterProps> = ({ monster }) => {
  const [monsterHp, setMonsterHp] = useState<number>(monster.hp);
  return (
    <div className="single-monster">
      <div className="monster-hud d-flex flex-column">
        <p>{monster.name}</p>
        <div className="monster-hp d-flex justify-content-between align-items-baseline">
          <input
            type="range"
            id="monster-hp"
            name="monster hp"
            min={0}
            max={monster.hp}
            onChange={(e: any) => setMonsterHp(e.target.value)}
          ></input>
          <p>
            {monsterHp}/{monster.hp}
          </p>
        </div>
      </div>
      <div className="d-flex flex-column gap-4 align-items-center">
        <img
          className="monster-icon"
          src={monster.image}
          alt="Monster Icon"
        ></img>
      </div>
    </div>
  );
};

export default EncounterMonster;
