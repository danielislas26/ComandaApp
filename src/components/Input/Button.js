import React, { useState} from "react";
import { TouchableOpacity, View,Text,StyleSheet } from "react-native";


const Button = ({idButton}) => {
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Enter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCount}>
                <Text style={styles.buttonText}>{}</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    button:{
        justifyContent: 'center',
        width: '25%',
        height: 50,
        marginLeft :15,
        backgroundColor: '#000000',
        borderRadius: 5,
        marginBottom: 15
        
    },
    buttonCount:{
        justifyContent:'center',
        width: '13%',
        height: 50,
        backgroundColor: 'gold',
        marginRight: 15,
        borderRadius: 5
    },
    buttonText:{
        textAlign: 'center',
        fontSize: 25,
        color: '#fff'
    },
    container: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: 'row',
        width: '100%'
    }
})

export default Button;