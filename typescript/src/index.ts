//------------------------------------- 基础类型
function greeter(person: string) {
    return "hello world"
}

const user: string = "gweid"

const isLoad: boolean = false

// 函数没有返回值
function warnUser(): void {
    alert("哈哈哈哈")
}

// 只有 undefine 也可以赋值给 void
const a: void = undefined

// Symbol
// const sym = Symbol("title")

// any
let str: any = 4
str = "nihaoaooao1"

// unknown 与 any 的区别
// 我们看到, 这就是 unknown 与 any 的不同之处, 虽然它们都可以是任何类型,
// 但是当 unknown 类型被确定是某个类型之前, 它不能被进行任何操作比如实例化、getter、函数执行等等。
let val: any // true
val = "kkkk" // true
val = 12345 // true
val = true // true
val = {} // true
val = [] // true
// val.foo.name = [] // true
// val[0][1] = [] // true
// val() // true

let val1: unknown
val1 = "kkkk" // true
val1 = 12345 // true
val1 = true // true
val1 = {} // true
val1 = [] // true
// val1.foo.name = []     // false
// val1[0][1] = []        // false
// val1()                 // false

// 数组与元组
// 使用泛类型定义数组
const list: Array<number> = [1, 2, 3]
// 第二种（常用）
const arr: number[] = [1, 2, 3]
arr.push(4)
console.log(arr[3])

// 元组 元组类型与数组类型非常相似，表示一个已知元素数量和类型的数组，各元素的类型不必相同。
const arr1: [string, number] = ["name", 123]
// 元组与数组的不同之处：元组的类型如果多出或者少于规定的类型是会报错的，必须严格跟事先声明的类型一致才不会报错。
// const arr2: [string, number] = ["132", 123, 456] // false
// Typescript 允许向元组中使用数组的 push 方法插入新元素(但不允许访问插入的属性)
const arr3: [string, number] = ["123", 123]
arr3.push("1")
console.log(arr3) // 可以
// console.log(arr3[2]) // 不可以

//-------------------------------------- 枚举
// 枚举是对 js 标准数据类型的补充，声明一组带名字的常量；按照枚举成员的类型可归为两大类：数字枚举类型和字符串枚举类型

// 枚举 值为数字具有正反向映射特性
enum Dd {
    Up = 10,
    aa = "aa",
}
console.log(Dd.Up)
console.log(Dd[10])

// 枚举合并
enum obj {
    a = "a",
    b = "b",
}
enum obj {
    c = "c",
}

// ------------------------------------ 接口(interface)
// 这个接口 User 描述了参数 user 的结构，当然接口不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以。
interface User {
    name: string
    age: number
}
// const getUserName = (user: any) => user.name
const getUserName = (user: User) => user.name

// 可选属性 键值可能存在或者不存在
interface User1 {
    name: string
    age?: number
}

// 只读属性 当确定 user 的性别之后就不允许就改了，interface 可以保证这一点吗？
interface User2 {
    name: string
    age?: number
    readonly isMale: boolean
}
// const setUserMale = (user: User2) => user.isMale = false  // 会报错，不能修改

// 接口内有函数
// 1、直接内部描述
interface User3 {
    name: string
    say: (str: string) => string
}
// 2、外部定义后使用
interface Say {
    (str: string): string
}
interface User4 {
    name: string
    say: Say
}

// 属性检查
interface Config {
    width?: number
}
function getArea(config: Config): { area: Number } {
    let square: number = 0
    if (config.width) {
        square = config.width * config.width
    }

    return { area: square }
}
// 因为需要传入的是 width ，此时传了 height，会报错
// 解决：第一种， 使用断言
let ret: object = getArea({ height: 5 } as Config)
console.log(ret)
// 解决：第二种， 添加字符串索引签名：这样 Config 可以有任意数量的属性，并且只要不是 width，那么就无所谓他们的类型是什么了。
interface Config2 {
    width?: number
    [propName: string]: any
}
function getArea2(config: Config2): { area: number } {
    let square: number = 0
    if (config.width) {
        square = config.width * config.width
    }
    return { area: square }
}
let ret2: Object = getArea2({ height: 10 })
console.log(ret2)
// 除非有万不得已的情况，不建议采用上述方法。

