/*
 * Функция обратного вызова (callback)
 * - Функция может принимать другие функции как параметры
 * - Функция которая передаётся другой функции как аргумент называетс
 *   «функцией обратного (отложенного) вызова» (callback-функция)
 * - Функция которая принимает другую функцию как параметр
 *   или возвращает функцию как результат своей работы называется «функцией высшего порядка»
 */

// function myFunc() {
// const a = [4, 5, 6];
// document.querySelector('.out-1').innerHTML = a.join('-');
// }

// myFunc();
// // 4-5-6

// function myFunction(callback){
//     const a = [4, 5, 6];
//     let element = document.querySelector('.out-1');
//     callback(elem, a);
//     }

// // function callback
// function out(element, arr){
// element.innerHTML = arr.join('-');
// }

// myFunc(out);
// // 4-5-6

// example 2
function twoSquared() {
  return 2 * 2;
}
twoSquared();

function threeSquared() {
  // return Math.pow(3, 3);
  return 3 * 3;
}

const numSquared = num => {
  return num * num;
};

// ex 3 long result with typical steps
const copyArrAndSquareNums = arr => {
  const output = [];

  for (let i = 0; i < arr.length; i += 1) {
    output.push(arr[i] ** 2);
  }
  return output;
};

const nums = [1, 2, 3, 4];
const res = copyArrAndSquareNums(nums);

console.log(res);
// (4) [1, 4, 9, 16]

const copyArrDevideByTwo = arr => {
  const output = [];

  for (let i = 0; i < arr.length; i += 1) {
    output.push(arr[i] / 2);
  }
  return output;
};

const res2 = copyArrDevideByTwo(nums);
console.log(res2);
// (4) [0.5, 1, 1.5, 2]

// callback function
function copyArrDoSomething(arr, instructions) {
  // const output = [];

  // for (let i = 0; i < arr.length; i += 1) {
  //   output.push(instructions(arr[i]));
  // }
  // return output;
  return instructions(...arr);
}

const numInstructions = num => {
  return num * num;
};

const result = copyArrDoSomething([1, 3, 5, 6], numInstructions);
console.log(result);
// (4) [1, 9, 25, 36]

const numDevidedBy3 = num => {
  return Math.round(num / 3);
};
const result2 = copyArrDoSomething([66, 17, 27, 698], numDevidedBy3);
console.log(result2);
// (4) [22, 6, 9, 233]

const somethingNum = [55, 66, 33, 77];
const resultNum = copyArrDoSomething(somethingNum, numDevidedBy3);
console.log(resultNum);

// recursion
let a = 1;
const rec = () => {
  a++;
  console.log(a);
  if (a > 10) {
    return a;
  }
  rec();
};

rec();
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// 10
// 11

// for animation why didn't work???
let offset = 0;
function move() {
  offset += 5;

  document.querySelector('.test-2').style.left = offset + 'px';
  if (offset > 200) {
    return true;
  }
  setTimeout(move, 500);
}

// document.querySelector('button').onclick = move;

//
let globalA = 8;
const one = () => {
  globalA += 1;
  return globalA;
};

console.log(one()); // 9
console.log(one()); // 10
console.log(one()); // 11

const one1 = () => {
  let localA = 8;
  localA += 1;
  return localA;
};

console.log(one1()); // 9
console.log(one1()); // 9
console.log(one1()); // 9

function counter() {
  let localA = 8;
  return () => {
    localA += 1;
    return localA;
  };
}
console.log(counter());
// () => {
//     localA += 1;
//     return localA;
//   }

const counterB = counter();
console.log(counterB);
// () => {
//     localA += 1;
//     return localA;
//   }
console.log(counterB()); // 9
console.log(counterB()); // 10
console.log(counterB()); // 11
console.log(counterB()); // 12
console.log(counterB()); // 13

const counterC = counter();
console.log(counterC()); // 9
console.log(counterC()); // 10
console.log(counterC()); // 11
console.log(counterC()); // 12
console.log(counterC()); // 13

console.log(counterB()); // 14
console.log(counterB()); // 15

console.log(counterC()); // 14

/*
 * Отложенный вызов: регистрация событий
 */

const buttonRef = document.querySelector('.js-button');

const handleBtnClick = function () {
  console.log('Клик по кнопке ' + Date.now());
};

// buttonRef.addEventListener('click', handleBtnClick);

/*
 * Отложенный вызов: геолокация
 */

const onGetPositionSuccess = function (position) {
  console.log('Это вызов onGetPositionSuccess');
  console.log(position);
};

