import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import QRCode from "react-qr-code";
import Heading from "../components/heading";

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
        <ScrollView style={page.scrollContainer}>
            <Heading title="Host Session" />
            <View style={page.container}>
                <View>
                    <Text style={page.text}>Session Summary</Text>
                    <Text style={page.text}>Room: {roomId}</Text>
                    <Text style={page.text}>Time Limit: {timeLimit} minutes</Text>
                    <Text style={page.text}>Zone: {zone === 'true' ? 'Zones enabled' : 'Zones disabled'}</Text>
                    <Text style={page.text}>Grading: {grading}</Text>
                    <Text style={page.text}>Number of Players: {playerCount}</Text>
                </View>
                <View style={page.buttonContainer}>
                    <TouchableOpacity
                        style={page.button}
                        onPress={() => setShowQR(!showQR)}
                    >
                        <Text style={page.buttonText}>Generate QR Code</Text>
                    </TouchableOpacity>
                </View>

                {showQR && roomId && (
                    <View>
                        <QRCode value={qrData} size={200} />
                        <Text>Scan this QR to join the session</Text>
                    </View>
                )}
                <View style={page.buttonContainer}>
                    <TouchableOpacity
                        style={page.button}
                        onPress={handleStartGame}
                    >
                        <Text style={page.buttonText}>Start Session</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}


const page = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        alignItems: 'center',
        backgroundColor: '#34b4eb',
        justifyContent: 'space-between',
    },

    scrollContainer: {
        flexGrow: 1,
        padding: 0,
        backgroundColor: '#34b4eb',
    },
  
    text: {
        color: '#eaeaea',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 5,
        textAlign: 'center',
        alignSelf: 'flex-end'
    
    },
  
    buttonContainer: {
        marginTop: 10,
        marginBottom: 10,
        width: '100%',
        paddingHorizontal: 40,
        alignSelf: 'flex-end',
    },
  
    button: {
        backgroundColor: '#ebab34',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
  
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
  });