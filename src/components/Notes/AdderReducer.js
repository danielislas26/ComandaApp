import { menu } from "../platillos";

const Adder = (cuentaId, dish, cuentaArray) => {
  let Arr = [...cuentaArray]; // Copy the array to avoid mutating the original array
  console.log(dish);

  let dishFound = false;

  for (let i = Arr.length - 1; i >= 0; i--) {
    let order = Arr[i].split(",");
    for (let j = 0; j < order.length; j++) {
      const [quantityInt, food] = order[j].split(/(?<=\d)(?=[a-zA-Z])/);
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
  console.log(Arr);
  return Arr;
};

const Reducer = (cuentaId, dish, cuentaArray) => {
  let Arr = [...cuentaArray]; // Copy the array to avoid mutating the original array
  console.log(dish);

  let dishFound = false;

  for (let i = Arr.length - 1; i >= 0; i--) {
    let order = Arr[i].split(",");
    for (let j = 0; j < order.length; j++) {
      const [quantityInt, food] = order[j].split(/(?<=\d)(?=[a-zA-Z])/);
      if (menu.find((menuItem) => menuItem.foods.includes(food) && menuItem.name === dish)) {
        let newQuantity = parseInt(quantityInt) - 1;
        if (newQuantity > 0) {
          order[j] = newQuantity + food;
        } else {
          order.splice(j, 1); // Remove the item if the new quantity is 0
        }

        Arr[i] = order.join(",");
        dishFound = true;
        break;
      }
    }
    if (dishFound) break;
  }

  Arr = Arr.filter(order => order.trim() !== "");
  console.log(Arr);
  return Arr;
};

export { Adder, Reducer };
