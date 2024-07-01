import { menu } from "../platillos";



const Adder = ( dish, cuentaArray) => {
  let Arr = [...cuentaArray]; // Copy the array to avoid mutating the original array

  let dishFound = false;

  for (let i = Arr.length - 1; i >= 0; i--) {
    let order = Arr[i].split(",");
    for (let j = 0; j < order.length; j++) {
      
      if (menu.find(menuItem => menuItem.name === dish)) {
        let str = menu.find(menuItem => menuItem.name === dish);
        Arr.push(`1${str.foods[0]}`);
        dishFound = true;
        break;
      }
    }
    if (dishFound) break;
  }
  Arr = Arr.filter(order => order.trim() !== "");
  return Arr;
};

const Reducer = (dish, cuentaArray) => {
  let Arr = [...cuentaArray]; // Copy the array to avoid mutating the original array

  for (let i = Arr.length - 1; i >= 0; i--) {
    let order = Arr[i].split(",");
    for (let j = order.length - 1; j >= 0; j--) { // Iterate from last to first
      const [quantityInt, food] = order[j].split(/(?<=\d)(?=[a-zA-Z])/);
      if (menu.find((menuItem) => menuItem.foods.includes(food) && menuItem.name === dish)) {
        let newQuantity = parseInt(quantityInt) - 1;
        if (newQuantity > 0) {
          order[j] = newQuantity + food;
        } else {
          order.splice(j, 1); // Remove the item if the new quantity is 0
        }

        Arr[i] = order.join(",");
        // Exit both loops after updating the last occurrence of the dish
        return Arr.filter(order => order.trim() !== "");
      }
    }
  }

  return Arr.filter(order => order.trim() !== "");
};

export { Adder, Reducer };
