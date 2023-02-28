/*
Проміс може бути у трьох станах:

Очікування (pending) - початковий стан під час створення промісу.
Виконано (fulfilled) - операція виконана успішно з будь-яким результатом.
Відхилено (rejected) - операція відхилена з помилкою.

На момент створення проміс знаходиться в очікуванні (pending), після чого може завершитися успішно (fulfilled), повернувши результат (значення), або з помилкою (rejected), повернувши причину. Коли проміс переходить у стан fulfilled або rejected - це назавжди.

Коли проміс виконаний або відхилений -> завершений (settled), термін, який описує те, що проміс перебуває в будь-якому стані, крім очікування.

Відмінності промісу і callback-функції:

Колбеки - це функції, обіцянки - це об'єкти.
Колбеки передаються як аргументи з зовнішнього коду у внутрішній, а обіцянки повертаються з внутрішнього коду у зовнішній.
Колбеки обробляють успішне або неуспішне завершення операції, обіцянки нічого не обробляють.
Колбеки можуть обробляти декілька подій, обіцянки пов'язані тільки з однією подією.

 * Створення 'обіцянок' - Promise
 * - Клас Promise

 * -  resolve(value) - функція для виклику у разі успішної операції.    Переданий їй аргумент буде значенням виконаного промісу.

 * -  reject(error) - функція для виклику у разі помилки. Переданий їй аргумент буде значенням відхиленого промісу.

 * - Promise.prototype.then(onResolve, onReject)
 */

//Проміс створюється як екземпляр класу Promise, який приймає функцію (executor) як аргумент і відразу викликає її, ще до створення і повернення промісу.

const promise = new Promise((resolve, reject) => {});
console.log(promise);
//Promise {<pending>}
//[[Prototype]]: Promise
//[[PromiseState]]: "pending"
//[[PromiseResult]]: undefined

//----------------------------------------------------------------

const promiseA = new Promise((resolve, reject) => {
  const canFullFill = Math.random() > 0.7;

  setTimeout(() => {
    if (canFullFill) {
      resolve('Проміс виконався успішно, з результатом (виконаний, fullfilled)');
    }
    reject('Проміс виконався з помилкою (відхилений,rejected)');
  }, 3000);
});

/* Метод then() приймає два аргументи - callback-функції, які будуть викликані, коли проміс змінить свій стан. Результат промісу, значення або помилку, вони отримають як аргументи.

promise.then(onResolve, onReject)

onResolve(value) - буде викликана у разі успішного виконання промісу і отримає його результат як аргумент.

onReject(error) - буде викликана у разі виконання промісу з помилкою і отримає її як аргумент.
*/
promiseA.then(
  result => {
    console.log(`✅ ${result}`);
  },
  err => {
    console.log(`❌ ${err}`);
  }
);

//----- next variant ---------------------------------------------------------
const promiseB = new Promise((resolve, reject) => {
  const fullfilled = Math.random() > 0.3;
  setTimeout(() => {
    if (fullfilled) {
      resolve('Проміс виконався успішно, з результатом (виконаний, fullfilled)');
    }
    reject('Проміс виконався з помилкою (відхилений,rejected)');
  }, 1000);
});

promiseB.then(onResolve, onReject);

function onResolve(result) {
  console.log(`✅ ${result}`);
}
function onReject(err) {
  console.log(`❌ ${err}`);
}

//----------------------------------------------------------------
// Change value of isSuccess variable to call resolve or reject
const isSuccess = true;

const promiseC = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (isSuccess) {
      resolve('Success! Value passed to resolve function');
    } else {
      reject('Error! Error passed to reject function');
    }
  }, 5000);
});

promiseC.then(onSuccess, onErr);

function onSuccess(result) {
  console.log('onSuccess call inside promise.then()');
  console.log(`✅ ${result}`);
}
function onErr(err) {
  console.log('onErr call inside promise.then()');
  console.log(`❌ ${err}`);
}

console.log('After promise.then()');

//----- CHAINING --------------------------------
/*
 * Ланцюжки промісів  (chaining)
 * Promise.prototype.catch(error)
 * Promise.prototype.finally()

 * На практиці в методі then() обробляють тільки успішне виконання промісу, а помилку його виконання у спеціальному методі catch() для «відловлювання» помилок.

 promise.catch(error => {
  /* Promise rejected
});

 promise
  .then(result => {
    console.log('resolve', result);
  })
  .catch(error => {
    console.log('reject', error);
  });
 */

const fullfilled = true;
const promiseD = new Promise((resolve, reject) => {
  if (fullfilled) {
    resolve('fullfilled');
  }
  reject('fullfilled false');
});

