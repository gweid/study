// import { name, sayHiFun } from './modules/a.js'
// import { name, sayHi as sayHiFun } from './modules/a.js'

// console.log(name)
// console.log(sayHiFun('mark'))

// import * as moduleA from './modules/a.js'

// console.log(moduleA.name)
// console.log(moduleA.sayHi('mark'))

// import sayHi from './modules/a.js'

// console.log(sayHi())

let flag = true
if(flag) {
  import('./modules/a.js')
    .then(({ name, sayHi }) => {
      console.log(name)
      console.log(sayHi('mark'))
    })
    .catch(err => {
      console.log(err)
    })
}