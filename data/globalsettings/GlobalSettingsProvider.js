import React, { useState, useContext } from "react";
import GlobalSettingsContext from "./GlobalSettingsContext";

const GlobalSettingsProvider = ({ children }) => {
  // Define global state and functions to update it
  const [settings, setSettings] = useState({
    // theme: "light",
    // language: "en",
    tts: "on",
  });

  // Provide the state and functions through the context
  const contextValue = {
    settings,
    updateSettings: (newSettings) => setSettings(newSettings),
  };

  return (
    <GlobalSettingsContext.Provider value={contextValue}>
      {children}
    </GlobalSettingsContext.Provider>
  );
};

export default GlobalSettingsProvider;
