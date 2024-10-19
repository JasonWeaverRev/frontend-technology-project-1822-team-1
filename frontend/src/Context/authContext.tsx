import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

// Define the types for the context values
type AuthContextType = {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
};

// Create the context for authentication
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook for accessing the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Define the props for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component that will wrap the app and provide the auth state
export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  // Login function to store the token
  const login = (token: string) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  // Logout function to clear the token
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  // Return the context provider with the value to share state across the app
  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
