import React from "react";
import { View, Text, Button } from 'react-native';

export default function HomePage({ navigation }){
    return (
        <View>
            <Text>BoulderFun</Text>
            <Button title="Find Friends" onPress={() => navigation.navigate('FindFriends')}/>
            <Button title="Solo Session" onPress={() => navigation.navigate('SoloSession')}/>
            <Button title="Host Session" onPress={() => navigation.navigate('HostSession')}/>
            <Button title="Join Session" onPress={() => navigation.navigate('JoinSession')}/>
        </View>
    );
}