// =============================== 数据类型 ===============================

// 数据类型检测
// console.log('-----------------数据类型检测----------------');
// console.log(typeof 2) // 'number'
// console.log(2 instanceof Number) // false
// console.log('name'.constructor === String) // true
// console.log(Object.prototype.toString.call('name').slice(8, -1) === 'String')


// 判断数组
// console.log('-----------------判断数组---------------------')
// console.log(Object.prototype.toString.call([]).slice(8, -1) === 'Array') // true
// console.log(Array.isArray([])) // true
// console.log([] instanceof Array) // true
// console.log([].constructor === Array) // true
// console.log([].__proto__ === Array.prototype) // true
// console.log(Array.prototype.isPrototypeOf([])) // true


// undefined 与 null
// console.log('-----------------undefined 与 null---------------------')
// console.log(undefined == null) // true
// console.log(undefined === null) // false


// typeof NaN
// console.log('-----------------typeof NaN----------------------')
// console.log(typeof NaN) // 'number'


// isNaN 与 Number.isNaN
// console.log('-----------------isNaN 与 Number.isNaN--------------')
// console.log(isNaN(10)) // false
// console.log(isNaN('10')) // false
// console.log(isNaN({})) // true
// console.log(isNaN(NaN)) // true

// console.log(Number.isNaN(10)) // false
// console.log(Number.isNaN('10')) // false
// console.log(Number.isNaN({})) // false
// console.log(Number.isNaN(NaN)) // true


// Object.is 与 ===
// console.log('---------------------Object.is 与 === ------------------')
// console.log(Object.is(0, -0)) // false
// console.log(Object.is(0, +0)) // true
// console.log(Object.is(+0, -0)) // false
// console.log(Object.is(NaN, NaN)) // true


// 类型转换
// console.log('--------------------类型转换----------------------')
// console.log('11' == '11')
// console.log(null == undefined)


// 闭包
// console.log('--------------------闭包---------------------')
// // 这会输出一堆 5
// for(var i = 0; i < 5; i++) {
//   setTimeout(() => {
//     console.log(i)
//   })
// }

// // 改进方法 1
// for(let i = 0; i < 5; i++) {
//   setTimeout(() => {
//     console.log(i)
//   })
// }
// // 改进方法 2
// for(var i = 0; i < 5; i++) {
//   (function(j) {
//     setTimeout(() => {
//       console.log(j)
//     })
//   })(i)
// }
// // 改进方法 3
// for(var i = 0; i < 5; i++) {
//   setTimeout((j) => {
//     console.log(j)
//   }, 0, i)
// }


// 继承
// console.log('-------------------继承-------------------')

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
// class Parent {
//   constructor(name) {
//     this.name = name
//   }

//   getName() {
//     return this.name
//   }
// }

// class Child extends Parent {
//   constructor(name, age) {
//     super(name)
//     this.age = age
//   }

//   getAge() {
//     return this.age
//   }
// }

// const res = new Child('jack', 20)
// console.log('class 继承', res.getName()) // jack


// this 指向问题
// console.log('-----------------------this 指向--------------------')
// 1、直接调用函数，this 指向 window
// function fun() {
//   console.log(this) // window
// }
// fun()

// 2、当一个函数作为一个对象方法的时候，this 指向这个对象
// const obj = {
//   fun: function() {
//     console.log(this)
//   },
//   func: () => {
//     console.log(this)
//   }
// }
// console.log(obj.fun()) // obj
// console.log(obj.func()) // window

// 3、如果一个函数用 new 调用时，函数执行前会新创建一个对象，this 指向这个新创建的对象
// const a = 'b'
// function Func() {
//   console.log(this.a) // undefined
// }
// const res = new Func()
// res.a = 'a'
// console.log(res) // { a: 'a' }

// 4、使用 call、apply、bind 改变 this 指向
// var name = 'marry'
// const obj = {
//   name: 'jack'
// }

