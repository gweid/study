// -------------------------------------- 联合分散可简化
// 对应小册：https://juejin.cn/book/7047524421182947366/section/7048282387825819687

// ------------ 分布式条件类型
type Union = 'a' | 'b' | 'c'
type UppercaseUnion<Str extends string> = Str extends 'a' ? Uppercase<Str> : Str
type UppercaseUnionRes = UppercaseUnion<Union>

// ------------ BEM
// type testUnion = ['name', 'age'][number]

type BEN<
  Block extends string,
  Element extends string[],
  Modifiers extends string[]
> = `${Block}__${Element[number]}--${Modifiers[number]}`
type BENRes = BEN<'login', ['user', 'password'], ['name', 'txt']>