import React from "react";
import "./EncounterPlayer.css";

interface EncounterPlayerProps {
  name: string;
  hp: number;
  updateHp: any;
}

const EncounterPlayer: React.FC<EncounterPlayerProps> = ({
  name,
  hp,
  updateHp,
}) => {
  return (
    <div className="player-info d-flex flex-column">
      <div className="player-hud d-flex flex-column">
        <p>{name}</p>
        <div className="player-hp d-flex justify-content-evenly align-items-baseline">
          <input
            type="range"
            id="player-hp"
            name="player hp"
            min={0}
            max={25}
            onChange={(e: any) => updateHp(e.target.value)}
          ></input>
          <p>{hp}/25</p>
        </div>
      </div>
      <div className="d-flex flex-column gap-4">
        <img
          className="player-icon"
          src={"dungeon-delver-logo.png"}
          alt="Player Icon"
        ></img>
        <textarea
          placeholder="Player Notes"
          className="player-notes"
        ></textarea>
      </div>
    </div>
  );
};

export default EncounterPlayer;
