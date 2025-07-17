import React, { createContext, useState } from 'react';

export const GameContext = createContext(null);

export const GameProvider = ({ children }) => {
    const [problems, setProblems] = useState([]);
    const [attempts, setAttempts] = useState({});

    return (
        <GameContext.Provider value={{
            problems,
            setProblems,
            attempts,
            setAttempts,
        }}>
            {children}
        </GameContext.Provider>
    );
};