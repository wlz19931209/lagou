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

/**
 * 生成器函数相比普通函数多了一个 *
 * 调用生成器函数时 将不会立即去执行该函数 而是得到一个生成器对象
 * 直到我们调用函数的next方法才会开始调用函数体
 *
 * 在函数内部随时使用yield关键字返回一个值
 * 在返回对象中可以拿到这个值 且会有一个done字段表明生成器是否全部执行完毕
 * 使用yield不会像return一样立即结束函数的执行，而是会暂停生成器的执行
 * 再次调用生成器对象的next后将会在暂停的位置继续向下执行,在next中传递参数时
 * 参数将作为yield语句的返回值
 *
 * 调用生成器的throw时会对生成器内部手动抛出一个异常
 * 通过try catch捕获异常
 */
// function * foo () {
//     console.log('start');
//     try {
//         const res = yield 'foo'
//         console.log(res);
//     } catch (error) {
//         console.log(error);
//     }
// }

// const generator = foo()

// const result = generator.next()
// console.log(result);

// const result1 = generator.next('bar')
// console.log(result1);
// const result2 = generator.throw(new Error('Generator error'))

// generator 配合 Promise 的异步方案

function* main() {
    try {
        const users = yield ajax("./api/users.json"); // 在then中的g.next将返回值赋予users
        console.log(users);

        const posts = yield ajax("./api/users.json");
        console.log(posts);

        const users1 = yield ajax("./api/users1.json");
        console.log(users1);
    } catch (error) {
        console.log(error);
    }
}

const g = main();

// const result3 = g.next();
// result3.value.then(res => {
//     const result4 = g.next(res);

//     if (result4.done) return;

//     result4.value.then(res => {
//         const result5 = g.next(res);

//         if (result5.done) return;

//         result5.value.then(res => {
//             g.next(res);
//         });
//     });
// });

// 使用递归改写上面的代码
// function handleResult(result) {
//     if (result.done) return;
//     result.value.then(
//         res => {
//             handleResult(g.next(res));
//         },
//         error => {
//             g.throw(error);
//         }
//     );
// }
// const result3 = g.next();
// handleResult(result3);

// 封装一个直接执行生成器的函数
function co(generator) {
    const g = generator()
    function handleResult(result) {
        if (result.done) return;
        result.value.then(
            res => {
                handleResult(g.next(res));
            },
            error => {
                g.throw(error);
            }
        );
    }
    handleResult(g.next())
}

co(main)