/**
 * Promise 就是一个类 在执行这个类的时候需要传递一个执行器 执行器会立即执行
 *
 * Promise中有三种状态 pending等待 fulfilled成功 reject失败
 *
 * then需要支持同一对象的多次调用 链式调用
 */
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECT = "reject";

class MyPromise {
    constructor(executor) {
        // 捕获执行器中的错误
        try {
            executor(this.resolve, this.reject);
        } catch (error) {
            this.reject(error);
        }
    }

    status = PENDING; // Promise状态

    value = undefined; // 保存成功之后的值
    successCallback = []; // 保存成功的回调函数 用数组的方式来支持多次调用

    err = undefined; // 保存失败之后的值
    failCallback = []; // 保存失败的回调函数

    resolve = val => {
        if (this.status !== PENDING) return;

        this.value = val;

        this.status = FULFILLED;
        // 判断是否保存有成功后的回调 有就调用
        // this.successCallback && this.successCallback(this.value) // 这种形式不支持多次调用
        while (this.successCallback.length) {
            this.successCallback.shift()(); // 拿到最前面的回调并执行
        }
    };

    reject = err => {
        if (this.status !== PENDING) return;

        this.err = err;

        this.status = REJECT;
        // 判断是否保存有失败后的回调 有就调用
        // this.failCallback && this.failCallback(this.err)
        while (this.failCallback.length) {
            this.failCallback.shift()();
        }
    };

    then = (successCallback, failCallback) => {
        /**
         * 当then中没有回调时 默认增加一个返回自身的回调函数
         * 适配下面的情况
         * promise.then().then().then(value => console.log(value))
         */
        successCallback = successCallback ? successCallback : value => value;
        failCallback = failCallback ? failCallback : err => err;

        var promise2 = new Promise((resolve, reject) => {
            if (this.status === FULFILLED) {
                // 捕获回调中的错误
                try {
                    let x = successCallback(this.value);
                    // 判断 x 的值是普通值还是promise对象
                    // 如果是promise对象 查看promise对象返回的结果
                    // 再根据返回结果调用resolve reject
                    isPromise(promise2, x, resolve, reject);
                } catch (error) {
                    reject(error);
                }
            } else if (this.status === REJECT) {
                try {
                    let x = failCallback(this.err);

                    isPromise(promise2, x, resolve, reject);
                } catch (error) {
                    reject(error);
                }
            } else {
                // 当Promise的执行器是异步时 status将不会同步改变 保存两个回调函数 在执行器调用完成resolve或reject中调用回调函数
                this.successCallback.push(() => {
                    try {
                        let x = successCallback(this.value);
                        isPromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                });
                this.failCallback.push(() => {
                    let x = failCallback(this.err);
                    isPromise(promise2, x, resolve, reject);
                });
            }
        });
        return promise2;
    };


    static all(array) {
        let results = [];
        let index = 0;
        return new MyPromise((resolve, reject) => {
            function addData(key, value) {
                results[key] = value;
                index++;
                // 执行完成所有 resolve出去
                if (index === array.length) {
                    resolve(results);
                }
            }
            for (let i = 0; i < array.length; i++) {
                let current = array[i];
                if (current instanceof MyPromise) {
                    current.then(
                        res => addData(i, res),
                        err => reject(err)
                    );
                } else {
                    addData(i, current);
                }
            }
        });
    }

    static resolve(value) {
        if (value instanceof MyPromise) return value;
        return new Promise(resolve => resolve(value));
    }
}

function isPromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError("Chaining cycle detected for promise #<Promise>"));
    }
    if (x instanceof MyPromise) {
        // x.then(val => resolve(val), err => reject(err))
        x.then(resolve, reject);
    } else {
        resolve(x);
    }
}
/**
 * 异步处理思路
 * 我们不用关心异步代码 在执行器中我们始终会使用resolve或reject来返回值
 * 在调用then时,由于异步的关系stauts状态将会还处于pending,此时我们保存回调函数
 * 我们在resolve或reject函数中判断是否保存了目前状态的回调函数，存在就执行该函数
 * 在执行器执行到resolve或reject语句就会拿到保存的回调函数并执行
 */

module.exports = MyPromise;
