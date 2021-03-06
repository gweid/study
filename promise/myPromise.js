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
  then(onResolved, onRejected) {
    // // 向后传递成功的value
    onResolved =
      typeof onResolved === 'function' ? onResolved : (value) => value
    // 指定默认的失败的回调(实现错误/异常传透的关键点)
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason
          }

    return new MyPromise((resolve, reject) => {
      const handle = (callback, data) => {
        try {
          let x = callback(data)

          // 判断是否返回 promise
          if (x instanceof MyPromise) {
            /**
             * 如果是 promise，那么需要通过 then 拿到结果
             * 因为后面一轮的 then 接受的 value 就是结果
             * p.then(value => {
             *   return new Promise(() => { return { data: '' }})
             * }).then(value > {
             *   console.log(value)
             * })
             */

            // x.then(
            //   (value) => resolve(value),
            //   (reason) => reject(reason)
            // )
            x.then(resolve, reject) // 相当于上面
          } else {
            resolve(x)
          }
        } catch (error) {
          reject(error)
        }
      }

      // 为什么需要将 pending 状态的回调函数存进数组
      // new Promise((resolve, reject) => {
      //   setTimeout(() => {
      //     resolve('111')
      //   })
      // })
      // .then(value => {})
      // 主要是处理异步的情况，如果上面是异步调用，那么就需要存起来，等到触发 resolve 的时候，再拿出来执行
      // 类似发布订阅模式
      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          // let x = onResolved(this.value)
          // resolve(x)

          handle(onResolved, this.value)
        })

        this.onRejectedCallbacks.push(() => {
          // let x = onRejected(this.reason)
          // reject(x)

          handle(onRejected, this.reason)
        })
      }

      if (this.status === RESOLVE) {
        setTimeout(() => {
          // let x = onResolved(this.value)
          // resolve(x)

          handle(onResolved, this.value)
        })
      }

      if (this.status === REJECT) {
        setTimeout(() => {
          // let x = onRejected(this.reason)
          // reject(x)

          handle(onRejected, this.reason)
        })
      }
    })
  }

  // 原型对象的 catch, 指定失败的回调, 返回一个新的 promise
  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  // 函数对象的 resolve, 返回一个成功的 promise
  // resolve 中可能传入 promise，或者一个值
  static resolve(value) {
    return new MyPromise((resolve, reject) => {
      if (value instanceof MyPromise) {
        value.then(resolve, reject)
      } else {
        resolve(value)
      }
    })
  }

  // 函数对象的 reject, 返回一个失败的 promise
  // reject 中不能再传入 promise
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason)
    })
  }

  // 函数对象的 all, 返回一个 promise, 只有数组里面的 promise 都成功才成功
  // 如果有一个失败, 则返回第一个失败的那个
  static all(allArr) {
    return new MyPromise((resolve, reject) => {
      // 只有全部成功才返回
      // 保证结果与传入顺序一致
      let successArr = new Array(allArr.length) // 确定成功数组长度, 与 allArr 一致
      let count = 0
      allArr.forEach((item, index) => {
        MyPromise.resolve(item).then(
          (value) => {
            count++
            // 注意, 这里不能用 push, 因为 promise 为异步, 不能谁先成功就先 push, 要与原数组顺序一致
            successArr[index] = value
            // 只能在长度跟原数组一样时才一次 resolve
            if (count === allArr.length) {
              resolve(successArr)
            }
          },
          (reason) => {
            reject(reason)
          }
        )
      })
    })
  }

  // 函数对象的 race, 返回一个 promise, 结果由第一个完成的 promise 决定
  // 即数组中所有的 promise 谁先执行完，就先返回谁的结果, 无论成功还是失败
  static race(raceArr) {
    return new MyPromise((resolve, reject) => {
      // 将数组的每一项传给 resolve
      // 因为 resolve 可以接收 promise 或者常量值, 并且返回一个 promise, 在 then 中处理
      raceArr.forEach((item) => {
        MyPromise.resolve(item).then(
          (value) => {
            // 为什么只会调用一次 resolve，因为 resolve 中只能 pending --> resolve 是不可逆的
            // 当第二次进来，而第一次 resolve 了，那么 if (this.status !== PENDING) return
            resolve(value)
          },
          (reason) => {
            reject(reason)
          }
        )
      })
    })
  }
}

// -------------------------------------使用 MyPromise
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
    console.log('成功执行1', data)
    return MyPromise.resolve({
      value: '成功',
    })
  },
  (err) => {
    console.log('失败执行1', err)
    return MyPromise.reject({
      value: '失败',
    })
  }
)
  .then((data) => {
    console.log('成功执行2', data)
  })
  .catch((err) => {
    console.log('失败执行2', err)
  })

console.log('end')

// 测试 race 和 all
const mp1 = new MyPromise((resolve, reject) => {
  resolve('mp1结果')
})
const mp2 = new MyPromise((resolve, reject) => {
  resolve('mp2结果')
})
const mp3 = new MyPromise((resolve, reject) => {
  resolve('mp3结果')
})
const mp4 = new MyPromise((resolve, reject) => {
  resolve('mp4结果')
})
const mp5 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('mp5结果')
  }, 1000)
})

let raceRet = MyPromise.race([mp1, mp2])
raceRet.then(
  (value) => {
    console.log('race-success==========', value)
  },
  (err) => {
    console.log('race-fail========' + err)
  }
)

let allRet = MyPromise.all([mp5, mp3, mp4])
allRet.then(
  (value) => {
    console.log('all-success==========', value)
  },
  (err) => {
    console.log('all-fail========' + err)
  }
)
