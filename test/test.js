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

// ---------------------------------------- new 做了什么
// 1、创建一个对象
// 2、把 this 指向这个对象
// 3、赋值
// 4、返回 this

