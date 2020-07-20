const MyPromise = require("./MyPromise");
const { reject } = require("lodash");

const p = new MyPromise((resolve, reject) => {
    // resolve(100)
    // reject("foo");

    setTimeout(() => {
        // reject("foo");
        resolve(100)
    }, 2000);
});

// 同一对象多次调用then
// p.then(res => {
//     console.log(1,res);
// }, err => {
//     console.log(err);
// })
// p.then(res => {
//     console.log(2,res);
// }, err => {
//     console.log(err);
// })
// p.then(res => {
//     console.log(3,res);
// }, err => {
//     console.log(err);
// })

// then的链式调用
// p.then(res => {
//     console.log(1,res);
//     return 200
// }).then(val => {
//     console.log(2, val);
// })

// return 一个promise时
// p.then(res => {
//     console.log(1,res);
//     return new Promise((resolve, reject) => {
//         reject(200)
//     })
// }).then(val => {
//     console.log(2, val);
// }, err => {
//     console.log('err', err);
// })

// return自身时将会出现无限回调 应该抛出报错
// var p2 = p.then(res => {
//     console.log(1,res);
//     return p2
// }).then(val => {
//     console.log(2, val);
// }, err => {
//     console.log('err', err);
// })

// 捕获执行器中的错误
// let p3 = new MyPromise((resolve, reject) => {
//     throw new Error('executor error')
// })

// p3.then(res => {
//     console.log(res);
// }, err => {
//     console.log(err);
// })

// 捕获回调中的错误
// p.then(res => {
//     throw new Error('callBack Error')
// })

// reject的处理
// p.then(res => {
//     console.log(res);
// }, err => {
//     console.log(err);
//     return 1000
// }).then(res => {
//     console.log(res);
// })

// 适配then中没有写回调的情况

// p.then().then().then(val => {
//     console.log(val);
// }, err => {
//     console.log(err);
// })

//Promise.all 执行
let p2 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(300)
    }, 1000);
})

Promise.all(['a', 'b', p, p2, 'c']).then(res => {
    console.log(res);
})