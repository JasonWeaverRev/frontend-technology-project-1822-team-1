import React from "react";
import "./MonsterCard.css";

// Define the props that the MonsterCard will accept
interface MonsterCardProps {
  name: string;
  size: string;
  cr: number;
  hp: number;
  ac: number;
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
  page: string;
  image?: string; // Image is optional
  onAdd: () => void;
}

const MonsterCard: React.FC<MonsterCardProps> = ({
  name,
  size,
  cr,
  hp,
  ac,
  str,
  dex,
  con,
  int,
  wis,
  cha,
  page,
  image,
  onAdd,
}) => {
  return (
    <div className="monster-card d-flex flex-column p-1 m-2 mb-4">
      <div className="monster-header d-flex  gap-3">
        <div className="monster-header image-name d-flex flex-wrap ">
          {image && (
            <img src={image} alt={`${name}`} className="monster-image " />
          )}
          <a href={page} target="_blank" rel="noopener noreferrer">
            {name}
          </a>
        </div>
        <div className="monster-header monster-stats d-flex justify-content-between flex-fill p-2 ">
          <p>
            <strong>Challenge Rating:</strong> <br></br>
            {cr}
          </p>
          <p>
            <strong>Size:</strong> <br></br>
            {size}
          </p>
          <p>
            <strong>HP:</strong> <br></br>
            {hp}
          </p>
          <p>
            <strong>AC:</strong> <br></br>
            {ac}
          </p>

          <div className="addBtnContainer">
            <button className="monster-add-button" onClick={onAdd}>
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="monster-stats d-flex justify-content-evenly">
        <p>
          <strong>STR:</strong> {str}
        </p>
        <p>
          <strong>DEX:</strong> {dex}
        </p>
        <p>
          <strong>CON:</strong> {con}
        </p>
        <p>
          <strong>INT:</strong> {int}
        </p>
        <p>
          <strong>WIS:</strong> {wis}
        </p>
        <p>
          <strong>CHA:</strong> {cha}
        </p>
      </div>
    </div>
  );
};

export default MonsterCard;
