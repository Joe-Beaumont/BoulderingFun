import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { io } from 'socket.io-client';
import { GameProvider } from './src/context/GameContext';
import { FindFriends, GameScreen, HomePage, HostSession, HostStaging, JoinSession, Login, Register, SoloSession } from './src/screens/index';

const socket = io("http://192.168.1.52:3000");
const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex:1 }}>
            <GameProvider>                
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Home">
                        <Stack.Screen name='Login' component={Login} />
                        <Stack.Screen name='Register' component={Register} />
                        <Stack.Screen name='Home' component={HomePage} />
                        <Stack.Screen name='FindFriends' component={FindFriends} />
                        <Stack.Screen name='SoloSession' component={SoloSession} />
                        <Stack.Screen name='HostSession' component={HostSession} />
                        <Stack.Screen name='HostStaging' component={HostStaging} />
                        <Stack.Screen name='JoinSession' component={JoinSession} />
                        <Stack.Screen name='GameScreen' component={GameScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            </GameProvider>
        </GestureHandlerRootView>
    )
}
