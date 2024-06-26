
import { View, StyleSheet} from "react-native";
import { ParentComponent } from "./src/components/InputParentComponent";

const App = () => {
  
  return (

<View style={styles.container}>
  <ParentComponent></ParentComponent>
  <View style={styles.cuadro}></View>
</View>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%'
    
    
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
