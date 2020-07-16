const _ = require("lodash");
// 函数组合
const reverse = arr => arr.reverse();
const first = arr => arr[0];
const toUpper = s => s.toUpperCase();

// 函数组合中 默认是从右向左执行的
// const f = compose(toUpper, first, reverse);

// console.log(f(["1", "2", "3", "5", "8", "1", "5", "1"]));

/**
 * reduce(cb, total)
 * reduce接受一个回调函数(必须) 和一个传递给函数的初始值(可选)
 * 回调函数种的参数有 初始值或返回值 当前元素 当前元素的索引 当前元素所属的数组对象
 * 回调函数必须有返回值
 */

// 模拟flowRight
// function compose(...args) {
//     return function(value) {
//         return args.reverse().reduce((total, fn) => {
//             return fn(total)
//         }, value)
//     }
// }

// es6
const compose = (...args) => value => args.reverse().reduce((total, fn) => fn(total), value);

const f = compose(toUpper, first, reverse);
console.log(f(["1", "2", "3", "5", "8", "1", "5", "1"]));

// 函数组合 调试

// NEVER SAY DIE --> never-say-die

const split = _.curry((sep, str) => _.split(str, sep));
const join = _.curry((sep, array) => _.join(array, sep));

// 使用log放在组合函数中查看上一个函数的返回值
const log = v => {
    console.log(v);
    return v;
};

const fn1 = _.flowRight(join("-"), split(" "), log, _.toLower);

console.log(fn1("NEVER SAY DIE"));

// 使用lodash中的fp模块
const fp = require("lodash/fp");

/**
 * Point Free
 * 我们可以把数据处理的过程定义成与数据不管的合成运算，不需要用到代表数据的那个参数，只要把简单的运算步骤合成到一起
 * 在使用这种模式之前我们需要定义一些辅助的基本运算函数
 * 
 * 个人理解
 * 类似于数学中的计算公式
 * 合成了运算的过程
 * 
 * 列如下面的fn2
 */
const fn2 = fp.flowRight(fp.join("-"), fp.split(" "), fp.toLower);

console.log(fn2("NEVER SAY DIE1"));