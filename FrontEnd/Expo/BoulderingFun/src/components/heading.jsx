import React from "react";
import { Image, StyleSheet, Text, View } from 'react-native';

export default function Heading({ title }){
    return (
    <View style = {page.heading}>
    <Image
    source={require('../images/goat_logo.png')}
    style={page.logo}/>
    <Text style={page.headingText}>{title}</Text>
    </View>
    )
};

const page = StyleSheet.create ({
    heading: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 25,
        paddingBottom: 25,
        position: 'relative',
        backgroundColor: '#34b4eb',
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
});