/* then return promise
   then - це виклик функції всередині
   then повертає також проміс і тому до then можемо чейнити ще один then
   якщо з першого then нічого не повертаємо - наступний then  - undefined

   then повертає або "good", або "bad",  і так далі по ланцюжку
*/

promiseD
  .then(result => {
    console.log(result); // fullfilled
  })
  .then(abstractValue => {
    console.log(abstractValue); // undefined
  });

//   ----------------------------------------------------------------

promiseD
  .then(result => {
    console.log(result); // fullfilled
    return `Hello, world!`;
  })
  .then(abstractValue => {
    console.log(abstractValue); // `Hello, world!`
  });

// ----------------------------------------------------------------

promiseD
  .then(result => {
    console.log(result); // fullfilled
    return `Hello, world!`;
  })
  .then(abstractValue => {
    console.log(abstractValue); // `Hello, world!`
  })
  .then(nextAbstractValue => {
    console.log(nextAbstractValue); // undefined
  });

// ----------------------------------------------------------------
/* then повертає або "good", або "bad",  і так далі по ланцюжку */

promiseD
  .then(
    result => {
      console.log(result); // fullfilled
      return `Hello, world!`;
    },
    err => {
      console.log(err);
    }
  )
  .then(
    abstractValue => {
      console.log(abstractValue); // `Hello, world!`
    },
    err => console.log(err)
  )
  .then(
    nextAbstractValue => {
      console.log(nextAbstractValue); // undefined
    },
    err => console.log(err)
  );

// ----------------------------------------------------------------
/* then повертає або "good", або "bad",  і так далі по ланцюжку */

const fullfilledPlus = true;
const promiseF = new Promise((resolve, reject) => {
  if (fullfilledPlus) {
    resolve('fullfilled');
  }
  reject('fullfilled false');
});

promiseF
  .then(onResolved, onRegected)
  .then(
    firstAbstractValue => {
      console.log(firstAbstractValue); // undefined
      return `Hello, world!`;
    },
    err => {
      console.log(err);
    }
  )
  .then(
    abstractValue => {
      console.log(abstractValue); // `Hello, world!`
    },
    err => console.log(err)
  )
  .then(
    nextAbstractValue => {
      console.log(nextAbstractValue); // undefined
    },
    err => console.log(err)
  );

function onResolved(result) {
  console.log('onSuccess call inside promise.then()'); // onSuccess call inside promise.then()
  console.log(`✅ ${result}`); // ✅ fullfilled
}
function onRegected(err) {
  console.log('onErr call inside promise.then()');
  console.log(`❌ ${err}`);
}

// ------------------------------------------------------------------

/* щоб не робити такий довгий ланцюжок, де в кожному then є і "добре", і "погано", в then передаємо лише resolve - успішне виконання, без оброблювання помилок - error. АЛЕ в кінці ланцюжка промісів then ставимо catch, який ловитиме наші помилки і опрацьовуватиме їх.
Якщо проміс на початку відхилений - rejected, всі послідуючі then не виконаються, а дія перейде в catch, щоб опрацювати помилку.
Де-небудь в ланцюжку помилка - все зламалось далі, наступні нижче then не виконуються, і вся дыя перейшла в catch(error=>{}) */

const fullfilledA = true;
const promiseK = new Promise((resolve, reject) => {
  if (fullfilledA) {
    resolve('fullfilled');
  }
  reject('fullfilled false');
});

promiseK
  .then(onLuck)
  .then(firstAbstractValue => {
    console.log(firstAbstractValue); // undefined
    return `Hello, world!`;
  })
  .then(abstractValue => {
    console.log(abstractValue); // `Hello, world!`

    throw new Error('error in third then');
  })
  .then(nextAbstractValue => {
    console.log(nextAbstractValue); // doesn`t work because under Error
  })
  .catch(err => console.log(err)); //Error: error in third then at 51-promise.js:278:11

function onLuck(result) {
  console.log('onSuccess call inside promise.then()'); // onSuccess call inside promise.then()
  console.log(`✅ ${result}`); // ✅ fullfilled
}

function onFiasco(err) {
  console.log('onErr call inside promise.then()');
  console.log(`❌ ${err}`);
}

/* .finally(() => console.log('Я буду виконаний у будь-якому випадку')); */

// Цей метод може бути корисним, якщо необхідно виконати код після того, як обіцянка буде дозволена (fulfilled або rejected), незалежно від результату. Дозволяє уникнути дублювання коду в обробниках then() і catch(). Наприклад, зняти Loader
// В finally НЕМАЄ АРГУМЕНТІВ/ПАРАМЕТРІВ, так як наперед не знаємо чи успішне виконання, чи ні