// 可索引类型 比如 email 是一个对象，里面有几个键值对不确定
interface Email {
    [name: string]: string
}
interface Admin {
    name: string
    say: Function
    email: Email
}

// 继承接口
interface VipAdmin extends Admin {
    level: number
}
// 继承多个接口
interface VipAdmin extends User, Admin {
    level: number
}

// ------------------------------------- 函数
// typescript 中函数不需要刻意去定义类型，会根据参数进行类型推断
const add = (a: number, b: number) => a + b

// 函数中的参数
// 可选参数
const add1 = (a: number, b?: number) => a + (b ? b : 0)
// 默认参数
const add2 = (a: number, b: number = 10) => a + b
// 剩余参数
const add3 = (a: number, ...arr: number[]) => arr.push(a)

// 重载(Overload) 就是使用相同的函数名，传入不同数量的参数或不同类型的参数，以此创建出多个方法或产生不同结果。

//-------------------------------------- 类(Class)
// 用 abstract 定义抽象类和在抽象类内部定义抽象方法
abstract class Animal {
    move(): void {
        console.log("move")
    }
}
// 注意： 不能直接实例化抽象类，通常需要我们创建子类继承基类,然后可以实例化子类。
// const animal = new Animal()  // 报错
class Cat extends Animal {}
const cat = new Cat()
cat.move()

// 类的访问限定
// public 公共的 在 TypeScript 的类中，成员都默认为 public, 被此限定符修饰的成员是可以被外部访问。
class Dog {
    public run(): void {
        console.log("run")
    }
}
const dog = new Dog()
dog.run()
// private 私有的 只能类内部访问
class Car {
    private run(): void {
        console.log("run")
    }

    start(): void {
        this.run()
    }
}
const car = new Car()
// car.run() // 报错
car.start()
// protected 受保护的 这种只能类内部使用或者子类访问
class Fruit {
    protected eat(): void {
        console.log("eat")
    }
}
class Bananar extends Fruit {
    eatBan(): void {
        this.eat()
    }
}
const fruit = new Fruit()
// fruit.eat()  // 报错
const bananar = new Bananar()
bananar.eatBan()

// ------------------------------------- 泛型
// 泛型给予开发者创造灵活、可重用代码的能力

// 在函数名称后面声明泛型变量 <T>，用于捕获开发者传入的参数类型，然后就可以使用T做参数类型和返回值类型。
function returnItem<T>(param: T): T {
    return param
}
// 多个
function returnItem2<T, U>(tuple: [T, U]) {
    return [tuple[0], tuple[1]]
}
// 对于数组
function returnArr<T>(arr: Array<T>) {
    console.log(arr.length)
    return arr
}
// 对于类
class Stack<T> {
    private arr: T[] = []

    push(item: T) {
        this.arr.push(item)
    }
}

// 泛型约束(泛型可以是任意类型，但是当知道传入类型，可以做约束)
type Param = number | string

class Stack1<T extends Param> {
    private arr: T[] = []

    push(item: T) {
        this.arr.push(item)
    }
}

const stack1 = new Stack1<string | number>()
// stack1.push({})  // 报错

// 泛型约束2
// function getValue(obj: object, key: string) {
//     return obj[key]  // 报错，说 obj 上不存在 key
// }
// 使用泛型修改
function getValue1<T extends object, U extends keyof T>(obj: T, key: U) {
    return obj[key]
}
getValue1({ name: "jack" }, "name")

//-------------------------------------- 类型断言与类型守卫
// 1、类型断言   有些情况下 TS 并不能正确或者准确得推断类型, 这时可能产生不必要的警告或者报错。
// const person = {}
// person.name = "jack"  // 报错 类型 “{}” 上不存在属性 “name”
// 修改
interface Person {
    name: string
    age: number
}
const person = {} as Person
person.name = "jack"
// 但是类型断言不要滥用, 在万不得已的情况下使用要谨慎, 因为你强制把某类型断言会造成 TypeScript 丧失代码提示的能力。

// 2、类型守卫   说白了就是缩小类型的范围
// instanceof 类型保护是通过构造函数来细化类型的一种方式
// class Person {
//     name = "jack"
//     age = 20
// }
// class Foods {
//     name = "fish"
//     size = 10
// }

