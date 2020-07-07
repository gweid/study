# 设计模式

## 设计模式概念

设计模式是一套被反复使用的、多数人知晓的、经过分类编目的、代码设计经验的总结。使用设计模式是为了重用代码、让代码更容易被他人理解、保证代码可靠性。 毫无疑问，设计模式于己于他人于系统都是多赢的，设计模式使代码编制真正工程化，设计模式是软件工程的基石，如同大厦的一块块砖石一样

## 设计原则

1. 单一职责原则

   - 一个程序只做好一件事
   - 如果功能过于复杂就拆分开，每个部分保持独立

2. 开放/封闭原则

   - 对扩展开放，对修改封闭
   - 增加需求时，扩展新代码，而非修改已有代码

3. 里氏替换原则

   - 子类能覆盖父类
   - 父类能出现的地方子类就能出现

4. 接口隔离原则

   - 保持接口的单一独立
   - 类似单一职责原则，这里更关注接口

5. 依赖倒转原则

   - 面向接口编程，依赖于抽象而不依赖于具
   - 使用方只关注接口而不关注具体类的实现

## 常见的设计模式

### 1、外观模式

外观模式是最常见的设计模式之一，它为子系统中的一组接口提供一个统一的高层接口，使子系统更容易使用。简而言之外观设计模式就是把多个子系统中复杂逻辑进行抽象，从而提供一个更统一、更简洁、更易用的 API。很多我们常用的框架和库基本都遵循了外观设计模式，比如 JQuery 就把复杂的原生 DOM 操作进行了抽象和封装，并消除了浏览器之间的兼容问题，从而提供了一个更高级更易用的版本。

例如：浏览器事件绑定

```
let addMyEvent = function (el, ev, fn) {
    if (el.addEventListener) {
        el.addEventListener(ev, fn, false)
    } else if (el.attachEvent) {
        el.attachEvent('on' + ev, fn)
    } else {
        el['on' + ev] = fn
    }
}
```

### 2、代理模式

是为一个对象提供一个代用品或占位符，以便控制对它的访问

假设当 A 在心情好的时候收到花，小明表白成功的几率有 60%，而当 A 在心情差的时候收到花，小明表白的成功率无限趋近于 0。小明跟 A 刚刚认识两天，还无法辨别 A 什么时候心情好。如果不合时宜地把花送给 A，花被直接扔掉的可能性很大，这束花可是小明吃了 7 天泡面换来的。但是 A 的朋友 B 却很了解 A，所以小明只管把花交给 B，B 会监听 A 的心情变化，然后选择 A 心情好的时候把花转交给 A，代码如下

```
let Flower = function() {}
let xiaoming = {
  sendFlower: function(target) {
    let flower = new Flower()
    target.receiveFlower(flower)
  }
}
let B = {
  receiveFlower: function(flower) {
    A.listenGoodMood(function() {
      A.receiveFlower(flower)
    })
  }
}
let A = {
  receiveFlower: function(flower) {
    console.log('收到花'+ flower)
  },
  listenGoodMood: function(fn) {
    setTimeout(function() {
      fn()
    }, 1000)
  }
}
xiaoming.sendFlower(B)
```

### 3、工厂模式

工厂模式定义一个用于创建对象的接口，这个接口由子类决定实例化哪一个类。该模式使一个类的实例化延迟到了子类。而子类可以重写接口方法以便创建的时候指定自己的对象类型。

```
class Product {
    constructor(name) {
        this.name = name
    }
    init() {
        console.log('init')
    }
    fun() {
        console.log('fun')
    }
}

class Factory {
    create(name) {
        return new Product(name)
    }
}

// use
let factory = new Factory()
let p = factory.create('p1')
p.init()
p.fun()
```

### 4、策略模式

策略模式简单描述就是：对象有某个行为，但是在不同的场景中，该行为有不同的实现算法。把它们一个个封装起来，并且使它们可以互相替换

例如：多层 if...else if

```
function doSoming(type) {
    let obj = {
        "aa": "1",
        "bb": "2",
        "cc": "3"
    }

    return obj[type]
}
```

### 5、观察者模式

观察者模式又称发布-订阅模式（Publish/Subscribe Pattern），是我们经常接触到的设计模式，日常生活中的应用也比比皆是，比如你订阅了某个博主的频道，当有内容更新时会收到推送；又比如 Vue 的响应式。观察者模式的思想用一句话描述就是：被观察对象（subject）维护一组观察者（observer），当被观察对象状态改变时，通过调用观察者的某个方法将这些变化通知到观察者。

```
class EventBus {
  constructor() {
    this.events = {}
  }

  // 实现订阅
  on(type, callback) {
    if (!this.events) {
      this.events = Object.create(null)
    }

    if (!this.events[type]) {
      this.events[type] = [callback]
    } else {
      this.events[type].push(callback)
    }
  }

  // 发布
  emit(type, params) {
    if (!['String', 'Object', 'Undefined'].includes(checkType(params))) {
      throw new Error('参数必须是字符串或者对象或者不传')
    }

    this.events[type] && this.events[type].forEach((cb) => cb(params))
  }

  // 删除订阅
  off(type, callback) {
    if (!this.events[type]) return
    this.events[type] = this.events[type].filter((item) => {
      return item !== callback
    })
  }

  // 只执行一次订阅
  once(type, callback) {
    function fn() {
      callback()
      this.off(type, fn)
    }

    this.on(type, fn)
  }
}
```
