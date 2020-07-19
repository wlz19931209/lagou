const promise = new Promise((resovle, reject) => {
    // resovle(100)

    reject(new Error('promise reject'))
})

promise.then(val => {
    console.log(val);
}, err => {
    console.log('rejected', err);
})

console.log('end');