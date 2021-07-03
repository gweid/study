// ---------------------------------------------闭包
// 特点：
// 1.函数嵌套函数
// 2.内部函数使用外部函数的参数和变量
// 3.参数和变量不会被垃圾回收机制回收
// 优点：
// 1.形成沙箱，避免环境污染
// 2.变量长期保存, 函数内部可以访问另一个函数内部的变量
// 缺点：
// 1.内存长期驻用，增加内存用量，使用不当会导致内存泄漏

// function test() {
//     let ad = "哈哈"
//     return function () {
//         return ad
//     }
// }
// let ret = test()()
// console.log(ret);

//----------------------------------------------ajax
// ajax  get
// const xhr = new XMLHttpRequest()
// xhr.open('get', '/', true)
// xhr.send()
// xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//         console.log(xhr.responseText);
//     }
// }
// // ajax  post
// let data = {}
// const xhr = new XMLHttpRequest()
// xhr.open('POST', 'api/user', true)
// xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // post 请求需要带请求头
// xhr.send(data)
// xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//         console.log(xhr.responseText);
//     }
// }
// readyState
// 0: 请求未初始化
// 1: 服务器连接已建立
// 2: 请求已接收
// 3: 请求处理中
// 4: 请求已完成，且响应已就绪

//---------------------------------------------事件委托
// 事件委托是利用事件的冒泡原理来实现的
// let ul = document.querySelector("#ulList")
// console.log(ul);

// ul.onclick = function (e) {
//     e = e || window.event
//     let target = e.target || e.srcElement

//     if (target.nodeName.toLocaleLowerCase() == 'li') {
//         switch (target.id) {
//             case "add":
//                 alert("add")
//                 break;
//             case "del":
//                 alert("del")
//                 break;
//             case "put":
//                 alert("put")
//                 break;
//             case "get":
//                 alert("get")
//                 break;
//         }
//     }
// }
// 此时，新增的元素是没有事件的，这只要在新加的元素的时候，给父元素添加事件就可以了

// --------------------------------------------- target 和 currentTarget
// target 是事件触发的真实元素
// currentTarget 是事件绑定的元素

// --------------------------------------------- js 继承
// 1、原型链继承    缺点：所有 Child 实例原型都指向同一个 Parent 实例, 父类引用类型变量修改会影响所有的 Child 实例
// function SuperType() {
//     this.name = "jack"
// }
// SuperType.prototype.getName = function () {
//     return this.name
// }

// function SubType() {
//     this.age = "18"
// }
// SubType.prototype = new SuperType()
// SubType.prototype.getAge = function () {
//     return this.age
// }

// var type = new SubType()
// console.log(type.getName());

// 2、借用构造继承
// function SuperType() {
//     this.name = "jack"
// }
// SuperType.prototype.getName = function () {
//     return this.name
// }

// function SubType() {
//     SuperType.call(this);
// }

// var type = new SubType()
// console.log(type.name);
// console.log(type.getName()); // 报错：访问不到父类原型上的

// 3、组合继承(就是结合原型链继承和借用构造继承)   缺点：每次创建子类实例都执行了两次构造函数 (SuperType.call()和new Parent())，虽然这并不影响对父类的继承，但子类创建实例时，原型中会存在两份相同的属性和方法，这并不优雅
// function SuperType(name) {
//     this.name = name
// }
// SuperType.prototype.getName = function () {
//     return this.name
// }

// function SubType(name, age) {
//     SuperType.call(this, name)
//     this.age = age
// }
// SubType.prototype = new SuperType()
// SubType.prototype.constructor = SubType
// SubType.prototype.getAge = function () {
//     return this.age
// }

// var type = new SubType('jack', 20)
// console.log(type.getName());
// console.log(type.getAge());

// 4、寄生组合式继承

// function SuperType(name) {
//     this.name = name
// }
// SuperType.prototype.getName = function () {
//     return this.name
// }

// function SubType(name, age) {
//     SuperType.call(this, name)
//     this.age = age
// }

// SubType.prototype = Object.create(SuperType.prototype)  //将`指向父类实例`改为`指向父类原型`
// SubType.prototype.constructor = SubType

// SubType.prototype.getAge = function () {
//     return this.age
// }

// var type = new SubType('jack', 24)
// console.log(type.getAge());
// console.log(type.getName());

// 5、ES6 继承
// class SuperType {
//     constructor(name) {
//         this.name = name
//     }

