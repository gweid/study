// =============================== 数据类型 ===============================

// 数据类型检测
console.log('-----------------数据类型检测----------------');
console.log(typeof 2) // 'number'
console.log(2 instanceof Number) // false
console.log('name'.constructor === String) // true
console.log(Object.prototype.toString.call('name').slice(8, -1) === 'String')

// 判断数组
console.log('-----------------判断数组---------------------')
console.log(Object.prototype.toString.call([]).slice(8, -1) === 'Array') // true
console.log(Array.isArray([])) // true
console.log([] instanceof Array) // true
console.log([].constructor === Array) // true
console.log([].__proto__ === Array.prototype) // true
console.log(Array.prototype.isPrototypeOf([])) // true

// undefined 与 null
console.log('-----------------undefined 与 null---------------------')
console.log(undefined == null) // true
console.log(undefined === null) // false


// typeof NaN
console.log('-----------------typeof NaN----------------------')
console.log(typeof NaN) // 'number'


// isNaN 与 Number.isNaN
console.log('-----------------isNaN 与 Number.isNaN--------------')
console.log(isNaN(10)) // false
console.log(isNaN('10')) // false
console.log(isNaN({})) // true
console.log(isNaN(NaN)) // true

console.log(Number.isNaN(10)) // false
console.log(Number.isNaN('10')) // false
console.log(Number.isNaN({})) // false
console.log(Number.isNaN(NaN)) // true


// Object.is 与 ===
console.log('---------------------Object.is 与 === ------------------')
console.log(Object.is(0, -0)) // false
console.log(Object.is(0, +0)) // true
console.log(Object.is(+0, -0)) // false
console.log(Object.is(NaN, NaN)) // true


// 类型转换
console.log('--------------------类型转换----------------------')
console.log('11' == '11')
console.log(null == undefined)


// 闭包
console.log('--------------------闭包---------------------')
// 这会输出一堆 5
for(var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i)
  })
}

// 改进方法 1
for(let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i)
  })
}
// 改进方法 2
for(var i = 0; i < 5; i++) {
  (function(j) {
    setTimeout(() => {
      console.log(j)
    })
  })(i)
}
// 改进方法 3
for(var i = 0; i < 5; i++) {
  setTimeout((j) => {
    console.log(j)
  }, 0, i)
}

// 继承
console.log('-------------------继承-------------------');

// 借助 call 构造继承
// function Parent() {
//   this.name = 'jack'
// }
// Parent.prototype.getName = function() {
//   return this.name
// }

// function Child() {
//   Parent.call(this)
//   this.age = 18
// }

// const res = new Child()
// console.log(res.name) // jack
// console.log('call 构造继承', res.getName()) // 报错，res.getName is not a function

// 原型链继承
// function Parent() {
//   this.name = 'jack'
// }
// Parent.prototype.getName = function() {
//   return this.name
// }

// function Child() {
//   this.age = 18
// }
// Child.prototype = new Parent()
// Child.prototype.getage = function() {
//   return this.age
// }

// const res = new Child()
// console.log('原型继承', res.getName()) // jack

// 组合继承
// function Parent() {
//   this.name = 'jack'
// }
// Parent.prototype.getName = function() {
//   return this.name
// }

// function Child() {
//   Parent.call(this)
//   this.age = 18
// }
// Child.prototype = new Parent()
// Child.prototype.constructor = Child
// Child.prototype.getAge = function() {
//   return this.name
// }

// const res = new Child()
// console.log('组合继承', res.getName()) // jack

// 寄生组合继承
// function Parent() {
//   this.name = 'jack'
// }
// Parent.prototype.getName = function() {
//   return this.name
// }

// function Child() {
//   Parent.call(this)
//   this.age = 18
// }
// Child.prototype = Object.create(Parent.prototype) // 将`指向父类实例`改为`指向父类原型`
// Child.prototype.constructor = Child
// Child.prototype.getAge = function() {
//   return this.age
// }

// const res = new Child()
// console.log('寄生组合继承', res.getName()) // jack

// class 继承
class Parent {
  constructor(name) {
    this.name = name
  }

  getName() {
    return this.name
  }
}

class Child extends Parent {
  constructor(name, age) {
    super(name)
    this.age = age
  }

  getAge() {
    return this.age
  }
}

const res = new Child('jack', 20)
console.log('class 继承', res.getName()) // jack





// =============================== 常见手写题 ===============================

// 手写 instanceof
// 一直查找左边的 __proto__ 是否与右边的 prototype 相等，直到指向 null
function myInstanceof(left, right) {
  if (typeof left !== 'object' || left === null) return false

  let leftProto = left.__proto__
  let rightPrototype = right.prototype

  while(true) {
    // 没找到，返回 false 并退出循环
    if (leftProto === null) return false
    // 找到，返回 true 并退出循环
    if (leftProto === rightPrototype) return true
    leftProto = leftProto.__proto__
  }
}
console.log('-------------------手写instanceof-----------------')
console.log(myInstanceof('', Array))

// 手写 Object.is
function myIs(x, y) {
  if (x === y) {
    // 运行到 1/x === 1/y 的时候 x 和 y 都为0
    // 但是 1/+0 = +Infinity， 1/-0 = -Infinity, 是不一样的
    return x !== 0 || y !== 0 || 1 / x === 1 / y
  } else {
    // NaN === NaN 是 false, 这是不对的，在这里做一个拦截，x !== x，那么一定是 NaN, y 同理
    // 两个都是 NaN 的时候返回 true
    return x !== x && y !== y
  }
}
console.log('-------------------手写 Object.is-----------------')
console.log(myIs(0, -0)) // false
console.log(myIs(0, +0)) // true
console.log(myIs(+0, -0)) // false
console.log(myIs(NaN, NaN)) // true