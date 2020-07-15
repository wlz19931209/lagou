// forEach实现
function forEach(array, fn) {
    for (let index = 0; index < array.length; index++) {
        fn(array[index]);
    }
}

let arr = [1, 2, 3, 4, 56, 234];

forEach(arr, function (item) {
    console.log(item);
});

// filter实现
function filter(array, fn) {
    let results = [];
    for (let index = 0; index < array.length; index++) {
        if (fn(array[index])) {
            results.push(array[index]);
        }
    }
    return results
}

let arr1 = filter(arr, function (item) {
    return item % 2 == 0;
});

console.log(arr1);