//     getName() {
//         return this.name
//     }
// }

// class SubType extends SuperType {
//     constructor(name, age) {
//         super(name)
//         this.age = age
//     }

//     getAge() {
//         return this.age
//     }
// }

// var type = new SubType('jack', 25)
// console.log(type.getAge());
// console.log(type.getName());

// ------------------------------------------ this 的指向
// 在 ES5 中，其实 this 的指向，始终坚持一个原理：this 永远指向最后调用它的那个对象
// var name = "windowsName";

// function fn() {
//     var name = 'Cherry';
//     innerFunction();
//     function innerFunction() {
//         console.log(this.name);      // windowsName
//     }
// }

// fn()

// ---------------------------------------- 阻止事件冒泡
// 在W3c中，使用stopPropagation()方法；在IE下设置cancelBubble = true

// ---------------------------------------- 事件的各个阶段
// 1：捕获阶段 ---> 2：目标阶段 ---> 3：冒泡阶段

// ---------------------------------------- new 做了什么
// 1、创建一个对象
// 2、将对象的 __proto__ 属性指向构造函数的 prototype 属性
// 3、将构造函数中的 this 指向该对象，并为这个对象添加属性和方法
// 4、返回这个对象

// ---------------------------------------- 排序算法
// 冒泡排序  前后两个两两对比
// function bubbleSort(arr = [], flag = true) {
//   let len = arr.length
//   for (let i = 0; i < len; i++) {
//     for (let j = 0; j < len - i - 1; j++) {
//       if (flag) {
//         // 小到大
//         if (arr[j] >= arr[j + 1]) {
//           ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
//         }
//       } else {
//         if (arr[j] <= arr[j + 1]) {
//           ;[arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
//         }
//       }
//     }
//   }

//   return arr
// }

// console.log('冒泡排序', bubbleSort([1, 5, 4, 9, 2, 11, 8, 7], true))

// 优化冒泡排序
// function bubbleSort1(arr) {
//   for (var i = 0; i < arr.length; i++) {
//     let flag = true

//     for (var j = 0; j < arr.length - i - 1; j++) {
//       if (arr[j] > arr[j + 1]) {
//         flag = false
//         ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
//       }
//     }

//     // 这个flag的含义是：如果`某次循环`中没有交换过元素，那么意味着排序已经完成
//     if (flag) break
//   }

//   return arr
// }

// console.log('优化冒泡排序', bubbleSort1([1, 5, 4, 9, 2, 11, 8, 7]))

// 选择排序  找到数据结构中的最小值并将其放置在第一位, 接着找到第二个最小值并将其放到第二位, 依次类推.
// function selectSort(arr) {
//   let len = arr.length
//   let idx
//   for (let i = 0; i < len - 1; i++) {
//     idx = i
//     for (let j = i; j < len; j++) {
//       if (arr[idx] > arr[j]) {
//         idx = j
//       }
//     }
//     if (i !== idx) {
//       ;[arr[i], arr[idx]] = [arr[idx], arr[i]]
//     }
//   }

//   return arr
// }
// console.log('选择排序', selectSort([1, 5, 4, 9, 2, 11, 8, 7]))

// 快速排序
// 1）在数据集之中，选择一个元素作为"基准"（pivot）。
// 2）所有小于"基准"的元素，都移到"基准"的左边；所有大于"基准"的元素，都移到"基准"的右边。
// 3）对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。
// function quickSort(arr) {
//   if (arr.length <= 1) return arr

//   // 先选取一个基准
//   let pivotIdx = Math.floor(arr.length / 2)
//   let pivot = arr.splice(pivotIdx, 1)[0]

//   let left = []
//   let right = []
//   for (let i = 0, len = arr.length; i < len; i++) {
//     if (arr[i] < pivot) {
//       left.push(arr[i])
//     } else {
//       right.push(arr[i])
//     }
//   }

//   return quickSort(left).concat([pivot], quickSort(right))
// }
// console.log('快速排序', quickSort([1, 5, 4, 9, 2, 11, 8, 7]))

// 斐波那契数列  1, 1, 2, 3, 5, 8, 13,...
// function fib(n) {
//   let obj = {}

//   function fibFn(n) {
//     if (n <= 0) return
//     if (n == 1 || n == 2) {
//       obj[n] = 1
//       return 1
//     }

//     if (!obj[n]) {
//       obj[n] = fibFn(n - 2) + fibFn(n - 1)
//     }
//     return obj[n]
//   }

