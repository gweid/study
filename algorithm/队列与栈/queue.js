// ----------------- 队列，规则：先进先出

// const request = (num) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(num)
//     }, Math.random(5000) * 1000)
//   })
// }

// request(1)
// request(2)
// request(3)

// 上面的方法没法保证输出的都是 1、2、3，此时就需要队列，来固定输出

const request = (num) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num)
    }, Math.random(5000) * 1000)
  })
}

class CreateQueue {
  constructor() {
    this.queue = []
  }

  addQueue(req) {
    this.queue.push(req)
  }

  outQueue() {
    return this.queue.shift()
  }

  async schedule() {
    const reqFn = this.outQueue()
    if (!reqFn) return
    const res = await reqFn()
    console.log(res);
    this.schedule()
  }
}

const createQueue = new CreateQueue()
createQueue.addQueue(() => request(1))
createQueue.addQueue(() => request(2))
createQueue.addQueue(() => request(3))

createQueue.schedule()