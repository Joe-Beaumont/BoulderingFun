import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { io } from 'socket.io-client';
import { Login, HomePage, FindFriends, SoloSession, HostSession, JoinSession, Register, HostStaging, GameScreen} from './src/screens/index';

const socket = io("http://192.168.1.52:3000");
const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <GestureHandlerRootView>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="HostSession">
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
        </GestureHandlerRootView>
    )
}
