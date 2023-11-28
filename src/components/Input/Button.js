import React, { useState} from "react";
import { TouchableOpacity, View,Text,StyleSheet } from "react-native";

const Button = () => {
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Enter</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button:{
        width: '25%',
        height: 50,
        padding: 5,
        marginLeft :15,
        backgroundColor: '#000000',
        borderRadius: 5,
        marginBottom: 15
        
    },
    buttonText:{
        fontSize: 25,
        color: '#fff'
    },
    container: {
        width: '100%'
    }
})

export default Button;