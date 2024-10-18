import React, { useContext, useState } from "react";

interface EncounterContextType {
  encounter: any;
  setEncounter: React.Dispatch<React.SetStateAction<any>>;
}

const EncounterContext = React.createContext<EncounterContextType | undefined>(
  undefined
);

export const EncounterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // State variables
  const [encounter, setEncounter] = useState<any>(null);

  return (
    <EncounterContext.Provider value={{ encounter, setEncounter }}>
      {children}
    </EncounterContext.Provider>
  );
};

export const useEncounter = () => {
  const context = useContext(EncounterContext);
  if (!context) {
    throw new Error("useEncounter must be used within an EncounterProvider");
  }
  return context;
};
