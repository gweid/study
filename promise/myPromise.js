class MyPromise {
  constructor(executor) {
    // 初始化 status 为等待状态 pending
    this.status = 'pending'
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
      this.status = 'resolve'
      this.value = value

      this.onResolvedCallbacks.forEach((cb) => cb())
    }

    // 用于改变状态, 并执行 then 中失败回调
    let reject = (reason) => {
      this.status = 'reject'
      this.reason = reason

      this.onRejectedCallbacks.forEach((cb) => cb())
    }

    try {
      // 执行器函数
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      if (this.status === 'pending') {
        this.onResolvedCallbacks.push(() => {
          let x = onFulfilled(this.value)
          resolve(x)
        })

        this.onRejectedCallbacks.push(() => {
          let x = onRejected(this.reason)
          reject(x)
        })
      }

      if (this.status === 'resolve') {
        let x = onFulfilled(this.value)
        resolve(x)
      }

      if (this.status === 'reject') {
        let x = onRejected(this.reason)
        reject(x)
      }
    })
  }
}

// 使用 MyPromise
let mp = new MyPromise((resolve, reject) => {
  const time = Date.now()
  console.log('start')

  if (time % 2 === 0) {
    resolve('成功了')
  } else {
    reject('失败了')
  }

  // reject("失败")
})

mp.then(
  (data) => {
    console.log(data)
  },
  (err) => {
    console.log(err)
  }
)

console.log('end')

