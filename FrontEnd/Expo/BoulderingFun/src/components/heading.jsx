import React from "react";
import { Image, SafeAreaView, StyleSheet, Text } from 'react-native';

export default function Heading({ title }) {
    return (
        <SafeAreaView style={styles.headingContainer}>
            <Image
                source={require('../images/goat_logo.png')}
                style={styles.logo}
            />
            <Text style={styles.headingText}>{title}</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headingContainer: {
        width: '100%',
        paddingTop: 25,
        paddingBottom: 50,
        position: 'relative',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3493eb',
        margin: 0,
    },
    logo: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginRight: 20
    },
    headingText: {
        color: '#eaeaea',
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        paddingRight: '40',
    },
});