import React, { useState } from "react";
import { View, Text, Button } from 'react-native';
import { RadioButton, Menu, Divider, Provider as PaperProvider } from 'react-native-paper';

export default function HostSession({ navigation }){
    const [timeLimit, setTimeLimit] = useState('3');
    const [zone, setZone] = useState(false);
    const [grading, setGrading] = useState('Font');
    const [playerCount, setPlayerCount] = useState('2');
    const [timeMenuVisible, setTimeMenuVisible] = useState(false);
    const [playerMenuVisible, setPlayerMenuVisible] = useState(false);

    const handleConfirm = () => {
        navigation.navigate('OngoingSessionHost', {
            timeLimit,
            zone,
            grading,
            playerCount,
        });
    }




    return (
        <PaperProvider>
            <View>
                <Text>Host Session</Text>
                <Text>Time Limit</Text>
                <Menu
                    visible={timeMenuVisible}
                    onDismiss={() => setTimeMenuVisible(false)}
                    anchor={<Button title={`Select: ${timeLimit} min`} onPress={() => setTimeMenuVisible(true)} />}
                    >
                    <Menu.Item onPress={() => { setTimeLimit(3); setTimeMenuVisible(false); }} title="3 minutes" />
                    <Menu.Item onPress={() => { setTimeLimit(5); setTimeMenuVisible(false); }} title="5 minutes" />
                    <Menu.Item onPress={() => { setTimeLimit(10); setTimeMenuVisible(false); }} title="10 minutes" />
                </Menu>

                <Text>Zone</Text>
                <RadioButton.Group onValueChange={value => setZone(value)} value={zone}>
                    <RadioButton.Item label="Zone" value="true" />
                    <RadioButton.Item label="No Zone" value="false" />
                </RadioButton.Group>

                <Text>Grading</Text>
                <RadioButton.Group onValueChange={value => setGrading(value)} value={grading}>
                    <RadioButton.Item label="FONT" value="Font" />
                    <RadioButton.Item label="V-Scale" value="vScale" />
                </RadioButton.Group>

                <Text>Number of Players</Text>
                <Menu
                visible={playerMenuVisible}
                onDismiss={() => setPlayerMenuVisible(false)}
                anchor={<Button title={`Select: ${playerCount}`} onPress={() => setPlayerMenuVisible(true)} />}
                >
                    {[2, 3, 4, 5, 6, 7, 8].map(num => (
                        <Menu.Item key={num} onPress={() => { setPlayerCount(num.toString()); setPlayerMenuVisible(false);}} title={`${num} players`} />
                    ))}
                </Menu>

                <View>
                    <Button title="Continue" onPress={handleConfirm} />
                </View>
            </View>
        </PaperProvider>
    );
}