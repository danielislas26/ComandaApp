import React, { useState} from "react";
import { Text,SafeAreaView, View, StyleSheet,TextInput,Dimensions} from "react-native";

const rows = 3;
const cols = 2;
const marginHorizontal = 4;
const marginVertical = 4;
const width = (Dimensions.get('window').width / cols) - (marginHorizontal * (cols + 1));
const height = (Dimensions.get('window').height / rows) - (marginVertical * (rows + 1));


const Input = () => {
    const [text, onChangeText] = React.useState('');

    
        return (
            
            <View 
            style={styles.container}
            >
               <SafeAreaView style={styles.view}>
                   <TextInput
                   style={styles.input}
                    placeholder="platillos"
                    onChangeText={onChangeText}
                    
                    editable
                    multiline
                    value={text}
                   />
               </SafeAreaView>
           </View>
        )
    }





const styles = StyleSheet.create({
    container: {
        
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        
    },

    view: {
        
        width: '90%'
    },
    input: {
        fontSize:18,
        borderRadius:5,
        height: 85,
        marginTop: 55,
        marginBottom: 20,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#FEF7BA',
        
    },
});

export default Input;