const onGetPositionError = function (error) {
  console.log('Это вызов onGetPositionError');
  console.log(error);
};

// window.navigator.geolocation.getCurrentPosition(
//     onGetPositionSuccess,
//     onGetPositionError,
// );

/*
 * Отложенный вызов: интервалы
 */

const callback = function () {
  console.log('Через 2 секунды внутри колбека в таймауте');
};

// console.log('В коде перед таймаутом');
// setTimeout(callback, 2000);
// console.log('В коде после таймаута');

/*
 * Отложенный вызов: http-запрос
 * - API URL: https://pokeapi.co/api/v2/pokemon
 */

const onRequestSuccess = function (response) {
  console.log('Вызов функции onRequestSuccess после успешного ответа бекенда');
  console.log(response);
};

// fetch('https://pokeapi.co/api/v2/pokemon')
//     .then(res => res.json())
//     .then(onRequestSuccess);

/*
 * Фильтр
 */

const filter = function (array, test) {
  const filteredArray = [];

  for (const el of array) {
    console.log(el);
    const passed = test(el);

    if (passed) {
      filteredArray.push(el);
    }
  }

  return filteredArray;
};

// 1. надо передать функцию
// 2. функция получает элемент массива
// 3. если элемент массива удовлетворяет условию то функция вернет true
// 3. если элемент массива НЕ удовлетворяет условию то функция вернет false

const callback1 = function (value) {
  return value >= 3;
};

const r1 = filter([1, 2, 3, 4, 5], callback1);
console.log(r1);

const callback2 = function (value) {
  return value <= 4;
};

const r2 = filter([1, 2, 3, 4, 5, 6, 7, 8], callback2);
console.log(r2);

const fruits = [
  { name: 'apples', quantity: 200, isFresh: true },
  { name: 'grapes', quantity: 150, isFresh: false },
  { name: 'bananas', quantity: 100, isFresh: true },
];

const getFruitsWithQuantity = function (fruit) {
  return fruit.quantity >= 120;
};

const r3 = filter(fruits, getFruitsWithQuantity);
console.log(r3);

/*
 * Округлятор 🤷‍♂️
 */

// const floatingPoint = 3.456789;
// const someInt = Math.round(floatingPoint); // 3
// const withDecimals = Number(floatingPoint.toFixed(2)); // 3.46

// const rounder = function (number, places) {
//     return Number(number.toFixed(places));
// };

// console.log(rounder(3.4567, 2));
// console.log(rounder(3.4567, 3));
// console.log(rounder(5.1234, 2));
// console.log(rounder(3.4567, 3));

const rounder = function (places) {
  return function (number) {
    return Number(number.toFixed(places));
  };
};

// const rounder2 = rounder(2);
// const rounder3 = rounder(3);

// console.dir(rounder2);
// console.dir(rounder3);

// console.log(rounder2(3.4567));
// console.log(rounder2(5.4512312312367));
// console.log(rounder3(3.4567));
// console.log(rounder2(5.1234));
// console.log(rounder3(3.4567));
// console.log(rounder3(10.67667));

/*
 * Приватные данные и функции - скрытие реализации, интерфейс
 */

const salaryManagerFactory = function (employeeName, baseSalary = 0) {
  let salary = baseSalary;

  return {
    raise(amount) {
      if (amount > 1000) {
        return 'Ты офигел?';
      }

      salary += amount;
    },
    lower(amount) {
      salary -= amount;
    },
    current() {
      return `Текущая зарпалата ${employeeName} - ${salary}`;
    },
  };
};

const salaryManager = salaryManagerFactory('Mango', 5000);

console.log(salaryManager.current());

console.log(salaryManager.raise(10000000));

console.log(salaryManager.current());

// const myLibFactory = function () {
//     let value = 0;

//     const add = function (num) {
//         value += num;
//     };

//     return {
//         add: add,
//         getValue() {
//             return value;
//         },
//     };
// };

// const myLib = myLibFactory();

// console.dir(myLib.getValue);

// console.log(myLib);
// console.log(myLib.getValue());
// myLib.add(10);
// console.log(myLib.getValue());

const numbers = [1, 2, 3, 4, 5];
const each = function (array, callback) {
  const newArray = [];

  for (item of array) {
    newArray.push(callback(item));
  }
  return newArray;
};

//const eachReduce = each.reduce((acc, callback) => aac + callback, 0);

// capitalize letter

const capitalize = word => word[0].toUpperCase() + word.slice(1).toLowerCase();

