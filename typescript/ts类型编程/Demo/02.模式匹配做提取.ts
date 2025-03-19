// -------------------------------------- 模式匹配做提取
// 对应小册：https://juejin.cn/book/7047524421182947366/section/7048281581428932619

// 模式匹配：提取 value 值
type PTest = Promise<'test'>

type GetValType<T> = T extends Promise<infer value> ? value : never
type ValTypeRes = GetValType<PTest>


// ------------数组类型模式匹配做提取
type Arr = [1, 2, 3]

// 提取第一个元素类型
type GetArrFirst<T extends unknown[]> = T extends [infer First, ...unknown[]] ? First : never 
type ArrFirstType = GetArrFirst<Arr>

// 提取最后一个元素类型
type GetArrLast<T extends unknown[]> = T extends [...unknown[], infer Last] ? Last : never
type ArrLastType = GetArrLast<Arr>

// 提取除了最后一个元素的类型
type GetArrRest<T extends unknown[]> = T extends [] ? [] : T extends [...infer Rest, unknown] ? Rest: never
type ArrRestType = GetArrRest<Arr>
type ArrRestType2 = GetArrRest<[]>


// ------------字符串类型模式匹配

// 判断字符串是否以某个前缀开头
type StartWith<Str extends string, Prefix extends string> = Str extends `${Prefix}${string}` ? true : false
type StartWithRes = StartWith<'test string', 'test'>

// 字符串匹配一个模式类型，提取相关部分，再构成新的类型
type ReplaceStr<
  Str extends string,
  From extends string,
  To extends string
> = Str extends `${infer Prefix}${From}${infer Suffix}`
      ? `${Prefix}${To}${Suffix}` : Str
// 匹配结果
type ReplaceRes = ReplaceStr<'hello !', '!', 'world'>
// 不匹配结果
type ReplaceRes2 = ReplaceStr<'hello', '!', 'world'>

// 实现去掉空白字符串
type TrimRight<Str extends string> = Str extends `${infer Rest}${' ' | '\n' | '\t'}` ? TrimRight<Rest> : Str
type TrimLeft<Str extends string> = Str extends `${' ' | '\n' | '\t'}${infer Rest}` ? TrimLeft<Rest> : Str
type Trim<Str extends string> = TrimRight<TrimLeft<Str>>
// 结果
type StrTrim = Trim<'   sksks   '>


// ------------函数类型模式匹配

// 通过模式匹配来提取参数的类型，即 ts 内置类型 Parameters
type GetParameters<Func extends Function> = Func extends (...args: infer Args) => unknown ? Args : never
type FuncParameters = GetParameters<(name: string, age: number) => void>

// 通过模式匹配提取函数返回值，即 ts 内置类型 ReturnType
type GetReturnType<Func extends Function> = Func extends (...args: any[]) => infer ReturnType ? ReturnType : never
const func = (a: number, b: number) => a + b
type ReturnTypeRes = GetReturnType<typeof func>


// ------------构造器模式匹配
interface Person {
  name: string
}
interface PersonConstructor {
  new (name: string): Person
}

// 模式匹配提取构造器返回值的类型
type GetInstanceType<
  P extends new (...args: any)=> any
> = P extends new (...args: any)=> infer InstanceType ? InstanceType : never
type GetInstanceTypeRes = GetInstanceType<PersonConstructor>

// 模式匹配提取构造器参数的类型
type GetConstructorParameters<
  P extends new (...args: any)=> any
> = P extends new (...args: infer ParametersType)=> any ? ParametersType : never
type GetConstructorParametersRes = GetConstructorParameters<PersonConstructor>


// ------------索引类型模式匹配
type GetRefProps<Props> =
  'ref' extends keyof Props
    ? Props extends { ref: infer value } 
      ? value
      : never
    : never
type GetRefPropsRes = GetRefProps<{ ref: 'form' }>
