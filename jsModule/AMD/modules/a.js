define(function() {
  const moduleInfo = 'this is moduleA'
  const sayHi = function(name) {
    console.log('hello,' + name)
  }
  
  // 通过 return 将需要共享的属性导出 
  return {
    moduleInfo,
    sayHi
  }
})