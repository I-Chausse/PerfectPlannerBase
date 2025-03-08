import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [admin, setAdmin] = useState(false);

  const login = (newToken, admin = false) => {
    setToken(newToken);
    setAdmin(admin);
  };

  const logout = () => {
    setToken(null);
    setAdmin(false);
  };

  const signedIn = !!token;

  return (
    <AuthContext.Provider value={{ token, signedIn, admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
