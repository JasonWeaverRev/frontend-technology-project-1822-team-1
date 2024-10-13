// src/pages/EncounterCreationPage.tsx
import React, { useState } from "react";
import axios from "axios";
import MonsterCard from "../../Components/MonsterCard/MonsterCard";
import "./EncounterCreationPage.css";
import RosterCard from "../../Components/RosterCard/RosterCard";

const EncounterCreationPage: React.FC = () => {
  const [monsters, setMonsters] = useState<any[]>([]);
  const [roster, setRoster] = useState<any[]>([]);
  const [challengeRating, setChallengeRating] = useState<number>();
  const [title, setTitle] = useState<string>();
  const [environment, setEnvironment] = useState<string>();
  const [setting, setSetting] = useState<string>();

  const getMonstersByChallengeRating = async () => {
    const response = await axios.get(
      `https://www.dnd5eapi.co/api/monsters?challenge_rating=${challengeRating}`
    );

    const monsters = response.data.results;

    const shuffledMonsters = monsters.sort(() => 0.5 - Math.random());
    const selectedMonsters = shuffledMonsters.slice(0, 5);

    const randomMonsterData = [];

    for (const monster of selectedMonsters) {
      const monsterDetails = await axios.get(
        `https://www.dnd5eapi.co${monster.url}`
      );
      const newMonster = {
        name: monsterDetails.data.name,
        size: monsterDetails.data.size,
        challengeRating: monsterDetails.data.challenge_rating,
        armorClass: monsterDetails.data.armor_class[0].value,
        hp: monsterDetails.data.hit_points,
        strength: monsterDetails.data.strength,
        dexterity: monsterDetails.data.dexterity,
        constitution: monsterDetails.data.constitution,
        intelligence: monsterDetails.data.intelligence,
        wisdom: monsterDetails.data.wisdom,
        charisma: monsterDetails.data.charisma,
        image: `https://www.dnd5eapi.co${monsterDetails.data.image}`,
        monsterPage: monsterDetails.data.name.includes(",")
          ? `https://www.dndbeyond.com/monsters/${monsterDetails.data.name
              .split(",")[0]
              .trim()}`
          : `https://www.dndbeyond.com/monsters/${monsterDetails.data.name.replaceAll(
              " ",
              "-"
            )}`,
      };
      randomMonsterData.push(newMonster);
    }

    setMonsters(randomMonsterData.map((monster: any) => monster));
    console.log(roster[0]);
  };

  const addToRoster = (monster: any) => {
    setRoster([...roster, monster]);
  };

  const removeFromRoster = (index: number) => {
    const updatedRoster = roster.filter((_, i) => i !== index);
    setRoster(updatedRoster);
  };

  return (
    <div className="encounter-creation-page d-flex p-5">
      <div className="encounter-info d-flex flex-column ">
        <div className="encounter-form-info d-flex flex-column gap-4 ">
          <h2>Create an Encounter</h2>
          <input
            type="text"
            placeholder="Encounter Title"
            className="info"
            onChange={(e) => setTitle(String(e.target.value))}
          />
          <input
            type="text"
            placeholder="Environment Name"
            className="info"
            onChange={(e) => setEnvironment(String(e.target.value))}
          />
          <textarea
            placeholder="Environment Notes"
            className="setting info"
            onChange={(e) => setSetting(String(e.target.value))}
          ></textarea>
        </div>
        <div className="cr-combo d-flex align-self-start mt-3 ">
          <select
            name="CR"
            className="cr"
            onChange={(e) => setChallengeRating(Number(e.target.value))}
          >
            <option selected disabled>
              CR
            </option>
            <option value={0}>0</option>
            <option value={0.125}>1/8</option>
            <option value={0.25}>1/4</option>
            <option value={0.5}>1/2</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
            <option value={11}>11</option>
            <option value={12}>12</option>
            <option value={13}>13</option>
            <option value={14}>14</option>
            <option value={15}>15</option>
            <option value={16}>16</option>
            <option value={17}>17</option>
            <option value={18}>18</option>
            <option value={19}>19</option>
            <option value={20}>20</option>
            <option value={21}>21</option>
            <option value={22}>22</option>
            <option value={23}>23</option>
            <option value={24}>24</option>
            <option value={25}>25</option>
            <option value={26}>26</option>
            <option value={27}>27</option>
            <option value={28}>28</option>
            <option value={29}>29</option>
            <option value={30}>30</option>
          </select>
        </div>
        <div className="encounter-page-buttons d-flex mt-5 flex-column gap-4 ">
          <button
            onClick={getMonstersByChallengeRating}
            className="generate-mob-btn"
          >
            Generate Mobs
          </button>
          <button>Publish Encounter</button>
        </div>
      </div>

      <div className="monster-list flex-grow-1 m-1">
        {monsters.map((monster, index) => (
          <MonsterCard
            key={index}
            name={monster.name}
            size={monster.size}
            cr={monster.challengeRating}
            hp={monster.hp}
            ac={monster.armorClass}
            str={monster.strength}
            dex={monster.dexterity}
            con={monster.constitution}
            int={monster.intelligence}
            wis={monster.wisdom}
            cha={monster.charisma}
            page={monster.monsterPage}
            image={monster.image || undefined}
            onAdd={() => addToRoster(monster)}
          />
        ))}
      </div>
      <div className="encounter-roster d-flex flex-column text-start align-text-top ">
        <h2 className="text-center">Roster</h2>
        {roster.map((monster, index) => (
          <RosterCard
            key={index}
            name={monster.name}
            page={monster.monsterPage}
            onRemove={() => removeFromRoster(index)}
          ></RosterCard>
        ))}
      </div>
    </div>
  );
};

export default EncounterCreationPage;
