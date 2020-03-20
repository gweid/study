// function MyPromise(executor) {
//     executor(resolve, reject)

//     function resolve() {

//     }

//     function reject() {

//     }
// }

// MyPromise.prototype.then = function () {
//     console.log("哈哈哈");
// }


class MyPromise {
    constructor(executor) {
        // 初始化 status 为 pending 等待状态
        this.status = 'pending'
        // 成功的值
        this.value = undefined
        // 失败原因
        this.reason = undefined
        // 存放成功的数组
        this.onResolvedCallbacks = []
        // 存放失败的数组
        this.onRejectedCallbacks = []


        let resolve = (value) => {
            this.status = 'resolve' // 使 promise 状态变为不可逆
            this.value = value

            this.onResolvedCallbacks.forEach(fn => fn())
        }

        let reject = (reason) => {
            this.status = 'reject' // 使 promise 状态变为不可逆
            this.reason = reason

            this.onRejectedCallbacks.forEach(fn => fn())
        }
        executor(resolve, reject)
    }


    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            if (this.status === 'pending') {
                this.onResolvedCallbacks.push(() => {
                    try {
                        let x = onFulfilled(this.value)
                        resolve(x)
                    } catch (error) {
                        reject(error)
                    }
                })

                this.onRejectedCallbacks.push(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolve(x)
                    } catch (error) {
                        reject(error)
                    }
                })
            }

            // 成功
            if (this.status === 'resolve') {
                try {
                    let x = onFulfilled(this.value)
                    resolve(x)
                } catch (error) {
                    reject(error)
                }
            }

            // 失败
            if (this.status === 'reject') {
                try {
                    let x = onRejected(this.reason)
                    resolve(x)
                } catch (error) {
                    reject(error)
                }
            }
        })
    }
}