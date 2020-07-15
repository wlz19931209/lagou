let arr = [
    { id: 1, value: 1 },
    { id: 2, value: 2 },
    { id: 3, value: 4 },
    { id: 5, value: 6 },
    { id: 6, value: 7 },
];

const map = (array, fn) => {
    let results = [];
    for (const value of array) {
        results.push(fn(value));
    }
    return results;
};

// arr = map(arr, v => v.value * v.value)
// console.log(arr);

const every = (array, fn) => {
    let result = true
    for (const value of array) {
        result = fn(value)
        if (!result) return false
    }
    return result
}

let res = every(arr, v => v.value < 8)
console.log(res);

