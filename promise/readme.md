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

#### 4、中断 Promise

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
