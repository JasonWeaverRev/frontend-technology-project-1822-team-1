// src/pages/EncounterCreationPage.tsx
import React, { useState } from "react";
import axios from "axios";
import MonsterCard from "../../Components/MonsterCard/MonsterCard";
import "./EncounterCreationPage.css";
import RosterCard from "../../Components/RosterCard/RosterCard";
import EncounterForm from "../../Components/EncounterForm/EncounterForm";

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
      <EncounterForm
        setTitle={setTitle}
        setEnvironment={setEnvironment}
        setSetting={setSetting}
        setChallengeRating={setChallengeRating}
        getMonstersByChallengeRating={getMonstersByChallengeRating}
      ></EncounterForm>

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
