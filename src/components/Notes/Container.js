import React, { useState,useEffect} from "react";
import { Popup } from "./Popup";
import { Text,ScrollView, View, StyleSheet,TextInput,Dimensions,TouchableOpacity} from "react-native";
import { getItems } from "../../api";



const rows = 4;
const cols = 2;
const marginHorizontal = 4;
const marginVertical = 4;
const width = (Dimensions.get('window').width / cols) - (marginHorizontal * (cols + 1));
const height = (Dimensions.get('window').height / rows) - (marginVertical * (rows + 1));




const Num = ({ datos,onIdSelect,selectedId,datatofetch}) => {

    
    const [data, setData] = useState([])
    const [loading,setloading] = useState(true)

    const [isPopupVisible, setPopupVisibility] = useState(false);
    const [popupData, setPopupData] = useState('');
    const [idData, setIdData] = useState('');
    const [cuentaData, setCuentas] = useState('');
    const [wholId,setWholeId] = useState('')
    const handleButtonClick = ( data ) => {
        
        setPopupData(data);
        setIdData(data._id.slice(-2));
        setCuentas(data.Cuentas);
        setPopupVisibility(true);
        setWholeId(data._id);
       // onIdSelect(data._id);
        
      };

    const handleClosePopup = () => {
        setPopupVisibility(false);
    };
    
    
    const url = "http://192.168.1.192:8686/cuentas"

    
    useEffect(()=>{
          /*  fetch(url)
            .then((response)=>response.json())
            .then((json)=>setData(json))
            .catch((error)=>console.error(error))
            .finally(()=>setloading(false))
        */
       const fetchData = async () => {
        try {
            const items = await getItems();
            setData(items);
        } catch (error) {
            console.error(`Error fetching items:`, error);
        } finally {
            setloading(false);
        }
       };

       fetchData();
    },[])
    

    
        const [pressCounts, setPressCounts] = useState({});
        
        
        
        const [pressedButton, setPressedButton] = useState(null);
        const handlePress = (buttonId) => {
            setPressedButton(buttonId)
        };

        const [lastTappedId, setLastTappedId] = useState(null);
            
            const handleButtonPress = (buttonId) => {
                if(lastTappedId !== buttonId) {
                    
                    handlePress(buttonId._id)
                    onIdSelect(buttonId._id);
                } else {
                    handleButtonClick(buttonId)
                }
                setLastTappedId(buttonId);
            };
        
            
        return(
            
            <View style={styles.sectionContainer}>
                {datatofetch.length === 0 ? (
                <Text>Loading....</Text>
            ) : (
                datatofetch.map((post) => (
                    <TouchableOpacity
                        key={post._id}
                        style={[styles.button, pressedButton === post._id && styles.buttonPressed]}
                        onPress={() => handleButtonPress(post)}
                    >
                        <Text style={styles.text}>#{post._id.slice(-2)}</Text>
                    </TouchableOpacity>
                ))
            )}
                <Popup isVisible={isPopupVisible} onClose={handleClosePopup} popupData={popupData} id={idData} cuenta={cuentaData} wholId={wholId}></Popup>
            </View>
        )

}



const Notas = ({datos, onIdSelect, selectedId, datatofetch}) => {
  
    
    return(
    
        <ScrollView Style={styles.container}>
            <View style={styles.sectionContainer}>
            
                <Num datos={datos} onIdSelect={onIdSelect} selectedId={selectedId} datatofetch={datatofetch}></Num>
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
        justifyContent: 'center',
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
        borderRadius: 5

    },
    buttonPressed: {
        backgroundColor:'#e2b206'
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

export { Notas, Num };