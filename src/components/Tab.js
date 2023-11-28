import React, { useState} from "react";
import { Text,SafeAreaView, View, StyleSheet,TextInput,Dimensions,TouchableOpacity} from "react-native";

const Tab = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Total</Text>
            <Text style={styles.text}>$0</Text>
        </View>
    )
}

export default Tab;

const styles = StyleSheet.create({
    text:{
        fontSize: 28,
        marginRight: 10,
    },
    container:{
        height:90,
        backgroundColor: 'white',
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 25,
        paddingRight: 25,
        
            shadowRadius: 2,
            shadowOffset: {
              width: 0,
              height: -3,
            },
            shadowColor: '#000000',
            elevation: 25,
          
    }
})