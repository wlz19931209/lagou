/**
 * 函数的柯里化
 * 当一个函数有多个参数的时候先传递一部分参数调用它（这部分参数以后永远不变）
 * 然后返回一个新的函数接受剩余的参数，返回结果
 */

// 一般函数
// function checkAge(age) {
//     let min = 18
//     return age >= min
// }

// 普通纯函数
// function checkAge(min, age) {
//     return age >= min
// }

// console.log(checkAge(18, 20));
// console.log(checkAge(18, 21));
// console.log(checkAge(18, 22));
// console.log(checkAge(18, 23));

// 柯里化演示

//一般写法
// function checkAge(min) {
//     return function(age) {
//         return age >= min
//     }
// }

// es6写法
let checkAge = min => age => age >= min;

let checkAge18 = checkAge(18);
let checkAge20 = checkAge(20);

console.log(checkAge18(20));
console.log(checkAge18(22));
console.log(checkAge20(22));
console.log(checkAge20(12));
