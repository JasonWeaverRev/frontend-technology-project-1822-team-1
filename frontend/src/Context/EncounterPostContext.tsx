import React, { createContext, useContext, useEffect, useState } from "react";

interface EncounterPostContextType {
  postEncounterMap: { [postId: string]: string | null };
  setPostEncounterMap: React.Dispatch<React.SetStateAction<{ [postId: string]: string | null }>>;
}

const EncounterPostContext = createContext<EncounterPostContextType | undefined>(undefined);

export const EncounterPostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [postEncounterMap, setPostEncounterMap] = useState<{ [postId: string]: string | null }> (() => {
    
    const savedMap = localStorage.getItem("postEncounterMap");
    return savedMap ? JSON.parse(savedMap) : {};
  });

  useEffect(() => {
    localStorage.setItem("postEncounterMap", JSON.stringify(postEncounterMap));
  }, [postEncounterMap]);

  return (
    <EncounterPostContext.Provider value={{ postEncounterMap, setPostEncounterMap }}>
      {children}
    </EncounterPostContext.Provider>
  );
};

export const useEncounterPostContext = () => {
  const context = useContext(EncounterPostContext);
  if (!context) throw new Error("useEncounterPostContext must be used within EncounterPostProvider");
  return context;
};