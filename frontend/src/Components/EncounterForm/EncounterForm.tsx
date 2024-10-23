import React from "react";
import { Link } from "react-router-dom";
import LinkButton from "../LinkButton/LinkButton";
import "./EncounterForm.css";

interface EncounterFormProps {
  setTitle: any;
  setSetting: any;
  setEnvironment: any;
  setChallengeRating: any;
  getMonstersByChallengeRating: any;
  generateEncounter: any;
  error: string;
  title: string | undefined;
  setting: string | undefined;
  environment: string | undefined;
}

const EncounterForm: React.FC<EncounterFormProps> = ({
  setTitle,
  setSetting,
  setEnvironment,
  setChallengeRating,
  getMonstersByChallengeRating,
  generateEncounter,
  error,
  title,
  environment,
  setting,
}) => {
  return (
    <div className="encounter-info d-flex flex-column">
      <div className="encounter-form-info d-flex flex-column gap-4 ">
        <h2>Create an Encounter</h2>
        <input
          type="text"
          placeholder="Encounter Title"
          value={title ? title : ""}
          className={` title-info ${error ? "title-error" : ""}`}
          maxLength={36}
          onChange={(e) => setTitle(String(e.target.value))}
        />
        <input
          type="text"
          placeholder="Environment Name"
          className="info"
          value={environment ? environment : ""}
          maxLength={36}
          onChange={(e) => setEnvironment(String(e.target.value))}
        />
        <textarea
          placeholder="Environment Notes"
          className="setting info"
          value={setting ? setting : ""}
          maxLength={144}
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
        <LinkButton to={"/encounter"} click={generateEncounter}>
          Publish Encounter
        </LinkButton>
      </div>
    </div>
  );
};

export default EncounterForm;