//   return fibFn(n)
// }
// console.log('斐波那契', fib(100))

// ---------------------------------------- js 操作 DOM
// var app = document.querySelector("#app")
// var p = document.createElement("p")
// p.innerHTML = "创建p"
// app.appendChild(p)
// var p1 = document.querySelector("#p1")
// app.removeChild(p1)
// var p2 = document.querySelector("#p2")
// var p3 = document.createElement("p")
// p3.innerHTML = "p3"
// app.insertBefore(p3, p2)

// ---------------------------------------- 数组去重
// es6
// let arr = [1, 2, 3, 2, 3, 4, 5]
// let newArr = [...new Set(arr)]
// console.log('new Set数组去重', newArr)

// // es5
// function unique(arr) {
//   let newArr = []
//   for (let i = 0, len = arr.length; i < len; i++) {
//     if (newArr.indexOf(arr[i]) === -1) {
//       newArr.push(arr[i])
//     }
//   }
//   return newArr
// }
// console.log('indexOf数组去重', unique(arr))

// --------------------------------------- 防抖、节流
// 防抖： 函数防抖（debounce）是指在一定时间内，在动作被连续频繁触发的情况下，动作只会被执行一次，也就是说当调用动作过n毫秒后，才会执行该动作，若在这n毫秒内又调用此动作则将重新计算执行时间，所以短时间内的连续动作永远只会触发一次。
// function debounce(fn, delay) {
//   let timeId = null
//   let args = arguments
//   let that = this

//   return function () {
//     if (timeId !== null) clearTimeout(timeId)

//     timeId = setTimeout(() => {
//       fn.apply(that, args)
//     }, delay)
//   }
// }

// let debounceButton = document.querySelector('.debounce')
// let clickFn = function () {
//   console.log('防抖')
// }
// debounceButton.addEventListener('click', debounce(clickFn, 1500))

// 节流: 函数节流是指一定时间内执行的操作只执行一次，也就是说即预先设定一个执行周期，当调用动作的时刻大于等于执行周期则执行该动作，然后进入下一个新周期，一个比较形象的例子是如果将水龙头拧紧直到水是以水滴的形式流出，那你会发现每隔一段时间，就会有一滴水流出。
// function throttle(fn, delay) {
//   let timeId = null
//   let args = arguments
//   let that = this

//   return function () {
//     if (!timeId) {
//       timeId = setTimeout(() => {
//         fn.apply(that, args)
//         timeId = null
//       }, delay)
//     }
//   }
// }

// let throttleButton = document.querySelector('.throttle')
// let clickFn1 = function () {
//   console.log('节流')
// }
// throttleButton.addEventListener('click', throttle(clickFn1, 1500))

// ---------------------------------------- 获取 url 参数
// let url = 'http://item.taobao.com/item.html?a=1&b=2&c=&d=xxx&e'

// function paramUrl(url) {
//   let ret = url.split('?')[1]
//   let params = ret.split('&')

//   let obj = {}
//   params.forEach((item) => {
//     let kv = item.split('=')
//     obj[kv[0]] = kv[1]
//   })

//   return obj
// }

// console.log('url参数：', paramUrl(url))

// ---------------------------------------- 深拷贝
// function deepClone(source) {
//   if (typeof source !== 'object') return source

//   let res = source instanceof Array ? [] : {}

//   for (let key in source) {
//     let value = source[key]
//     if (source.hasOwnProperty(key)) {
//       res[key] = typeof value === 'object' ? deepClone(value) : value
//     }
//   }

//   return res
// }

// function checkType(val) {
//   return Object.prototype.toString.call(val).slice(8, -1)
// }

// function deepClone(source) {
//   let ret
//   if (checkType(source) === 'Object') {
//     ret = {}
//   } else if (checkType(source) === 'Array') {
//     ret = []
//   } else {
//     return source
//   }

//   for (let key in source) {
//     let value = source[key]
//     if (checkType(value) === 'Object' || checkType(source) === 'Array') {
//       ret[key] = deepClone(value)
//     } else {
//       ret[key] = value
//     }
//   }

//   return ret
// }

// let obj = {
//   a: '222',
//   b: {
//     name: 'jaja',
//   },
// }
// let cloneRet = deepClone(obj)
// cloneRet.b.name = '333'
// console.log('深拷贝：', cloneRet.b)
// console.log('原数据：', obj.b)

