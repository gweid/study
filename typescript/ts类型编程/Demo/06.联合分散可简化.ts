// -------------------------------------- 联合分散可简化
// 对应小册：https://juejin.cn/book/7047524421182947366/section/7048282387825819687

// ------------ 分布式条件类型
type Union = 'a' | 'b' | 'c'
type UppercaseUnion<Str extends string> = Str extends 'a' ? Uppercase<Str> : Str
type UppercaseUnionRes = UppercaseUnion<Union>


// ------------ 联合类型转下划线转驼峰
type CamelcaseUnion<Item extends string>
  = Item extends `${infer First}_${infer Right}${infer Rest}`
    ? `${First}${Uppercase<Right>}${CamelcaseUnion<Rest>}`
    : Item
type CamelcaseUnionRes = CamelcaseUnion<'first_name_category' | 'last_name_category'>


// ------------ BEM
// 数组转联合类型
type testUnion = ['name', 'age'][number]

type BEN<
  Block extends string,
  Element extends string[],
  Modifiers extends string[]
> = `${Block}__${Element[number]}--${Modifiers[number]}`
type BENRes = BEN<'login', ['user', 'password'], ['name', 'txt']>
