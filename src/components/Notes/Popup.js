import React, { useState,useEffect} from "react";
import { Text, View, StyleSheet,ScrollView, TouchableOpacity,TouchableWithoutFeedback,Modal} from "react-native";
import {OrderTotalCalculator,spliter } from "../Functions";
import { Adder,Reducer } from "./AdderReducer";
const Popup = ({ isVisible, onClose, id, cuenta, wholId, fetchItems }) => {
  const [cuentaArray, setCuentaArray] = useState(cuenta || []);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    setCuentaArray(cuenta || []);
    setIsModified(false); // Reset modification state when cuenta changes
  }, [cuenta]);

  const handleReducer = (dish) => {
    setCuentaArray(prevArray => {
      const newArray = Reducer(dish, prevArray);
      setIsModified(true);
      return newArray;
    });
  };

  const handleAdder = (dish) => {
    setCuentaArray(prevArray => {
      const newArray = Adder(dish, prevArray);
      setIsModified(true);
      return newArray;
    });
  };

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
                    <Text key={idx} style={styles.Renglon}>-  {Renglon}</Text>
                  ))}
                  <ScrollView>
                    {spliter(cuentaArray, cuentaArray, setCuentaArray, handleReducer, handleAdder)}
                  </ScrollView>
                </View>
              </TouchableOpacity>
            </ScrollView>
            <View style={styles.TotalContainer}>
              <Text style={styles.TotalText}>Total </Text>
              <Text style={styles.TotalText}>$</Text>
              <OrderTotalCalculator 
                orders={cuentaArray} 
                wholId={wholId} 
                fetchItems={fetchItems} 
                isModified={isModified}
              />
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
        shadowOffset: { width: 0, height: 2, }, 
        
        
    },
    Renglon:{
      color: '#6f4e22'
    },
    TotalText:{
        fontSize: 28
    },
    encabezadoContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 65,
        backgroundColor: 'gold',
        
    },
    titulo:{
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black'
    },
    background:{
        flex:1,
        justifyContent: 'flex-start',
        paddingTop: 10,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    viewScroll:{
        padding:10,
        backgroundColor: '#fff7c2'
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
    },
    ButtonText:{
        fontSize: 45,
    }


  });

export {Popup};