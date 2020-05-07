const PENDING = 'pending'
const RESOLVE = 'resolve'
const REJECT = 'reject'

class MyPromise {
  constructor(executor) {
    // 初始化 status 为等待状态 pending
    this.status = PENDING
    // 成功的值
    this.value = undefined
    // 失败原因
    this.reason = undefined

    // 用于保存 then 的成功回调
    this.onResolvedCallbacks = []
    // 用于保存 then 的失败回调
    this.onRejectedCallbacks = []

    // 用于改变状态, 并执行 then 中成功回调
    let resolve = (value) => {
      // promise 只能从等待变为成功, 或者等待变为失败, 不能成功后变失败或者失败后变成功
      if (this.status !== PENDING) return

      this.status = RESOLVE
      this.value = value

      if (this.onResolvedCallbacks.length > 0) {
        setTimeout(() => {
          this.onResolvedCallbacks.forEach((cb) => cb())
        })
      }
    }

    // 用于改变状态, 并执行 then 中失败回调
    let reject = (reason) => {
      // promise 只能从等待变为成功, 或者等待变为失败, 不能成功后变失败或者失败后变成功
      if (this.status !== PENDING) return

      this.status = REJECT
      this.reason = reason

      if (this.onRejectedCallbacks.length > 0) {
        setTimeout(() => {
          this.onRejectedCallbacks.forEach((cb) => cb())
        })
      }
    }

    try {
      // 执行器函数
      executor(resolve, reject)
    } catch (error) {
      // 如果 promise 抛出异常，用 reject 处理
      reject(error)
    }
  }

  // 原型对象的 then, 指定成功或者失败的回调，返回一个 promise
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const handle = (status) => {
        try {
          let x =
            status === RESOLVE
              ? onFulfilled(this.value)
              : onRejected(this.reason)

          // 判断是否返回 promise
          if (x instanceof Promise) {
            x.then(
              (value) => resolve(value),
              (reason) => reject(reason)
            )
          } else {
            resolve(x)
          }
        } catch (error) {
          reject(error)
        }
      }

      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          // let x = onFulfilled(this.value)
          // resolve(x)

          handle(RESOLVE)
        })

        this.onRejectedCallbacks.push(() => {
          // let x = onRejected(this.reason)
          // reject(x)

          handle(REJECT)
        })
      }

      if (this.status === RESOLVE) {
        setTimeout(() => {
          // let x = onFulfilled(this.value)
          // resolve(x)

          handle(RESOLVE)
        })
      }

      if (this.status === REJECT) {
        setTimeout(() => {
          // let x = onRejected(this.reason)
          // reject(x)

          handle(REJECT)
        })
      }
    })
  }

  // 原型对象的 catch, 指定失败的回调, 返回一个新的 promise
  catch(onRejected) {}

  // 函数对象的 resolve, 返回一个成功的 promise
  static resolve(value) {}

  // 函数对象的 reject, 返回一个失败的 promise
  static reject(reason) {}

  // 函数对象的 all, 返回一个 promise, 只有数组里面的 promise 都成功才成功
  static all(arr) {}

  // 函数对象的 race, 返回一个 promise, 结果由第一个完成的 promise 决定
  static race(arr) {}
}


// 使用 MyPromise
// setTimeout(() => {
//   console.log('宏任务')
// }, 0)

let mp = new MyPromise((resolve, reject) => {
  const time = Date.now()
  console.log('start')

  if (time % 2 === 0) {
    resolve('成功了')
  } else {
    reject('失败了')
  }

  // resolve('kakaka')

  // reject("失败")
})

mp.then(
  (data) => {
    console.log(data)
    return new Promise((resolve, reject) => {
      resolve('222222')
    })
  },
  (err) => {
    console.log(err)
  }
).then(
  (data) => {
    console.log(data)
  },
  (err) => {
    console.log(err)
  }
)

console.log('end')
