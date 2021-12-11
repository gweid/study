# typescript



## 编译环境搭建



### 基础环境



要使用 typescript，首先得安装，一般全局安装 typescript

```shell
npm i typescript -g
```

然后初始化一份 `tsconfig.json` 文件，执行命令

```shell
tsc --init
```

此时可以根据情况，修改 `tsconfig.json` 文件指定输入输出路径（默认以 src 下的 index.ts 为源文件路径）

- `outDir`: 为编译生成的 js 文件输出路径
- `rootDir`: 是源 ts 文件的路径

如果需要实时监听文件变动进行修改，可以配置 `package.json`

```json
"scripts": {
  "build": "tsc",
  "build:w": "tsc -w"
}
```



如果想要实时看到效果，而不是将编译之后的 js 文件嵌入到 html 中去运行，那么可以使用 `ts-node` 这个包，这个包可以使 node 能直接运行 ts 代码，而无需将 ts 编译成 js，安装：

```shell
npm i ts-node -g
```

配合 `nodemon` 自动检测文件变动，重新执行 ts 文件，安装 `nodemon`：

```shell
npm i nodemon -g
```

配置 `package.json` 文件：

```json
"scripts": {
  "dev": "nodemon --watch /src -e ts --exec ts-node ./src/index.ts"
}
```

- `nodemon --watch /src` 表示检测 src 目录
- `-e ts` 表示检测的是 ts 后缀的文件
- `--exec ts-node ./src/index.ts` 表示目录下文件有变化，重新使用 ts-node 执行 index.ts 文件



### 配合打包工具





## tsconfig.json 文件

参考： [TS 编译配置](https://juejin.cn/post/7039583726375796749)



## 基础用法

参考 `src/index.ts` 文件



## 深入类型守卫



## 深入泛型





## FAQ



**对象属性报错**

```ts
const obj = { name: 'jack', age: 18 }

function setName(key) {
		return obj[key]
}
```

上面通过 obj[xxx]  的形式，必然会报错，错误信息如下：

> 元素隐式具有 "any" 类型，因为类型为 "string" 的表达式不能用于索引类型 "xxx"。
> 在类型 "xxx" 上找不到具有类型为 "string" 的参数的索引签名。



做法：

```ts
const obj = { name: 'jack', age: 18 }

function setName(key) {
		return obj[key as keyof typeof obj]
}
```



## 附录

优秀文章参考：

- [Typescript 在实际开发的应用](https://juejin.cn/post/6986890347313889293)
- [一文读懂 TypeScript 泛型及应用](https://juejin.cn/post/6844904184894980104)

