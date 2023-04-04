## webpack 好用的插件、loader

收集整理一些好用的 webpack plugin 和 loader



### plugins



#### fork-ts-checker-webpack-plugin

TypeScript 提供类型检查，类型检查涉及 AST 解析、遍历以及其它非常消耗 CPU 的操作，会给工程化流程带来比较大的性能负担。

此时，可以利用 `fork-ts-checker-webpack-plugin` 插件将类型检查能力剥离到 **子进程** 执行，代码示例：

```js
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  // ...
  module: {
    rules: [{
      test: /\.ts$/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            // 设置为“仅编译”，关闭类型检查
            transpileOnly: true
          }
        }
      ],
    }, ],
  },
  plugins:[
    // fork 出子进程，专门用于执行类型检查
    new ForkTsCheckerWebpackPlugin()
  ]
};
```

需要注意的是：fork-ts-checker-webpack-plugin是在单独的进程跑的，所以它的错误或警告信息是异步回传给到webpack进程的

可以将参数 async 设置为 false，就要求 webpack 等待 fork-ts-checker-webpack-plugin 进程返回信息。不过这样做也可能会拖慢整个 webpack 的转译等待时间

```js
new ForkTsCheckerWebpackPlugin({ async: false })
```



#### unused-webpack-plugin

能够根据 webpack 统计信息，反向查找出工程项目里哪些文件没有被用到

```js
const UnusedWebpackPlugin = require("unused-webpack-plugin");

module.exports = {
  // ...
  plugins: [
    new UnusedWebpackPlugin({
      directories: [path.join(__dirname, "src")],
      root: path.join(__dirname, "../"),
    }),
  ],
};
```



### loader