// ----------------------------------------- 手写 call、bind、apply、new
// call  1、更改this指向    2、函数立刻执行
// Function.prototype.myCall = function (context) {
//   // 没有传值，则 context 指向 window
//   context = context || window

//   context.fn = this

//   // arguments 是一个类数组，并不是真正的数组，没有数组的方法，所以需要 [...arguments] 转换为数组
//   // arguments 第一个参数是 context, 后面是其余参数; 主要是取出其余参数
//   const args = [...arguments].slice(1)

//   let ret = context.fn(...args)

//   delete context.fn

//   return ret
// }

// let testObj = {
//   value: 'aaaa',
// }

// function fntest(name, age) {
//   return {
//     value: this.value,
//     name,
//     age,
//   }
// }

// console.log('手写call：', fntest.myCall(testObj, 'myCall', 20))

// apply  apply 跟 call 一样，只是传递的参数不一样
// Function.prototype.myApply = function (context, args) {
//   context = context || window

//   context.fn = this

//   let ret = ''

//   // 判断有没有传入 args
//   if (!args) {
//     ret = context.fn()
//   } else {
//     ret = context.fn(args)
//   }

//   delete context.fn

//   return ret
// }

// let testObj1 = {
//   value: 'bbbb',
// }

// function fntest1(name, age) {
//   return {
//     value: this.value,
//     name,
//     age,
//   }
// }

// console.log('手写apply：', fntest1.myApply(testObj1, ['myApply', 22]))

// bind  返回一个函数  1、指定this；2、返回一个函数；3、传递参数并柯里化
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

// 手写 new
// 首先 new 做了什么
//  1、创建一个对象
//  2、将对象的 __proto__ 属性指向构造函数的 prototype 属性
//  3、将构造函数中的 this 指向该对象，并为这个对象添加属性和方法
//  4、返回这个对象
// function myNew() {
//   // 创建一个对象 o
//   let obj = {}
//   // 把第一个参数取出来,这里是 Dognew
//   let Con = [].shift.call(arguments)
//   // 令空对象的 proto 指向构造函数 M 的 prototype
//   obj.__proto__ = Con.prototype
//   // 令构造函数 M 中的 this 指针指向 o，使得 o 具有 M 的属性或方法(上面已经通过 [].shift.call(arguments) 将第一项取出，所以后面的都是参数)
//   let ret = Con.apply(obj, arguments)
//   // 返回这个对象
//   return typeof ret === 'object' ? ret : obj
// }

// function Dognew(name, age) {
//   this.name = name
//   this.age = age
// }
// let dognew = myNew(Dognew, '汪', '2')
// console.log('手写new', dognew.name)

// --------------------------------------- 手写 instanceof
// 一直查找左边的 __proto__ 是否与右边的 prototype 相等， 直到指向 null
// function myInstanceof(left, right) {
//   let leftProto = left.__proto__
//   let rightProto = right.prototype

//   // 一直执行，知道 return
//   while (true) {
//     // 如果
//     if (leftProto === null) {
//       return false
//     }
//     if (leftProto === rightProto) {
//       return true
//     }
//     leftProto = leftProto.__proto__
//   }
// }
// console.log('手写instanceof', myInstanceof([1, 2, 3], Array))

// --------------------------------------- 手写 Object.create
// Object.create() 会将参数对象作为一个新创建的空对象的原型, 并返回这个空对象
// function myCreate(proto) {
//   function F() {}
//   F.prototype = proto
//   return new F()
// }

// console.log('手写Object.create：', myCreate(null))

// --------------------------------------- 手写 Array.prototype.map

// function myMap(arr, mapCallback) {
//   // 首先，检查传递的参数是否正确。
//   if (!Array.isArray(arr) || !arr.length || typeof mapCallback !== 'function') {
//     return []
//   } else {
//     let result = []
//     // 每次调用此函数时，我们都会创建一个 result 数组
//     // 因为我们不想改变原始数组。
//     for (let i = 0, len = arr.length; i < len; i++) {
//       // 将 mapCallback 返回的结果 push 到 result 数组中
//       result.push(mapCallback(arr[i], i, arr))
//     }
//     return result
//   }
// }

// --------------------------------------- 手写 Array.prototype.filter

