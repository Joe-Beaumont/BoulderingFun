import React, { useContext } from "react";
import { Text, View } from 'react-native';
import Heading from "../components/heading";
import { GameContext } from '../context/GameContext';

export default function Leaderboard (){

    const {
        finalScores
    } = useContext(GameContext);

    return (
        <View>
            <Heading title={"Leaderboard"} />
            {finalScores.map((player, index) => {
                <View key={player.playerId}>
                    <Text>{index+1}. {player.name ?? player.playerId} - {player.score} pts</Text>
                </View>
            })}
        </View>
    )
}