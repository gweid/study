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

