// define 的第一个参数是一个数组，代表需要引用的模块，模块名与 index 中的映射一致
define(['moduleA'], function(moduleA) {
  console.log(moduleA.moduleInfo)
  moduleA.sayHi('jack')

  const moduleInfo = 'this is moduleB'

  return {
    moduleInfo
  }
})