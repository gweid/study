# TS 类型编程



## 为什么 TypeScript 类型编程又叫类型体操

- TypeScript 给 JavaScript 增加了一套类型系统，但并没有改变 JS 的语法，只是做了扩展，是 JavaScript 的超集。
- 这套类型系统支持泛型，也就是类型参数，有了一些灵活性。而且又进一步支持了对类型参数的各种处理，也就是类型编程，灵活性进一步增强。
- 现在 TS 的类型系统是图灵完备的，**能描述各种可计算逻辑。简单点来理解就是循环、条件等各种 JS 里面有的语法它都有，JS 能写的逻辑它都能写**。
- 但是很多类型编程的逻辑写起来比较复杂，因此被戏称为类型体操。



## 类型运算

主要看看 ts 中几种类型运算



### 条件类型

ts 中条件判断是 `extends ? :`，叫做条件类型。其实就是 ts 类型系统里的 if else。例子：

```typescript
type isTrue<T> = T extends 2 ? true : false

type res = isTrue<1>   // false
```

类型运算逻辑都是用来做一些动态的类型的运算的，也就是对类型参数的运算（如上面例子）

这种类型也叫`高级类型`，**高级类型的特点是传入类型参数，经过一系列类型运算逻辑后，返回新的类型。**



### 类型推导

类型推导，infer，主要用来`提取类型的一部分`。

例如：提取元组类型的第一个元素

```typescript
type IFirst<Tuple extends unknown[]> = Tuple extends [infer T, ...infer R] ? T : never

type res1 = IFirst<[1, 2]>
```

第一个 extends 不是条件，条件类型是 `extends ? :`，这里的 extends 是约束的意思，也就是约束类型参数只能是数组类型。

等号后面的 [infer T, ...infer R]，infer T 代表第一个参数，......infer R 展开运算符，剩余参数



### 联合与交叉

联合类型类似 js 里的或运算符 |，但是作用于类型，代表类型可以是几个类型之一

```typescript
type INum = 1 | 2 | 3;
```



交叉类型（Intersection）类似 js 中的与运算符 &，但是作用于类型，代表对类型做合并

```typescript
type IObj = { a: number } & { b: string }
```

需要注意的是，交叉类型对于同一类型可以合并，不同的类型没法合并，会被舍弃

```typescript
type IObj1 = 'aaa' & 'bbb' // never
```

> **never** 代表不可达，比如函数抛异常的时候，返回值就是 never



### 映射类型

对象、class 在 TypeScript 对应的类型是索引类型，`映射类型`可以对索引类型作修改。

例如：

```js
type IMap<T> = {
  [key in keyof T]: T[key]
}
```

- keyof T 是查询索引类型中所有的索引，叫做`索引查询`

- T[Key] 是取索引类型某个索引的值，叫做`索引访问`

- in 是用于遍历联合类型的运算符

```typescript
type IMapVal<T> = {
  [key in keyof T]: [T[key], T[key]]
}
type res2 = IMapVal<{name: 'jack', age: 20}>
```

结果就是：

 <img src="./imgs/img1.png" />

映射类型除了可以修改值，索引 key 也可以做变化。用 as 运算符，叫做`重映射`。例如：

```typescript
type IMapKey<T> = {
  [key in keyof T as `${key & string}${key & string}`]: T[key]
}

type res3 = IMapKey<{name: 'jack', age: 20}>
```

结果是：

 <img src="./imgs/img2.png" />

> 解析一下这里的 & string：
>
> 因为索引类型（对象、class 等）可以用 string、number 和 symbol 作为 key，这里 keyof T 取出的索引就是 string | number | symbol 的联合类型，和 string 取交叉部分就只剩下 string 了。就像前面所说，交叉类型会把同一类型做合并，不同类型舍弃。
>
> 如果不这样做，会不能将 xxx 类型赋值给 xxx 类型的错误



## TS类型编程的套路



### 套路一：模式匹配做提取

#### 认识模式匹配

下面通过一个例子，来了解模式匹配：有如下一个 Promise 类型

```typescript
type PTest = Promise<'test'>
```

如果想要获取 value 的类型，可以：

```typescript
type GetValueType<T> = T extends Promise<infer value> ? value : never
```

> 解析：
>
> 通过 extends 对传入的类型参数 P 做模式匹配，其中值的类型是需要提取的，通过 infer 声明一个局部变量 Value 来保存，如果匹配，就返回匹配到的 Value，否则就返回 never 代表没匹配到。

