import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Login, HomePage, FindFriends, SoloSession, HostSession, JoinSession, Register, HostStaging} from './src/screens/index';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <GestureHandlerRootView>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name='Login' component={Login} />
                    <Stack.Screen name='Register' component={Register} />
                    <Stack.Screen name='Home' component={HomePage} />
                    <Stack.Screen name='FindFriends' component={FindFriends} />
                    <Stack.Screen name='SoloSession' component={SoloSession} />
                    <Stack.Screen name='HostSession' component={HostSession} />
                    <Stack.Screen name='HostStaging' component={HostStaging} />
                    <Stack.Screen name='JoinSession' component={JoinSession} />
                </Stack.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    )
}
