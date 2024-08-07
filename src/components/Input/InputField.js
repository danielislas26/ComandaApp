import React, { useState} from "react";
import { Text,SafeAreaView, View, StyleSheet,TextInput,Dimensions, TouchableOpacity,Alert} from "react-native";
import { addItems, updateItem,createItem } from '../../api'


const rows = 3;
const cols = 2;
const marginHorizontal = 4;
const marginVertical = 4;
const width = (Dimensions.get('window').width / cols) - (marginHorizontal * (cols + 1));
const height = (Dimensions.get('window').height / rows) - (marginVertical * (rows + 1));


const Input = ({ onInputChange, selectedId, fetchItems }) => {

    const [inputValue, setInputValue] = useState('');

    const handleChange = (text) => {
        if ( typeof onInputChange === 'function') {
            setInputValue(text);
            onInputChange(text)
        } else {
            console.error('onInputChange is not a function');
        }
        
    };

    const validateInputFormat = (input) => {
        // Regular expression for the expected format
        const regex = /^(\d+[a-zA-Z]+,?)+$/;
        return regex.test(input);
      };


      const handleSubmit = async () => {
        if (inputValue) {
          if (!validateInputFormat(inputValue)) {
            Alert.alert('Invalid Format', 'tu entrada no debería tener espacios ni signos de puntuacion que no sean comas. la forma correcta es: 2cos,3mac,1lroj,200pcos');
            return;
          }
          
          try {
            if (selectedId) {
              await updateItem(selectedId, inputValue);
            } else {
              await createItem(inputValue);
            }
            setInputValue('');
            onInputChange('');
            fetchItems();
          } catch (error) {
            console.error(`Error updating item:`, error);
          }
        } else {
            Alert.alert('Input Error', 'Please enter a value before submitting.');
        }
      };
    
    
        return (
            
            <View 
            style={styles.container}
            >
               <SafeAreaView style={styles.view}>
                   <TextInput
                    style={styles.input}
                    multiline={true}
                    placeholder="platillos"
                    value={inputValue}
                    onChangeText={handleChange}
                    
                   />
                   <TouchableOpacity style={styles.button} title="Submit" onPress={handleSubmit}><Text style={styles.buttonText}>Submit</Text></TouchableOpacity>
               </SafeAreaView>
               <View style={styles.container}>
    
    </View>
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
        borderWidth: 3,
        padding: 10,
        backgroundColor: '#FEF7BA',
        
    },

    button:{
        
        alignItems: 'center',
        justifyContent: 'center',
        width: '35%',
        height: 60,
        backgroundColor: '#000000',
        borderRadius: 5,
        marginBottom: 15,
        
        
    },
    buttonText:{
        fontSize: 25,
        color: '#fff',
        fontWeight: 'bold'
    }
});

export default Input;