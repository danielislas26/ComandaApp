import React, { useState,useEffect} from "react";
import { Text,SafeAreaView, View, StyleSheet,ScrollView, TouchableOpacity,TouchableWithoutFeedback,Modal} from "react-native";
import { total,TotalCalculator,OrderTotalCalculator,spliter } from "../Functions";



const MyComponent = (data) => {
    
    TotalCalculator(data)
    total(data)
    const linea = data
   // console.log(`esto es ${typeof data} que es "${data}"`)
    const regex = /\b\d+[a-zA-Z]{3}\b/;
  
    const countOccurrences = (str) => {
        const matches = str.match(regex);
        return matches ? matches.length : 0;
      };
  
    
      const occurrences = countOccurrences(linea);
     // console.log('Total occurrences:', occurrences);
      // You can set the count to state or perform other actions with it
    

    };

    const Popup = ({ isVisible, onClose, popupData, id, cuenta, wholId,fetchItems }) => {
        const [cuentaArray, setCuentaArray] = useState(cuenta || []);
      
        useEffect(() => {
          setCuentaArray(cuenta || []);
        }, [cuenta]);
      
        return (
          <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => onClose()}
          >
            <TouchableOpacity 
              style={styles.background}
              activeOpacity={1}
              onPress={() => onClose()}
            >
              <TouchableWithoutFeedback>
                <View style={styles.PopupContainer}>
                  <View style={styles.encabezadoContainer}>
                    <Text style={styles.titulo}>Cuenta #{id}</Text>
                  </View>
                  <ScrollView style={styles.Scroll}>
                    <TouchableOpacity activeOpacity={1}>
                      <View style={styles.viewScroll}>
                        {cuentaArray.map((Renglon, idx) => (
                          <Text key={idx}>*{Renglon}</Text>
                        ))}
                        <ScrollView>
                          {spliter(cuentaArray, wholId, cuentaArray, setCuentaArray,fetchItems)}
                        </ScrollView>
                      </View>
                    </TouchableOpacity>
                  </ScrollView>
                  <View style={styles.TotalContainer}>
                    <Text style={styles.TotalText}>Total </Text>
                    <Text style={styles.TotalText}>$</Text>
                    {OrderTotalCalculator(cuentaArray,wholId,fetchItems)}
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </TouchableOpacity>
          </Modal>
        );
      };
      
const styles = StyleSheet.create({
    popupBackground:{
        flex: 1, justifyContent: 'center', alignItems: 'center' 
    },
    PopupContainer:{
        width: '85%',
        maxHeight: '75%'
    },
    TotalContainer:{
        
        height:70,
        backgroundColor: 'white',
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 25,
        paddingRight: 25,
    },
    TotalText:{
        fontSize: 28
    },
    encabezadoContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 65,
        backgroundColor: '#D22E2E'
    },
    titulo:{
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    },
    background:{
        flex:1,
        justifyContent: 'flex-start',
        paddingTop: 10,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    Scroll:{
        
        backgroundColor: 'white'
    },
    viewScroll:{
        padding:10
    },
    BlockContainer:{
        flexDirection: 'row',
        paddingTop: 12,
        justifyContent:'center',
        gap: 32,
        alignSelf: 'stretch',
        alignItems: 'center'
    },
    BlockButtons:{
        flexDirection: 'row',
        gap:32
    },
    Block:{
        
        width: '100%',
        height: 120,
        marginTop: 5,
        marginBottom: 10,
        borderBlockColor: '#D9D9D9',
        borderBottomWidth:2
    },
    price:{
        fontSize:25,
        fontWeight: '500'
    },
    priceContainer:{
        width:115
    },
    Plato:{
        fontSize:30,
        fontWeight: '700'
    },
    PlatoContainer:{
        
        flexDirection: 'row',
        alignContent: 'center',
    },
    Button:{
        width: 50,
        height: 50,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#70736A'
    },
    ButtonText:{
        fontSize: 45,
    }


  });

export {Popup,MyComponent};