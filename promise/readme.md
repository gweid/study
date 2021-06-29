# Promise

#### 1、指定回调函数的方式更加灵活

- 比如 then 可以在 setTimeout 中调用

```
const p = new Promise()

setTimeout(() => {
    p.then(() => {})
}, 2000)
```



#### 2、支持链式调用, 解决回调地狱

```
const promise = new Promise()

promise
  .then((val) => {})
  .then((val) => {})
```



#### 3、链式调用

- 链式调用就返回一个 Promise

```
new Promise((resolve, reject) => {
  resolve(1)
})
  .then((value) => {
    console.log(value)
    return Promise.resolve(2)
  })
  .then((value) => {
    console.log(value)
    return Promise.reject('错误')
  })
  .catch((error) => {
    console.log(error)
  })
```



#### 4、为什么需要在 then 中的 pending 状态的成功失败回调存进数组

```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2)
  })
})

p.then(value => {
  
}, err => {
  
})
```

主要是上面这种情况，可能是异步调用 resolve 传递结果，就需要在执行 then 的时候，将处理韩苏保存，当上面调用 resolve 的时候，再把处理函数拿出来执行



#### 5、中断 Promise

- 返回一个状态为 pending 的 promise

```
new Promise((resolve, reject) => {
  resolve(1)
})
  .then((value) => {
    console.log(value)
    return Promise.reject("错误")
  })
  .then((value) => {
    console.log(value)
    return new Promise(() => {})
  })
  .then((value) => {
    console.log(value)
  }, (error) => {
    console.log(error)
  })
```



#### 6、宏任务和微任务

```
/*
1. 宏列队: 用来保存待执行的宏任务(回调), 比如: 定时器回调/DOM事件回调/ajax回调
	2. 微列队: 用来保存待执行的微任务(回调), 比如: promise的回调/MutationObserver的回调
	3. JS执行时会区别这2个队列
		JS引擎首先必须先执行所有的初始化同步任务代码
		每次准备取出一个宏任务执行前, 都要将所有的微任务一个一个取出来执行

   - 比如: 第一次执行宏任务, 会先把微任务拿出来执行, 执行完微任务就执行宏任务, 但此时执行的宏任务又往微任务
    队列中添加微任务，那么在下一个宏任务执行前，又会把新添加进去的微任务先执行完，再执行宏任务
 */
```



#### 7、async 与 await

```
// async 的返回值是一个 promise 对象
async function fn() {
  return 1
}

console.log(fn())
```



#### 8、常用的 Promise 方法

- Promise.all：接受一个可迭代的参数，例如数组，全部成功，结果会按照顺序返回，如果有一个失败，那么返回失败
- Promise.race：接受一个可迭代的参数，例如数组，返回第一个执行完的结果，无论是成功还是失败
- Promise.any：接受一个可迭代的参数，例如数组，只要有一个成功，那么返回成功，都失败，返回失败
- Promise.allSettled：接受一个可迭代的参数，例如数组，返回所有的执行结果
  - 结果是：
  ```js
  [{ status: "rejected", reason: 1 }, { status: "fulfilled", value: 2 }]
  ```