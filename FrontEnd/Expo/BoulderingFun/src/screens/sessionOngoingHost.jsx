import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

export default function GameScreen({ route }) {
    const { roomId, playerId, timeLimit, zone, grading, playerCount, isHost = false, } = route.params;

    //Socket is a mutable reference that can persist across re-renders
    const socket = useRef(null);

    const [problems, setProblems] = useState([]);
    const [attempts, setAttempts] = useState({});
    const [timeLeft, setTimeLeft] = useState(timeLimit * 60);
    const [timerStarted, setTimerStarted] = useState(false);
    const intervalRef = useRef(null);

    //Timer Logic

    const startTimer = () => {
        if (timerStarted) return;
        setTimerStarted(true);

        intervalRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const formatTime = (seconds) => {
        const min  = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };


    //TIMER COMPONENT (TO BE USED LATER)
    // return (
    //     <View>
    //         {!timerStarted ? (
    //             <Button title="Start Timer" onPress={startTimer} />
    //         ) : (
    //             <Text>Time left: {formatTime(timeLeft)}</Text>
    //         )}
    //         </View>
    // );



    //Connect socket on component mount
    useEffect(() => {
        socket.current = io("http://192.168.1.52:3000", {
            transports: ['websocket'],
        });

        // Communicate a player has joined room
        socket.current.emit('join-room', { roomId, playerId });

        // Listen for problem being added and add to local state
        socket.current.on('problem-added', (problem) => {
            setProblems(prev => [...prev, problem]);
        });

        // Listen for attempt being added and add to state for this problem
        socket.current.on('attempt-updated', ({ problemId, playerId, attempts: newAttempts }) => {
            setAttempts(orev => ({
                ..prev,
                [problemId]: {
                    ...(prev[problemId] || {}),
                    [playerId]: newAttempts
                }
            }));
        });
         // Clean up on dismount of screen
        return () = {
            socket.current.disconnect();
        };
    }, []);

    // The logic for submitting an attempt
    const handleSubmit = (problemId, attemptValue) => {
        socket.current.emit('submit-attempts', {
            roomId,
            problemId,
            playerId,
            attempts: attemptValue
        }, (response) => {
            if(response.success) {
                console.log('Submitted attempt')
            }
        });
    };
    
    // Displaying UI
    return (
        <View>

        </View>

    )


}