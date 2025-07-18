import React, { createContext, useEffect, useState } from 'react';
import socket from '../utils/socket';

export const GameContext = createContext(null);

export const GameProvider = ({ children }) => {
    const [problems, setProblems] = useState([]);
    const [attempts, setAttempts] = useState({});
    const [finalScores, setFinalScores] = useState([]);

    useEffect(() => {
        socket.on('session-ended', ({ scores }) => {
            setFinalScores(scores);
        });

        return () => {
            socket.off('session-ended');
        };
    }, []);

    return (
        <GameContext.Provider value={{
            problems,
            setProblems,
            attempts,
            setAttempts,
            finalScores
        }}>
            {children}
        </GameContext.Provider>
    );
};