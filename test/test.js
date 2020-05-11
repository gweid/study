// ---------------------------------------------闭包
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
// XHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // post 请求需要带请求头
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
//     let target = e.target || e.srcElemen

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

// --------------------------------------------- js 继承
// 1、原型链继承
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

// 3、组合继承(就是结合原型链继承和借用构造继承)
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
// function inheritPrototype(subType, superType) {
//     var prototype = Object.create(superType.prototype) // 创建对象，创建父类原型的一个副本
//     prototype.constructor = subType // 增强对象，弥补因重写原型而失去的默认的constructor 属性
//     subType.prototype = prototype // 指定对象，将新创建的对象赋值给子类的原型
// }

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

// inheritPrototype(SubType, SuperType)

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
// 2、把 this 指向这个对象
// 3、赋值
// 4、返回 this

// ---------------------------------------- 排序算法
// 冒泡排序  前后两个两两对比
function bubbleSort(arr = [], flag = true) {
  let len = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (flag) {
        // 小到大
        if (arr[j] >= arr[j + 1]) {
          ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        }
      } else {
        if (arr[j] <= arr[j + 1]) {
          ;[arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
        }
      }
    }
  }

  return arr
}
console.log('冒泡排序', bubbleSort([1, 5, 4, 9, 2, 11, 8, 7], true))

// 选择排序  找到数据结构中的最小值并将其放置在第一位, 接着找到第二个最小值并将其放到第二位, 依次类推.
function selectSort(arr) {
  let len = arr.length
  let idx
  for (let i = 0; i < len - 1; i++) {
    idx = i
    for (let j = i; j < len; j++) {
      if (arr[idx] > arr[j]) {
        idx = j
      }
    }
    if (i !== idx) {
      ;[arr[i], arr[idx]] = [arr[idx], arr[i]]
    }
  }

  return arr
}
console.log('选择排序', selectSort([1, 5, 4, 9, 2, 11, 8, 7]))

// 快速排序
// 1）在数据集之中，选择一个元素作为"基准"（pivot）。
// 2）所有小于"基准"的元素，都移到"基准"的左边；所有大于"基准"的元素，都移到"基准"的右边。
// 3）对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。
function quickSort(arr) {
  if (arr.length <= 1) return arr

  // 先选取一个基准
  let pivotIdx = Math.floor(arr.length / 2)
  let pivot = arr.splice(pivotIdx, 1)[0]

  let left = []
  let right = []
  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }

  return quickSort(left).concat([pivot], quickSort(right))
}
console.log('快速排序', quickSort([1, 5, 4, 9, 2, 11, 8, 7]))

// 斐波那契数列
function fib(n) {
  let obj = {}

  function fibFn(n) {
    if (n <= 0) return
    if (n == 1 || n == 2) {
      obj[n] = 1
      return 1
    }

    if (!obj[n]) {
      obj[n] = fibFn(n - 2) + fibFn(n - 1)
    }
    return obj[n]
  }

  return fibFn(n)
}
console.log('斐波那契', fib(100))

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
let arr = [1, 2, 3, 2, 3, 4, 5]
let newArr = [...new Set(arr)]
console.log('new Set数组去重', newArr)

// es5
function unique(arr) {
  let newArr = []
  for (let i = 0, len = arr.length; i < len; i++) {
    if (newArr.indexOf(arr[i]) === -1) {
      newArr.push(arr[i])
    }
  }
  return newArr
}
console.log('indexOf数组去重', unique(arr))

// --------------------------------------- 防抖、节流
// 防抖： 函数防抖（debounce）是指在一定时间内，在动作被连续频繁触发的情况下，动作只会被执行一次，也就是说当调用动作过n毫秒后，才会执行该动作，若在这n毫秒内又调用此动作则将重新计算执行时间，所以短时间内的连续动作永远只会触发一次。
function debounce(fn, delay) {
  let timeId = null

  return function () {
    if (timeId !== null) clearTimeout(timeId)

    let _this = this
    let args = arguments

    timeId = setTimeout(function () {
      fn.apply(_this, args)
    }, delay)
  }
}

let debounceButton = document.querySelector('.debounce')
let clickFn = function () {
  console.log('1111111')
}
debounceButton.addEventListener('click', debounce(clickFn, 1500))

// 节流: 函数节流是指一定时间内执行的操作只执行一次，也就是说即预先设定一个执行周期，当调用动作的时刻大于等于执行周期则执行该动作，然后进入下一个新周期，一个比较形象的例子是如果将水龙头拧紧直到水是以水滴的形式流出，那你会发现每隔一段时间，就会有一滴水流出。
function throttle(fn, time) {
  let timeId = null

  return function () {
    let _this = this
    let args = arguments

    if (!timeId) {
      timeId = setTimeout(function () {
        fn.apply(_this, args)
        timeId = null
      }, time)
    }
  }
}

let throttleButton = document.querySelector('.throttle')
let clickFn1 = function () {
  console.log('2222222')
}
throttleButton.addEventListener('click', throttle(clickFn1, 1500))

// ---------------------------------------- 获取 url 参数
let url = 'http://item.taobao.com/item.html?a=1&b=2&c=&d=xxx&e'

function paramUrl(url) {
  let ret = url.split('?')[1]
  let params = ret.split('&')

  let obj = {}
  params.forEach((item) => {
    let kv = item.split('=')
    obj[kv[0]] = kv[1]
  })

  return obj
}
console.log(paramUrl(url))

