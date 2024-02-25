import { useEffect, useState } from "react";
import { Alert,View,StyleSheet,Text } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';

import Title from "../components/ui/Title"
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
  
    if (rndNum === exclude) {
      return generateRandomBetween(min, max, exclude);
    } else {
      return rndNum;
    }
  }

  let minBoundary = 1;
  let maxBoundary = 100;

 export default function GameScreen({userNumber,onGameOver}) {
    const initialGuess = generateRandomBetween(1,100,userNumber)
    const [currentGuess,setCurrentGuess] = useState(initialGuess);
    const [guessRounds,setGuessRounds] = useState([initialGuess])

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver();
        }
    },[currentGuess,userNumber,onGameOver]);

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    },[])

    function nextGuessHandler(direction) { //direction => "lower" or "higher"
        if((direction === "lower" && currentGuess < userNumber) || 
           (direction === "higher" && currentGuess > userNumber)) {
            Alert.alert("You're lying!","You know this is wrong...",[{text:"Sorry!",style:"cancel"}]);
            return;
        }
        if(direction === "lower") {
            maxBoundary = currentGuess;
        }
        else {
            minBoundary = currentGuess + 1;
        }
        const newRandomNumber = generateRandomBetween(minBoundary,maxBoundary,currentGuess)
        setCurrentGuess(newRandomNumber);
        setGuessRounds(prevGuessRounds => [newRandomNumber,...prevGuessRounds]);
    }
    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText style = {styles.instructionText}>Higher or lower?</InstructionText>
                <View style = {styles.buttonsContainer}>
                    <View style = {styles.buttonContainer}>
                        <PrimaryButton onPress = {nextGuessHandler.bind(this,"lower")}>
                            <Ionicons name="remove" size={24} color="white"/>
                        </PrimaryButton>
                    </View>
                    <View style = {styles.buttonContainer}>
                        <PrimaryButton onPress = {nextGuessHandler.bind(this,"higher")}>
                            <Ionicons name="add" size={24} color="white"/>
                            </PrimaryButton>
                    </View>
                    
                    
                </View>
            </Card>
            <View>
                {guessRounds.map((guessRound => <Text key = {guessRound}>{guessRound}</Text>))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24
    },
    instructionText: {
        marginBottom: 12
    },
    buttonsContainer: {
        flexDirection: "row"
    },
    buttonContainer: {
        flex: 1
    }
   
})