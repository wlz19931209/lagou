/**
 * functor
 * 一个特殊的容器，通过一个普通的对象来实现
 * 该对象具有map方法，map方法可以运行一个函数对值进行处理
 *
 */

// class Container {
//     constructor(value) {
//         this._value = value;
//     }
//     map(fn) {
//         return new Container(fn(this._value));
//     }
// }

// let a = new Container(5)
//             .map(x => x + 1)
//             .map(x => x * x)

// console.log(a);

// 在函数式编程中要尽量规避new关键字 修改上述代码
class Container {
    static fo(value) {
        return new Container(value);
    }
    constructor(value) {
        this._value = value;
    }
    map(fn) {
        return Container.fo(fn(this._value));
    }
}

let a = Container.fo(5)
    .map(x => x + 2)
    .map(x => x * x);

console.log(a);

/**
 * MayBe 函子
 * 处理空值
 */

class MayBe {
    static of(value) {
        return new MayBe(value);
    }
    constructor(value) {
        this._value = value;
    }
    map(fn) {
        return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this._value));
    }

    isNothing() {
        return this._value === null || this._value === undefined;
    }
}

let b = MayBe.of(null).map(v => v.toUpperCase());

console.log(b);

/**
 * either
 * 处理异常
 */

class Left {
    static of(value) {
        return new Left(value);
    }
    constructor(value) {
        this._value = value;
    }
    map(fn) {
        return this;
    }
}

class Right {
    static of(value) {
        return new Right(value);
    }
    constructor(value) {
        this._value = value;
    }
    map(fn) {
        return Right.of(fn(this._value));
    }
}

let r1 = Right.of(11).map(v => v + 2);
let l1 = Left.of(11).map(v => v + 2);
console.log(r1, l1);

function parseJSON(str) {
    try {
        return Right.of(JSON.parse(str))
    } catch (e) {
        return Left.of({error: e.message})
    }
}

let r = parseJSON('{"name": "wlz"}')
        .map(v => v.name.toUpperCase())
console.log(r);

/**
 * IO函子
 * 
 * IO函子中的_value是一个函数，这里是把函数作为值来处理
 * IO函子可以把不纯的动作存储到_value中，延迟执行这个不纯的操作（惰性执行）
 */