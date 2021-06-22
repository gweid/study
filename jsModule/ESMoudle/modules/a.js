console.log('this is moduleA')

// export const name = 'jack'
// export const sayHi = (name) => {
//   console.log('hello' + name)
// }

const name = 'jack'

const sayHi = (name) => {
  console.log('hello,' + name)
}

// export {
//   name,
//   sayHi as sayHiFun
// }

export {
  name,
  sayHi
}

// export default function () {
//   console.log('hello');
// }
