## JS 知识点

[收集的 JS 资料](./dataLink.md)



### 1、数据类型



#### 1-1、typeof NaN 的结果

```js
typeof NaN    // 'number'
```



#### 1-2、typeof null 问题

typeof null 的结果是 object。为什么呢？

这是 JS 存在的一个悠久 Bug。在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象然而 null 表示为全零，所以将它错误的判断为 object 。



#### 1-3、isNaN 和 Number.isNaN 的区别

基本用法：

```js
isNaN()

Number.isNaN()
```

- isNaN 是 ES5 的方法，本意是通过 Number 方法把参数转换成数字类型，如若转换成功，则返回 false，反之返回 true，它只是判断参数是否能转成数字，不能用来判断是否严格等于 NaN
- Number.isNaN 是 ES6 提供，用来判断一个值是否严格等于 NaN，它会首先判断传入的值是否为数字类型，如不是，直接返回 false
- 区别：isNaN 方法首先转换类型，而 Number.isNaN 方法不用；isNaN 不能用来判断是否严格等于 NaN，Number.isNaN 方法可以

```js
console.log(isNaN(10)) // false
console.log(isNaN('10')) // false
console.log(isNaN({})) // true
console.log(isNaN(NaN)) // true

console.log(Number.isNaN(10)) // false
console.log(Number.isNaN('10')) // false
console.log(Number.isNaN({})) // false
console.log(Number.isNaN(NaN)) // true
```



#### 1-4、0.1 + 0.2 === 0.3 吗？为什么？

