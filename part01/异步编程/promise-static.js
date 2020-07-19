function ajax(url) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseText = "json";
        xhr.onload = function () {
            if (this.status == 200) {
                resolve(this.response);
            } else {
                reject(new Error(this.statusText));
            }
        };
        xhr.send();
    });
}

// Promise.reslove 当使用它包装一个promise时 将返回原本的promise
var promise = ajax("./api/users.json");
var promise2 = Promise.resolve(promise)

console.log(promise === promise2);

// promise.reslove将返回一个状态为fulFilled的promise对象
Promise.resolve('foo').then(res => {
    console.log(res);
})

// 当我们使用Promise.resolve来包装一个具有then方法的对象时 我们可以链式调用then
// 因为在原生promise出来之前有很多类似的第三方库,使用这种方式可以将之转为原生promise对象
Promise.resolve({
    then: function(onFulfilled, onRejected) {
        onFulfilled('foo1')
    }
}).then(res => {
    console.log(res);
})


// Promise.reject 将返回一个状态为reject的promise对象
Promise.reject('foo')
.then(res => {
    console.log(111);
})
.catch(err => {
    console.log('catch', err);
})

/**
 * Promise.all
 * 等待所有promise执行完成才会完成
 * 
 * Promise.race
 * 将会在第一个promise执行完成时完成
 */