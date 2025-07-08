import React, { useState } from "react";
import QRCode from "react-qr-code";
import { View, Text, Button } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import socket from '../utils/socket';

export default function HostStaging({ route, navigation }){
    const { roomId, timeLimit, zone, grading, playerCount } = route.params;
    const [showQR, setShowQR] = useState(false);


    const qrData = JSON.stringify({
        timeLimit,
        zone,
        grading,
        playerCount,
        roomId
    })

    const handleStartGame = () => {
        navigation.navigate('GameScreen', {
            roomId,
            isHost: true,
            playerId: roomId,
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
                <Text>Room: {roomId}</Text>
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