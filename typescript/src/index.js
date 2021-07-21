var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//------------------------------------- 基础类型
function greeter(person) {
    return "hello world";
}
var user = "gweid";
var isLoad = false;
// 函数没有返回值
function warnUser() {
    alert("哈哈哈哈");
}
// 只有 undefine 也可以赋值给 void
var a = undefined;
// Symbol
// const sym = Symbol("title")
// any
var str = 4;
str = "nihaoaooao1";
// unknown 与 any 的区别
// 我们看到, 这就是 unknown 与 any 的不同之处, 虽然它们都可以是任何类型,
// 但是当 unknown 类型被确定是某个类型之前, 它不能被进行任何操作比如实例化、getter、函数执行等等。
var val; // true
val = "kkkk"; // true
val = 12345; // true
val = true; // true
val = {}; // true
val = []; // true
// val.foo.name = [] // true
// val[0][1] = [] // true
// val() // true
var val1;
val1 = "kkkk"; // true
val1 = 12345; // true
val1 = true; // true
val1 = {}; // true
val1 = []; // true
// val1.foo.name = []     // false
// val1[0][1] = []        // false
// val1()                 // false
// 数组与元组
// 使用泛类型定义数组
var list = [1, 2, 3];
// 第二种（常用）
var arr = [1, 2, 3];
arr.push(4);
console.log(arr[3]);
// 元组 元组类型与数组类型非常相似，表示一个已知元素数量和类型的数组，各元素的类型不必相同。
var arr1 = ["name", 123];
// 元组与数组的不同之处：元组的类型如果多出或者少于规定的类型是会报错的，必须严格跟事先声明的类型一致才不会报错。
// const arr2: [string, number] = ["132", 123, 456] // false
// Typescript 允许向元组中使用数组的 push 方法插入新元素(但不允许访问插入的属性)
var arr3 = ["123", 123];
arr3.push("1");
console.log(arr3); // 可以
// console.log(arr3[2]) // 不可以
//-------------------------------------- 枚举
// 枚举是对 js 标准数据类型的补充，声明一组带名字的常量；按照枚举成员的类型可归为两大类：数字枚举类型和字符串枚举类型
// 枚举 值为数字具有正反向映射特性
var Dd;
(function (Dd) {
    Dd[Dd["Up"] = 10] = "Up";
    Dd["aa"] = "aa";
})(Dd || (Dd = {}));
console.log(Dd.Up);
console.log(Dd[10]);
// 枚举合并
var obj;
(function (obj) {
    obj["a"] = "a";
    obj["b"] = "b";
})(obj || (obj = {}));
(function (obj) {
    obj["c"] = "c";
})(obj || (obj = {}));
// const getUserName = (user: any) => user.name
var getUserName = function (user) { return user.name; };
function getArea(config) {
    var square = 0;
    if (config.width) {
        square = config.width * config.width;
    }
    return { area: square };
}
// 因为需要传入的是 width ，此时传了 height，会报错
// 解决：第一种， 使用断言
var ret = getArea({ height: 5 });
console.log(ret);
function getArea2(config) {
    var square = 0;
    if (config.width) {
        square = config.width * config.width;
    }
    return { area: square };
}
var ret2 = getArea2({ height: 10 });
console.log(ret2);
// ------------------------------------- 函数
// typescript 中函数不需要刻意去定义类型，会根据参数进行类型推断
var add = function (a, b) { return a + b; };
// 函数中的参数
// 可选参数
var add1 = function (a, b) { return a + (b ? b : 0); };
// 默认参数
var add2 = function (a, b) {
    if (b === void 0) { b = 10; }
    return a + b;
};
// 剩余参数
var add3 = function (a) {
    var arr = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        arr[_i - 1] = arguments[_i];
    }
    return arr.push(a);
};
// 重载(Overload) 就是使用相同的函数名，传入不同数量的参数或不同类型的参数，以此创建出多个方法或产生不同结果。
//-------------------------------------- 类(Class)
// 用 abstract 定义抽象类和在抽象类内部定义抽象方法
var Animal = /** @class */ (function () {
    function Animal() {
    }
    Animal.prototype.move = function () {
        console.log("move");
    };
    return Animal;
}());
// 注意： 不能直接实例化抽象类，通常需要我们创建子类继承基类,然后可以实例化子类。
// const animal = new Animal()  // 报错
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Cat;
}(Animal));
var cat = new Cat();
cat.move();
// 类的访问限定
// public 公共的 在 TypeScript 的类中，成员都默认为 public, 被此限定符修饰的成员是可以被外部访问。
var Dog = /** @class */ (function () {
    function Dog() {
    }
    Dog.prototype.run = function () {
        console.log("run");
    };
    return Dog;
}());
var dog = new Dog();
dog.run();
// private 私有的 只能类内部访问
var Car = /** @class */ (function () {
    function Car() {
    }
    Car.prototype.run = function () {
        console.log("run");
    };
    Car.prototype.start = function () {
        this.run();
    };
    return Car;
}());
var car = new Car();
// car.run() // 报错
car.start();
// protected 受保护的 这种只能类内部使用或者子类访问
var Fruit = /** @class */ (function () {
    function Fruit() {
    }
    Fruit.prototype.eat = function () {
        console.log("eat");
    };
    return Fruit;
}());
var Bananar = /** @class */ (function (_super) {
    __extends(Bananar, _super);
    function Bananar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bananar.prototype.eatBan = function () {
        this.eat();
    };
    return Bananar;
}(Fruit));
var fruit = new Fruit();
// fruit.eat()  // 报错
var bananar = new Bananar();
bananar.eatBan();
// ------------------------------------- 泛型
// 泛型给予开发者创造灵活、可重用代码的能力
// 在函数名称后面声明泛型变量 <T>，用于捕获开发者传入的参数类型，然后就可以使用T做参数类型和返回值类型。
function returnItem(param) {
    return param;
}
// 多个
function returnItem2(tuple) {
    return [tuple[0], tuple[1]];
}
// 对于数组
function returnArr(arr) {
    console.log(arr.length);
    return arr;
}
// 对于类
var Stack = /** @class */ (function () {
    function Stack() {
        this.arr = [];
    }
    Stack.prototype.push = function (item) {
        this.arr.push(item);
    };
    return Stack;
}());
var Stack1 = /** @class */ (function () {
    function Stack1() {
        this.arr = [];
    }
    Stack1.prototype.push = function (item) {
        this.arr.push(item);
    };
    return Stack1;
}());
var stack1 = new Stack1();
// stack1.push({})  // 报错
// 泛型约束2
// function getValue(obj: object, key: string) {
//     return obj[key]  // 报错，说 obj 上不存在 key
// }
// 使用泛型修改
function getValue1(obj, key) {
    return obj[key];
}
getValue1({ name: "jack" }, "name");
var person = {};
person.name = "jack";
function getSomething(arg) {
    if ("age" in arg) {
        console.log(arg.age);
    }
    if ("size" in arg) {
        console.log(arg.size);
    }
}
console.log(getSomething({ name: "kkk", age: 2000000 }));
function doStuff(arg) {
    if (arg.kind === "foo") {
        console.log(arg.foo);
    }
    if (arg.kind === "bar") {
        console.log(arg.bar);
    }
}
//-------------------------------------- 高级类型
// 交叉类型     交叉类型是将多个类型合并为一个类型。 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。
// interface IAnyObj {
//     [prop: string]: any
// }
// function mixin<T extends IAnyObj, U extends IAnyObj>(first: T, second: U): T & U {
//     const ret = <T & U>{}
//     for (let id in first) {
//         ;(<T>ret)[id] = first[id]
//     }
//     for (let id in second) {
//         if (!ret.hasOwnPropery(id)) {
//             ;(<U>ret)[id] = second[id]
//         }
//     }
//     return ret
// }
// const x = mixin({ a: "a" }, { b: "b" })
// 联合类型     使用 | 作为标记
function formatCommandline(param) {
    var line = "";
    if (typeof param === "string") {
        line = param.trim();
    }
    else {
        line = param.join("").trim();
    }
    return line;
}
// 类型别名看起来跟 interface 非常像，interface 只能用于定义对象类型，而 type 的声明方式除了对象之外还可以定义交叉、联合、原始类型等，类型声明的方式适用范围显然更加广泛。
// 对于类型别名的使用： 能用 interface 就用 interface，不能就用 type
// 索引类型
// 映射类型
// 条件类型
// ------------------------------------- 可辨识联合类型
// 字面量类型
// 字面量（Literal Type）主要分为 真值字面量类型（boolean literal types）,数字字面量类型（numeric literal types）,枚举字面量类型（enum literal types）,大整数字面量类型（bigInt literal types）和字符串字面量类型（string literal types）。
var af = 2333; // ok
var ab = 2; // ok
var ao = 76; // ok
var ax = 0x514; // ok
var c = "xiaomuzhu"; // ok
var d = false; // ok
function move(distance, direction) { }
move(20, "East");
var userReducer = function (userAction) {
    switch (userAction.action) {
        case "delete":
            console.log(userAction.id);
            break;
        default:
            break;
    }
};
// userAction.action 就是辨识的关键, 被称为可辨识的标签
//-------------------------------------- 装饰器
// 装饰器就是在给一个函数拓展额外的功能，本质上也是一个函数
// 类装饰器
function addAge(constructor) {
    constructor.prototype.age = 18;
}
var Person11 = /** @class */ (function () {
    function Person11() {
        this.name = "jack";
    }
    Person11 = __decorate([
        addAge
    ], Person11);
    return Person11;
}());
var person11 = new Person11();
console.log(person11.age); // 18
// 当装饰器作为修饰类的时候，会把构造器传递进去。 constructor.prototype.age 就是在每一个实例化对象上面添加一个 age 值
// 属性/方法装饰似器
// 有三个参数
// target —— 当前对象的原型，也就是说，假设 Employee 是对象，那么 target 就是 Employee.prototype
// propertyKey —— 方法的名称
// descriptor —— 方法的属性描述符，即 Object.getOwnPropertyDescriptor(Employee.prototype, propertyKey)
function method() {
    console.log("f(): evaluated");
    return function (target, propertyKey, descriptor) {
        console.log("f(): called");
    };
}
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.say = function () {
        return "hello";
    };
    __decorate([
        method()
    ], C.prototype, "say");
    return C;
}());
var c1 = new C();
c1.say();
