const _ = require("loadsh");
// loadsh 中的柯里化
function getSum(a, b, c) {
    return a + b + c;
}

const curried = curry(getSum);

console.log(curried(1, 2, 3));
console.log(curried(1)(2, 3));
console.log(curried(1)(2)(3));

//
const match = _.curry(function (reg, str) {
    return str.match(reg);
});

const hasSpace = match(/\s+/g);

console.log(hasSpace("hello word"));
console.log(hasSpace("helloword"));

const filter = _.curry(function (func, array) {
    return array.filter(func);
});

console.log(filter(hasSpace, ["wlz", "hello wlz"]));

const filterSpace = filter(hasSpace);

console.log(filterSpace(["wlz", "hello wlz"]));

/**
 * 柯里化可以让我们给一个函数传递较少的参数得到一个记住了这些参数的新函数
 * 函数变得更灵活，颗粒度更小
 * 把多元函数变为一元函数成为可能
 * 组合函数产生功能更强大的函数
 * 
 * 个人理解 函数柯里化的目的是函数式编程,提高函数的复用性
 */

// 模拟实现 loadsh 中的 curry

/**
 * 根据传入的实参数量来返回一个函数
 * 实参与形参数量相同时直接返回函数运行结果
 */

function curry(func) {
    // 此处给函数一个名称 在下面会用到
    return function curriedFn(...args) {
        // args.length = 实参 func.length = 形参
        if (args.length < func.length) {
            // 实参小于形参 返回一个传入当前实参后的函数
            return function () {
                // 通过args 获取到上一次的实参 通过arguments 获取到当前实参
                return curriedFn(...args.concat(Array.from(arguments)));
            };
        }
        return func(...args);
    };
}
