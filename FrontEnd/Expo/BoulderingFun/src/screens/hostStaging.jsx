import React, { useState } from "react";
import QRCode from "react-qr-code";
import { View, Text, Button } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";

export default function HostStaging({ route }){
    const { timeLimit, zone, grading, playerCount } = route.params;
    const [showQR, setShowQR] = useState(false);

    const qrData = JSON.stringify({
        timeLimit,
        zone,
        grading,
        playerCount
    })

    return (
        <ScrollView>
            <View>
                <Text>Session Summary</Text>
                <Text>Time Limit: {timeLimit} minutes</Text>
                <Text>Zone: {zone === 'true' ? 'Zones enabled' : 'Zones disabled'}</Text>
                <Text>Grading: {grading}</Text>
                <Text>Number of Players: {playerCount}</Text>

                <Button title="Generate QR code" onPress={() => setShowQR(!show)} />
            </View>

            {showQR && (
                <View>
                    <QRCode value={qrData} size={200} />
                    <Text>Scan this QR to join the session</Text>
                    </View>
            )}
        </ScrollView>
    );
}