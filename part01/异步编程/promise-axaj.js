// promise封装ajax
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

var promise = ajax("./api/users.json");
// .then(res => {
//     console.log(res);
// }, err => {
//     console.log(err);
// })

// promise链式调用
// var promise2 = promise.then(
//     val => {
//         console.log(val);
//     },
//     err => {
//         console.log(err);
//     }
// );

// console.log(promise2); // 由此可见 promise.then方法将返回一个全新的promise对象

// 链式调用案例
// ajax("./api/users.json")
//     .then(res => {
//         console.log(JSON.parse(res));
//         console.log(1);
//         return ajax("./api/users.json");
//     })
//     .then(res => {
//         console.log(res);
//         console.log(2);
//         return ajax("./api/users.json");
//     })
//     .then(res => {
//         console.log(res);
//         console.log(3);
//         return ajax("./api/users.json");
//     })
//     .then(res => {
//         console.log(res);
//         console.log(4);
//         return ajax("./api/users.json");
//     });

// 在then中捕获异常和使用catch捕获异常在链式调用中的区别

// ajax("./api/users.json")
//     .then(res => {
//         return ajax("./api/users1.json"); // 在第二个pormise上的异常将无法被第一个promise在then中的rejected函数所捕获
//     },err => {
//         console.log(err);
//     })

ajax("./api/users.json")
    .then(res => {
        console.log(1);
        return ajax("./api/users.json");
    })
    .then(res => {
        console.log(2);
        return ajax("./api/users1.json");
    })
    .then(res => {
        console.log(3);
        return ajax("./api/users.json");
    })
    // 使用catch的方式可以捕获到之后promise中的异常
    .catch(err => {
        console.log('err');
        console.log(err);
    });

    /**
     * catch更像是捕获整个pomise链条上的所有异常
     */