// function myFilter(arr, filterCallback) {
//   // 首先，检查传递的参数是否正确。
//   if (!Array.isArray(arr) || !arr.length || typeof filterCallback !== 'function') {
//     return []
//   } else {
//     let result = []
//     // 每次调用此函数时，我们都会创建一个 result 数组
//     // 因为我们不想改变原始数组。
//     for (let i = 0, len = arr.length; i < len; i++) {
//       // 检查 filterCallback 的返回值是否是真值
//       if (filterCallback(arr[i], i, arr)) {
//         // 如果条件为真，则将数组元素 push 到 result 中
//         result.push(arr[i])
//       }
//     }
//     return result // return the result array
//   }
// }

// --------------------------------------- 手写 Array.prototype.reduce

// function myReduce(arr, reduceCallback, initialValue) {
//   // 首先，检查传递的参数是否正确。
//   if (!Array.isArray(arr) || !arr.length || typeof reduceCallback !== 'function') {
//     return []
//   } else {
//     // 如果没有将 initialValue 传递给该函数，我们将使用第一个数组项作为 initialValue
//     let hasInitialValue = initialValue !== undefined
//     let value = hasInitialValue ? initialValue : arr[0]

//     // 如果有传递 initialValue，则索引从 1 开始，否则从 0 开始
//     for (let i = hasInitialValue ? 0 : 1, len = arr.length; i < len; i++) {
//       value = reduceCallback(value, arr[i], i, arr)
//     }
//     return value
//   }
// }

// --------------------------------------- 手写 EventEmitter (发布订阅模式--简单版)
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

//   // 实现订阅
//   on(type, callback) {
//     if (!this.events) {
//       this.events = Object.create(null)
//     }

//     if (!this.events[type]) {
//       this.events[type] = [callback]
//     } else {
//       this.events[type].push(callback)
//     }
//   }

//   // 发布
//   emit(type, params) {
//     if (!['String', 'Object', 'Undefined'].includes(checkType(params))) {
//       throw new Error('参数必须是字符串或者对象或者不传')
//     }

//     this.events[type] && this.events[type].forEach((cb) => cb(params))
//   }

//   // 删除订阅
//   off(type, callback) {
//     if (!this.events[type]) return
//     this.events[type] = this.events[type].filter((item) => {
//       return item !== callback
//     })
//   }

//   // 只执行一次订阅
//   once(type, callback) {
//     function fn(params) {
//       callback(params)
//       this.off(type, fn)
//     }

//     this.on(type, fn)
//   }
// }

// let event = new EventEmitter()

// function eventCb(data) {
//   console.log('手写发布订阅：', data)
// }
// event.on('click', eventCb)
// event.emit('click', {
//   name: 'jack',
// })
// event.emit('click', {
//   age: 18,
// })

// event.off('click', eventCb)
// event.emit('click', {
//   like: 'car',
// })

// --------------------------------------- js 垃圾回收机制
/**
 * 利用浏览器渲染页面的空闲时间进行垃圾回收
 * 1、原理：执行环境会找出那些不再继续使用的变量，然后释放其占用的内存。
 * 2、js 垃圾回收的策略
 *    - 标记清除：垃圾收集器先给内存中所有对象加上标记，然后从根节点开始遍历，去掉被引用的对象和运行环境中对象的标记，剩下的被标记的对象就是无法访问的等待回收的对象
 *    - 引用计数：就是跟踪每个值被引用的次数；给一个变量赋值引用类型，则该对象的引用次数+1，如果这个变量变成了其他值，那么该对象的引用次数-1，垃圾回收器会回收引用次数为0的对象。但是当对象循环引用时，会导致引用次数永远无法归零，造成内存无法释放。
 * 3、Js 垃圾回收，分为栈内存和堆内存。栈内存是函数执行完之后就会回收。而堆内存才会进行标记清除
 * 4、js 中管理内存的建议：尽量少用全局变量   尽可能手动清除变量的引用
 */

// --------------------------------------- js 数组常用循环方法
// 1、forEach: 循环，没有返回值，为 undefined
// const forEachArr = [1, 2, 3]
// forEachArr.forEach((item, index, initArr) => {
//   // item: 数组每一项
//   // index: 数组每一项对应的下标
//   // initArr: 原数组
//   console.log(item);
//   console.log(index);
//   console.log(initArr);
// })

// 2、map: 循环，返回一个新数组，不会影响原来数组，只是将原来数组拷贝一份，把拷贝的进行更改，只是链式调用
// 例子1：将数组 A 的每一项乘以二再返回
// const listA = [1, 2, 3]

