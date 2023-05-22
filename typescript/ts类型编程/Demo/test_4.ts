// -------------------------------------- 递归复用做循环
// 对应小册：https://juejin.cn/book/7047524421182947366/section/7048282249464119307

// ------------Promise 的递归复用

// 提取不确定层数的 Promise 中的 Value 类型
type PSource = Promise<Promise<Promise<Record<string, any>>>>
type DeepPromiseValueType<P extends Promise<unknown>> =
  P extends Promise<infer ValueType>
    ? ValueType extends Promise<unknown>
      ? DeepPromiseValueType<ValueType>
      : ValueType
    : never
type DeepPromiseValueTypeRes = DeepPromiseValueType<PSource>

// 对上面进行简化，不约束类型为 Promise
type DeepPromiseValueType2<P> =
  P extends Promise<infer ValueType>
    ? DeepPromiseValueType2<ValueType>
    : P
type DeepPromiseValueType2Res = DeepPromiseValueType2<PSource>


// ------------数组类型的递归复用

// 反转数组
type arr = [1, 2, 3, 4, 5]
type ReverseArr<Arr extends unknown[]> =
  Arr extends [infer First, ...infer Rest]
    ? [...ReverseArr<Rest>, First]
    : Arr
type ReverseArrRes = ReverseArr<arr>

// 查找数组是否存在某个元素
type IncludeArr<Arr extends unknown[], FindItem> =
  Arr extends [infer First, ...infer Rest]
    ? First extends FindItem
      ? true
      : IncludeArr<Rest, FindItem>
    : false
type IncludeArrRes = IncludeArr<[1, 2, 3], 2>

// 数组不确定元素个数的删除
type IsEqual<A, B> = (A extends B ? true : false) & (B extends A ? true : false)
type DelArr<Arr extends unknown[], DelItem, Result extends unknown[] = []> =
  Arr extends [infer First, ...infer Rest]
    ? IsEqual<First, DelItem> extends true
      ? DelArr<Rest, DelItem, Result>
      : DelArr<Rest, DelItem, [...Result, First]>
    : Result
type DelArrRes = DelArr<[1, 2, 2, 3], 2>

// 构造不确定长度的数组
type BuildArray<
  Len extends number,
  Ele = unknown,
  Arr extends unknown[] = []
> = Arr['length'] extends Len
      ? Arr
      : BuildArray<Len, Ele, [...Arr, Ele]>
type BuildArrayRes = BuildArray<3>


// ------------字符串类型的递归复用

// 递归替换重复字符串
type ReplaceAll<Str extends string, From extends string, To extends string> =
  Str extends `${infer Left}${From}${infer Right}`
    ? `${Left}${To}${ReplaceAll<Right, From, To>}`
    : Str
type ReplaceAllRes = ReplaceAll<'ha ha ha', 'ha', 'he'>

// 提取字符串的所有字符组成联合类型
type StringToUnion<Str extends string> =
  Str extends `${infer First}${infer Rest}`
    ? First | StringToUnion<Rest>
    : never
type StringToUnionRes = StringToUnion<'hello'>

// 实现字符串的反转
type ReverseStr<Str extends string> =
  Str extends `${infer First}${infer Rest}`
    ? `${ReverseStr<Rest>}${First}`
    : Str
type ReverseStrRes = ReverseStr<'hello'>

// ------------索引类型的递归复用

// 不确定层数的索引类型添加readonly
type DeepReadonly<Obj extends Record<string, any>> = {
  readonly [Key in keyof Obj]: Obj[Key] extends Record<string, any>
                                 ? Obj[Key] extends Function
                                    ? Obj[Key]
                                    : DeepReadonly<Obj[Key]>
                                 : Obj[Key]
}
type DeepReadonlyRes = DeepReadonly<{ a: { b: { c: () => void, d: string } } }>

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
type DeepReadonly2Res = DeepReadonly2<{ a: { b: { c: () => void, d: string } } }>

