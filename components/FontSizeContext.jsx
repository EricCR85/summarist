"use client";

import React, { createContext, useState, useContext } from "react";

const FontSizeContext = createContext();

export function FontSizeProvider({ children }) {
  const [fontSize, setFontSize] = useState(16);
  
  return(
    <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
      
      {children}
    </FontSizeContext.Provider>
  )
}

export const useFontSize = () => useContext(FontSizeContext)