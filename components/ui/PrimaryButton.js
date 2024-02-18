import { Text,View,Pressable,StyleSheet } from "react-native";
import Colors from "../../utils/colors";

export default function PrimaryButton({children, onPress}) {

    return (
            <View style = {styles.buttonOuterContainer}>
                <Pressable style={({pressed}) => pressed ? [styles.buttonInnerContainer,pressed] : styles.buttonInnerContainer} 
                           onPress={onPress} 
                           android_ripple={{color: Colors.primary600}}
                >
                    <Text style = {styles.buttonText}>{children}</Text>
                </Pressable>
            </View>
    )
}

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: "hidden"
    },
    buttonInnerContainer: {
        backgroundColor: Colors.primary500,
        borderRadius: 28,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2
    },
    buttonText: {
        color: "white",
        textAlign: "center"
    },
    pressed: {
        opacity: 0.75
    }
})