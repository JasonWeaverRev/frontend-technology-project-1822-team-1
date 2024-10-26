// src/pages/EncounterCreationPage.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import MonsterCard from "../../Components/MonsterCard/MonsterCard";
import "./EncounterCreationPage.css";
import RosterCard from "../../Components/RosterCard/RosterCard";
import EncounterForm from "../../Components/EncounterForm/EncounterForm";
import { useEncounter } from "../../Context/EncounterContext";
import { useNavigate } from "react-router-dom";
import beast from "../../MonsterResources/beast.jpg";
import celestial from "../../MonsterResources/celestial.jpg";
import construct from "../../MonsterResources/construct.jpg";
import dragon from "../../MonsterResources/dragon.jpg";
import elemental from "../../MonsterResources/elemental.jpg";
import fey from "../../MonsterResources/fey.jpg";
import fiend from "../../MonsterResources/fiend.jpg";
import giant from "../../MonsterResources/giant.jpg";
import humanoid from "../../MonsterResources/humanoid.jpg";
import monstrosity from "../../MonsterResources/monstrosity.jpg";
import ooze from "../../MonsterResources/ooze.jpg";
import plant from "../../MonsterResources/plant.jpg";
import undead from "../../MonsterResources/undead.jpg";

const EncounterCreationPage: React.FC = () => {
  const [monsters, setMonsters] = useState<any[]>([]);
  const [roster, setRoster] = useState<any[]>([]);
  const [challengeRating, setChallengeRating] = useState<number>();
  const [title, setTitle] = useState<string>();
  const [setting, setSetting] = useState<string>();
  const { encounter, setEncounter } = useEncounter();
  const [errorMessage, setErrorMessage] = useState<any>({
    titleError: "",
    rosterError: "",
  });
  const navivate = useNavigate();

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

  useEffect(() => {
    if (encounter) {
      console.log(encounter);
      setTitle(encounter.title);
      setSetting(encounter.setting);
      setRoster(encounter.roster);
    }
  }, []);

  const getMonstersByChallengeRating = async () => {
    await axios
      .get(
        `http://3.81.216.218:4000/api/encounters/monsters?challenge_rating=${challengeRating}`
      )
      .then((response) => {
        console.log(response.data.monsters);
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

  const updateErrorMessages = async (prop: any, msg: string) => {
    setErrorMessage((ele: any) => ({
      ...ele,
      [prop]: msg,
    }));
  };

  const handleImage = (monster: any) => {
    switch (true) {
      case monster.type.includes("beast"):
        monster.image = beast;
        break;
      case monster.type.includes("celestial"):
        monster.image = celestial;
        break;
      case monster.type.includes("construct"):
        monster.image = construct;
        break;
      case monster.type.includes("dragon"):
        monster.image = dragon;
        break;
      case monster.type.includes("elemental"):
        monster.image = elemental;
        break;
      case monster.type.includes("fey"):
        monster.image = fey;
        break;
      case monster.type.includes("fiend"):
        monster.image = fiend;
        break;
      case monster.type.includes("giant"):
        monster.image = giant;
        break;
      case monster.type.includes("humanoid"):
        monster.image = humanoid;
        break;
      case monster.type.includes("monstrosity"):
        monster.image = monstrosity;
        break;
      case monster.type.includes("ooze"):
        monster.image = ooze;
        break;
      case monster.type.includes("plant"):
        monster.image = plant;
        break;
      case monster.type.includes("undead"):
        monster.image = undead;
        break;
      default:
        return;
    }
  };

  const handleClear = () => {
    setEncounter(null);
    setRoster([]);
    setTitle("");
    setSetting("");
  };

  const generateEncounter = async (e: any) => {
    let hasErrors = false;
    e.preventDefault();

    if (!title || title.trim() === "") {
      await updateErrorMessages("titleError", "Please add a title");
      hasErrors = true;
    } else {
      await updateErrorMessages("titleError", "");
    }

    if (!roster || roster.length === 0) {
      await updateErrorMessages(
        "rosterError",
        "Please add monsters to the roster"
      );
      hasErrors = true;
    } else {
      await updateErrorMessages("rosterError", "");
    }

    // Only proceed if there are no errors
    if (!hasErrors) {
      const thisEncounter = {
        title: title,
        setting: setting ? setting : "",
        roster: roster,
        id: encounter?.id,
      };
      setEncounter(thisEncounter);
      navivate("/encounter");
    }
  };

  return (
    <div className="encounter-creation-page-full">
      <div className="encounter-creation-page d-flex flex-lg-row p-5">
        <EncounterForm
          setTitle={setTitle}
          setSetting={setSetting}
          setChallengeRating={setChallengeRating}
          getMonstersByChallengeRating={getMonstersByChallengeRating}
          generateEncounter={generateEncounter}
          handleClear={handleClear}
          error={errorMessage.titleError}
          title={title}
          setting={setting}
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
              image={monster.image ? monster.image : handleImage(monster)}
              onAdd={() => addToRoster(monster)}
            />
          ))}
        </div>
        <div
          className={`encounter-roster d-flex flex-column text-start align-text-top col-lg-2 ${
            errorMessage.rosterError ? "roster-alert" : ""
          }`}
        >
          <h2 className="text-center">Roster</h2>
          {errorMessage.rosterError && (
            <div className="alert alert-danger m-2">
              {errorMessage.rosterError}
            </div>
          )}
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
