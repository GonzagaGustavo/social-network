import React from "react";

export type AuthContextType = {};

export const AuthContext = React.createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

const useAuth = () => React.useContext(AuthContext);

export default useAuth;