结果是：<img src="./imgs/img3.png" />

这就是 typescript 的模式匹配：

**Typescript 类型的模式匹配是通过 extends 对类型参数做匹配，结果保存到通过 infer 声明的局部类型变量里，如果匹配就能从该局部变量里拿到提取出的类型。**



#### 数组类型做模式匹配

有如下数组类型

```typescript
type Arr = [1, 2, 3]
```



提取第一个元素的类型：

```typescript
type GetArrFirst<T extends unknown[]> =
		T extends [infer First, ...unknown[]] ? First: never
```

> 解析：
>
> 1、类型参数通过 extends 约束只能是数组类型，数组元素是 unkown 也就是可以是任何值
>
> 对 Arr 做模式匹配，把我们要提取的第一个元素的类型放到通过 infer 声明的 First 局部变量里，后面的元素可以是任何类型，用 unknown 接收，然后把局部变量 First 返回。

结果是：

![](./imgs/img4.png)



同理，可以通过如下方式提取数组类型的最后一个元素类型：

```typescript
type GetArrLast<T extends unknown[]> =
		T extends [...unknown[], infer Last] ? Last : never
```



上面取了首尾元素，当然也可以取剩余的数组，比如取去掉了最后一个元素的数组：

```ty
type GetArrRest<T extends unknown[]> =
		T extends [] ? []
				: T extends [...infer Rest, unknown] ? Rest: never
```

> 解析：
>
> 如果是空数组，就直接返回，否则匹配剩余的元素，放到 infer 声明的局部变量 Rest 里，返回 Rest

结果是：

![](./imgs/img5.png)



#### 字符串类型模式匹配



**例一：判断字符串是否以某个前缀开头**

```typescript
type StartWith<Str extends strirng, Prefix extends string> =
		Str extends `${Prefix}${string}` ? true : false
```

> 用 infer 声明是为了可以后面使用，这里不需要使用，所以不需要 infer 去声明
>
> 解析：
>
> 字符串 Str、匹配的前缀 Prefix 两个类型参数，它们都是 string。
>
> 用 Str 去匹配一个模式类型，模式类型的前缀是 Prefix，后面是任意的 string，如果匹配返回 true，否则返回 false。

结果是：

![](./imgs/img6.png)



**例二：字符串匹配一个模式类型，提取相关部分，再构成新的类型**

```typescript
type ReplaceStr<
	Str extends string,
  From extends string,
  To extends string
> = Str extends `${infer Prefix}${From}${infer Suffix}`
			? `${Prefix}${To}${Suffix}` : Str
```

> 解析：
>
> 传入要替换的字符串 Str、待替换的字符串 From、替换成的字符串 3 个类型参数，通过 extends 约束为都是 string 类型。
>
> 用 Str 去匹配模式串，模式串由 From 和之前之后的字符串构成，把之前之后的字符串放到通过 infer 声明的局部变量 Prefix、Suffix 里。
>
> 用 Prefix、Suffix 加上替换到的字符串 To 构造成新的字符串类型返回。

结果

匹配时：

![](./imgs/img7.png)

不匹配时：

![](./imgs/img8.png)



**例三：实现去掉空白字符串**

因为我们不知道有多少个空白字符，所以只能一个个匹配和去掉，**需要递归**

首先，实现替换右边空白 TrimRight

```typescript
type TrimRight<Str extends string> =
		Str extends `${infer Rest}${' ' | '\n' | '\t'}` ? TrimRight<Rest> : Str
```

> 类型参数 Str 是要 Trim 的字符串。
>
> 如果 Str 匹配字符串 + 空白字符 (空格、换行、制表符)，那就把字符串放到 infer 声明的局部变量 Rest 里。
>
> 把 Rest 作为类型**参数递归** TrimRight，直到不匹配，这时的类型参数 Str 就是处理结果。

接着，实现替换左边空白 TrimLeft

```typescript
type TrimLeft<Str extends string> =
		Str extends `${' ' | '\n' | '\t'}${infer Rest}` ? TrimLeft<Rest> : Str
```

两者结合，就是完整的 Trim

```typescript
type Trim<Str extends string> = TrimRight<TrimLeft<Str>>
```

结果：

![](./imgs/img9.png)



#### 函数类型做模式匹配

函数同样也可以做类型匹配，比如提取参数、返回值的类型



**例一：通过模式匹配来提取参数的类型**

即 ts 内置类型 Parameters 的实现原理

```typescript
type GetParameters<Func extends Function> =
		Func extends (...args: infer Args) => unknown ? Args : never
```

