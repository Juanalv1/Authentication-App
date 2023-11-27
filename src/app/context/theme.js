'use client';

import { createContext, useContext, useState } from "react";

const ThemeContext = createContext({})

export const ThemeContextProvider = ({ children }) => {
    const [color, setColor] = useState('red');
    const [isEditMenuOpen, setIsEditMenuOpen] = useState(false)

    return (
        <ThemeContext.Provider value={{ isEditMenuOpen, setIsEditMenuOpen }}>
            {children}
        </ThemeContext.Provider>
    )
};

export const useThemeContext = () => useContext(ThemeContext);