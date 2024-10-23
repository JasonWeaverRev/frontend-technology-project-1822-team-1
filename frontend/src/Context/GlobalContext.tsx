import React from "react";
import { EncounterProvider } from "./EncounterContext";
import { AuthProvider } from "./authContext";

const GlobalContext: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AuthProvider>
      <EncounterProvider>{children}</EncounterProvider>
    </AuthProvider>
  );
};

export default GlobalContext;
