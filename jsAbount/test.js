// ------------------------------- 数据类型

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


// ------------------------------ 常见手写题

// 手写 instanceof
// 一直查找左边的 __proto__ 是否与右边的 prototype 相等，直到指向 null
function myInstanceof(left, right) {
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
console.log('------------------- 手写instanceof-----------------')
console.log(myInstanceof('', Array))