> 解析：
>
> 类型参数 Func 是要匹配的函数类型，通过 extends 约束为 Function。
>
> Func 和模式类型做匹配，参数类型放到用 infer 声明的局部变量 Args 里，返回值可以是任何类型，用 unknown。
>
> 返回提取到的参数类型 Args。

结果是：

![](./imgs/img10.png)



**例二：提取函数的返回类型**

即 ts 内置类型 ReturnType 的实现原理

```typescript
type GetReturnType<Func extends Function> = 
		Func extends (...args: any[]) => infer ReturnType ? ReturnType : never
```

> 解析：
>
> Func 和模式类型做匹配，提取返回值到通过 infer 声明的局部变量 ReturnType 里返回
>
> 这里不能用 unknown，涉及到参数的逆变性质，如果使用 unknown[]，会导致返回 never

结果：

![](./imgs/img11.png)



#### 构造器模式匹配

构造器和函数的区别是，构造器是用于创建对象的，所以可以被 new



有如下代码：

```typescript
interface Person {
  name: string
}
interface PersonConstructor {
  new (name: string): Person
}
```

> 构造器类型可以用 interface 声明，使用 new(): xx 的语法。



**例一：模式匹配提取构造器返回值的类型**

```typescript
type GetInstanceType<
  P extends new (...args: any)=> any
> = P extends new (...args: any)=> infer InstanceType ? InstanceType : never
```

> 解析：
>
> 类型参数 P 是待处理的类型，通过 extends 约束为构造器类型。
>
> 用 P 匹配一个模式类型，提取返回的实例类型到 infer 声明的局部变量 InstanceType 里，返回 InstanceType。

结果：

![](./imgs/img12.png)



**例二：模式匹配提取构造器参数的类型**

```typescript
type GetConstructorParameters<
  P extends new (...args: any)=> any
> = P extends new (...args: infer ParametersType)=> any ? ParametersType : never
```

结果：

![](./imgs/img13.png)



#### 索引类型模式匹配

索引类型也同样可以用模式匹配提取某个索引的值的类型，这个用的也挺多的，比如 React 的 index.d.ts 里的 PropsWithRef 的高级类型，就是通过模式匹配提取了 ref 的值的类型：

![](./imgs/img14.png)



简化下，提取 Props 里 ref 的类型：

```typescript
type GetRefProps<Props> =
  'ref' extends keyof Props
    ? Props extends { ref: infer value } 
      ? value
      : never
    : never
```

> 解析：
>
> 类型参数 Props 为待处理的类型。
>
> 通过 keyof Props 取出 Props 的所有索引构成的联合类型，判断下 ref 是否在其中，也就是 'ref' extends keyof Props。
>
> 如果有 ref 这个索引的话，就通过 infer 提取 Value 的类型返回，否则返回 never。

结果：

![](./imgs/img15.png)



#### 模式匹配总结

就像字符串可以匹配一个模式串提取子组一样，TypeScript 类型也可以匹配一个模式类型提取某个部分的类型。模式匹配的套路在数组、字符串、函数、构造器、索引类型、Promise 等类型中都有大量的应用。

**TypeScript 类型的模式匹配是通过类型 extends 一个模式类型，把需要提取的部分放到通过 infer 声明的局部变量里，后面可以从这个局部变量拿到类型做各种后续处理。**



### 套路二：重新构造做变换

#### 简介

类型编程主要的目的就是对类型做各种转换，那么如何对类型做修改呢？

TypeScript 类型系统支持 3 种可以声明任意类型的变量： type、infer、类型参数。



type 叫做类型别名，其实就是声明一个变量存储某个类型：

```typescript
type PTest = Promise<number>;
```



infer 用于类型的提取，然后存到一个变量里，相当于局部变量：

```typescript
type GetValueType<P> = P extends Promise<infer Value> ? Value : never;
```



类型参数用于接受具体的类型，在类型运算中也相当于局部变量：

```typescript
type IsTwo<T> = T extends 2 ? true : false;
```



但是，严格来说这三种也都不叫变量，因为它们不能被重新赋值。

TypeScript 设计可以做类型编程的类型系统的目的就是为了产生各种复杂的类型，那不能修改怎么产生新类型呢？

答案是**重新构造**。



#### 数组类型的重新构造



**例一：数组添加元素**

```typescript
// 末尾添加一个元素
type PushTuple<T extends unknown[], P> = [...T, P]

// 前面插入一个元素
type UnshiftTuple<T extends unknown[], P> = [P, ...T]
```

