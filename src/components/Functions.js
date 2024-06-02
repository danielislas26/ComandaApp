import React,{useState,useEffect} from "react";
import { View,Text,StyleSheet,TouchableOpacity } from "react-native"
import { menu } from "./platillos";


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

  const total = calculateTotal(input);
  
}

function OrderTotalCalculator( orders ) {
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
  
  return (
    <View>
      <Text style={styles.TotalText}>{totalCost}</Text>
    </View>
  );
}

function spliter  ( data ) {
  
  

  const conteo = [
    { dish : 'tacos', quantity: 0 , totalPrice : 0 },
    { dish : 'kilos', quantity: 0 , totalPrice : 0 },
    { dish : 'medios', quantity: 0 , totalPrice : 0 },
    { dish : 'cuartos', quantity: 0 , totalPrice : 0 },
    { dish : 'litros', quantity: 0 , totalPrice : 0 },
    { dish : 'mediolitro', quantity: 0 , totalPrice : 0 },
    { dish : 'cuartolitro', quantity: 0 , totalPrice : 0 },
    { dish : 'refresco', quantity: 0 , totalPrice : 0 },
    { dish : 'jugos',  quantity: 0 , totalPrice : 0 },
  ];

 if ( data === "" ) {
  console.log("ok")
 } else {
  const ordersToArray = data.flatMap(item => item.split(','));
  ordersToArray.forEach(order => {
    const [quantity, food] = order.split(/(?<=\d)(?=[a-zA-Z])/); // Split quantity and food
    const menuItem = menu.find(menuItem => menuItem.foods.includes(food));

    if (menuItem) {
        const index = conteo.findIndex(item => item.dish === menuItem.name);
        if (index !== -1) {
            conteo[index].quantity += parseInt(quantity);
            conteo[index].totalPrice += parseInt(quantity) * menuItem.price;
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
                              <TouchableOpacity style={styles.Button}><Text style={styles.ButtonText} >-</Text></TouchableOpacity>
                              <TouchableOpacity style={styles.Button}><Text style={styles.ButtonText} >+</Text></TouchableOpacity>
                          </View>
                      </View>
                  </View>
                    );
                } else {
                    return null; // Don't render anything for dishes with quantity 0
                }
            })}
        </View>
 )
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
})

export{ total,TotalCalculator,OrderTotalCalculator,spliter};