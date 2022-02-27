## ts实用技巧



**1、对象属性报错**

```typescript
const obj = { name: 'jack', age: 18 }

function setName(key) {
		return obj[key]
}
```

上面通过 obj[xxx]  的形式，必然会报错，错误信息如下：

> 元素隐式具有 "any" 类型，因为类型为 "string" 的表达式不能用于索引类型 "xxx"。
> 在类型 "xxx" 上找不到具有类型为 "string" 的参数的索引签名。



做法：

```typescript
const obj = { name: 'jack', age: 18 }

function setName(key) {
		return obj[key as keyof typeof obj]
}
```



**2、对象类型**

有时只知道是个对象，而不确定具体有哪些属性时，大部分人可能会这么用：

```typescript
type ObjectTypes = {
    obj: object; // ❌ bad，不推荐
    obj2: {}; // ❌ bad 几乎类似 object
};
```

推荐改为：

```typescript
type ObjectTypes = {
    objBetter: Record<string, unknown>; // ✅ better，代替 obj: object
    
    // 对于 obj2: {}; 有三种情况：
    obj2Better1: Record<string, unknown>; // ✅ better 同上
    obj2Better2: unknown; // ✅ any value
    obj2Better3: Record<string, never>; // ✅ 空对象
}
```



`Record` 的实现：

```typescript
// 意思就是，泛型 K 的集合作为返回对象的属性，且值类型为 T
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```

官方例子：

```typescript
interface PageInfo {
    title: string;
}

type Page = 'home' | 'about' | 'contact';

const nav: Record<Page, PageInfo> = {
    about: { title: 'about' },
    contact: { title: 'contact' },
    hoem: { title: 'home' },
};
```



**3、函数类型**

函数类型不建议直接给 `Function` 类型，有明确的参数类型、个数与返回值类型最佳

```typescript
type FunctionTypes = {
    onSomething: Function; // ❌ bad，不推荐。任何可调用的函数
    onClick: () => void; // ✅ better ，明确无参数无返回值的函数
    onChange: (id: number) => void; // ✅ better ，明确参数无返回值的函数
    onClick(event: React.MouseEvent<HTMLButtonElement>): void; // ✅ better
};
```



**4、函数返回值类型**

如果你想知道某个函数返回值的类型，可以这么做

```type
// foo 函数原作者并没有考虑会有人需要返回值类型的需求，利用了 TS 的隐式推断。
// 没有显式声明返回值类型，并 export，外部无法复用
function foo(bar: string) {
    return { baz: 1 };
}

// TS 提供了 ReturnType 工具类型，可以把推断的类型吐出
type FooReturn = ReturnType<typeof foo>; // { baz: number }
```




