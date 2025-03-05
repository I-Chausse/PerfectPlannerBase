import React, { createContext, useState, useContext } from 'react';

// Créer le contexte
const AuthContext = createContext();

// Créer le Provider
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  const signedIn = !!token; 

  return (
    <AuthContext.Provider value={{ token, signedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
