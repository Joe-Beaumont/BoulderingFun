import React from "react";
import { Image, StyleSheet, Text, View } from 'react-native';

export default function Heading({ title }) {
    return (
        <View style={styles.headingContainer}>
            <Image
                source={require('../images/goat_logo.png')}
                style={styles.logo}
            />
            <Text style={styles.headingText}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headingContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 25,
        paddingBottom: 50,
        position: 'relative',
    },
    logo: {
        position: 'absolute',
        left: 10,
        top: 0,
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    headingText: {
        color: '#eaeaea',
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
    },
});