const _ = require('loadsh')

function getSum(a, b, c) {
    return a + b + c;
}

const curried = _.curry(getSum)

console.log(curried(1,2,3));
console.log(curried(1)(2,3));
console.log(curried(1)(2)(3));

