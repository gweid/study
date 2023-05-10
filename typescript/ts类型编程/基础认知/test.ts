// --------------------------------- 类型运算

// 条件类型 extends
type isTrue<T> = T extends 2 ? true : false

type res = isTrue<1>

// 类型推导：infer 提取元组类型的第一个元素
type IFirst<Tuple extends unknown[]> = Tuple extends [infer T, ...infer R] ? T : never

type res1 = IFirst<[1, 2]>

// 联合、交叉类型
// 联合
type INum = 1 | 2 | 3

// 交叉
type IObj = { a: number } & { b: string }

type IObj1 = 'aaa' & 'bbb' // never

// 类型映射
type IMap<T> = {
  [key in keyof T]: T[key]
}

// 类型映射 改变值
type IMapVal<T> = {
  [key in keyof T]: [T[key], T[key]]
}
type res2 = IMapVal<{name: 'jack', age: 20}>

// 类型映射 改变索引值key，用 as 运算符，叫做重映射
type IMapKey<T> = {
  [key in keyof T as `${key & string}${key & string}`]: T[key]
}
type res3 = IMapKey<{name: 'jack', age: 20}>