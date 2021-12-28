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



## 深入类型断言、类型守卫、自定义守卫



### 类型断言

**1、类型断言与类型转换**

```typescript
interface Person {
  name: string
  age: number
}

// 如果不对 person 进行断言，那么 person.name 必然会报错，person 上没有这个属性
// const person = {} as Person
// person.name = "jack"

// 类型转换，这种也能解决 person 上没有这个属性 问题
const person = <Person>{}
person.name = 'jack'
```



**2、不能断言的情况**

```typescript
class People {
  public name: string
  public age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
}

class Stu {
  public name: string
  public age: number
  public work: string

  constructor(name: string, age: number, work: string) {
    this.name = name
    this.age = age
    this.work = work
  }
}

const people = new People('jack', 24) as Stu // success
people.work
const stu = new Stu('jack', 24, '作业') as People // success
```

只有这种相互继承的关系才可以实现相互断言，一旦不是，将会报错，例如：

```typescript
// 将 Stu 的 name 属性去除，就不是继承关系，所以报错
class Stu {
  // public name: string
  public age: number
  public work: string

  constructor(name: string, age: number, work: string) {
    this.name = name
    this.age = age
    this.work = work
  }
}
```



### 类型守卫

定义：在语句的块级作用域【if 语句】缩小变量的一种类型推断行为，常用的：

- 类型判断：typeof

  ```typescript
  interface typeofBar {
    name: string
    age: number | string
  }
  
  function doTypeof (arg: typeofBar) {
    if (typeof arg.age === 'string') {
      console.log('age 是 string 类型')
    }
  }
  ```

- 属性或者方法或者函数判断【属性或方法在对象中是否存在】：in

  ```typescript
  interface Persons {
      name: string
      age: number
  }
  interface Foods {
      name: string
      size: number
  }
  
  function getSomething(arg: Persons | Foods) {
      if ("age" in arg) {
          console.log(arg.age)
      }
      if ("size" in arg) {
          console.log(arg.size)
      }
  }
  ```

- 实例判断：instanceof

  ```typescript
  class Person {
      name = "jack"
      age = 20
  }
  class Foods {
      name = "fish"
      size = 10
  }
  
  function getSomething(arg: Person | Foods) {
      if (arg instanceof Person) {
          console.log(arg.age)
      }
      if (arg instanceof Foods) {
          console.log(arg.size)
      }
  }
  ```

- 字面量相等判断：`==`、`===`、`!=`、`!==`

  ```typescript
  type Foo = {
      kind: "foo" // 字面量
      foo: number
  }
  type Bar = {
      kind: "bar" // 字面量
      bar: "bar"
  }
  function doStuff(arg: Foo | Bar) {
      if (arg.kind === "foo") {
          console.log(arg.foo)
      }
      if (arg.kind === "bar") {
          console.log(arg.bar)
      }
  }
  ```



### 自定义守卫

通过 `type is xxx`这样的类型谓词来进行类型保护

例如下面的例子 `value is object`就会认为如果函数返回 true 那么定义的 value 就是 object 类型

```typescript
function isObject(value: unknown): value is object {
  return typeof value === "object" && value !== null;
}
```



## 深入泛型

可以参考文章：[一文读懂 TypeScript 泛型及应用](https://juejin.cn/post/6844904184894980104)



## 实用技巧



**1、对象属性报错**

```typescript
const obj = { name: 'jack', age: 18 }

function setName(key) {
		return obj[key]
}
```

上面通过 obj[xxx]  的形式，必然会报错，错误信息如下：

> 元素隐式具有 "any" 类型，因为类型为 "string" 的表达式不能用于索引类型 "xxx"。
> 在类型 "xxx" 上找不到具有类型为 "string" 的参数的索引签名。



做法：

```typescript
const obj = { name: 'jack', age: 18 }

function setName(key) {
		return obj[key as keyof typeof obj]
}
```



**2、对象类型**

有时只知道是个对象，而不确定具体有哪些属性时，大部分人可能会这么用：

```typescript
type ObjectTypes = {
    obj: object; // ❌ bad，不推荐
    obj2: {}; // ❌ bad 几乎类似 object
};
```

推荐改为：

```typescript
type ObjectTypes = {
    objBetter: Record<string, unknown>; // ✅ better，代替 obj: object
    
    // 对于 obj2: {}; 有三种情况：
    obj2Better1: Record<string, unknown>; // ✅ better 同上
    obj2Better2: unknown; // ✅ any value
    obj2Better3: Record<string, never>; // ✅ 空对象
}
```



`Record` 的实现：

```typescript
// 意思就是，泛型 K 的集合作为返回对象的属性，且值类型为 T
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```

官方例子：

```typescript
interface PageInfo {
    title: string;
}

type Page = 'home' | 'about' | 'contact';

const nav: Record<Page, PageInfo> = {
    about: { title: 'about' },
    contact: { title: 'contact' },
    hoem: { title: 'home' },
};
```



**3、函数类型**

函数类型不建议直接给 `Function` 类型，有明确的参数类型、个数与返回值类型最佳

```typescript
type FunctionTypes = {
    onSomething: Function; // ❌ bad，不推荐。任何可调用的函数
    onClick: () => void; // ✅ better ，明确无参数无返回值的函数
    onChange: (id: number) => void; // ✅ better ，明确参数无返回值的函数
    onClick(event: React.MouseEvent<HTMLButtonElement>): void; // ✅ better
};
```



**4、函数返回值类型**

如果你想知道某个函数返回值的类型，可以这么做

```type
// foo 函数原作者并没有考虑会有人需要返回值类型的需求，利用了 TS 的隐式推断。
// 没有显式声明返回值类型，并 export，外部无法复用
function foo(bar: string) {
    return { baz: 1 };
}

// TS 提供了 ReturnType 工具类型，可以把推断的类型吐出
type FooReturn = ReturnType<typeof foo>; // { baz: number }
```





## 附录

优秀文章参考：

-  [最全的TypeScript学习指南](https://juejin.cn/post/7031787942691471396)

- [Typescript 在实际开发的应用](https://juejin.cn/post/6986890347313889293)

