import React, { useState,useEffect} from "react";
import { Text,SafeAreaView, View, StyleSheet,TextInput,Dimensions,Button,FlatList} from "react-native";
import { getItems, addItems, deleteItem } from '../../api'

const rows = 3;
const cols = 2;
const marginHorizontal = 4;
const marginVertical = 4;
const width = (Dimensions.get('window').width / cols) - (marginHorizontal * (cols + 1));
const height = (Dimensions.get('window').height / rows) - (marginVertical * (rows + 1));


const Input = ({ onInputChange }) => {
    const [items, setItems] = useState([])
    const [orders, setOrders] = useState('');
    const [value, setValue] = useState('')


    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const data = await getItems();
        setItems(data)
    };

    const handleAddItem = async () => {
        if ( orders && value) {
            const newItem = { orders, value: Number(value) };
            await addItems(newItem);
            fetchItems();
            setItems('');
            setValue('')
        }
    };

   

/*    const [items, setItems] = useState([]);
    const [name, setName ] = useState('');
    const [value, setValue] = useState('')
    
    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const data = await getItems();
        setItems(data);
    };

    const handleAddItem = async () => {
        if (name && value) {
            const newItem = { name, value: Number(value) };
            await addItems(newItem);
            fetchItems();
            setName('')
            setValue('')
        }
    };

    const handleDeleteItem = async (id) => {
        await deleteItem(id);
        fetchItems();
    };

   */
   // const [text, onChangeText] = React.useState('');
    const [inputValue, setInputValue] = useState('');

    const handleChange = (text) => {
        if ( typeof onInputChange === 'function') {
            onInputValue(text);
            onInputChange(text)
        } else {
            console.error('onInputChange is not a function');
        }
        
    };

    const handleSubmit = async () => {
        if (selectedId && inputValue) {
            await updateItem(selectedId, { value: inputValue });
            setInputValue('');
            onInputChange('');
        } else {
            console.error('No ID selected or input value is empty');
        }
    };
    
        return (
            
            <View 
            style={styles.container}
            >
               <SafeAreaView style={styles.view}>
                   <TextInput
                    style={styles.input}
                    placeholder="platillos"
                    value={inputValue}
                    onChangeText={handleChange}
                    
                   />
                   <Button style={styles.button} title="Submit" onPress={handleSubmit}></Button>
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
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#FEF7BA',
        
    },

    button:{
        justifyContent: 'center',
        width: '25%',
        height: 50,
        marginLeft :15,
        backgroundColor: '#000000',
        borderRadius: 5,
        marginBottom: 15
        
    },
});

export default Input;