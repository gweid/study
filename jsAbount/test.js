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