const camelCase = (string, callback) => {
  const wordsArr = string.split(' ');
  const capitalizeWordsArr = [];
  // for (const word of wordsArr) {
  //     capitalizeWordsArr.push(callback(word));
  //   }
  // return capitalizeWordsArr.join(' ');
  wordsArr.forEach(word => capitalizeWordsArr.join(' '));
};

const newString = camelCase('this is funhouse', capitalize);

console.log(newString);

// get a room

// vip || standart
const getClientsStatus = () => (Math.round(Math.random()) % 2 !== 0 ? 'vip' : 'standart');

const offerLuxuryRoom = () => 'Luxury Room';
const offerStandartRoom = () => 'Standart Room';

// offerRoom(getClientsStatus, offerLuxuryRoom, offerStandartRoom);

function offerRoom(getClientsStatus, offerLuxuryRoom, offerStandartRoom) {
  return getClientsStatus() === 'standart' ? offerStandartRoom() : offerLuxuryRoom();
}

const result7 = offerRoom(getClientsStatus, offerLuxuryRoom, offerStandartRoom);

console.log(result7);

//
const filterData = (arr, test) => {
  const filter = [];

  for (const num of arr) {
    const passed = test(num);
    if (passed) {
      filter.push(num);
    }
  }
  // console.log(filter);
  return filter;
};

const checkIsTrue = value => value >= 3;
const checkIs = value => value <= 4;

console.log(checkIsTrue(3));

console.log(filterData([2, 3, 56, 7, 1], checkIsTrue)); //[3, 56, 7]
console.log(filterData([2, 3, 56, 7, 1], checkIs)); //[2, 3, 1]

const fruitBasket = [
  {
    name: 'apple',
    color: 'green',
    weight: '150',
    delicious: '1',
    quantity: 200,
    isFresh: true,
  },
  {
    name: 'banana',
    color: 'yellow',
    weight: '116',
    delicious: '1',
    quantity: 150,
    isFresh: false,
  },
  {
    name: 'strawberries',
    color: 'red',
    weight: '12',
    delicious: '1',
    quantity: 500,
    isFresh: true,
  },
];

const getFruitWithQuantity = fruit => fruit.quantity >= 200;
const checkIsFresh = fruit => !fruit.isFresh;

console.log(filterData(fruitBasket, getFruitWithQuantity)); // [{…}, {…}]
console.log(filterData(fruitBasket, checkIsFresh)); // [{name: 'banana', color: 'yellow', weight: '116', delicious: '1', quantity: 150, …}]

/// function to make Pizza

function makePizza() {
  return 'Your pizza is being prepared, please wait.';
}

const results = makePizza();
const pointer = makePizza;

///
function deliverPizza(pizzaName) {
  return `Delivering ${pizzaName} pizza.`;
}

function makePizza1(pizzaName) {
  return `Pizza ${pizzaName} is being prepared, please wait...`;
}

function makeMessage(pizzaName, callback) {
  return callback(pizzaName);
}

///
function makePizza2(pizzaName, callback) {
  console.log(`Pizza ${pizzaName} is being prepared, please wait...`);
  callback(pizzaName);
}

makePizza2('Royal Grand', function deliverPizza(pizzaName) {
  console.log(`Delivering pizza ${pizzaName}.`);
});

makePizza2('Ultracheese', function eatPizza(pizzaName) {
  console.log(`Eating pizza ${pizzaName}.`);
});

//
const pizzaPalace = {
  pizzas: ['Ultracheese', 'Smoked', 'Four meats'],
  order(pizzaName) {},
};

//logic of receiving calls for the phone
function processCalls(recipient, onAvailable, onNotAvailable) {
  const isRecipientAvailable = Math.random() > 0.5;

  if (!isRecipientAvailable) {
    onNotAvailable(recipient);
    return;
  }

  onAvailable(recipient);
}

function takeCall(name) {
  console.log(`З'єднуємо з ${name}, очікуйте...`);
}

function activateAnsweringMachine(name) {
  console.log(`Абонент ${name} недоступний, залиште повідомлення.`);
}

function leaveHoloMessage(name) {
  console.log(`Абонент ${name} недоступний, записуємо голограму.`);
}

processCalls('Mango', takeCall, activateAnsweringMachine);
processCalls('Poly', takeCall, leaveHoloMessage);

