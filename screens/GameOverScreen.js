import { Image, StyleSheet, Text, View } from "react-native"

import Title from "../components/ui/Title"
import Colors from "../utils/colors"

export default function GameOverScreen() {
    return (
        <View style = {styles.rootContainer}>
            <Title>GAME OVER!</Title>
            <View style = {styles.imageContainer}>
                <Image
                    style = {styles.image}
                    source={require("../assets/images/success.png")} 
                />
            </View>
            <Text>Your device need X rounds to guess the number Y.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        alignItems: "center"
    },
    imageContainer: {
        height: 300,
        width: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: Colors.primary800,
        overflow: "hidden",
        margin: 36
    },
    image: {
        height: "100%",
        width: "100%"
    }
})