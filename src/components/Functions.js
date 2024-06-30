
import { View,Text,StyleSheet,TouchableOpacity,Alert } from "react-native"
import { menu } from "./platillos";
import { Adder,Reducer } from "./Notes/AdderReducer";
import { updateCuenta } from "../api";


function OrderTotalCalculator({ orders, wholId, fetchItems, isModified }) {
  const calculateTotal = (order) => {
    const items = order.match(/\d+[a-zA-Z]+/g);
    let total = 0;
    items.forEach(item => {
      const [quantity, food] = item.split(/(?<=\d)(?=[a-zA-Z])/); // Split quantity and food
      const menuItem = menu.find(menuItem => menuItem.foods.includes(food));
      if (menuItem) {
        total += parseInt(quantity) * menuItem.price;
      }
    });

    return total;
  };

  const totalCost = orders.reduce((acc, order) => acc + calculateTotal(order), 0);

  const handleUpdateButtonClick = async () => {
    try {
      await updateCuenta(wholId, orders, fetchItems);
      Alert.alert('Success!', 'Cuenta updated successfully!', [{ text: 'OK' }], { cancelable: false });
    } catch (error) {
      Alert.alert('Error', 'An error occurred while updating the cuenta.', [{ text: 'OK' }], { cancelable: false });
    }
  };

  return (
    <View style={styles.TotalButtonContainer}>
      <Text style={styles.TotalText}>{totalCost}</Text>
      <TouchableOpacity 
        style={[styles.UpdateButton, { backgroundColor: isModified ? 'black' : 'gray' }]}
        onPress={handleUpdateButtonClick}
        disabled={!isModified}
      >
        <Text style={styles.TextButton}>Update</Text>
      </TouchableOpacity>
    </View>
  );
}

function spliter(data, cuentaArray, setCuentaArray, handleReducer, handleAdder) {
  const conteo = [
    { dish: 'dorados', quantity: 0, totalPrice: 0 },
    { dish: 'tacos', quantity: 0, totalPrice: 0 },
    { dish: 'kilos', quantity: 0, totalPrice: 0 },
    { dish: 'medios', quantity: 0, totalPrice: 0 },
    { dish: 'cuartos', quantity: 0, totalPrice: 0 },
    { dish: 'litros', quantity: 0, totalPrice: 0 },
    { dish: 'mediolitro', quantity: 0, totalPrice: 0 },
    { dish: 'cuartolitro', quantity: 0, totalPrice: 0 },
    { dish: 'refresco', quantity: 0, totalPrice: 0 },
    { dish: 'jugos', quantity: 0, totalPrice: 0 },
  ];

  if (data !== "") {
    const ordersToArray = data.flatMap(item => item.match(/\d+[a-zA-Z]+/g));
    ordersToArray.forEach(order => {
      const [quantityInt, food] = order.split(/(?<=\d)(?=[a-zA-Z])/);
      const menuItem = menu.find(menuItem => menuItem.foods.includes(food));
      
      if (menuItem) {
        const index = conteo.findIndex(item => item.dish === menuItem.name);
        if (index !== -1) {
          conteo[index].quantity += parseInt(quantityInt);
          conteo[index].totalPrice += parseInt(quantityInt) * menuItem.price;
        }
      }
    });

    return (
      <View>
        {conteo.map(item => {
          if (item.quantity > 0) {
            return (
              <View style={styles.Block} key={item.dish}>
                <View style={styles.PlatoContainer}>
                  <Text style={styles.Plato}>{item.quantity} </Text>
                  <Text style={styles.Plato}>{item.dish}</Text>
                </View>
                <View style={styles.BlockContainer}>
                  <View style={styles.priceContainer}><Text style={styles.price}>${item.totalPrice}</Text></View>
                  <View style={styles.BlockButtons}>
                    <TouchableOpacity style={styles.Button} onPress={() => handleReducer(item.dish)}>
                      <Text style={styles.ButtonText}>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Button} onPress={() => handleAdder(item.dish)}>
                      <Text style={styles.ButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }
          return null; 
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  TotalText:{
    fontSize: 28
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
  borderStyle: 'dotted',
  borderBlockColor: '#8C6723',
  borderBottomWidth:4
},
Plato:{
  color: '#6F4E22',
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
  backgroundColor: '#6f4e22'
},
ButtonText:{
  color: '#fff6d3',
  fontSize: 45,
},
price:{
  color:'#6F4E22',
  fontSize:25,
  fontWeight: '500'
},
priceContainer:{
  width:115
},
UpdateButton:{
  width: 120,
  height: '75%',
  backgroundColor: 'black',
  flexDirection:'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 5
},
TotalButtonContainer:{
  height: '100%',
  flexDirection: 'row',
  width: '75%',
  justifyContent: 'space-between',
  alignItems: 'center'
},
TextButton:{
  color: 'white',
  fontSize: 20,
  fontWeight: '500'
}

})

export{ OrderTotalCalculator,spliter};