JavaScript使用 Number 类型表示数字（整数和浮点数），遵循 [IEEE 754](https://zh.wikipedia.org/wiki/IEEE_754) 标准，通过64位来表示一个数字

 <img src="./imgs/img1.png" style="zoom:50%;" />

- 第0位：符号位，0表示正数，1表示负数(s)
- 第1位到第11位：储存指数部分（e）
- 第12位到第63位：储存小数部分（即有效数字）



而在运算的时候，计算机无法直接对十进制的数字进行运算，所以需要先按照IEEE 754转成相应的二进制，然后对阶运算。因此：0.1和0.2 转换成二进制后会无限循环

```js
0.1 -> 0.0001100110011001...(无限循环)
0.2 -> 0.0011001100110011...(无限循环)
```

但是由于 IEEE 754 尾数位数限制，需要将后面多余的位截掉，这样在进制之间的转换中精度就已经损失



**解决精度问题：**

1. 将数字转换为整数

   ```js
   function add(num1, num2) {
    const num1Digits = (num1.toString().split('.')[1] || '').length;
    const num2Digits = (num2.toString().split('.')[1] || '').length;
    const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
    return (num1 * baseNum + num2 * baseNum) / baseNum;
   }
   ```

2. 使用第三方库，例如 [Math.js](https://mathjs.org/)、[big.js](http://mikemcl.github.io/big.js)



#### 1-5、BigInt

BigInt 是一种数字类型的数据，它可以表示任意精度格式的整数，使用 BigInt 可以安全地存储和操作大整数，即使这个数已经超出了 Number 能够表示的安全整数范围，例如表示高分辨率的时间戳，使用大整数id 等



**怎么创建 BigInt**

```js
// 第一种，只需要在数字末尾追加 n 即可
console.log(9007199254740995n)    // → 9007199254740995n


// 第二种，使用 BigInt() 构造函数
BigInt("9007199254740995");    // → 9007199254740995n
```



#### 1-6、Object.is 和 === 的区别

Object.is 在 === 的基础上修复了一些特殊情况下的失误，具体来说就是 +0 和 -0，NaN 和 NaN

```js
console.log(Object.is(0, -0)) // false
console.log(Object.is(0, +0)) // true
console.log(Object.is(+0, -0)) // false
console.log(Object.is(NaN, NaN)) // true
```

其他情况与 === 是完全一样的



**实现一个 Object.is**

```js
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
```



#### 1-7、数据类型转换

可参考：https://juejin.cn/post/6940945178899251230#heading-12



**1、基本转换**

js 中类型转换只有三种：

- 转换为数字
- 转换为布尔值
- 转换为字符串

基本转化规则如下：

 <img src="./imgs/img2.png" style="zoom:50%;" />



**2、其它值转换到布尔值的规则**

`undefined、null、false、+0、-0、NaN、""`  这几个值为 false，其它的都为 true



**3、`==` 的隐式转换**

当使用 `==` 的时候，两边类型不一致，会进类型转换之后再比较，隐式转换规则如下：

1. 两边的类型是否相同，相同的话就比较值的大小

   ```js
   1 == 1   --> true
   ```

2. 首先判断的是否是 null 和 undefined 在对比，是的话就返回 true

   ```js
   null == undefined   --> true
   ```

3. 判断的类型是否是 String 和 Number，是的话，把 String 类型转换成 Number，再进行比较

   ```js
   1 == '1'
         ↓
   1 ==  1      --> true
   ```

4. 判断其中一方是否是 Boolean，是的话就把Boolean转换成Number，再进行比较

   ```js
   '1' == true
    ↓      ↓
   '1' ==  1
    ↓      ↓
    1  ==  1
   ```

5. 如果其中一方为 Object，且另一方为 String、Number 或者 Symbol，会将 Object 转换成原始类型，再进行比较。



**4、Object 类型转原始类型的流程**

1. 如果 Symbol.toPrimitive() 方法，优先调用再返回
2. 调用 valueOf()，如果转换为原始类型，则返回
3. 调用 toString()，如果转换为原始类型，则返回
4. 如果都没有返回原始类型，会报错

```js
const obj = {
  value: 3,
  valueOf() {
    return 4;
  },
  toString() {
    return '5'
  },
  [Symbol.toPrimitive]() {
    return 6
  }
}
console.log(obj + 1); // 输出7

// 可以看到，有 toPrimitive，优先调用，结果就是 6 + 1 = 7
```



对于数组：

```js
const arr = [1, 2]

// 如果没有专门给 arr 定义 valueOf 和 toString 方法，那么就是调用的内部的 valueOf 和 toString
arr.valueOf()             ---> [1, 2] 还是一样，没变化
arr.toString()            ---> '1, 2'


const arr1 = []
arr.valueOf()             ---> [] 还是一样，没变化
arr.toString()            ---> ''
```

对于对象：

```js
const obj = {name: 'jack'}

// 如果没有专门给 obj 定义 valueOf 和 toString 方法，那么就是调用的内部的 valueOf 和 toString
obj.valueOf()            ---> {name: 'jack'}
obj.toString()           ---> "[object Object]"


const obj = {}
obj.valueOf()            ---> {}
obj.toString()           ---> "[object Object]"
```



**5、如何让if(a == 1 && a == 2)条件成立**

```js
const a = {
  value: 0,
  valueOf: function() {
    this.value++;
    return this.value;
  }
}
console.log(a == 1 && a == 2) // true
```



#### 1-8、|| 与 &&

- ||：这个就是找真，只要找到一个真，那么就是 true，找不到就是 false
- &&：找假，只要找到一个是假，就返回 false，找不到就是 true



#### 1-9、什么是 JavaScript 中的包装类型

在 JavaScript 中，基本类型是没有属性和方法的，但是为了便于操作基本类型的值，在调用基本类型的属性或方法时 JavaScript 会在后台隐式地将基本类型的值转换为对象

比如：

```js
const a = "abc";
a.length; // 3
a.toUpperCase(); // "ABC"
```

在访问`'abc'.length`时，JavaScript 将`'abc'`在后台转换成`String('abc')`，然后再访问其`length`属性



### 2、闭包、作用域链、执行上下文



#### 2-1、闭包

参考：https://juejin.cn/post/6844903974378668039#heading-23



**1、什么是闭包**

闭包，简单来讲，就是一个函数可以访问都另外一个函数内部的变量



**2、闭包产生的原因**

要说这个，就先得从作用域链说起：当访问一个变量的时候，会先从当前作用域查找，如果没找到，就去上一层作用域去查找，还是没找到，继续往更上一层作用于查找，直到找到全局作用于，这一层层查找的链路就是作用域链

也就是说，当前环境中存在指向父级作用域的引用，就产生了闭包



**3、闭包的表现形式**

1. 返回函数

   ```js
   function fn() {
     var a = 1
     function fn1() {
       console.log(a)
     }
     return fn1
   }
   
   var fn1 = fn()
   fn1()  // 1
   ```

2. 存在作用域引用关系

   ```js
   var fn1
   function fn() {
     var a = 1
     fn1 = function() {
       console.log(a)
     }
   }
   
   var fn1 = fn()
   fn1()  // 1
   ```

3. 函数作为参数

   ```js
   var a = 1;
   function foo(){
     var a = 2;
     function baz(){
       console.log(a);
     }
     bar(baz);
   }
   function bar(fn){
     // 这就是闭包
     fn();
   }
   
   // 输出2，而不是1
   foo();
   ```

4. 在定时器、事件监听、Ajax请求、跨窗口通信、Web Workers或者任何异步中，只要使用了回调函数，实际上就是在使用闭包

   ```js
   // 定时器
   setTimeout(function timeHandler(){
     console.log('111');
   }，100)
   
   // 事件监听
   $('#app').click(function(){
     console.log('DOM Listener');
   })
   ```

5. IIFE 立即执行函数

   ```js
   var a = 2
   (function IIFE(){
     // 输出2
     console.log(a)
   })()
   ```



**4、闭包的优缺点**

优点：

- 在函数外部能够访问到函数内部的变量。通过使用闭包，可以通过在外部调用闭包函数，从而在外部访问到函数内部的变量，可以使用这种方法来创建私有变量。
- 形成沙箱，避免环境污染
- 使已经运行结束的函数上下文中的变量继续留在内存中，因为闭包函数保留了这个变量对象的引用，所以这个变量对象不会被回收

缺点：

- 内存长期驻用，增加内存用量，使用不当会导致内存泄漏



#### 2-2、作用域与作用域链



**1、几种作用域**

1. 全局作用域

   - 最外层函数和最外层函数外面定义的变量拥有全局作用域
   - 所有window对象的属性拥有全局作用域
   - 全局作用域有很大的弊端，过多的全局作用域变量会污染全局命名空间，容易引起命名冲突

2. 函数作用域

   - 函数作用域声明在函数内部的变量，一般只有固定的代码片段可以访问到
   - 作用域是分层的，内层作用域可以访问外层作用域，反之不行

3. 块级作用域

   - 使用ES6中新增的let和const指令可以声明块级作用域，块级作用域可以在函数中创建也可以在一个代码块中的创建（由`{ }`包裹的代码片段）

   - let和const声明的变量不会有变量提升，也不可以重复声明

   - 在循环中比较适合绑定块级作用域，这样就可以把声明的计数器变量限制在循环内部。

     

**2、作用域链**

在当前作用域中查找所需变量，如果在自己作用域找不到该变量就去父级作用域查找，依次向上级作用域查找，直到访问到 window 对象就被终止，这一层层的关系就是作用域链



#### 2-3、执行上下文



**1、上下文类型**

1. 全局上下文
   - 任何不在函数内部的都是全局执行上下文，它首先会创建一个全局的window对象，并且设置this的值等于这个全局对象，一个程序中只有一个全局执行上下文
2. 函数上下文
   - 当一个函数被调用时，就会为该函数创建一个新的执行上下文，函数的上下文可以有任意多个
3. eval 上下文，用得比较少，了解即可



**2、上下文定义**

在执行 JS 代码之前，需要先解析代码。解析的时候会先创建一个全局执行上下文环境，先把代码中即将执行的变量、函数声明都拿出来，变量先赋值为 undefined，函数先声明好可使用。这一步执行完了，才开始正式的执行程序。

在一个函数执行之前，也会创建一个函数执行上下文环境，跟全局执行上下文类似，不过函数执行上下文会多出 this、arguments 和函数的参数。

- 全局上下文：变量定义，函数声明
- 函数上下文：变量定义，函数声明，`this`，`arguments`



**3、上下文栈**

javaScript 引擎使用 `上下文栈` 来管理执行上下文

当 JavaScrip t执行代码时，首先遇到全局代码，会**创建一个全局执行上下文**并且**压入执行栈底**，每当遇到一个函数调用，就会**为该函数创建一个新的执行上下文并压入栈顶**，引擎会执行位于执行上下文栈顶的函数，当函数执行完成之后，执行上下文从栈中弹出，继续执行下一个上下文。当所有的代码都执行完毕之后，从栈底弹出全局执行上下文



### 3、原型与原型链



#### 3-1、原型

一张图了解原型

 <img src="./imgs/img3.png" style="zoom:50%;" />

- 每一个构造函数的内部都有一个 prototype 属性
- 通过构造函数实例化出来的实例对象，有原型属性 \_\_proto\_\_
- 构造函数的 prototype 属性与实例的原型属性 \_\_proto\_\_ 指向同一处



#### 3-2、原型链

当访问一个对象的属性时，如果这个对象内部不存在这个属性，那么它就会去它的原型对象里找这个属性，这个原型对象又会有自己的原型，于是就这样一直找下去，也就是原型链的概念。

![](./imgs/img4.png)

可以看到，原型的起点是 Function，终点是指向 null



### 4、继承



#### 4-1、借用 call 构造继承

```js
function Parent() {
  this.name = 'jack'
}
Parent.prototype.getName = function() {
  return this.name
}

function Child() {
  Parent.call(this)
  this.age = 18
}

const res = new Child()
console.log(res.name) // jack
console.log('call 构造继承', res.getName()) // 报错，res.getName is not a function
```

缺点：无法继承父类的方法



#### 4-2、原型链继承

```js
function Parent() {
  this.name = 'jack'
}
Parent.prototype.getName = function() {
  return this.name
}

function Child() {
  this.age = 18
}
Child.prototype = new Parent()
Child.prototype.getage = function() {
  return this.age
}

const res = new Child()
console.log(res.getName()) // jack
```

缺点：所有 Child 实例原型都指向同一个 Parent 实例, 父类引用类型变量修改会影响所有的 Child 实例



#### 4-3、组合继承

```js
function Parent() {
  this.name = 'jack'
}
Parent.prototype.getName = function() {
  return this.name
}

function Child() {
  Parent.call(this)
  this.age = 18
}
Child.prototype = new Parent()
Child.prototype.constructor = Child
Child.prototype.getAge = function() {
  return this.name
}

const res = new Child()
console.log('组合继承', res.getName()) // jack
```

组合继承就是结合了 call 与原型链，缺点：每次创建子类实例都执行了两次构造函数  SuperType.call() 和 new Parent())，虽然这并不影响对父类的继承，但子类创建实例时，原型中会存在两份相同的属性和方法，这并不优雅



#### 4-4、寄生组合继承

```js
function Parent() {
  this.name = 'jack'
}
Parent.prototype.getName = function() {
  return this.name
}

function Child() {
  Parent.call(this)
  this.age = 18
}
Child.prototype = Object.create(Parent.prototype) // 将`指向父类实例`改为`指向父类原型`
Child.prototype.constructor = Child
Child.prototype.getAge = function() {
  return this.age
}

const res = new Child()
console.log('寄生组合继承', res.getName()) // jack
```

目前最完美的继承方法



#### 4-5、class 继承

```js
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
```

class 继承实际上就是寄生继承，只是包装了一层语法糖而已



