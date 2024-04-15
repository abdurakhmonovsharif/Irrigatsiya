import React, { createContext, useState } from "react";

export const StatesContext = createContext();

export const GlobalContext = ({ children }) => {
  const [isAddPartner, setIsAddPartner] = useState(false);
  const [user, setUser] = useState(null);
  return (
    <StatesContext.Provider
      value={{ isAddPartner, setIsAddPartner, user, setUser }}
    >
      {children}
    </StatesContext.Provider>
  );
};