// function fun() {
//   console.log(this.name)
// }

// fun()   // 'marry'
// fun.call(obj) // 'jack'


// Set 集合
// console.log('---------------------------- Set 集合----------------------')
// const s = new Set([1, 2, 3])

// // 属性
// console.log(s)
// console.log(s.size)
// console.log(s.keys())
// console.log(s.values())
// console.log(s.entries())

// // 遍历
// for(let i of s.keys()) {
//   console.log(i)
// }
// for(let i of s.entries()) {
//   console.log(i)
// }

// // 方法
// s.add(4)
// console.log(s)
// s.delete(4)
// console.log(s)
// console.log(s.has(3))
// // s.clear()
// // console.log(s)

// // 转换为数组
// console.log(Array.from(s))
// console.log([...s])


// WeakSet
// console.log('---------------------------WeakSet--------------------------')
// const ws = new WeakSet([[1, 2], [3, 4]])
// console.log(ws)

// // 三个方法
// // 下面这种只能添加，delete 与 has 均无效
// // ws.add([5, 6])
// // console.log(ws)
// // ws.delete([5, 6])
// // console.log(ws)
// // console.log(ws.has([1, 2]))
// // 改：
// const target = [5, 6]
// ws.add(target)
// console.log(ws)
// console.log(ws.has(target))
// ws.delete(target)
// console.log(ws)


// Map 字典
// console.log('---------------------------Map 字典--------------------------')
// const m = new Map()
// m.set('1', 'aa')
// m.set('2', 'bb')
// m.set('1', 'aa') // 验证不可重复

// console.log(m)
// console.log(m.size)
// console.log(m.has('1'))
// m.delete('1')
// console.log(m)
// m.clear()
// console.log(m)

// m.set('1', [1])
// m.set('2', [2])
// console.log(m)
// console.log(m.keys())
// console.log(m.values())
// console.log(m.entries())


// WeakMap
// console.log('---------------------------WeakMap--------------------------')
// const wm = new WeakMap()

// const key = ['1']
// wm.set(key, ['aa'])
// console.log(wm)
// console.log(wm.has(key))
// console.log(wm.get(key))
// wm.delete(key)
// console.log(wm)


// map 转对象
// console.log('-----------------------map 转对象-----------------------')
// const m = new Map()
// m.set('1', 'aa')
// m.set('2', 'bb')

// const obj = {}
// // forEach 是 map 提供的迭代方法
// m.forEach((value, key) => {
//   obj[key] = value
// })
// console.log(obj)


// ajax
// console.log('-----------------------原生 ajax--------------------------')
// // ajax get
// const xhr = new XMLHttpRequest()
// xhr.open('get', '/', true) // true 代表是异步
// xhr.send()
// xhr.onreadystatechange = function() {
//   if (xhr.readyState === 4 && xhr.status === 200) {
//     console.log(xhr.responseText)
//   }
// }

// // ajax post
// const data = {}
// const xhr = new XMLHttpRequest()
// xhr.open('post', '/data', true)
// xhr.setRequestHeader('Content-type', 'application/json')
// xhr.send(data)
// xhr.onreadystatechange = function() {
//   if (xhr.readyState === 4 && xhr.status === 200) {
//     console.log(xhr.responseText)
//   }
// }


// 事件委托
// console.log('--------------------事件委托-----------------------')
// const ulElm = document.querySelector('#ulElm')
// ulElm.onclick = function(e) {
//   e = e || window.event
//   const target = e.target || e.srcElement

//   switch(target.id) {
//     case 'oneLi': 
//       alert(1)
//       break
//     case 'twoLi': 
//       alert(2)
//       break
//     case 'threeLi': 
//       alert(3)
//       break
//   }
// }