// ---------------------------------------- 深拷贝
function checkType(val) {
  return Object.prototype.toString.call(val).slice(8, -1)
}

function deepClone(source) {
  let ret
  if (checkType(source) === 'Object') {
    ret = {}
  } else if (checkType(source) === 'Array') {
    ret = []
  } else {
    return source
  }

  for (let key in source) {
    let value = source[key]
    if (checkType(key) === 'Object' || checkType(source) === 'Array') {
      deepClone(value)
    } else {
      ret[key] = value
    }
  }

  return ret
}

let obj = {
  a: '222',
}
let cloneRet = deepClone(obj)
cloneRet.a = '333'
console.log(cloneRet.a)
console.log(obj.a)

// ----------------------------------------- 手写 call、bind、apply、new
// call  1、更改this指向    2、函数立刻执行
Function.prototype.myCall = function (context) {
  // 没有传值，则 context 指向 window
  context = context || window

  context.fn = this

  // arguments 第一个参数是 context, 后面是其余参数; 主要是取出其余参数
  const args = [...arguments].slice(1)

  let ret = context.fn(...args)

  delete context.fn

  return ret
}

let testObj = {
  value: 'aaaa',
}

function fntest(name, age) {
  return {
    value: this.value,
    name,
    age,
  }
}

console.log(fntest.myCall(testObj, '哈哈', 22))

// apply  apply 跟 call 一样，只是传递的参数不一样
Function.prototype.myApply = function (context, args) {
  context = context || window

  context.fn = this

  let ret = ''

  // 判断有没有传入 args
  if (!args) {
    ret = context.fn()
  } else {
    ret = context.fn(...args)
  }

  delete context.fn

  return ret
}

let testObj1 = {
  value: 'aaaa',
}

function fntest1(name, age) {
  return {
    value: this.value,
    name,
    age,
  }
}

console.log(fntest1.myApply(testObj1, ['哈哈', 22]))

// bind  返回一个函数  1、指定this；2、返回一个函数；3、传递参数并柯里化
Function.prototype.myBind = function (context) {
  // 判断调用 bind 是不是函数
  if (typeof this !== 'function') {
    throw new Error('不是一个函数')
  }

  const _this = this
  // arguments 第一个参数是 context, 后面是其余参数; 主要是取出其余参数
  const args = [...arguments].slice(1)

  return function () {
    // 主要就是 bind 可以接收参数, 返回的函数也可以接收参数, 所以 args.concat([...arguments])
    return _this.apply(context, args.concat([...arguments]))
  }
}

// 手写 new
// 首先 new 做了什么
// 1、创建一个对象
// 2、把 this 指向这个对象
// 3、为这个对象添加属性
// 4、返回这个对象
function myNew() {
  // 创建一个对象
  let obj = {}
  // 把第一个参数取出来,这里是 Dognew
  let Con = [].shift.call(arguments)
  // 把 this 指向这个对象
  obj.prototype = Con.prototype
  // 为这个对象添加属性
  let ret = Con.apply(obj, arguments)
  // 返回这个对象
  return typeof ret === 'object' ? ret : obj
}

function Dognew(name, age) {
  this.name = name
  this.age = age
}
let dognew = myNew(Dognew, '汪', '2')
console.log('手写new', dognew.name)

// --------------------------------------- 手写 instanceof
// 一直查找左边的 __proto__ 是否与右边的 prototype 相等， 直到指向 null
function myInstanceof(left, right) {
  let leftProto = left.__proto__
  let rightProto = right.prototype

  // 一直执行，知道 return
  while (true) {
    // 如果
    if (leftProto === null) {
      return false
    }
    if (leftProto === rightProto) {
      return true
    }
    leftProto = leftProto.__proto__
  }
}
let arrProto = []
console.log('手写instanceof', myInstanceof(arrProto, Array))

// --------------------------------------- 手写 EventEmitter (发布订阅模式--简单版)
/**
 * 1、什么是发布订阅模式
 *    发布-订阅模式其实是一种对象间一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到状态改变的通知
 *
 * 2、怎么实现一对多
 *    既然一对多 肯定有一个事件调度中心用来调度事件 订阅者可以注册事件（on）到事件中心 发布者可以发布事件（emit）到调度中心 订阅者也可以 取消订阅（off）或者只订阅一次（once）
 */
class EventEmitter {
  constructor() {
    this.events = {}
  }

  // 实现订阅
  on(type, callback) {
    if (!this.events) {
      this.events = Object.create(null)
    }

    if (!this.events[type]) {
      this.events[type] = [callback]
    } else {
      this.events[type].push(callback)
    }
  }

  // 发布
  emit(type, params) {
    if (!['String', 'Object', 'Undefined'].includes(checkType(params))) {
      throw new Error('参数必须是字符串或者对象或者不传')
    }

    this.events[type] && this.events[type].forEach((cb) => cb(params))
  }

  // 删除订阅
  off(type) {
    if (!this.events[type]) return
    delete this.events[type]
  }
}

let event = new EventEmitter()
event.on('click', (data) => {
  console.log(data)
})
event.emit('click', { name: 'jack' })
event.emit('click', { age: 18 })

event.off('click')
event.emit('click', { like: 'car' })
