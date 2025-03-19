// -------------------------------------- 重新构造做变换
// 对应小册：https://juejin.cn/book/7047524421182947366/section/7048282176701333508

// ------------数组类型重新构造
// 末尾添加一个元素
type PushTuple<T extends unknown[], P> = [...T, P]
type PushTupleRes = PushTuple<[1, 2, 3], 4>

// 前面插入一个元素
type UnshiftTuple<T extends unknown[], P> = [P, ...T]
type UnshiftTupleRes = UnshiftTuple<[1, 2, 3], 0>

// 合并数组
type ZipTuple<
  T extends [unknown, unknown],
  P extends [unknown, unknown]
> = T extends [infer TOne, infer TTwo]
      ? P extends [infer POne, infer PTwo]
        ? [[TOne, POne], [TTwo, PTwo]]
        : []
      : []
type ZipTupleRes = ZipTuple<[1, 2], ['name', 'age']>

// 不固定长度的数组
type ZipAllTuple<
  T extends unknown[],
  P extends unknown[]
> = T extends [infer TOne, ...infer TOther]
      ? P extends [infer POne, ...infer POther]
        ? [[TOne, POne], ...ZipAllTuple<TOther, POther>]
        : []
      : []
type ZipAllTupleRes = ZipAllTuple<[1, 2, 3, 4], ['jack', 'mark', 'june', 'linda']>


// ------------字符串类型重新构造
// 将首字母转为大写
type CapitalizeStr<Str extends string> = Str extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : Str
type CapitalizeStrRes = CapitalizeStr<'test'>

// 将下划线转换为驼峰
type CamelCase<Str extends string> =
  Str extends `${infer Left}_${infer Right}${infer Rest}`
    ? `${Left}${Uppercase<Right>}${CamelCase<Rest>}`
    : Str 
type CamelCaseRes = CamelCase<'test_camel_case'>

// 删除字符串中的某个子串
type DelSubStr<
  Str extends string,
  DelStr extends string
> = Str extends `${infer Prefix}${DelStr}${infer Suffix}` ? `${Prefix}${Suffix}` : Str
type DelSubStrRes = DelSubStr<'testDelStr', 'Del'>

// 递归删除所有匹配的子串
type DelSubStrAll<
  Str extends string,
  DelStr extends string
> = Str extends `${infer Prefix}${DelStr}${infer Suffix}`
    ? DelSubStrAll<`${Prefix}${Suffix}`, DelStr>
    : Str
type DelSubStrAllRes = DelSubStrAll<'testDelDelDelStr', 'Del'>


// ------------函数类型的重新构造
// 在已有的函数类型上添加一个参数
type AppendArgument<Func extends Function, Arg>
  = Func extends (...args: infer Args) => infer ReturnType
    ? (...args: [...Args, Arg]) => ReturnType
    : never
type AppendArgumentRes = AppendArgument<(name: string) => string, number>


// ------------索引类型的重新构造
// 索引类型修改值
type MapValue<T extends object> = {
  [K in keyof T]: [T[K], T[K]]
}
type MapValueRes = MapValue<{ a: 1, b: 2 }>

// 索引类型修改 Key，把索引类型的 Key 变为大写
type UpperKey<T extends object> = {
  [K in keyof T as Uppercase<K & string>]: T[K]
}
type UpperKeyRes = UpperKey <{ name: 'jack' }>

// 将 Key 首字母变为大写
type UpperFirstKey<T extends object> = {
  [
    K in keyof T as K extends `${infer First}${infer Rest}`
      ? `${Uppercase<First>}${Rest}`
      : K
  ]: T[K]
}
type UpperFirstKeyRes = UpperFirstKey<{ name: 'jack' }>

// 模拟实现 Record
type MyRecord<K extends string | number | symbol, T> = {
  [P in K]: T
}
type MyRecordRes = MyRecord<string, any>

// 添加只读修饰符
type ToReadonly<T> = {
  readonly [K in keyof T]: T[K]
}
type ToReadonlyRes = ToReadonly<{ name: 'jack' }>

// 添加可选修饰符
type ToPartial<T> = {
  [K in keyof T]?: T[K]
}
type ToPartialRes = ToPartial<{ name: string }>

// 去除只读修饰符
type DelReadonly<T> = {
  -readonly [K in keyof T]: T[K]
}
type DelReadonlyRes = DelReadonly<{ readonly name: string }>

// 去除可选修饰符
type DelPartial<T> = {
  [K in keyof T]-?: T[K]
}
type DelPartialRes = DelPartial<{ name?: string }>

// 根据值的类型做过滤
type FilterByValueType<T extends Record<string, any>, P> = {
  [K in keyof T as T[K] extends P ? K : never]: T[K]
}
type FilterByValueTypeRes
  = FilterByValueType<{ name: string, age: number, arr: string[] }, string | number>

// 根据 key 的值做过滤
type FilterByKey<T extends Record<string, any>, P> = {
  [K in keyof T as K extends P ? never : K]: T[K]
}
type FilterByKeyRes = FilterByKey<{ name: string, age: string }, 'age'>
