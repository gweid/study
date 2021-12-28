/**
 * 类型断言
 */

// ----------------------- 类型断言与类型转换
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


// ----------------------- 不能断言的情况
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

// 只有这种相互继承的关系才可以实现相互断言
const people = new People('jack', 24) as Stu // success
people.work
const stu = new Stu('jack', 24, '作业') as People // success

interface bar {
  name: string
  age: number
}

const func = <T>(age: T): T => {
  return age
}

export {}