// function getSomething(arg: Person | Foods) {
//     if (arg instanceof Person) {
//         console.log(arg.age)
//     }
//     if (arg instanceof Foods) {
//         console.log(arg.size)
//     }
// }

// in 跟上面的例子类似，x in y 表示 x 属性在 y 中存在。
interface Persons {
    name: string
    age: number
}
interface Foods {
    name: string
    size: number
}

function getSomething(arg: Persons | Foods) {
    if ("age" in arg) {
        console.log(arg.age)
    }
    if ("size" in arg) {
        console.log(arg.size)
    }
}

console.log(getSomething({ name: "kkk", age: 2000000 }))

// 字面量类型守卫
type Foo = {
    kind: "foo" // 字面量
    foo: number
}
type Bar = {
    kind: "bar" // 字面量
    bar: "bar"
}
function doStuff(arg: Foo | Bar) {
    if (arg.kind === "foo") {
        console.log(arg.foo)
    }
    if (arg.kind === "bar") {
        console.log(arg.bar)
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
function formatCommandline(param: string[] | string): string {
    let line = ""
    if (typeof param === "string") {
        line = param.trim()
    } else {
        line = param.join("").trim()
    }

    return line
}

// 类型别名     type
type some = boolean | string

// 类型别名可以是泛型
type Container<T> = { value: T }

// 类型别名看起来跟 interface 非常像，interface 只能用于定义对象类型，而 type 的声明方式除了对象之外还可以定义交叉、联合、原始类型等，类型声明的方式适用范围显然更加广泛。
// 对于类型别名的使用： 能用 interface 就用 interface，不能就用 type

// 索引类型

// 映射类型

// 条件类型

// ------------------------------------- 可辨识联合类型
// 字面量类型
// 字面量（Literal Type）主要分为 真值字面量类型（boolean literal types）,数字字面量类型（numeric literal types）,枚举字面量类型（enum literal types）,大整数字面量类型（bigInt literal types）和字符串字面量类型（string literal types）。
const af: 2333 = 2333 // ok
const ab: 0b10 = 2 // ok
const ao: 0o114 = 0b1001100 // ok
const ax: 0x514 = 0x514 // ok
const c: "xiaomuzhu" = "xiaomuzhu" // ok
const d: false = false // ok
// const gf: "github" = "pronhub" // 不能将类型“"pronhub"”分配给类型“"github"”

type Direction = "North" | "East" | "South" | "West"
function move(distance: number, direction: Direction) {}
move(20, "East")

// 类型字面量
// 类型字面量(Type Literal)不同于字面量类型（Literal Type),跟 js 中的对象字面量的语法相似
// type Foo55 = {
//     baz: [number, "xiaomuzhu"]
//     toString(): string
//     readonly [Symbol.iterator]: "github"
//     0x1: "foo"
//     bar: 12n
// }

// 可辨识联合类型
interface Info {
    username: string
}
type UserAction =
    | {
          action: "create"
          info: Info
      }
    | {
          action: "delete"
          id: number
          info: Info
      }
const userReducer = (userAction: UserAction) => {
    switch (userAction.action) {
        case "delete":
            console.log(userAction.id)
            break
        default:
            break
    }
}
// userAction.action 就是辨识的关键, 被称为可辨识的标签

//-------------------------------------- 装饰器
// 装饰器就是在给一个函数拓展额外的功能，本质上也是一个函数
// 类装饰器
function addAge(constructor: Function) {
    constructor.prototype.age = 18
}
@addAge
class Person11 {
    name: string
    age!: string // ! 表示不可能为空值
    constructor() {
        this.name = "jack"
    }
}
const person11 = new Person11()
console.log(person11.age) // 18
// 当装饰器作为修饰类的时候，会把构造器传递进去。 constructor.prototype.age 就是在每一个实例化对象上面添加一个 age 值

// 属性/方法装饰似器
// 有三个参数
// target —— 当前对象的原型，也就是说，假设 Employee 是对象，那么 target 就是 Employee.prototype
// propertyKey —— 方法的名称
// descriptor —— 方法的属性描述符，即 Object.getOwnPropertyDescriptor(Employee.prototype, propertyKey)
function method() {
    console.log("f(): evaluated")
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("f(): called")
    }
}
class C {
    @method()
    say() {
        return "hello"
    }
}

const c1 = new C()
c1.say()
