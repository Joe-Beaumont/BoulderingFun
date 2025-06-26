import React, { useState } from "react";
import QRCode from "react-qr-code";
import { View, Text, Button } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import socket from '../utils/socket';

export default function HostStaging({ route, navigation }){
    const { timeLimit, zone, grading, playerCount } = route.params;
    const [showQR, setShowQR] = useState(false);
    const [roomId, setRoomId] = useState(null);

    const qrData = JSON.stringify({
        timeLimit,
        zone,
        grading,
        playerCount,
        roomId
    })

    const handleStartGame = () => {
        const newRoomId = Math.random().toString(36).substring(2, 8).toUpperCase();
        setRoomId(newRoomId);

        socket.emit('create-room', {
            roomId: newRoomId,
            settings: {
                timeLimit,
                zone,
                grading,
                playerCount
            }
        });

        navigation.navigate('GameScreen', {
            roomId: newRoomId,
            isHost: true,
            playerId: newRoomId,
            timeLimit,
            zone,
            grading,
            playerCount
        });
    };


    return (
        <ScrollView>
            <View>
                <Text>Session Summary</Text>
                <Text>Time Limit: {timeLimit} minutes</Text>
                <Text>Zone: {zone === 'true' ? 'Zones enabled' : 'Zones disabled'}</Text>
                <Text>Grading: {grading}</Text>
                <Text>Number of Players: {playerCount}</Text>

                <Button title="Generate QR code" onPress={() => setShowQR(!showQR)} />
            </View>

            {showQR && roomId && (
                <View>
                    <QRCode value={qrData} size={200} />
                    <Text>Scan this QR to join the session</Text>
                </View>
            )}

            <View>
                <Button title="Start Session" onPress={handleStartGame} />
            </View>
        </ScrollView>
    );
}