结果：

![](./imgs/img16.png)



**例二：合并两个数组**

例如，有两个元组：

```typescript
type tuple1 = [1, 2]
type tuple2 = ['name', 'age']
```

想要合并成：

```typescript
type tuple = [[1, 'name'], [2, 'age']]
```

那么可以：

```typescript
type ZipTuple<
  T extends [unknown, unknown],
  P extends [unknown, unknown]
> = T extends [infer TOne, infer TTwo]
      ? P extends [infer POne, infer PTwo]
        ? [[TOne, POne], [TTwo, PTwo]]
        : []
      : []
```

> 解析
>
> 两个类型参数 T、P 是两个元组，类型是 [unknown, unknown]，代表 2 个任意类型的元素构成的元组。
>
> 通过 infer 分别提取 T 和 P 的元素到 infer 声明的局部变量 TOne、TTwo、POne、PTwo 里。
>
> 用提取的元素构造成新的元组返回即可

结果：

![](./imgs/img17.png)



但是这样只能合并两个元素的数组，下面实现一下任意个元素的：

```typescript
type ZipAllTuple<
  T extends unknown[],
  P extends unknown[]
> = T extends [infer TOne, ...infer TOther]
      ? P extends [infer POne, ...infer POther]
        ? [[TOne, POne], ...ZipAllTuple<TOther, POther>]
        : []
      : []
```

> 解析：
>
> 类型参数 T、P 声明为 unknown[]，也就是元素个数任意，类型任意的数组。
>
> 每次提取 T 和 P 的第一个元素 TOne、POne，剩余的放到 TOther、POther 里。
>
> 用 TOne、POne 构造成新的元组的一个元素，剩余元素继续**递归**处理 TOther、POther。

结果：

![](./imgs/img18.png)



#### 字符串类型的重新构造



**例一：字符串首字母转为大写**

```typescript
type CapitalizeStr<Str extends string> =
		Str extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : Str
```

> 解析：
>
> 声明了类型参数 Str 是要处理的字符串类型，通过 extends 约束为 string。
>
> 通过 infer 提取出首个字符到局部变量 First，提取后面的字符到局部变量 Rest。
>
> 然后使用 TypeScript 提供的内置高级类型 Uppercase 把首字母转为大写，加上 Rest，构造成新的字符串类型返回。

结果：

![](./imgs/img19.png)



**例二：实现下划线转驼峰**

```typescript
type CamelCase<Str extends string> =
  Str extends `${infer Left}_${infer Right}${infer Rest}`
    ? `${Left}${Uppercase<Right>}${CamelCase<Rest>}`
    : Str 
```

> 解析：
>
> 类型参数 Str 是待处理的字符串类型，约束为 string。
>
> 提取 _ 之前和之后的两个字符到 infer 声明的局部变量 Left 和 Right，剩下的字符放到 Rest 里。
>
> 然后把右边的字符 Right 大写，和 Left 构造成新的字符串，剩余的字符 Rest 要继续递归的处理。

结果：

![](./imgs/img20.png)



**例三： 删除字符串某个子串**

```typescript
type DelSubStr<
  Str extends string,
  DelStr extends string
> = Str extends `${infer Prefix}${DelStr}${infer Suffix}`
		? `${Prefix}${Suffix}`
		: Str
```

> 解析：
>
> 类型参数 Str 是待处理的字符串， DelStr 是要删除的字符串，都通过 extends 约束为 string 类型。
>
> 通过模式匹配提取 DelStr 之前和之后的字符串到 infer 声明的局部变量 Prefix、Suffix 中。
>
> 如果不匹配就直接返回 Str。
>
> 如果匹配，那就用 Prefix、Suffix 构造成新的字符串，然后返回

结果：

![](./imgs/img21.png)



但是，上面的处理方式有个缺点，就是当字符串有多处重复的子串需要删除，就没法做到。需要在上面的基础上，加递归处理

```typescript
type DelSubStrAll<
  Str extends string,
  DelStr extends string
> = Str extends `${infer Prefix}${DelStr}${infer Suffix}`
    ? `${DelSubStrAll<`${Prefix}${Suffix}`, DelStr>}`
    : Str
```

> 解析：
>
> 递归调用 DelSubStrAll 去处理

结果：

![](./imgs/img22.png)



#### 函数类型的重新构造

**例一：在已有的函数类型上添加一个参数**

