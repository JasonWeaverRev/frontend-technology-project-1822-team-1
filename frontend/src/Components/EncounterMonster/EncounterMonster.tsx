import React, { useState } from "react";
import "./EncounterMonster.css";

interface EncounterMonsterProps {
  name: string;
  hp: number;
  img: string;
  updateHp: any;
}

const EncounterMonster: React.FC<EncounterMonsterProps> = ({
  name,
  hp,
  img,
}) => {
  const [monsterHp, setMonsterHp] = useState<number>(hp);
  return (
    <div className="single-monster">
      <div className="monster-hud d-flex flex-column">
        <p>{name}</p>
        <div className="monster-hp d-flex justify-content-between align-items-baseline">
          <input
            type="range"
            id="monster-hp"
            name="monster hp"
            min={0}
            max={hp}
            onChange={(e: any) => setMonsterHp(e.target.value)}
          ></input>
          <p>
            {monsterHp}/{hp}
          </p>
        </div>
      </div>
      <div className="d-flex flex-column gap-4 align-items-center">
        <img className="monster-icon" src={img} alt="Monster Icon"></img>
      </div>
    </div>
  );
};

export default EncounterMonster;