// 遍历数组
// console.log('---------------遍历数组------------------')
// for 循环
// const arr = [1, 2, 3]
// for(let i = 0, len = arr.length; i < len; i++) {
//   // if (arr[i] === 1) {
//   //   break
//   // }
//   if (arr[i] === 1) {
//     continue
//   }
//   console.log(i)
// }

// forEach
// const arr = [1, 2, 3]
// arr.forEach((item, index, initArr) => {
//   // item: 数组每一项
//   // index: 数组每一项对应的下标
//   // initArr: 原数组
//   console.log(item);
//   console.log(index);
//   console.log(initArr);
// })

// map
// const arr = [1, 2, 3]
// const newArr = arr.map((item, index, initArr) => {
//   // item: 数组每一项
//   // index: 数组每一项对应的下标
//   // initArr: 原数组
//   return item * 2
// })
// console.log(newArr)

// reduce
// const arr = [1, 2, 3]
// const newArr = arr.reduce((a, b) => {
//   return a + b
// }, 0)
// console.log(newArr)

// filter
// const arr = [1, 2, 3]
// const newArr = arr.filter(item => {
//   return item >= 2
// })
// console.log(newArr) // [2, 3]

// find 与 findIndex
// const arr = [1, 2, 3]
// const res = arr.find(item => {
//   return item === 2
// })
// console.log(res) // 2

// const resIdx = arr.findIndex(item => {
//   return item === 1
// })
// console.log(resIdx) // 0

// some
// const arr = [1, 2, 3]
// arr.some(item => {
//   if (item === 2) {
//     return true
//   } else {
//     console.log(item)
//     return false
//   }
// })

// every
// const arr = [1, 2, 3]
// arr.every(item => {
//   if (item === 2) {
//     return false
//   } else {
//     console.log(item)
//     return true
//   }
// })


// 判断是否在数组里
// console.log('-----------------------判断是否在数组里-------------------')
// const arr = [1, 2, 3]
// // 找到，返回对一个的下标，找不到，返回 -1
// console.log(arr.indexOf(1))
// // 找到，返回 true，找不到，返回 false
// console.log(arr.includes(1))
// // 找到，返回对应的值，只找第一个匹配的，找不到，返回 undefined
// console.log(arr.find(item => item === 1))
// // 找到，返回对应的下标，只找第一个匹配的，找不到，返回 -1
// console.log(arr.findIndex(item => item === 1))


// 数组去重
// console.log('-------------------------数组去重---------------------------')
// es6 的 Set
// const arr = [1, 2, 3, 2, 1]
// const res = [...new Set(arr)]
// console.log(res)

// es5 遍历去重
// const arr = [1, 2, 3, 2, 1]
// function unique(arr) {
//   const res = []
//   arr.forEach(item => {
//     if (!res.includes(item)) {
//       res.push(item)
//     }
//   })
//   return res
// }
// console.log(unique(arr))


// 扁平化数组
// console.log('-----------------------扁平化数组------------------------')
// flat 方法
// const arr = [[1, 2], 3, [4, [5, 6]]]
// const res = arr.flat(Infinity) // 里面是数字，数字是多少，就扁平化多少层，Infinity 代表无穷
// console.log(res)

// 递归方法
// function flatFun(arr) {
//   let res = []
//   arr.forEach(item => {
//     if (Array.isArray(item)) {
//       res = res.concat(flatFun(item))
//     } else {
//       res.push(item)
//     }
//   })
//   return res
// }
// const arr = [[1, 2], 3, [4, [5, 6]]]
// console.log(flatFun(arr))

// reduce 方法
// function flatFun(arr) {
//   const res = arr.reduce((a, b) => {
//     return a.concat(Array.isArray(b) ? flatFun(b) : b)
//   }, [])

//   return res
// }

// const arr = [[1, 2], 3, [4, [5, 6]]]
// console.log(flatFun(arr))


// 获取 url 参数
// function paramUrl(url) {
//   const str = url.split('?')[1]
//   const arr = str.split('&')