```typescript
type AppendArgument<Func extends Function, Arg>
  = Func extends (...args: infer Args) => infer ReturnType
    ? (...args: [...Args, Arg]) => ReturnType
    : never
```

> 解析：
>
> 类型参数 Func 是待处理的函数类型，通过 extends 约束为 Function，Arg 是要添加的参数类型。
>
> 通过模式匹配提取参数到 infer 声明的局部变量 Args 中，提取返回值到局部变量 ReturnType 中。
>
> 用 Args 数组添加 Arg 构造成新的参数类型，结合 ReturnType 构造成新的函数类型返回。

结果：

![](./imgs/img23.png)



#### 索引类型的重新构造



**例一： 索引类型修改值value**

```typescript
type MapValue<T extends object> = {
  [K in keyof T]: [T[K], T[K]]
}
```

> 解析：
>
> 类型参数 T 是待处理的索引类型，通过 extends 约束为 object。
>
> 用 keyof 取出 T 的索引，作为新的索引类型的索引，也就是 K in keyof T。
>
> 值的类型可以做变换，这里用索引类型的值 T[K] 构造成了三个元素的元组类型 [T[K], T[K]]

结果：

![](./imgs/img24.png)



**例二： 索引类型修改 key**

除了可以对 Value 做修改，也可以对 Key 做修改，使用 as，这叫做`重映射

比如把索引类型的 Key 变为大写

```typescript
type UpperKey<T extends object> = {
  [K in keyof T as Uppercase<K & string>]: T[K]
}
```

> 解析：
>
> 类型参数 T 是待处理的索引类型，通过 extends 约束为 object。
>
> 新的索引类型的索引为 T 中的索引，也就是 K in keyof T，但要做一些变换，也就是 as 之后的。
>
> 通过 Uppercase 把索引 K 转为大写，因为索引可能为 string、number、symbol 类型，而这里只能接受 string 类型，所以要 & string，也就是取索引中 string 的部分。
>
> value 保持不变，也就是之前的索引 K 对应的值的类型 T[K]。

结果：

![](./imgs/img25.png)



如果只是想将 Key 的首字母大写，可以做如下改造：

```typescript
type UpperKey<T extends object> = {
  [
    K in keyof T as K extends `${infer First}${infer Rest}`
      ? `${Uppercase<First>}${Rest}`
      : K
  ]: T[K]
}
```

结果：

![](./imgs/img26.png)



**例三： 模拟实现 Record**

```typescript
type MyRecord<K extends string | number | symbol, T> = {
  [P in K]: T
}
```

结果：

![](./imgs/img27.png)



**例四： 只读与可选的操作**

1、添加只读修饰符

```typescript
type ToReadonly<T> = {
  readonly [K in keyof T]: T[K]
}
```

结果：

![](./imgs/img28.png)



2、添加可选修饰符

```typescript
type ToPartial<T> = {
  [K in keyof T]?: T[K]
}
```

结果：

![](./imgs/img29.png)



3、去除只读修饰符

```typescript
type DelReadonly<T> = {
  -readonly [K in keyof T]: T[K]
}
```

结果：

![](./imgs/img30.png)



4、去除可选修饰符

```typescript
type DelPartial<T> = {
  [K in keyof T]-?: T[K]
}
```

结果：

![](./imgs/img31.png)



**例五：根据值的类型做过滤**

```typescript
type FilterByValueType<T extends Record<string, any>, P> = {
  [K in keyof T as T[K] extends P ? K : never]: T[K]
}
```

> 解析：
>
> 类型参数 T 为要处理的索引类型，通过 extends 约束为索引为 string，值为任意类型的索引类型 Record<string, any>。
>
> 类型参数 P 为要过滤出的值的类型。
>
> 构造新的索引类型，索引为 T 的索引，也就是 Key in keyof T，但要做一些变换，也就是 as 之后的部分。
>
> 如果原来索引的值 T[K] 是 P 类型，索引依然为之前的索引 K，否则索引设置为 never，never 的索引会在生成新的索引类型时被去掉。
>
> 值保持不变，依然为原来索引的值，也就是 T[K]。
>
> 这样就达到了过滤索引类型的索引，产生新的索引类型的目的

结果：

![](./imgs/img32.png)



**例六：根据 Key 值做过滤**

```typescript
type FilterByKey<T extends Record<string, any>, P> = {
  [K in keyof T as K extends P ? never : K]: T[K]
}
```

结果：

![](./imgs/img33.png)



#### 重新构造做变换总结

TypeScript 支持 type、infer、类型参数来保存任意类型，相当于变量的作用。

但其实也不能叫变量，因为它们是不可变的。**想要变化就需要重新构造新的类型，并且可以在构造新类型的过程中对原类型做一些过滤和变换。**

数组、字符串、函数、索引类型等都可以用这种方式对原类型做变换产生新的类型。其中索引类型有专门的语法叫做映射类型，对索引做修改的 as 叫做重映射。



### 套路三：递归复用做循环

提取或构造的数组元素个数不确定、字符串长度不确定、对象层数不确定的时候，就需要递归。

这就是第三个类型体操套路：递归复用做循环。



**递归是把问题分解为一系列相似的小问题，通过函数不断调用自身来解决这一个个小问题，直到满足结束条件，就完成了问题的求解。**

TypeScript 的高级类型支持类型参数，可以做各种类型运算逻辑，返回新的类型，和函数调用是对应的，自然也支持递归。

**TypeScript 类型系统不支持循环，但支持递归。当处理数量（个数、长度、层数）不固定的类型的时候，可以只处理一个类型，然后递归的调用自身处理下一个类型，直到结束条件也就是所有的类型都处理完了，就完成了不确定数量的类型编程，达到循环的效果。**



#### Promise 的递归复用



**例一：提取不确定层数的 Promise 中的 Value 类型**

如下，有：

```typescript
type PSource = Promise<Promise<Promise<Record<string, any>>>>
```

要想提取最里面的 `Record<string, any>`，可以

```typescript
type DeepPromiseValueType<P extends Promise<unknown>> =
  P extends Promise<infer ValueType>
    ? ValueType extends Promise<unknown>
      ? DeepPromiseValueType<ValueType>
      : ValueType
    : never