//
const pizzaPalaces = {
  pizzas: ['Ultracheese', 'Smoked', 'Four meats'],
  order(pizzaName, onSuccess, onError) {
    const { pizzas } = this;
    if (pizzas.includes(pizzaName)) {
      return onSuccess(pizzaName);
    }
    return onError(`There is no pizza with a name ${pizzaName} in the assortment.`);
  },
};

// Callback for onSuccess
function makePizzas(pizzaName) {
  return `Your order is accepted. Cooking pizza ${pizzaName}.`;
}

// Callback for onError
function onOrderError(error) {
  return `Error! ${error}`;
}

// Method calls with callbacks
pizzaPalace.order('Smoked', makePizzas, onOrderError);
pizzaPalace.order('Four meats', makePizzas, onOrderError);
pizzaPalace.order('Big Mike', makePizzas, onOrderError);
pizzaPalace.order('Vienna', makePizzas, onOrderError);

//logic of receiving calls for the phone
function processCall(recipient, onAvailable, onNotAvailable) {
  // simulate the availability of a subscriber by a random number
  const isRecipientAvailable = Math.random() > 0.5;

  if (!isRecipientAvailable) {
    onNotAvailable(recipient);
    return;
  }

  onAvailable(recipient);
}

function takeCalls(name) {
  console.log(`Connect to ${name}, expect...`);
  // logic to take call
}

function activateAnsweringMachines(name) {
  console.log(`Subscriber ${name} is not available, leave a message.`);
  // logic of activation answering machine
}

function leaveHoloMessages(name) {
  console.log(`Subscriber ${name} is not available, we record a hologram.`);
  // logic of leaving holo message
}

processCall('Alex Bordeaux', takeCalls, activateAnsweringMachines);
processCall('John Arnhold', takeCalls, leaveHoloMessages);

// .forEach(function (number, index) {}) ==================================================
// Poentero sorts through the array.
// Calls the callback function for each element of the array.
// Does not return anything.

function calculateTotalPrice(orderedItems) {
  let totalPrice = 0;
  // for (let i = 0; i < orderedItems.length; i += 1) {
  //   totalPrice += orderedItems[i];
  // }
  orderedItems.forEach(item => (totalPrice += item));
  console.log(totalPrice);
  return totalPrice;
}
calculateTotalPrice([12, 85, 37, 4]); //138
calculateTotalPrice([412, 371, 94, 63, 176]); //1116

//Simple, given a string of words, return the length of the shortest word(s).
// String will never be empty and you do not need to account for different data types.
function findShort(s) {
  const words = s.split(' ');
  console.log(words);
  let shortestWord = words[0];

  for (const word of words) {
    if (word.length < shortestWord.length) {
      shortestWord = word;
    }
  }
  console.log(shortestWord.length);
  return shortestWord.length;
}
findShort('bitcoin take over the world maybe who knows perhaps'); // 3
findShort('turns out random test cases are easier than writing out basic ones'); // 3
findShort("Let's travel abroad shall we"); // 2

function findShortestWord(s) {
  return Math.min(...s.split(' ').map(s => s.length));
}
console.log(findShortestWord('turns out random test cases are easier than writing out basic ones')); // 3
console.log(findShortestWord("Let's travel abroad shall we")); // 2
console.log(findShortestWord('bitcoin take over the world maybe who knows perhaps')); // 3

//Write a function which calculates the average of the numbers in a given list.
// Note: Empty arrays should return 0.

function findAverage(array) {
  let total = 0;
  if (array.length === 0) {
    return 0;
  }
  for (const arr of array) {
    total += arr;
  }
  console.log(total / array.length);
  return total / array.length;
}
findAverage([1, 1, 1]); // 1
findAverage([1, 2, 3]); // 2
findAverage([1, 2, 3, 4]); // 2.5

// next variant
const findAverageNum = array => {
  return array.length === 0 ? 0 : array.reduce((acc, ind) => acc + ind, 0) / array.length;
};

//Return the number (count) of vowels in the given string.We will consider a, e, i, o, u as vowels for this Kata (but not y).The input string will only consist of lower case letters and/or spaces

function getCount(str) {
  const total = [];
  str.split('').forEach(item => {
    if (item === 'a' || item === 'e' || item === 'i' || item === 'o' || item === 'u')
      total.push(item);
  });
  console.log(total.length);
  return total.length;
}

getCount('abracadabra'); // 5
getCount('o kfodcomihz'); // 4

// next variant
function getCountVowels(str) {
  return str.split('').filter(item => 'aeiouAEIOU'.includes(item)).length;
}
console.log(getCountVowels('abracadabra')); // 5
console.log(getCountVowels('o kfodcomihz')); // 4

