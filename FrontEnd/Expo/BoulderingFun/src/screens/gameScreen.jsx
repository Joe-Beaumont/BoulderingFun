import React, { useContext, useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import { AddProblemForm, SharedTable, TimerButton } from '../components/gameScreen/index';
import { GameContext } from '../context/GameContext';
import socket from '../utils/socket';

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

    const {
        problems,
        setProblems,
        attempts,
        setAttempts,
    } = useContext(GameContext)


    useEffect(() => {
        socket.emit('join-room', { roomId, playerId}, (response) => {
            if (response.error) {
                console.error(response.error);
            } else {
                console.log('Joined room successfully')
            }
        });

        socket.on('problem-added', (newProblem) => {
            console.log('Problem added', newProblem)
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
              submitted: false,
            }
          }
        }));
        socket.emit('submit-attempt', {
            roomId,
            playerId,
            problemId,
            attempts: data
        }, (response) => {
            if (response.error) {
                console.log('Submit attempt error');
            } else {
                console.log('Submit attempt success');
            }
        });
    };

    const handleSubmitAttempt = (problemId) => {
        const data = attempts[problemId]?.[playerId];
        if (!data) return;

        setAttempts(prev => ({
            ...prev,
            [problemId]: {
                ...prev[problemId],
                [playerId]: {
                    ...data,
                    submitted: true,
                }
            }
        }));
    }
      


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
            onAttemptSubmit={handleSubmitAttempt}
            />
        </ScrollView>
    );
}