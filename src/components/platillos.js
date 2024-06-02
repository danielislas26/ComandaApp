import React,{useState,useEffect} from "react";
const menu = [
  { name: 'tacos', foods: ["cos", "mac", "pan", "esp","pez","sur","cam"], price: 30 },
  { name: 'kilos', foods: ["kcos", "kmac", "kpan", "kesp","kpez","ksur","kcam"], price: 520 },
  { name: 'medios', foods: ["mcos", "mmac", "mpan", "mesp","mpez","msur","mcam"], price: 260 },
  { name: 'cuartos', foods: ["ccos", "cmac", "cpan", "cesp","cpez","csur","ccam"], price: 30 },
  { name: 'litro', foods: ["lt"], price: 60 },
  { name: 'mediolitro', foods: ["mlt"], price: 30 },
  { name: 'cuartolitro', foods: ["clt"], price: 15 },
  { name: 'refresco', foods: ["coc","mun"], price: 25 },
  { name: 'jugos', foods: ["bgua","bman","lroj","luva","llim","lpiñ","ltor"], price: 20 },
];


export default function TotalCalculator({ input }) {
  const calculateTotal = (input) => {
      const items = input.split(',');
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

  const total = calculateTotal(input);

  return (
      <View>
          <Text>Total: {total}</Text>
      </View>
  );
}

  export { menu };