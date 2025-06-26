import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import socket from '../../utils/socket';

export default function AddProblemForm({ grading, zoneEnabled, roomId }) {
    const [grade, setGrade] = useState('V0');
    const [hasZone, setHasZone] = useState(zoneEnabled);
    const [problemCount, setProblemCount] = useState(0);

    const fontGrades = ['3', '4', '5', '5+', '6A', '6A+', '6B', '6B+', '6C', '7A', '7A+', '7B'];
    const vGrades = ['V0', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8'];

    const handleAdd = () => {
        const newProblem = {
            id: problemCount + 1,
            name: `Problem ${problemCount + 1}`,
            grade,
            hasZone,
        };

        socket.emit('add-problem', {roomId, problemData: newProblem}, (response) => {
            if (response.error) {
                console.error('Add Problem failed:', response.error);
            } else {
                console.log('Problem added:', response.problem);
                setProblemCount(prev => prev + 1)
            }
        });
    };

    return (
        <View>
            <Text>Add New Problem</Text>

            <Text>Grade:</Text>
            <Picker
            selectedValue={grade}
            onValueChange={(itemValue) => setGrade(itemValue)}
            >
                {(grading === 'Font' ? fontGrades : vGrades).map(g => (
                    <Picker.Item key={g} label={g} value={g} />
                ))}
            </Picker>

            <Button title="Add Problem" onPress={handleAdd} />
        </View>
    );
};