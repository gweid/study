## 一些好用的工具包集合

> 整理记录一些工作中用到的、好用的工具包



### 脚本相关

1、[zx](https://www.npmjs.com/package/zx)：zx 包提供了关于 `child_ process` 的有用包装，方便通过 `javascript` 执行脚本命令，类似的工具还有 [shelljs](https://www.npmjs.com/package/shelljs) 等



### 通用工具

1、[ufo](https://www.npmjs.com/package/ufo)：方便对 url 进行操作，例如序列化、获取 `url` 参数等



2、[nanoid](https://www.npmjs.com/package/nanoid)：一个小巧、安全、`URL`友好、唯一的 `JavaScript` 字符串 `ID` 生成器



3、[lodash-es](https://www.npmjs.com/package/lodash-es)：`Lodash` 库导出为 `ES` 模块



4、[edit-json-file](https://www.npmjs.com/package/edit-json-file)：轻松编辑 `json` 文件



5、[deepmerge](https://www.npmjs.com/package/deepmerge)：深度合并两个或多个对象的可枚举属性（`gzip` 压缩后仅有 723 B）



6、[lru-cache](https://www.npmjs.com/package/lru-cache)：`javascript` 中实现 `lru` 缓存



7、[fast-deep-equal](https://www.npmjs.com/package/fast-deep-equal)：最快的深度相等检查，支持 Date、RegExp 和 ES6 Map、Set 和类型数组



8、[gcoord](https://www.npmjs.com/package/gcoord)：一个处理地理坐标系的JS库，用来修正百度地图、高德地图及其它互联网地图坐标系不统一的问题





###物料开发

1、[rimraf](https://www.npmjs.com/package/rimraf)：方便在 `node` 中使用 `rm -rf`，特别是在 `window` 环境中，直接使用  `rm -rf` 会失效。

相似的工具有[del](https://www.npmjs.com/package/del)：但具有Promise API，支持多文件和全局绑定。它还可以防止您删除当前工作目录及更高版本。



2、[npm-run-all](https://www.npmjs.com/package/npm-run-all)：用于并行或顺序运行多个 `npm` 脚本的 `CLI` 工具



3、[change-case](https://www.npmjs.com/package/change-case)：在 `camelCase(驼峰)`、`PascalCase`、`Capital(大写)`、`snake_Case`、`param Case`、`CONSTANT_cases`等之间转换



4、[esno](https://www.npmjs.com/package/esno)：使用` esbuild` 增强运行时，用于加载 `TypeScript` 和 `ESM`，是的可以直接在 `package.json` 中通过命令执行 `ts` 文件



5、[release-it](https://www.npmjs.com/package/release-it)：用于控制台中交互式问答（yes/no）输入，类似的还有询问式[inquirer](https://www.npmjs.com/package/inquirer)



6、[commander](https://www.npmjs.com/package/commander)：完整的 `node` 命令行解决方案



7、[yargs](https://www.npmjs.com/package/yargs)：通过解析参数和生成优雅的用户界面，帮助构建交互式命令行工具。与 `commander` 功能类似，`yargs` 更多使用在 `lerna` 中



8、[semver](https://www.npmjs.com/package/semver)：检测版本号是否符合 `semver` 标准



9、[validate-npm-package-name](https://www.npmjs.com/package/validate-npm-package-name)：检验 `npm` 包名是否符合标准



10、[chalk](https://www.npmjs.com/package/chalk)：控制台彩色输出



11、[cli-highlight](https://www.npmjs.com/package/cli-highlight)：终端语法高亮



12、[cliui](https://www.npmjs.com/package/cliui)：轻松创建复杂的多列命令行界面，例如，vue --help 输出多列帮助



13、[ora](https://www.npmjs.com/package/ora)：一款优雅的终端加载器（加载动画）



14、[mem-fs](https://www.npmjs.com/package/mem-fs)：是对文件进行读取，存入内存中；[mem-fs-editor](https://www.npmjs.com/package/mem-fs-editor)：是对内存中的文件信息，使用 `ejs` 语法进行编译。最后调用 `commit` 方法输出最终文件。其实这两个工具就是处理 `ejs` 模板语法的



15、[fs-extra](https://www.npmjs.com/package/fs-extra)：对 `node` 的 `fs` 模块进行了封装，更方便地进行文件系统的操作



16、[debug](https://www.npmjs.com/package/debug)：一个轻量的 `javascript` 调试工具



17、[glob](https://www.npmjs.com/package/glob)：支持在 `jsvascript` 中使用 `shell` 模式的文件（路径）匹配



18、[download-git-repo](https://www.npmjs.com/package/download-git-repo)：下载并提取 `git` 仓库



19、[detect-port](https://www.npmjs.com/package/detect-port)：`Node` 中用来做端口检测



20、[simpleGit：用来操作 git





### Node 相关

1、[node-fetch](https://www.npmjs.com/package/node-fetch)：将 `Fetch API` 引入 `Node.js` 的一个轻量级模块



2、[download](https://www.npmjs.com/package/download)： 下载和提取文件



3、[adm-zip](https://www.npmjs.com/package/adm-zip)：用于文件解压缩



4、[ioredis](https://www.npmjs.com/package/ioredis)：适用于 `Node.js` 的强大、注重性能且功能齐全的 `Redis` 工具



5、[file-type](https://www.npmjs.com/package/file-type)：通过检查文件二进制序列的 `magic number` 来判断文件类型，而不是文件后缀（更加准确），参考：https://juejin.cn/post/7131019859227312165





### 单元测试

1、[Jest](https://jestjs.io/zh-Hans/)：`Jest` 是一款优雅、简洁的 `JavaScript` 测试框架



2、[Vitest](https://cn.vitest.dev/)：由 `vite ` 提供支持的极速单元测试框架



3、



### 构建相关

1、[postcss-prefix-selector](https://www.npmjs.com/package/postcss-prefix-selector)：在每个 `CSS` 选择器前面加上自定义名称空间。例如：`'.name' => '.Prefix .name'`



2、



### 框架相关

#### React

1、[rc-table](https://www.npmjs.com/package/rc-table)：一款好用的 `react` 表单组件，`antd` 的 `table` 也是基于这个进行的二次封装，在移动端没有什么现成的 `table` 框架组件，可以使用这个进行简单封装



2、[react-window](https://github.com/bvaughn/react-window)：react 中支持虚拟滚动