//Create a method each_cons that accepts a list and a number n, and returns cascading subsets of the list of size n, like so: each_cons([1,2,3,4], 2) #=> [[1,2], [2,3], [3,4]]

function eachCons(array, n) {
  const res = [];
  for (let i = 0; i <= array.length - n; i += 1) {
    let arr = array.slice(i, i + n);
    res.push(arr);
  }

  console.log(res);
  return res;
}
eachCons([3, 5, 8, 13], 1); // [[3], [5], [8], [13]]
eachCons([3, 5, 8, 13], 2); // [[3,5], [5,8], [8,13]]
eachCons([3, 5, 8, 13], 3); // [[3,5,8], [5,8,13]]

//Write two functions max and min which returns the maximum and minimum value of the argument passed into them respectively.

function max(...args) {
  const numbers = args.flat(Infinity).map(num => Number(num));

  if (!numbers.length) return 0;
  if (numbers.includes(NaN)) return NaN;

  const max = numbers.reduce((num1, num2) => (num1 > num2 ? num1 : num2));
  console.log(max);
  return max;
}

function min(...args) {
  const numbers = args.flat(Infinity).map(num => Number(num));

  if (!numbers.length) return 0;
  if (numbers.includes(NaN)) return NaN;

  const min = numbers.reduce((num1, num2) => (num1 < num2 ? num1 : num2));
  console.log(min);
  return min;
}

max([]); // 0
max([[], [-4]]); // -4
max(1, 2, [3, ['4r']]); // NaN
max(1, 2, 3, ['4']); // 4
max(1, 2, 3, 4); // 4;
max(1, 2, [3, 4]); // 4;
max(1, 2, [3, [4]]); // 4
min(1, 2, 3, 4); // 1
min([1, 2], 3, 4); // 1
min(1, 2, [3, [4, 0]]); // 0

// navigator
window.navigator.geolocation.getCurrentPosition(onGetPositionsSuccess, onGetPositionsError);

function onGetPositionsSuccess(position) {
  console.log('success: ', position);
}
function onGetPositionsError(error) {
  console.log('error: ', error);
}

const fruitsCart = [
  {
    name: 'Apple',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/265px-Red_Apple.jpg',
    price: 35,
  },
  {
    name: 'Banana',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Bananas_white_background_DS.jpg/320px-Bananas_white_background_DS.jpg',
    price: 12,
  },
  {
    name: 'Grapes',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Table_grapes_on_white.jpg/320px-Table_grapes_on_white.jpg',
    weight: 0.1,
    price: 45,
  },
  {
    name: 'Pineapple',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Pineapple_and_cross_section.jpg/286px-Pineapple_and_cross_section.jpg',
    price: 200,
  },
];

const filterItem = (array, test) => {
  const arrFilter = [];

  for (const item of array) {
    const passed = test(item);
    if (passed) {
      arrFilter.push(item);
    }
  }
  return arrFilter;
};

function getFruitPrice(fruit) {
  return fruit.price >= 30;
}

console.log(filterItem(fruitsCart, getFruitPrice)); //

// CLOSURE FUNCTION

//Замыкание (англ. closure) в программировании — функция первого класса, в теле которой присутствуют ссылки на переменные, объявленные вне тела этой функции в окружающем коде и не являющиеся её параметрами.

// Замыкание - это функция, содержащая в себе ссылки на переменные из внешней области видимости. Т.е. она "замыкает" внешние переменные в себе.

//Относительно javascrtipt замыкание - это копирование родительской области видимости (а стало быть всех переменных в ней) в дочернюю. А область видимости в javascript ограничивается функциями.

//выполняющаяся функция - это обьект в памяти
// свойства этого обьекта - это переменные функции
// внутри обьекта одной функции можно запустить другую функцию которая может использовать свойства обьекта внешней функции
// обычно после выполнения функции ее обьект удаляется из памяти атоматически сборщиком мусора
// но если свойства этого обекта используются например внутренней функцией то обьект не исчезает

const fnA = parameter => {
  const innerVaiableFnA = `It's inner fnA`;

  const innerfnB = () => {
    console.log(`${parameter} ${innerVaiableFnA} and it's call innerFnB`);
  };
  return innerfnB;
};

// fnA('hI'); // undefined

const fnC = fnA('HI!');
console.log(fnC); // () => {console.log(`${parameter} ${innerVaiableFnA} and it's call innerFnB`);}

fnC(); // HI! It's inner fnA and it's call innerFnB
