import React, { useRef, useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Menu, Provider as PaperProvider, RadioButton } from 'react-native-paper';
import Heading from "../components/heading";

export default function SoloSession({ navigation }){
    const [timeLimit, setTimeLimit] = useState('3');
    const [zone, setZone] = useState('false');
    const [grading, setGrading] = useState('Font');
    const [timeMenuVisible, setTimeMenuVisible] = useState(false);
    const timeButtonRef = useRef(null);
    const [timeAnchorPos, setTimeAnchorPos] = useState({ x: 0, y: 0 });
    const playerCount = 1;

    const handleConfirm = () => {
        navigation.navigate('OngoingSessionSolo', {
            timeLimit,
            zone,
            grading,
            playerCount,
        });
    }
    
    const openTimeMenu = () => {
        timeButtonRef.current?.measureInWindow((x, y) => {
            setTimeAnchorPos({ x: x - 200, y: y - 60 });
            setTimeMenuVisible(true);
        });
    };
    
    const openPlayerMenu = () => {
        playerButtonRef.current?.measureInWindow((x, y) => {
            setPlayerAnchorPos({ x: x - 200, y: y - 60 });
            setPlayerMenuVisible(true);
        });
    };
    return (
        <PaperProvider>
            <Heading title="Solo Session" />
            <SafeAreaView style={page.container}>
                {/* Time Menu */}
                <Text style={page.text}>Time Limit</Text>
                <View ref={timeButtonRef} style={{ alignSelf: 'flex-end', marginTop: 20 }}>
                    <Button title={`Select: ${timeLimit} min`} onPress={openTimeMenu} />
                </View>
                <Menu
                    visible={timeMenuVisible}
                    onDismiss={() => setTimeMenuVisible(false)}
                    anchor={timeAnchorPos}
                >
                    <Menu.Item onPress={() => { setTimeLimit('3'); setTimeMenuVisible(false); }} title="3 minutes" />
                    <Menu.Item onPress={() => { setTimeLimit('5'); setTimeMenuVisible(false); }} title="5 minutes" />
                    <Menu.Item onPress={() => { setTimeLimit('10'); setTimeMenuVisible(false); }} title="10 minutes" />
                </Menu>
                {/* Radio Button - Zone */}
                <Text style={page.text}>Zone</Text>
                <View style={page.radioGroupContainer}>
                    <View style={StyleSheet.radioGroup}>
                        <Text style={page.radioLabel}>Zone</Text>
                        <RadioButton
                            value="true"
                            status={zone === 'true' ? 'checked' : 'unchecked'}
                            onPress={() => setZone('true')}
                            color="#ebab34"
                        />
                    </View>
                    <View style={StyleSheet.radioGroup}>
                    <Text style={page.radioLabel}>No Zone</Text>
                        <RadioButton
                            value="false"
                            status={zone === 'false' ? 'checked' : 'unchecked'}
                            onPress={() => setZone('false')}
                            color="#ebab34"
                        />
                    </View>
                </View>
                {/* Radio Button - Grading */}
                <Text style={page.text}>Grading</Text>
                <View style={page.radioGroupContainer}>
                    <View style={StyleSheet.radioGroup}>
                        <Text style={page.radioLabel}>FONT</Text>
                        <RadioButton
                            value="Font"
                            status={grading === 'Font' ? 'checked' : 'unchecked'}
                            onPress={() => setGrading('Font')}
                            color="#ebab34"
                        />
                    </View>
                    <View style={StyleSheet.radioGroup}>
                        <Text style={page.radioLabel}>V-Scale</Text>
                        <RadioButton
                            value="vScale"
                            status={grading === 'vScale' ? 'checked' : 'unchecked'}
                            onPress={() => setGrading('vScale')}
                            color="#ebab34"
                        />
                    </View>
                </View>
                {/* Continue Button */}
                <View style={page.buttonContainer}>
                <TouchableOpacity style={page.continueButton} onPress={handleConfirm}>
                    <Text style={page.continueButtonText}>Continue</Text>
                </TouchableOpacity>
                </View>
            </SafeAreaView>
        </PaperProvider>
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
  
    text: {
        color: '#eaeaea',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'center',
        alignSelf: 'flex-end'
    
    },
    radioGroupContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',  
    },

    radioGroup: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 10,
      },
      
      radioLabel: {
        color: '#eaeaea',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 8,
      },
  
    menuButton: {
        marginBottom: 10,
        alignSelf: 'flex-end',
    },
  
    buttonContainer: {
        marginTop: 80,
        marginBottom: 20,
        width: '100%',
        paddingHorizontal: 40,
        alignSelf: 'flex-end',
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
