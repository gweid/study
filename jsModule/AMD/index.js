(function() {
  // 这个 require 变量是在 require.js 中定义的
  // 配置模块映射关系
  require.config({
    baseUrl: '',
    paths: {
      // 不需要跟后缀名，require.js 会自动加上后缀名
      moduleA: './modules/a',
      moduleB: './modules/b'
    }
  })
  
  // 引入模块 b
  require(['moduleB'], function(moduleB) {
    console.log(moduleB.moduleInfo)
  })
})();