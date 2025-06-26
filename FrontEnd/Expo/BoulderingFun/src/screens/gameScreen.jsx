import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import socket from '../utils/socket';
import { View, Text, ScrollView } from 'react-native';
import { SharedTable, AddProblemForm, TimerButton } from '../components/gameScreen/index';

export default function GameScreen({ route }) {
    const {
        roomId,
        playerId,
        timeLimit,
        zone,
        grading,
        playerCount,
        isHost = false,
    } = route.params;


    const [problems, setProblems] = useState([]);
    const [attempts, setAttempts] = useState({});

    useEffect(() => {
        socket.emit('join-room', { roomId, playerId}, (response) => {
            if (response.error) {
                console.error(response.error);
            } else {
                console.log('Joined room successfully')
            }
        });

        socket.on('problem-added', (newProblem) => {
            console.log('Problem Added', newProblem)
            setProblems(prev => [...prev, newProblem]);
        });

        socket.on('update-attempt', ({ playerId: senderId, problemId, data }) => {
            if (senderId === playerId) return;
            setAttempts(prev => ({
                ...prev,
                [problemId]: { ...prev[problemId], [senderId]: data },
            }));
        });

        return () => {
            socket.off('problem-added');
            socket.off('update-attempt');
        };
    }, []);

    const handleAttemptChange = (problemId, data) => {
        setAttempts(prev => ({
          ...prev,
          [problemId]: {
            ...prev[problemId],
            [playerId]: {
              ...prev[problemId]?.[playerId],
              ...data,
              submitted: true,
            }
          }
        }));
        socket.emit('submit-attempt', {
            roomId,
            playerId,
            problemId,
            data
        });
    };
      


    return (
        <ScrollView>
            <Text>Room: {roomId}
            </Text>

            <TimerButton timeLimit={parseInt(timeLimit)} />

            {isHost && (
                <AddProblemForm
                grading={grading}
                zoneEnabled={zone === 'true'}
                roomId={roomId}
                />
            )}

            <SharedTable
            problems={problems}
            zoneEnabled={zone === 'true'}
            attempts={attempts}
            playerId={playerId}
            onAttemptChange={handleAttemptChange}
            />
        </ScrollView>
    );
}