//   const res = {}
//   arr.forEach(item => {
//     const resArr = item.split('=')
//     res[resArr[0]] = resArr[1]
//   })
//   return res
// }

// const url = 'http://item.taobao.com/item.html?a=1&b=2&c=&d=xxx&e'
// console.log(paramUrl(url))


// 防抖节流
// console.log('------------------------防抖节流----------------------------')
// 防抖：
//  - 是指在一定时间内，在动作被连续频繁触发的情况下，动作只会被执行一次
//  - 也就是说当调用动作过 n 毫秒后，才会执行该动作
//  - 若在这 n 毫秒内又调用此动作则将重新计算执行时间，所以短时间内的连续动作永远只会触发一次
// function debounce(fn, delay) {
//   let timeId = null
//   const args = arguments
//   const that = this

//   return function() {
//     if (timeId !== null) clearTimeout(timeId)

//     timeId = setTimeout(() => {
//       fn.apply(that, args)
//     }, delay)
//   }
// }

// const debounceBtn = document.querySelector('.debounceBtn')
// function clickFun() {
//   console.log('防抖函数')
// }
// debounceBtn.addEventListener('click', debounce(clickFun, 1500))

// 节流函数
//  - 是指一定时间内执行的操作只执行一次
//  - 也就是说即预先设定一个执行周期，当调用动作的时刻大于等于执行周期则执行该动作，然后进入下一个新周期
//  - 一个比较形象的例子是如果将水龙头拧紧直到水是以水滴的形式流出，那你会发现每隔一段时间，就会有一滴水流出
// function throttle(fn, delay) {
//   let timeId = null
//   const args = arguments
//   const that = this

//   return function() {
//     if (!timeId) {
//       timeId = setTimeout(() => {
//         fn.apply(that, args)
//         timeId = null
//       }, delay)
//     }
//   }
// }

// const throttleBtn = document.querySelector('.throttleBtn')
// function clickFun() {
//   console.log('节流函数')
// }
// throttleBtn.addEventListener('click', throttle(clickFun, 1500))


// 柯里化
// console.log('------------------------柯里化--------------------------')
// function curry(fn) {
//   // 获取原函数参数长度
//   const len = fn.length
//   // 保留预置参数
//   const args = [...arguments].slice(1)

//   // 返回一个函数
//   return function() {
//     // 新函数调用时会继续传参
//     const subArgs = [...arguments]
//     const allArgs = [...args, ...subArgs]
//     if (allArgs.length >= len) {
//       // 如果参数够了，就执行原函数
//       return fn.apply(this, allArgs)
//     } else {
//       // 否则，继续柯里化
//       return curry.call(null, fn, ...allArgs)
//     }
//   }
// }

// function fn(a, b, c) {
//   return a + b + c;
// }
// const add = curry(fn)
// console.log(add(1, 2, 3))
// console.log(add(1)(2)(3))


// 发布订阅
// console.log('---------------------发布订阅----------------------')
/**
 * 1、什么是发布订阅模式
 *    发布-订阅模式其实是一种对象间一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到状态改变的通知
 *
 * 2、怎么实现一对多
 *    既然一对多 肯定有一个事件调度中心用来调度事件 订阅者可以注册事件（on）到调度中心 发布者可以发布事件（emit）到调度中心 订阅者也可以 取消订阅（off）或者只订阅一次（once）
 */
// class EventEmitter {
//   constructor() {
//     this.events = {}
//   }

//   on(type, callback) {
//     if (!this.events[type]) {
//       this.events[type] = [callback]
//     } else {
//       this.events[types].push(callback)
//     }
//   }

//   emit(type, params) {
//     this.events[type] && this.events[type].forEach(cb => cb(params))
//   }

//   off(type, callback) {
//     if (!this.events[type]) return
//     if (callback) {
//       this.events[type] = this.events[type].filtter(cb => cb !== callback)
//     } else {
//       this.events[type] = []
//     }
//   }

