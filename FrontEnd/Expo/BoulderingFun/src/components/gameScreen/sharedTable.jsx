import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { Button, Switch, Text, View } from 'react-native';

const AttemptOptions = ['1', '2', '3', '4+', 'Incomplete'];

export default function SharedTable({ problems, playerId, zoneEnabled, attempts, onAttemptChange, onAttemptSubmit }) {

    const isSubmitted = (problemId) => {
        return attempts[problemId]?.[playerId]?.submitted === true;
      };

    const handleAttemptChange = (problemId, newAttempt) => {
        const updated = {
            ...attempts[problemId],
            attempts: newAttempt,
        };

        onAttemptChange(problemId, updated);
    };

    const handleZoneToggle = (problemId, value) => {
        const updated = {
            ...attempts[problemId]?.[playerId],
            zoneReached: value,
        };

        onAttemptChange(problemId, updated);
    };

    const handleSubmitAttempt = (problemId) => {
        onAttemptSubmit(problemId);
    };


    return (
        <View>
            <Text>Problem Table</Text>
            {problems.map(problem => (
                <View key={problem.id}>
                    <Text>{problem.name}</Text>

                    <Picker
                    enabled={!isSubmitted(problem.id)}
                    selectedValue={attempts[problem.id]?.[playerId]?.attempts || 'Incomplete'}
                    onValueChange={value => handleAttemptChange(problem.id, value)}
                    >
                        {AttemptOptions.map(opt => (
                            <Picker.Item key={opt} label={opt} value={opt} />
                        ))}
                        </Picker>

                        {zoneEnabled && problem.hasZone && (
                            <View>
                                <Text>Zone</Text>
                                <Switch
                                disabled={isSubmitted(problem.id)}
                                value={attempts[problem.id]?.[playerId]?.zoneReached || false}
                                onValueChange={val => handleZoneToggle(problem.id, val)}
                                />
                                </View>
                        )}
                            {!isSubmitted(problem.id) && (
                                <Button
                                title="Submit Attempt"
                                onPress={() => handleSubmitAttempt(problem.id)}
                                />
                            )}
                        </View>
            ))}
            </View>
    );
}