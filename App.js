import React from "react";
import  Input  from "./src/components/Input/InputField";
import Button from "./src/components/Input/Button";
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import image from "./assets/spider.png";
import Notas from "./src/components/Notes/Container";
import Tab from "./src/components/Tab";

const App = () => {
  return (
   /* <View style={styles.container}>
      <Text style={styles.title}>Hello World!!</Text>
      <Image
      source={image}
      style={styles.image}
      />
      <TouchableOpacity 
       onPress={() => Alert.alert('Hello')}
       style={styles.button}
      >
  <Text style={styles.buttonText}>Press Me</Text>
</TouchableOpacity>
</View>*/
<View style={styles.container}>
  <Input></Input>
  <Button></Button>
  <Notas></Notas>
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
    
  }
});

export default App;
