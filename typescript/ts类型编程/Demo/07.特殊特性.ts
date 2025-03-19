// ------------ 判断是否是 any
// any 类型与任何类型的交叉都是 any，也就是 1 & any 结果是 any。
type IsAny<T> = 'dong' extends ('guang' & T) ? true : false
type IsAnyRes = IsAny<''>
type IsAnyRes1 = IsAny<any>


// ------------ 判断是否是 never
type IsNever<T> = [T] extends [never] ? true : false
type IsNeverRes = IsNever<never>
type IsNeverRes1 = IsNever<''>


// ------------ 提取可选索引
type GetOptional<Obj extends Record<string, any>> = {
  [Key in keyof Obj as {} extends Pick<Obj, Key> ? Key : never]: Obj[Key]
}
type GetOptionalRes = GetOptional<{
  name: string,
  age?: number,
  sex?: string
}>


// ------------ 提取必选索引
type GetRequired<Obj extends Record<string, any>> = {
  [Key in keyof Obj as {} extends Pick<Obj, Key>? never : Key]: Obj[Key]
}
type GetRequiredRes = GetRequired<{
  name: string,
  age?: number,
  sex?: string
}>
