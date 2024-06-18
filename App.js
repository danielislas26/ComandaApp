import React,{useState,useEffect} from "react";
import Button from "./src/components/Input/Button";
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import Tab from "./src/components/Tab";
import { ParentComponent } from "./src/components/InputParentComponent";

const App = () => {
  
  return (

<View style={styles.container}>

  
  <ParentComponent></ParentComponent>
  <Button></Button>
 
  <Tab></Tab>
</View>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    
    
  },
  title: { fontSize: 30, color: '#fff' },
  image: { height: 270, width: 200, borderRadius:135 },
  button: {
    backgroundColor: 'blue',
    padding: 7,
    marginTop:20,
  },
  buttonText: {
    color: '#fff',
    fontSize:20,
    
  },
  texto: {
    color: '#000000'
  }
});

export default App;
