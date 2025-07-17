import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Heading from "../components/heading";

const { width, height } = Dimensions.get('window');
const buttonsPerRow = 2;
const gridPadding = 20;
const buttonMargin = 10;

const usableWidth = width - gridPadding * 2;
const buttonWidth = (usableWidth - buttonMargin * (buttonsPerRow - 1)) / buttonsPerRow;
const buttonHeight = buttonWidth;

export default function HomePage({ navigation }){
    return (
        <View style = {page.container}>
            <Heading title = "GOATED"/>    
            <View style = {page.grid}>
                <TouchableOpacity
                    style = {page.button} 
                    onPress={() => navigation.navigate('FindFriends')}
                >
                    <Text style = {page.buttonText}>Find Friends</Text> 
                </TouchableOpacity>
                <TouchableOpacity
                    style = {page.button}
                    onPress={() => navigation.navigate('SoloSession')}
                >
                    <Text style = {page.buttonText}>Solo Session</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style = {page.button}
                    onPress={() => navigation.navigate('HostSession')}
                >
                    <Text style = {page.buttonText}>Host Session</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style = {page.button}
                    onPress={() => navigation.navigate('JoinSession')}
                >
                    <Text style = {page.buttonText}>Join Session</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const page = StyleSheet.create ({
    container: {
        flex: 1,
        padding: 5,
        alignItems: 'center',
        backgroundColor: '#34b4eb',
    },
    heading: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 25,
        paddingBottom: 75,
        position: 'relative',
    },
    logo: {
        position: 'absolute',
        top: 0,
        right: 130,
        width: 100,
        height: 100,
    },
    headingText: {
        color: '#eaeaea',
        fontSize: 30,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#ebab34',
        height: buttonHeight,
        width: buttonWidth,
        margin: buttonMargin / 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        color: '#eaeaea',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: buttonMargin,
    },
});