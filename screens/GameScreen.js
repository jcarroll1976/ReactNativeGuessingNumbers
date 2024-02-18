import { useEffect, useState } from "react";
import { Alert,Text,View,StyleSheet } from "react-native"

import Title from "../components/ui/Title"
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";

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

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver();
        }
    },[currentGuess,userNumber,onGameOver]);

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
        setCurrentGuess(newRandomNumber)
    }
    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <Text>Higher or lower?</Text>
                <View>
                    <PrimaryButton onPress = {nextGuessHandler.bind(this,"lower")}>-</PrimaryButton>
                    <PrimaryButton onPress = {nextGuessHandler.bind(this,"higher")}>+</PrimaryButton>
                </View>
            </Card>
            {/*<View>LOG ROUNDS</View>*/}
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24
    },
   
})