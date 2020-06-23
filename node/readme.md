# node 相关知识点

### 获取命令行的传参 process.argv

```
"scripts": {
    "serve": "node test.js arg1 arg2"
}

const args = process.argv.splice(2)

// process.argv[0] : 返回启动 Node.js 进程的可执行文件所在的绝对路径
// process.argv[1] : 为当前执行的 JavaScript 文件路径
// process.argv.splice(2) 移除前两者后，剩余的元素为其他命令行参数
```

### 常用文件路径

-   \_\_dirname: 被执行的 js 所在文件夹的绝对路径 (跟踪到当前文件所在的目录)
-   \_\_filename: 被执行的 js 的绝对路径 (跟踪到当前文件)
-   process.cwd(): 运行 node 命令时所在的文件夹的绝对路径

### path 常用命令

-   path.dirname()： 返回 path 的目录名
-   path.join()：将所有 path 片段连接到一起，然后规范化生成的路径
-   path.resolve()：会将路径或路径片段的序列解析为绝对路径，解析为相对于当前目录的绝对路径，相当于 cd 命令

### join 和 resolve 区别

-   join 是把各个 path 片段连接在一起， resolve 把／当成根目录

```
path.join('/a', '/b') // '/a/b'
path.resolve('/a', '/b') //'/b'
```

-   join 是直接拼接字段，resolve 是解析路径并返回

```
path.join("a","b")  // "a/b"
path.resolve("a", "b") // "/Users/tree/Documents/infrastructure/KSDK/src/a/b"
```

### 文件读取 fs 模块

### url 模块处理 url

-   url.parse：可以将一个 url 的字符串解析并返回一个 url 的对象
-   url.format:将传入的 url 对象编程一个 url 字符串并返回

```
const url = require('url')

url.parse('http://www.taobao.com/cate?query=book')
```

### node 创建一个服务器

```
const http = require('http')

const server = http.createServer(function(req, res) {

})

server.listen(3000)
```
