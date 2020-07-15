// function makeFn() {
//     let msg = "hello";
//     return function () {
//         console.log(msg);
//     };
// }

// makeFn()();

function once(fn) {
    let done = false;
    return function () {
        if (!done) {
            done = true;
            fn.apply(this, arguments);
        }
    };
}

let pay = once(function (money) {
    console.log(money);
});

pay(53);