//   once(type, callback) {
//     function fn(params) {
//       callback(params)
//       this.off(type, fn)
//     }
//     this.on(type, fn)
//   }
// }


// 实现 JSONP
function jsonp(url, params, callback) {
  params = {
    ...params,
    callback
  }

  const str = params.keys().map(item => {
    return `${item}=${params[item]}`
  }).join('&')

  const requireStr = `${url}?${str}`

  const script = document.createElement('script')
  script.setAttribute('src', requireStr)
  document.body.appendChild(script)
}

jsonp({
  url: 'http://www.xxxxx.com',
  params: {
    name: 'jack'
  },
  callback(res) {
    console.log(res);
  }
})




// =============================== 常见手写题 ===============================

// 手写 instanceof
// console.log('-------------------手写instanceof-----------------')
// 一直查找左边的 __proto__ 是否与右边的 prototype 相等，直到指向 null
// function myInstanceof(left, right) {
//   if (typeof left !== 'object' || left === null) return false

//   let leftProto = left.__proto__
//   let rightPrototype = right.prototype

//   while(true) {
//     // 没找到，返回 false 并退出循环
//     if (leftProto === null) return false
//     // 找到，返回 true 并退出循环
//     if (leftProto === rightPrototype) return true
//     leftProto = leftProto.__proto__
//   }
// }
// console.log(myInstanceof('', Array))


// 手写 Object.is
// console.log('-------------------手写 Object.is-----------------')
// function myIs(x, y) {
//   if (x === y) {
//     // 运行到 1/x === 1/y 的时候 x 和 y 都为0
//     // 但是 1/+0 = +Infinity， 1/-0 = -Infinity, 是不一样的
//     return x !== 0 || y !== 0 || 1 / x === 1 / y
//   } else {
//     // NaN === NaN 是 false, 这是不对的，在这里做一个拦截，x !== x，那么一定是 NaN, y 同理
//     // 两个都是 NaN 的时候返回 true
//     return x !== x && y !== y
//   }
// }

// console.log(myIs(0, -0)) // false
// console.log(myIs(0, +0)) // true
// console.log(myIs(+0, -0)) // false
// console.log(myIs(NaN, NaN)) // true

// 手写 Object.create
// console.log('-------------------手写 Object.create-----------------')
// 步骤：
//  1.创建一个临时性的构造函数
//  2.将传入的对象作为这个构造函数的原型
//  3.最后返回了这个临时类型的一个新实例
// function myCreate(proto) {
//   function F() {}
//   F.prototype = proto
//   return new F()
// }
// console.log(myCreate({ name: 'jack' }))


// 手写 new
// console.log('----------------------手写 new---------------------------')
// new 做了什么
//  1. 创建一个对象
//  2. 将对象的 __proto__ 属性指向构造函数的 prototype 属性
//  3. 将构造函数中的 this 指向该对象，并为这个对象添加属性和方法
//  4. 返回这个对象
// function myNew() {
//   // 第一步，创建一个对象
//   const obj = {}

//   // 将对象的 __proto__ 指向构造函数的 prototype
//   const Con = [].shift.call(arguments) // 拿到第一个参数，就是构造函数
//   obj.__proto__ = Con.prototype

//   // 将构造函数的 this 指向这个对象，并为这个对象添加属性和方法
//   const res = Con.apply(obj, arguments)

//   // 最后，返回这个对象
//   return typeof ret === 'object' ? ret : obj
// }
// function Dog(name, age) {
//   this.name = name
//   this.age = age
// }
// let dog = myNew(Dog, '汪', '2')
// console.log('手写new', dog.name)


// 手写 call：1、更改this指向    2、函数立刻执行
// console.log('-----------------------手写 call----------------------')
// // fun.call(xxx, args1, args2, ...)
// Function.prototype.myCall = function (context) {
//   if (typeof this !== 'function') {
//     throw new Error('type error')
//   }

