import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button } from 'react-native';

export default function TimerButton({ timeLimit }) {
    const [secondsLeft, setSecondsLeft] = useState(timeLimit * 60);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isRunning && secondsLeft > 0) {
            intervalRef.current = setInterval(() => {
                setSecondsLeft(prev => prev -1);
            }, 1000);
        }

        if (secondsLeft <= 0 && isRunning) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning, secondsLeft]);

    const handleStart = () => {
        if(!isRunning && secondsLeft > 0) {
            setIsRunning(true);
        }
    };

    const formatTime = (totalSeconds) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <View>
            <Text>
                {isRunning ? formatTime(secondsLeft) : 'Ready to Start'}
            </Text>
            <Button
            title={isRunning ? 'Running...' : 'Start Timer'}
            onPress={handleStart}
            disabled={isRunning || secondsLeft <= 0}
            />
            {secondsLeft === 0 && <Text>Time's up!</Text>}
        </View>
    );
}