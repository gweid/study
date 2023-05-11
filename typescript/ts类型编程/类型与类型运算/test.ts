// -------------------------------------- 类型与类型运算
// 对应小册：https://juejin.cn/book/7047524421182947366/section/7048281149034102823

// 约束某个字符串类型是什么开头
type IStr = `#${string}`
// const strRes: IStr = 'kkk' // 报错
const strRes: IStr = '#kkk'

// 条件类型 extends
type isTrue<T> = T extends 2 ? true : false

type res = isTrue<1>

// 类型推导：infer 提取元组类型的第一个元素
type IFirst<Tuple extends unknown[]> = Tuple extends [infer T, ...infer R] ? T : never

type FirstRes = IFirst<[1, 2]>

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
type MapRes = IMap<{name: 'jack', age: 20}>

// 类型映射 改变值
type IMapVal<T> = {
  [key in keyof T]: [T[key], T[key]]
}
type MapValRes = IMapVal<{name: 'jack', age: 20}>

// 类型映射 改变索引值key，用 as 运算符，叫做重映
type IMapKey<T> = {
  [key in keyof T as `${key & string}${key & string}`]: T[key]
}
type MapKeyRes = IMapKey<{name: 'jack', age: 20}>
