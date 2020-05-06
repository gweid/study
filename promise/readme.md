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