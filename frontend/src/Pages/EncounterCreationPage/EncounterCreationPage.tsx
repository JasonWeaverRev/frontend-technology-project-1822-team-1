// src/pages/EncounterCreationPage.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import MonsterCard from "../../Components/MonsterCard/MonsterCard";
import "./EncounterCreationPage.css";
import RosterCard from "../../Components/RosterCard/RosterCard";
import EncounterForm from "../../Components/EncounterForm/EncounterForm";
import { useEncounter } from "../../Context/EncounterContext";

const EncounterCreationPage: React.FC = () => {
  const [monsters, setMonsters] = useState<any[]>([]);
  const [roster, setRoster] = useState<any[]>([]);
  const [challengeRating, setChallengeRating] = useState<number>();
  const [title, setTitle] = useState<string>();
  const [environment, setEnvironment] = useState<string>();
  const [setting, setSetting] = useState<string>();
  const { encounter, setEncounter } = useEncounter();
  const [errorMessage, setErrorMessage] = useState<any>({
    titleError: "",
    rosterError: "",
  });

  axios.interceptors.request.use(
    (config: any): any => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response: any): any => {
      return response;
    },
    (error) => {
      console.error(error);
      return Promise.reject(error);
    }
  );

  const getMonstersByChallengeRating = async () => {
    await axios
      .get(
        `http://localhost:4000/api/encounters/monsters?challenge_rating=${challengeRating}`
      )
      .then((response) => {
        setMonsters(response.data.monsters.map((monster: any) => monster));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addToRoster = (monster: any) => {
    setRoster([...roster, monster]);
  };

  const removeFromRoster = (index: number) => {
    const updatedRoster = roster.filter((_, i) => i !== index);
    setRoster(updatedRoster);
  };

  const generateEncounter = async (e: any) => {
    if (!title || title.trim() === "") {
      e.preventDefault();
      setErrorMessage((ele: any) => ({
        ...ele,
        titleError: "Please add a title",
      }));
    } else {
      setErrorMessage((ele: any) => ({
        ...ele,
        titleError: "",
      }));
    }

    if (!roster || roster.length === 0) {
      e.preventDefault();
      setErrorMessage((ele: any) => ({
        ...ele,
        rosterError: "Please add monsters to the roster",
      }));
    } else {
      setErrorMessage((ele: any) => ({
        ...ele,
        rosterError: "",
      }));
    }

    if (errorMessage.titleError === "" && errorMessage.rosterError === "") {
      const thisEncounter = {
        title: title,
        setting: `${environment}: ${setting}`,
        roster: roster,
      };
      setEncounter(thisEncounter);
    }
  };

  return (
    <div className="encounter-creation-page-full">
      {errorMessage.titleError && (
        <div className="alert alert-danger">{errorMessage.titleError}</div>
      )}
      {errorMessage.rosterError && (
        <div className="alert alert-danger">{errorMessage.rosterError}</div>
      )}

      <div className="encounter-creation-page d-flex flex-lg-row p-5">
        <EncounterForm
          setTitle={setTitle}
          setEnvironment={setEnvironment}
          setSetting={setSetting}
          setChallengeRating={setChallengeRating}
          getMonstersByChallengeRating={getMonstersByChallengeRating}
          generateEncounter={generateEncounter}
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
        <div className="encounter-roster d-flex flex-column text-start align-text-top col-lg-2">
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
    </div>
  );
};

export default EncounterCreationPage;
