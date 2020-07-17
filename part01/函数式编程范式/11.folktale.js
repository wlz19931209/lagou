/**
 * folktale
 * 一个标准的函数式编程库
 *  和lodash,ramda不同的是他没有提供很多的功能函数
 *      例如： forEach filter toUpeerCase
 *  只提供了易写函数式处理的操作
 *      例如：组合compose 柯里化curry 函子 Task Either MayBe等
 */

const { compose, curry } = require("folktale/core/lambda");

let f = curry(2, (x, y) => {
    return x + y;
});

console.log(f(1, 2));
console.log(f(1)(2));

/**
 * Task 函子
 * 处理异步任务
 */

const { task } = require("folktale/concurrency/task");
const fs = require("fs");
const { split, find } = require("lodash/fp");

function readFile(filename) {
    return task(resolve => {
        fs.readFile(filename, "utf-8", (err, data) => {
            if (err) resolve.reject(err);

            resolve.resolve(data);
        });
    });
}

readFile("../package.json")
    .map(split("\n"))
    .map(find(x => x.includes("version")))
    .run()
    .listen({
        onRejected: err => {
            console.log(err);
        },
        onResolved: val => {
            console.log(val);
        },
    });

/**
 * Pointed 函子
 * 就是实现了of静态方法的函子
 *
 *      class Container {
 *          static of (value) {
 *              return new Container(value)
 *          }
 *      ...
 *      }
 */
