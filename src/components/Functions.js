import React,{useState,useEffect} from "react";
import { View,Text,StyleSheet,TouchableOpacity, YellowBox } from "react-native"
import { menu } from "./platillos";
import { Adder,Reducer } from "./Notes/AdderReducer";


const total = (order) =>{
    
    const selectedFoods = order.split(',');
    let totalPrice = 0;

    selectedFoods.forEach(food => {
      menu.forEach(meal => {
        
        if (meal.foods.includes(food)) {
          totalPrice += meal.price;
        }
      });
    });
}



function TotalCalculator( input ) {
  const calculateTotal = (input) => {
  
      let itemstoString = '' + input;
      const items = itemstoString.split(',');
      let total = 0;

      items.forEach(item => {
          const [quantity, food] = item.split(/(?<=\d)(?=[a-zA-Z])/); // Split quantity and food
          const menuItem = menu.find(menuItem => menuItem.foods.includes(food));
          if (menuItem) {
              total += parseInt(quantity) * menuItem.price;
          }
      });

      return total ;
  };

}

function OrderTotalCalculator( orders,wholId ) {
  let arr = [];
  for (let key in orders ) {
    arr.push(orders[key])
  }
  //console.log(`esto es ${typeof arr} que es "${arr}"`)
  const calculateTotal = (order) => {
      const items = order.split(',');
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

  let totalCost = 0;
  
  if (orders !== "") {
    totalCost = orders.reduce((acc, order) => acc + calculateTotal(order), 0);
  
  }

  const UpdateCuenta =(modifiedCuenta,id) => {
    console.log(id,modifiedCuenta)
  }
  
  return (
    <View style={styles.TotalButtonContainer}>
      <Text style={styles.TotalText}>{totalCost}</Text>
      <TouchableOpacity style={styles.UpdateButton} onPress={()=> { UpdateCuenta(orders,wholId) }}><Text style={styles.TextButton}>update</Text></TouchableOpacity>
    </View>
  );
}

function spliter(data, wholId, cuentaArray, setCuentaArray) {
  const conteo = [
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

  if (data === "") {
    console.log("ok");
  } else {
    const ordersToArray = data.flatMap(item => item.split(',')); // set an array with the strings split them by ','
    ordersToArray.forEach(order => {
      const [quantityInt, food] = order.split(/(?<=\d)(?=[a-zA-Z])/); // Split quantity and food
      const menuItem = menu.find(menuItem => menuItem.foods.includes(food)); // Creates the let menuItem and if it's find the food in the menu foods set the value
      
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
                  <Text style={styles.Plato}>{item.quantity} </Text><Text style={styles.Plato}>{item.dish}</Text>
                </View>
                <View style={styles.BlockContainer}>
                  <View style={styles.priceContainer}><Text style={styles.price}>${item.totalPrice}</Text></View>
                  <View style={styles.BlockButtons}>
                    <TouchableOpacity style={styles.Button} onPress={() => { setCuentaArray(Reducer(wholId, item.dish, cuentaArray)); }}><Text style={styles.ButtonText}>-</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.Button} onPress={() => { setCuentaArray(Adder(wholId, item.dish, cuentaArray)); }}><Text style={styles.ButtonText}>+</Text></TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          } else {
            return null; // Don't render anything for dishes with quantity 0
          }
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
  borderBlockColor: '#D9D9D9',
  borderBottomWidth:2
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
},
price:{
  fontSize:25,
  fontWeight: '500'
},
priceContainer:{
  width:115
},
UpdateButton:{
  width: 120,
  height: '75%',
  backgroundColor: '#00b4d8',
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

export{ total,TotalCalculator,OrderTotalCalculator,spliter};