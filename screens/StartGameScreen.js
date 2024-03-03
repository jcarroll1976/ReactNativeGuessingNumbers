import { useState } from "react";
import { TextInput,View,StyleSheet,Alert,useWindowDimensions } from "react-native";

import Colors from "../utils/colors";

import Card from "../components/ui/Card";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import InstructionText from "../components/ui/InstructionText";

export default function StartGameScreen({onPickNumber}) {
    const [enteredNumber,setEnteredNumber] = useState("");

    const {height,width} = useWindowDimensions();

    function numberInputHandler(enteredText) {
        setEnteredNumber(enteredText);
    }

    function resetInputHandler() {
        setEnteredNumber('');
    }
    function confirmInputHandler() {
        const chosenNumber = parseInt(enteredNumber);

        if (isNaN(enteredNumber) || enteredNumber <= 0 || enteredNumber > 99) {
            Alert.alert(
                'Invalid number!',
                'Number has to be a number between 1 and 99.',
                [{text:'Okay',style:'destructive',onPress: resetInputHandler}]
                );
            return;
        }

        onPickNumber(chosenNumber);
    }

    const marginTop = height < 380 ? 30 : 100;

    return (
        <View style = {[styles.rootContainer, {marginTop: marginTop}]}>
            <Title>Guess The Number</Title>
            <Card>
                <InstructionText>Enter A Number</InstructionText>
                <TextInput
                style = {styles.numberInput}
                maxLength={2}
                keyboardType="number-pad"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={numberInputHandler}
                value={enteredNumber} />
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                    </View>
                </View>
            </Card>
        </View>
    )
}

//const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        //marginTop: deviceHeight < 380 ? 30 : 100,
        alignItems: "center"
    },

    numberInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        marginVertical: 8,
        color: Colors.accent500,
        fontWeight: "bold",
        textAlign: "center"
    },
    buttonsContainer: {
        flexDirection: "row"
    },
    buttonContainer: {
        flex: 1
    }
});