// const listB = listA.map((item, index, initArr) => {
//   // item: 数组每一项
//   // index: 数组每一项对应的下标
//   // initArr: 原数组
//   return item * 2
// })
// console.log(listB);   // [2, 4, 6]

// 例子2：返回数组 A 的每一项的 name，组成数组
// const listA = [{
//   name: 'jack',
//   age: 20
// }, {
//   name: 'lusy',
//   age: 22
// }, {
//   name: 'mark',
//   age: 21
// }]

// const listB = listA.map((item) => {
//   return item.name
// })
// console.log(listB);   // ["jack", "lusy", "mark"]

// 3、filter: 过滤，返回匹配的结果为 true 的项, 结果为数组，支持链式调用
// const listA = [{
//   name: 'jack',
//   age: 20
// }, {
//   name: 'lusy',
//   age: 22
// }, {
//   name: 'mark',
//   age: 20
// }]

// const listB = listA.filter((item) => {
//   return item.age === 20
// })
// console.log(listB);

// 4、find: 找到数组中的某一项,当找到第一个，就不会继续往下找了，找不到，返回 undefined; findIndex: 找到数组中某一项的下标，当找到第一个，就不会继续往下找了
// const listA = [{
//   name: 'jack',
//   age: 20
// }, {
//   name: 'lusy',
//   age: 22
// }, {
//   name: 'mark',
//   age: 20
// }]

// const res1 = listA.find((item) => {
//   return item.age === 20
// })
// console.log(res1);
// const idx = listA.findIndex((item) => {
//   return item.age === 20
// })
// console.log(idx);

// reduce：累加器，参数: 接收两个参数，一个为回调函数，另一个为初始值。回调函数中三个默认参数，依次为积累值、当前值、整个数组
// array.reduce((accumulator, currentValue, currentIndex, array) => {
//   // accumulator: 数组每一段的累加值
//   // currentValue: 当前值
//   // currentIndex: 当前索引
//   // array: 原数组
// }, startValue)  // startValue: 初始累积值, 比如 [1, 2, 3] 求和，如果初始值为 1，则最后结果为 1 + 1 + 2 + 3 = 7

// // 求和
// const arrA = [1, 2, 3]
// const res2 = arrA.reduce((a, b, c) => {
//   return a + b
// })
// console.log(res2); // 6

// 扁平化一个二维数组
// const arrB = [
//   [1, 2], 3, [4]
// ]
// const res2 = arrB.reduce((a, b) => {
//   return a.concat(b)
// }, [])
// console.log(res2);

// 将数组转换为对象
// const arrC = [{
//   id: 1,
//   name: 'jack',
//   age: 20
// }, {
//   id: 2,
//   name: 'lusy',
//   age: 21
// }]

// const res5 = arrC.reduce((a, b) => {
//   console.log(a);

//   return {...a, [b.id]: b};
// }, {})
// console.log(res5);

// --------------------------------------- 数组扁平
// ES6 的 flat

// let flatArr = [1, 2, [4, 5], [[6, 7], 8]]

// let flatArrRet = flatArr.flat(Infinity)
// console.log('ES6扁平化数组', flatArrRet)

// // 递归
// function flatFun(arr) {
//   let res = []

//   arr.forEach((item) => {
//     if (Array.isArray(item)) {
//       res = res.concat(flatFun(item))
//     } else {
//       res.push(item)
//     }
//   })

//   return res
// }
// console.log('递归扁平化数组', flatFun(flatArr))


// ---------------------------- 如何渲染几万条数据并不卡住界面
// setTimeout(() => {
//   // 假设有 10000 条数据
//   const total = 10000
//   // 每次渲染 20 条
//   const once = 20
//   // 一共需要渲染几次
//   const pages = Math.ceil(total / once) 

//   // 渲染计数
//   let countRender = 0

//   // 获取需要插入的元素
//   const ulElm = document.querySelector('.ulElm')

//   function add() {
//     const fragment = document.createDocumentFragment()

//     for (let i = 0; i < once; i++) {
//       const liElm = document.createElement('li')
//       liElm.innerHtml = '哈哈哈哈哈哈哈'
//       fragment.appendChild(liElm)
//     }

//     ulElm.appendChild(fragment)

//     countRender += 1
//     console.log(countRender)

//     if (countRender < pages) {
//       window.requestAnimationFrame(add)
//     }
//   }

//   add()
// })