// Change value of isSuccess variable to call resolve or reject
const isProsperity = true;

const promiseG = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (isProsperity) {
      resolve('Success! Value passed to resolve function');
    } else {
      reject('Error! Error passed to reject function');
    }
  }, 2000);
});

promiseG
  .then(result => console.log(result)) // "Success! Value passed to resolve function"
  .catch(error => console.log(error)) // "Error! Error passed to reject function"
  .finally(() => console.log('Promise settled')); // "Promise settled"

//   ----------------------------------------------------------------

const promiseH = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(5);
  }, 2000);
});

promiseH
  .then(value => {
    console.log(value); // 5
    return value * 2;
  })
  .then(value => {
    console.log(value); // 10
    return value * 3;
  })
  .then(value => {
    console.log(value); // 30
  })
  .catch(error => {
    console.log(error);
  })
  .finally(() => {
    console.log('Final task'); // Final task
  });

//TODO ----------------------------------------------------------

const family = [
  { member: 'Mom', id: 111, coffee: 'Latte' },
  { member: 'Dad', id: 222, coffee: 'Espresso' },
  { member: 'Son', id: 333, coffee: 'Capuchino' },
];

function getFamilyMember(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const member = family.find(data => data.id === id);
      if (member) {
        resolve(member);
      }
      reject(Error(`Member didn't find`));
    }, 5000);
  });
}

function getCoffee(member) {
  const coffeePromise = fetch('https://api.sampleapis.com/coffee/hot');
  return coffeePromise
    .then(result => result.json())
    .then(list => {
      const coffee = list.find(drink => drink.title === member.coffee);
      console.log(coffee);
      return {
        ...member,
        // coffee: coffee,
        coffee,
      };
    })
    .catch(err => Error(err));
}

getFamilyMember(111); //{member: 'Mom', id: 111, coffee: 'Latte'}
//getFamilyMember(121); // Error: Member didn't find

getFamilyMember(222)
  .then(result => {
    console.log(result);
    // const test = getCoffee(result); // promise: pending
    getCoffee(result);
  })
  .then(newMember => console.log('newMember: ', newMember))
  .catch(err => console.log(err));

// list:  (20) [{…}, {…}, {…}, {…}, {…}, {…}, ...]
//{title: 'Espresso', description: 'An espresso shot can be served solo or used as the…f most coffee drinks, like lattes and macchiatos.', ingredients: Array(1), image: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Tazzina_di_caff%C3%A8_a_Ventimiglia.jpg', id: 5}

// {member: 'Dad', id: 222, coffee: {description: "An espresso shot can be served solo or used as the foundation of most coffee drinks, like lattes and macchiatos."
// id: 5
// image: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Tazzina_di_caff%C3%A8_a_Ventimiglia.jpg"
// ingredients: ['1oz Espresso']
// title: "Espresso"}}

// TODO----------------------------------------------------------------

const makeCoffee = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Your coffee is ready`);
    }, 7000);
  });
};
const makeToast = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Your toast is ready`);
    }, 7500);
  });
};

const coffeePromise = makeCoffee();
const toastPromise = makeToast();

// coffeePromise.then(result => console.log(result)); //Your coffee is ready
// toastPromise.then(result => console.log(result)); // Your toast is ready

//! Promise.all([promise1, promise2, promise3]);

// nest variant to use Promise.all()

//Promise.all([coffeePromise, toastPromise]).then(result => console.log(result)); // (2) ['Your coffee is ready', 'Your toast is ready']
Promise.all([coffeePromise, toastPromise]).then(([coffeePromise, toastPromise]) =>
  console.log(coffeePromise, toastPromise)
); // Your coffee is ready Your toast is ready

//TODO -------------------------------------------------------------------------

const fetchBeers = fetch('https://api.sampleapis.com/beers/ale');
const fetchWines = fetch('https://api.sampleapis.com/wines/reds');

//Promise.all([fetchBeers, fetchWines]).then(data => console.log(data)); //[Response, Response]

// Promise.all([fetchBeers, fetchWines])
//   .then(data => {
//     return Promise.all(data.map(res => res.json()));
//   })
//   .then(finalData => console.log(finalData)); //[Array(180), Array(718)]

Promise.all([fetchBeers, fetchWines])
  .then(data => Promise.all(data.map(res => res.json())))
  .then(finalData => console.log(finalData)) //[Array(180), Array(718)]
  .catch(err => console.error(Error(`Doesn't find information for you`))); //Error: Doesn't find information for you
