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
        return Right.of(JSON.parse(str));
    } catch (e) {
        return Left.of({ error: e.message });
    }
}

let r = parseJSON('{"name": "wlz"}').map(v => v.name.toUpperCase());
console.log(r);

/**
 * IO函子
 *
 * IO函子中的_value是一个函数，这里是把函数作为值来处理
 * IO函子可以把不纯的动作存储到_value中，延迟执行这个不纯的操作（惰性执行）
 *
 * 个人理解
 * 利用函数来包裹运算结果
 */

// 使用lodash中的fp模块
const fp = require("lodash/fp");
class IO {
    static of(value) {
        return new IO(function () {
            return value;
        });
    }
    constructor(fn) {
        this._value = fn;
    }

    map(fn) {
        return new IO(fp.flowRight(fn, this._value));
    }

    //  将IO函子进化为 IO Monad函子
    join() {
        return this._value()
    }
    flatMap(fn) {
        return this.map(fn).join()
    }
}

// let rIo = IO.of(process).map(p => p.execPath);
// console.log(rIo._value());
const fs = require('fs')

let readFile = function (filename) {
    return new IO(function () {
        return fs.readFileSync(filename, 'utf-8')
    })
}

let print = function(x) {
    return new IO(function () {
        console.log(x);
        return x
    })
}

// let cat = fp.flowRight(print, readFile)

// let r3 = cat('../package.json')

// IO(IO())
// console.log(r3._value()._value());
// 这种写法没有易读性 如何解决呢

let r3 = readFile('../package.json')
            .map(fp.toUpper) // fp.toUpper 返回的不是函子 不需要join
            .flatMap(print) // print 返回了一个函子 需要join 所以使用flatMap
            .join()
console.log(r3);

/**
 * Monad 函子
 * 解决函子嵌套问题 实现扁平
 * 
 *  一个函子如果具有join 和 of 两个方法并遵守一些定律 那就是一个Monad
 */