```

> 解析：
>
> 类型参数 P 是待处理的 Promise，通过 extends 约束为 Promise 类型，value 类型不确定，设为 unknown。
>
> 每次只处理一个类型的提取，也就是通过模式匹配提取出 value 的类型到 infer 声明的局部变量 ValueType 中。
>
> 然后判断如果 ValueType 依然是 Promise类型，就递归处理。
>
> 结束条件就是 ValueType 不为 Promise 类型，那就处理完了所有的层数，返回这时的 ValueType。

结果：

![](./imgs/img34.png)



可以对上面进行简化：

```typescript
type DeepPromiseValueType2<P> =
  P extends Promise<infer ValueType>
    ? DeepPromiseValueType2<ValueType>
    : P
```

不再约束类型参数必须是 Promise，这样就可以少一层判断。结果是一样的：

![](./imgs/img35.png)



#### 数组类型的递归复用



**例一：反转数组**

如下，有数组：

```typescript
type arr = [1, 2, 3, 4, 5]
```

需要反转过来，变成：

```typescript
type arr = [5, 4, 3, 2, 1]
```

实现：

```typescript
type ReverseArr<Arr extends unknown[]> =
  Arr extends [infer First, ...infer Rest]
    ? [...ReverseArr<Rest>, First]
    : Arr
```

> 解析：
>
> 类型参数 Arr 为待处理的数组类型，元素类型不确定，也就是 unknown。
>
> 每次只处理一个元素的提取，放到 infer 声明的局部变量 First 里，剩下的放到 Rest 里。
>
> 用 First 作为最后一个元素构造新数组，其余元素递归的取。
>
> 结束条件就是取完所有的元素，也就是不再满足模式匹配的条件，这时候就返回

结果：

![](./imgs/img36.png)



**例二：查找数组是否包含某个元素**

比如查找 [1, 2, 3] 中是否存在 3，是就返回 true，否则返回 false

```typescript
type IncludeArr<Arr extends unknown[], FindItem> =
  Arr extends [infer First, ...infer Rest]
    ? First extends FindItem
      ? true
      : IncludeArr<Rest, FindItem>
    : false 
```

> 解析：
>
> 类型参数 Arr 是待查找的数组类型，元素类型任意，也就是 unknown。FindItem 待查找的元素类型。
>
> 每次提取一个元素到 infer 声明的局部变量 First 中，剩余的放到局部变量 Rest。
>
> 判断 First 是否是要查找的元素，也就是和 FindItem 相等，是的话就返回 true，否则继续递归判断下一个元素。

结果：

![](./imgs/img37.png)



当然，这里的相等判断可以再严谨点：

```typescript
type IsEqual<A, B> = (A extends B ? true : false) & (B extends A ? true : false)

