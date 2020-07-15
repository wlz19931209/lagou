// const _ = require("loadsh");

function getArea(r) {
    console.log(r);
    return Math.PI * r * r;
}

// let fn = _.memoize(getArea)

// console.log(fn(4));
// console.log(fn(4));
// console.log(fn(4));
// console.log(fn(4));

// 模拟memoize
function memoize (f) {
    let cache = {} // 用来记忆的对象
    return function () {
        let key = JSON.stringify(arguments) // 将传入函数的参数作为cache对象的KEY
        cache[key] = cache[key] || f.apply(f, arguments) // 利用cache[key]判断是否执行过参数相同的传入函数 将结果赋值给cache
        return cache[key]
    }
}

let fn = memoize(getArea)

console.log(fn(4));
console.log(fn(4));
console.log(fn(4));
console.log(fn(4));