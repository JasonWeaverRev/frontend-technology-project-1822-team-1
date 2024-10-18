import React from "react";
import "./RosterCard.css";

interface RosterCardProps {
  name: string;
  page: string;
  onRemove: () => void;
}

const RosterCard: React.FC<RosterCardProps> = ({ name, page, onRemove }) => {
  return (
    <div className="roster-card d-flex justify-content-between align-items-baseline m-1 mx-2">
      <a href={page} target="_blank" rel="noopener noreferrer">
        {name}
      </a>
      <button
        className="monster-remove-button d-flex align-items-center align-content-center"
        onClick={onRemove}
      >
        X
      </button>
    </div>
  );
};

export default RosterCard;