//   // 没有传值，则 context 指向 window
//   context = context || window

//   // 因为是 fun.call(xxx)，这个 this 就是 fun
//   context.fn = this

//   // arguments 是一个类数组，并不是真正的数组，没有数组的方法，所以需要 [...arguments] 转换为数组
//   // arguments 第一个参数是 context, 后面是其余参数; 主要是取出其余参数
//   const args = [...arguments].slice(1)

//   // 执行函数
//   let res = context.fn(...args)

//   delete context.fn

//   return res
// }

// const obj = {
//   value: 'aaaa',
// }
// function func(name) {
//   return {
//     value: this.value,
//     name,
//   }
// }
// console.log('手写call：', func.myCall(obj, 'myCall'))


// 手写 apply：与 call 基本一致，只是参数传递不同而已
// console.log('-----------------------手写 apply----------------------')
// fun.apply(xx, ['jack'])
// Function.prototype.myApply = function(context, args) {
//   context = context || window
//   context.fn = this
//   let res
//   if (!args) {
//     res = context.fn()
//   } else {
//     res = context.fn(...args)
//   }
//   delete context.fn
//   return res
// }

// const obj = {
//   value: 'aaaa',
// }
// function func(name, age) {
//   return {
//     value: this.value,
//     name,
//     age
//   }
// }
// console.log('手写apply：', func.myApply(obj, ['myCall', 20]))


// 手写 bind：返回一个函数  1、指定this；2、返回一个函数；3、传递参数并柯里化
// console.log('-----------------------手写 bind----------------------')
// // const res = fun.bind(xxx)
// // res(args) 返回的函数还可以接受参数
// Function.prototype.myBind = function (context) {
//   // 判断调用 bind 是不是函数
//   if (typeof this !== 'function') {
//     throw new Error('不是一个函数')
//   }

//   const _this = this
//   // arguments 第一个参数是 context, 后面是其余参数; 主要是取出其余参数
//   const args = [...arguments].slice(1)

//   return function () {
//     // 主要就是 bind 可以接收参数, 返回的函数也可以接收参数, 并且从第一位开始就是参数，所以 args.concat([...arguments])
//     return _this.apply(context, args.concat([...arguments]))
//   }
// }

// const obj = {
//   value: 'aaaa'
// }
// function func(name, age) {
//   return {
//     value: this.value,
//     name,
//     age
//   }
// }
// const res = func.bind(obj, 'name')
// console.log(res(20))


// 实现深拷贝
// console.log('---------------------------深拷贝-----------------------')
// function checkType(val) {
//   return Object.prototype.toString.call(val).slice(8, -1)
// }

// function deepClone(source) {
//   let res
//   if (checkType(source) === 'Object') {
//     res = {}
//   } else if (checkType(source) === 'Array') {
//     res = []
//   } else {
//     res = source
//   }

//   for (let key in source) {
//     let value = source[key]
//     if (['Object', 'Array'].includes(checkType(value))) {
//       res[key] = deepClone(value)
//     } else {
//       res[key] = value
//     }
//   }

//   return res
// }

// let obj = {
//   a: '222',
//   b: {
//     name: 'jaja',
//   }
// }
// let cloneRet = deepClone(obj)
// cloneRet.b.name = '333'
// console.log('深拷贝：', cloneRet.b)
// console.log('原数据：', obj.b)


// 斐波那契数列
// console.log('------------------------斐波那契数列--------------------------')
// 1, 1, 2, 3, 5, 8, 13,...求第 n 个的值
// function fib(n) {
//   const obj = {}

//   function fibSub(n) {
//     if (n <= 0) return
//     if (n === 1 || n === 2) {
//       obj[n] = 1
//       return 1
//     }
//     if(!obj[n]) {
//       obj[n] = fibSub(n - 2) + fibSub(n - 1)
//     }
//     return obj[n]
//   }