type IncludeArr<Arr extends unknown[], FindItem> =
  Arr extends [infer First, ...infer Rest]
    ? IsEqual<First, FindItem> extends true
      ? true
      : IncludeArr<Rest, FindItem>
    : false 
```

相等判断依据：A 是 B 的子类型，并且 B 也是 A 的子类型



**例三：数组不确定元素个数的删除**

> 这个需要构造新数组，技巧需要记一下

```typescript
type IsEqual<A, B> = (A extends B ? true : false) & (B extends A ? true : false)

type DelArr<Arr extends unknown[], DelItem, Result extends unknown[] = []> =
  Arr extends [infer First, ...infer Rest]
    ? IsEqual<First, DelItem> extends true
      ? DelArr<Rest, DelItem, Result>
      : DelArr<Rest, DelItem, [...Result, First]>
    : Result
```

> 解析：
>
> 类型参数 Arr 是待处理的数组，元素类型任意，也就是 unknown[]。类型参数 DelItem 为待查找的元素类型。类型参数 Result 是构造出的新数组，默认值是 []。
>
> 通过模式匹配提取数组中的一个元素的类型，如果是 DelItem 类型的话就删除，也就是不放入构造的新数组，直接返回之前的 Result。
>
> 否则放入构造的新数组，也就是再构造一个新的数组 [...Result, First]。
>
> 直到模式匹配不再满足，也就是处理完了所有的元素，返回这时候的 Result

结果：

![](./imgs/img38.png)



**例四：构造不确定长度的数组**

```typescript
type BuildArray<
  Len extends number,
  Ele = unknown,
  Arr extends unknown[] = []
> = Arr['length'] extends Len
      ? Arr
      : BuildArray<Len, Ele, [...Arr, Ele]>
```

> 解析：
>
> 类型参数 Length 为数组长度，约束为 number。类型参数 Ele 为元素类型，默认值为 unknown。类型参数 Arr 为构造出的数组，默认值是 []。
>
> 每次判断下 Arr 的长度是否到了 Length，是的话就返回 Arr，否则在 Arr 上加一个元素，然后递归构造。

结果：

![](./imgs/img39.png)



#### 字符串类型的递归复用



**例一：递归替换重复字符串**

```typescript
type ReplaceAll<Str extends string, From extends string, To extends string> =
  Str extends `${infer Left}${From}${infer Right}`
    ? `${Left}${To}${ReplaceAll<Right, From, To>}`
    : Str
```

> 解析：
>
> 类型参数 Str 是待处理的字符串类型，From 是待替换的字符，To 是替换到的字符。
>
> 通过模式匹配提取 From 左右的字符串到 infer 声明的局部变量 Left 和 Right 里。
>
> 用 Left 和 To 构造新的字符串，剩余的 Right 部分继续递归的替换。
>
> 结束条件是不再满足模式匹配，也就是没有要替换的元素，这时就直接返回字符串 Str。

结果：

![](./imgs/img40.png)



**例二：提取字符串的所有字符组成联合类型**

如果想把字符串字面量类型的每个字符都提取出来组成联合类型，也就是把 'hello' 转为 'h' | 'e' | 'l' | 'o'。可以：

```typescript
type StringToUnion<Str extends string> =
  Str extends `${infer First}${infer Rest}`
    ? First | StringToUnion<Rest>
    : never
```

> 解析：
>
> 类型参数 Str 为待处理的字符串类型，通过 extends 约束为 string。
>
> 通过模式匹配提取第一个字符到 infer 声明的局部变量 First，其余的字符放到局部变量 Rest。
>
> 用 First 构造联合类型，剩余的元素递归的取。
>
> 这样就完成了不确定长度的字符串的提取和联合类型的构造

结果：

![](./imgs/img41.png)



**例三：实现字符串的反转**

```typescript
type ReverseStr<Str extends string> =
  Str extends `${infer First}${infer Rest}`
    ? `${ReverseStr<Rest>}${First}`
    : Str
