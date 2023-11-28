import React, { useState} from "react";
import { Text,ScrollView, View, StyleSheet,TextInput,Dimensions,TouchableOpacity} from "react-native";
import { notaArray,cuenta } from "./Notas";
import { SuperGridSectionList } from 'react-native-super-grid';
import Nota from "./Notas";

const rows = 3;
const cols = 2;
const marginHorizontal = 4;
const marginVertical = 4;
const width = (Dimensions.get('window').width / cols) - (marginHorizontal * (cols + 1));
const height = (Dimensions.get('window').height / rows) - (marginVertical * (rows + 1));


console.log(cuenta)

const Num = () => {
    return notaArray.map((com,idx) => {
        return(
            <TouchableOpacity  key={idx} style={styles.button}><Text style={styles.text}>#{com.id}</Text></TouchableOpacity>
        )
    })
}


const Notas = () => {

    
    return(
    
        <ScrollView Style={styles.container}>
            <View style={styles.sectionContainer}>
                <Num style={styles.col}></Num>
            </View>
        </ScrollView>
    
    )
}

const styles = StyleSheet.create({
   

    container: {
        flex:1,
       
    },
    sectionContainer:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex',
        alignItems: 'center',
        },
    button: {
        marginTop: marginVertical,
        marginBottom: marginVertical,
        marginLeft: marginHorizontal,
        marginRight: marginHorizontal,
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gold',

    },
    text:{
        textAlign: 'center',
        textAlignVertical: 'center',
        height:'100%',
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
    }
    
})

export default Notas;