//   return fibSub(n)
// }

// console.log(fib(100))

// 对于频繁增加读取，使用 map 字典性能更优
// function fib(n) {
//   const resMap = new Map()

//   function fibSub(n) {
//     if (n < 0) return
//     if (n === 1 || n === 2) {
//       resMap.set(n, 1)
//       return 1
//     }
//     if (!resMap.has(n)) {
//       resMap.set(n, fibSub(n - 2) + fibSub(n - 1))
//     }
//     return resMap.get(n)
//   }

//   return fibSub(n)
// }

// console.log(fib(10000))


// 冒泡排序
// console.log('---------------------冒泡排序--------------------------')
// 基本原理：相邻两个两两相互比较，复杂度 O(n^2)
// 从小到大排序，每一轮外层循环都是将最大的往最后移动
// 也就是，第一轮过后，最后面一个肯定是最大的
// function bubbleSort(arr) {
//   const len = arr.length
//   for(let i = 0; i < len - 1; i++) {
//     for(let j = 0; j < len - i - 1; j++) {
//       if (arr[j] > arr[j + 1]) {
//         [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
//       }
//     }
//   }

//   return arr
// }

// const arr = [5, 2, 6, 4, 9, 8, 1]
// console.log(bubbleSort(arr))

// 优化冒泡排序
// function bubbleSort(arr) {
//   const len = arr.length

//   for(let i = 0; i < len - 1; i++) {
//     let flag = true
//     for(let j = 0; j < len - i - 1; j++) {
//       if (arr[j] > arr[j + 1]) {
//         [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
//         flag = false
//       }
//     }

//     // 这个 flag 的含义是：如果`某次循环`中没有交换过元素，那么意味着排序已经完成
//     if (flag) break
//   }

//   return arr
// }

// const arr = [5, 2, 6, 4, 9, 8, 1]
// console.log(bubbleSort(arr))


// 快速排序
// console.log('---------------------快速排序-----------------------')
// 基本原理   复杂度 O(nlog(n))
// 1）在数据集之中，选择一个元素作为"基准"（pivot）。
// 2）所有小于"基准"的元素，都移到"基准"的左边；所有大于"基准"的元素，都移到"基准"的右边。
// 3）对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。
// function quickSort(arr) {
//   if (arr.length <= 1) return arr

//   let flag = Math.floor(arr.length / 2)
//   let target = arr.splice(flag, 1)[0]

//   let left = []
//   let right = []

//   for (let i = 0, len = arr.length; i < len; i++) {
//     if (arr[i] < target) {
//       left.push(arr[i])
//     } else {
//       right.push(arr[i])
//     }
//   }

//   return quickSort(left).concat([target], quickSort(right))
// }
// const arr = [5, 2, 6, 4, 9, 8, 1]
// console.log(quickSort(arr))


// 选择排序
// console.log('------------------------选择排序-------------------------')
// 基本原理   复杂度 O(n^2)
//  每一次从待排序的数组元素中选择最大(最小)的一个元素作为首元素,直到排完为止
//  1. 有 n 个数,需要排序 n-1, n - 1 次，所以内循环是 for(let j = i)
//  2. 第一次选择最小值,放在第一位
//  3. 第二次选择最小值,放在第二位
//  4. 第 n-1 次选择最小值,放在第 n-1 位
// function selectSort(arr) {
//   const len = arr.length

//   for(let i = 0; i < len - 1; i++) {
//     let idx = i
//     for(let j = i; j < len; j++) {
//       if (arr[i] > arr[j]) {
//         idx = j
//       }
//     }
//     if (idx !== i) {
//       [arr[i], arr[idx]] = [arr[idx], arr[i]]
//     }
//   }

//   return arr
// }

// const arr = [5, 2, 6, 4, 9, 8, 1]
// console.log(selectSort(arr))