```

结果：

![](./imgs/img42.png)



#### 索引类型的递归复用



**例一：不确定层数的索引类型添加readonly**

```typescript
type DeepReadonly<Obj extends Record<string, any>> = {
  readonly [Key in keyof Obj]: Obj[Key] extends Record<string, any>
                                 ? Obj[Key] extends Function
                                    ? Obj[Key]
                                    : DeepReadonly<Obj[Key]>
                                 : Obj[Key]
}
```

> 解析：
>
> 类型参数 Obj 是待处理的索引类型，约束为 Record<string, any>，也就是索引为 string，值为任意类型的索引类型。
>
> 索引映射自之前的索引，也就是 Key in keyof Obj，只不过加上了 readonly 的修饰。
>
> 值要做下判断，如果是 object 类型并且还是 Function，那么就直接取之前的值 Obj[Key]。
>
> 如果是 object 类型但不是 Function，那就是说也是一个索引类型，就递归处理 DeepReadonly<Obj[Key]>。
>
> 否则，值不是 object 就直接返回之前的值 Obj[Key]。

结果：

![](./imgs/img43.png)



但是，会发现，这里面的类型没有计算，为什么呢？

**因为 ts 的类型只有被用到的时候才会做计算。**

所以可以在前面加上一段 Obj extends never ? never 或者 Obj extends any 等，从而触发计算：

```typescript
type DeepReadonly2<Obj extends Record<string, any>> =
  Obj extends any
    ? {
        readonly [Key in keyof Obj]: Obj[Key] extends Record<string, any>
                                      ? Obj[Key] extends Function
                                          ? Obj[Key]
                                          : DeepReadonly2<Obj[Key]>
                                      : Obj[Key]
      }
    : never
```

结果：

![](./imgs/img44.png)



#### 递归复用做循环总结

递归是把问题分解成一个个子问题，通过解决一个个子问题来解决整个问题。形式是不断的调用函数自身，直到满足结束条件。

在 TypeScript 类型系统中的高级类型也同样支持递归，**在类型体操中，遇到数量不确定的问题，要条件反射的想到递归。** 比如数组长度不确定、字符串长度不确定、索引类型层数不确定等。



### 套路四：数组长度做计数

TypeScript 类型系统没有加减乘除运算符，怎么做数值运算呢？

TypeScript 类型系统中没有加减乘除运算符，但是可以通过构造不同的数组然后取 length 的方式来完成数值计算，把数值的加减乘除转化为对数组的提取和构造。

这是类型体操的第四个套路：数组长度做计数。



#### 数组长度实现加减乘除



**例一：加法**



### 套路五：联合分散可简化

联合类型在类型编程中是比较特殊的，TypeScript 对它做了专门的处理，写法上可以简化，但也增加了一些认知成本。

这是类型体操的第五个套路：联合分散可简化



#### 分布式条件类型

**当类型参数为联合类型，并且在条件类型左边直接引用该类型参数的时候，TypeScript 会把每一个元素单独传入来做类型运算，最后再合并成联合类型，这种语法叫做分布式条件类型。**



例如：

```typescript
type Union = 'a' | 'b' | 'c'
```

如果想要把其中的 a 大写，可以：

```typescript
type UppercaseUnion<Str extends string> = Str extends 'a' ? Uppercase<Str> : Str
```

结果：

![](./imgs/img45.png)



这样确实是简化了类型编程逻辑的，不需要递归提取每个元素再处理。

TypeScript 之所以这样处理联合类型也很容易理解，因为联合类型的每个元素都是互不相关的，不像数组、索引、字符串那样元素之间是有关系的。所以设计成了每一个单独处理，最后合并。

知道了 TypeScript 怎么处理的联合类型，趁热打铁来练习一下：



#### BEM

bem 是 css 命名规范，用 block__element--modifier 的形式来描述某个区块下面的某个元素的某个状态的样式。

那么我们可以写这样一个高级类型，传入 block、element、modifier，返回构造出的 class 名。例如：

```typescript
type BENRes = BEN<'login', ['user', 'password'], ['name', 'txt']>
```

它的实现就是三部分的合并，但传入的是数组，要递归遍历取出每一个元素来和其他部分组合，这样太麻烦了。

而如果是联合类型就不用递归遍历了，因为联合类型遇到字符串也是会单独每个元素单独传入做处理。

数组转联合类型可以这样写：

![](./imgs/img47.png)



那么，BEM 的实现如下：

```typescript
type BEN<
  Block extends string,
  Element extends string[],
  Modifiers extends string[]
> = `${Block}__${Element[number]}--${Modifiers[number]}`
```

> 解析：
>
> 类型参数 Block、Element、Modifiers 分别是 bem 规范的三部分，其中 Element 和 Modifiers 都可能多个，约束为 string[]。
>
> 构造一个字符串类型，其中 Element 和 Modifiers 通过索引访问来变为联合类型。
>
> 字符串类型中遇到联合类型的时候，会每个元素单独传入计算

结果：

![](./imgs/img46.png)







































