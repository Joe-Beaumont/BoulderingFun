import React, { useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View, findNodeHandle } from 'react-native';
import { Menu, Provider as PaperProvider, RadioButton } from 'react-native-paper';
import Heading from "../components/heading";
import socket from '../utils/socket';

export default function HostSession({ navigation }){
    const [timeLimit, setTimeLimit] = useState('3');
    const [zone, setZone] = useState(false);
    const [grading, setGrading] = useState('Font');
    const [playerCount, setPlayerCount] = useState('2');
    const [timeMenuVisible, setTimeMenuVisible] = useState(false);
    const [playerMenuVisible, setPlayerMenuVisible] = useState(false);
    const [roomId, setRoomId] = useState(null);
    const [anchorPos, setAnchorPos] = useState({ x: 0, y: 0 });
    const buttonRef = useRef(null);

    const handleConfirm = () => {

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

        navigation.navigate('HostStaging', {
            roomId: newRoomId,
            timeLimit,
            zone,
            grading,
            isHost: true,
            playerCount,
        });
    }

    const openTimeMenu = () => {
        const node = findNodeHandle(buttonRef.current);
        if (node) {
            buttonRef.current.measureInWindow((x, y, width, height) => {
                setAnchorPos({ x: x -150, y});
                setTimeMenuVisible(true);
            });
        }
    }

    const openPlayerMenu = () => {
        const node = findNodeHandle(buttonRef.current);
        if (node) {
            buttonRef.current.measureInWindow((x, y, width, height) => {
                setAnchorPos({ x: x -150, y});
                setPlayerMenuVisible(true);
            });
        }
    }


    return (
        <PaperProvider>
            <View style={page.container}>
                <Heading title="Host Session" />
                <Text style={page.text}>Time Limit</Text>
                <View style={{ alignSelf: 'flex-end', marginTop: 20}}>
                    <Button title={`Select: ${timeLimit} min`} onPress={openTimeMenu} />
                    <Menu
                        visible={timeMenuVisible}
                        onDismiss={() => setTimeMenuVisible(false)}
                        anchor={anchorPos}
                    >
                        <Menu.Item onPress={() => { setTimeLimit(3); setTimeMenuVisible(false); }} title="3 minutes" />
                        <Menu.Item onPress={() => { setTimeLimit(5); setTimeMenuVisible(false); }} title="5 minutes" />
                        <Menu.Item onPress={() => { setTimeLimit(10); setTimeMenuVisible(false); }} title="10 minutes" />
                    </Menu>
                </View>

                <Text style={page.text}>Zone</Text>
                <RadioButton.Group onValueChange={value => setZone(value)} value={zone}>
                    <RadioButton.Item label="Zone" value="true" />
                    <RadioButton.Item label="No Zone" value="false" />
                </RadioButton.Group>

                <Text style={page.text}>Grading</Text>
                <RadioButton.Group onValueChange={value => setGrading(value)} value={grading}>
                    <RadioButton.Item label="FONT" value="Font" />
                    <RadioButton.Item label="V-Scale" value="vScale" />
                </RadioButton.Group>

                <Text style={page.text}>Number of Players</Text>
                <View>
                    <Menu
                    visible={playerMenuVisible}
                    onDismiss={() => setPlayerMenuVisible(false)}
                    anchor={<Button title={`Select: ${playerCount}`} onPress={openPlayerMenu} />}
                    >
                        {[2, 3, 4, 5, 6, 7, 8].map(num => (
                            <Menu.Item key={num} onPress={() => { setPlayerCount(num.toString()); setPlayerMenuVisible(false);}} title={`${num} players`} />
                        ))}
                    </Menu>
                </View>
                <View style={page.buttonContainer}>
                <TouchableOpacity style={page.continueButton} onPress={handleConfirm}>
                    <Text style={page.continueButtonText}>Continue</Text>
                </TouchableOpacity>
                </View>
            </View>
        </PaperProvider>
    );
}

const page = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      alignItems: 'flex-end',
      backgroundColor: '#34b4eb',
    },
  
    text: {
      color: '#eaeaea',
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
      textAlign: 'center',
    },
  
    radioGroup: {
      width: '100%',
      paddingHorizontal: 20,
    },
  
    menuButton: {
      marginBottom: 20,
    },
  
    buttonContainer: {
      marginTop: 40,
      width: '100%',
      paddingHorizontal: 40,
    },
  
    continueButton: {
      backgroundColor: '#ebab34',
      paddingVertical: 12,
      borderRadius: 10,
      alignItems: 'center',
    },
  
    continueButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });