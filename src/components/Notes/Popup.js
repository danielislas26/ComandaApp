import React, { useState,useEffect} from "react";
import { Text,SafeAreaView, View, StyleSheet,ScrollView, TouchableOpacity,TouchableWithoutFeedback,Modal} from "react-native";
import { notaArray } from "./Notas";
import { total,TotalCalculator,OrderTotalCalculator,spliter } from "../Functions";
import { menu } from "../platillos";

const conteo = [
    { plato: 'tacos', cantidad: 0 , total : 0 },
    { plato: 'kilos', cantidad: 0 , total : 0 },
    { plato: 'medios', cantidad: 0 , total : 0 },
    { plato: 'cuartos', cantidad: 0 , total : 0 },
    { plato: 'litros', cantidad: 0 , total : 0 },
    { plato: 'mediolitro', cantidad: 0 , total : 0 },
    { plato: 'cuartolitro', cantidad: 0 , total : 0 },
    { plato: 'refresco', cantidad: 0 , total : 0 },
    { plato: 'jugos',  cantidad: 0 , total : 0 },
  ];



let comida = menu.map((product) => {
    console.log(product)
})

const Blocke =() => {
    return notaArray.map((texto,idx)=>{
        return(
            <View>
                <Text></Text>
                <View>
                    <Text></Text>
                    <View>
                        <TouchableOpacity><Text>-</Text></TouchableOpacity>
                        <TouchableOpacity><Text>+</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    })
}

const Block =(Order) => {

        return(
            <View style={styles.Block}>
                <View style={styles.PlatoContainer}>
                <Text style={styles.Plato}>2</Text><Text style={styles.Plato}>Plato</Text>
                </View>
                <View style={styles.BlockContainer}>
                    <View style={styles.priceContainer}><Text style={styles.price}>$50</Text></View>
                    <View style={styles.BlockButtons}>
                        <TouchableOpacity style={styles.Button}><Text style={styles.ButtonText} >-</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.Button}><Text style={styles.ButtonText} >+</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    
}


const encabezado =() => {
    return notaArray
}



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

const Popup = ({isVisible, onClose, popupData,id,cuenta}) => {
  
    const cuentaArray = cuenta || [];
    

    return(
    <Modal
    animationType="fade"
    transparent={true}
    visible={isVisible}
    onRequestClose={() => onClose()}
    >
    
        <TouchableOpacity 
        style={styles.background}
        activeOpacity={1}
        onPress={()=> onClose()}
        >
            <TouchableWithoutFeedback>
                <View style={styles.PopupContainer}>
                    <View style={styles.encabezadoContainer}>
                        <Text style={styles.titulo}>Cuenta #{id}</Text>
                    </View>
                    <ScrollView style={styles.Scroll}>
                        <TouchableOpacity activeOpacity={1}>
                        <View style={styles.viewScroll}>
                          {cuentaArray.map((Renglon,idx)=>(
                           MyComponent(Renglon),

                            <Text key={idx}>*{Renglon}</Text>
                          ))}
                          <ScrollView>
                            {spliter(cuenta)}
                          </ScrollView>
                        </View>
                        </TouchableOpacity>
                    </ScrollView>
                    <View style={styles.TotalContainer}>
                        <Text style={styles.TotalText}>Total </Text>
                        <Text style={styles.TotalText}>$</Text>
                        {OrderTotalCalculator(cuenta)}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </TouchableOpacity>
    </Modal>
   
    )
};

const styles = StyleSheet.create({
    popupBackground:{
        flex: 1, justifyContent: 'center', alignItems: 'center' 
     /*   position: 'absolute',
       alignItems: "center",
       justifyContent: 'flex-start',
       paddingTop: 80,
        width:'100%',
        height: '100%',
        backgroundColor: 'rgba(52, 52, 52, 0.8)'*/
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

export {Popup,Block,MyComponent};