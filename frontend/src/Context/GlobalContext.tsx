import React from "react";
import { EncounterProvider } from "./EncounterContext";
import { AuthProvider } from "./authContext";
import { EncounterPostProvider } from "./EncounterPostContext";

const GlobalContext: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AuthProvider>
      <EncounterProvider>
        <EncounterPostProvider>
          {children}
        </EncounterPostProvider>
      </EncounterProvider>
    </AuthProvider>
  );
};

export default GlobalContext;
