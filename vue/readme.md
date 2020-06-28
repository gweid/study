# Vue 相关面试题

#### MVVM

-   MVVM：数据驱动视图，与传统的 jquery 的区别是不需要关心怎么去操作 document 去改变页面的显示，而是内部封装了对 document 的操作，仅仅需要对业务逻辑进行处理，数据改变会响应式地同步更新页面。

-   M: model，数据层，在 Vue 内部就相当于 dada，主要对数据的存储； V：view，视图层，在 Vue 中相当于 Template 里面的 html；VM：control，控制层，在 Vue 里面相当于 Methods 这一类驱动数据改变视图

#### VueRouter 中 hash 模式和 history 模式的区别

-   1.最明显的区别是 hash 在 url 中会有 #, history 没有
-   2.URL 中 hash 值只是客户端的一种状态，也就是说当向服务器端发出请求时，hash 部分不会被发送。hash 主要是依赖于 onhashchange 事件监听 location.hash 的改变，然后根据 hash 变化来实现更新页面部分内容的操作
-   3.history 主要依赖于 HTML5 中的两个方法, pushState 和 replaceState 可以改变 url，但是不会发送请求。唯一不同的是，前者是新增一个历史记录，后者是直接替换当前的历史记录
-   4.当真正需要通过 URL 向后端发送 HTTP 请求的时候，比如常见的用户手动输入 URL 后回车，或者是刷新(重启)浏览器，这时候 history 模式需要后端的支持。因为 history 模式下，前端的 URL 必须和实际向后端发送请求的 URL 一致，例如有一个 URL 是带有路径 path 的 (例如 www.lindaidai.wang/blogs/id)，如果后端没有对这个路径做处理的话，就会返回 404 错误。所以需要后端增加一个覆盖所有情况的候选资源，一般会配合前端给出的一个 404 页面。

#### VueRouter 导航方式

-   声明式(实质上内部还是调用了 router.push() 或者 router.replace())

```
<router-link to="./home" />
```

-   编程式

```
this.$router.push('./home')
```

#### 路由的懒加载

路由懒加载的含义：把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件

实现：结合 Vue 的异步组件和 Webpack 的代码分割功能

```
const Foo = () => import('./Foo.vue')
const router = new VueRouter({ routes: [ { path: '/foo', component: Foo } ]})
```

#### Vue 的优点和缺点

-   1.组件化
-   2.响应式开发
-   3.虚拟 DOM

#### Vue 的 v-if 与 v-show 的区别

-   1.v-show 主要是操作 css 的 display 的属性达到显示跟隐藏的效果
-   2.v-if 是会真正对元素进行增加跟删除
-   3.所以对于频繁切换的内容建议用 v-show

#### Vue 的嵌套路由

路由嵌套会将其他组件渲染到该组件内，而不是进行整个页面跳转

#### keep-alive

这个主要就是对切出去的路由进行缓存，使他保存在内存中，从而避免重新渲染

```
// 只缓存组件 name 为 a 或者 b 的组件
<keep-alive include="a,b">
  <component />
</keep-alive>

// 组件 name 为 c 的组件不缓存(可以保留它的状态或避免重新渲染)
<keep-alive exclude="c">
  <component />
</keep-alive>

// 如果同时使用 include, exclude, 那么 exclude 优先于 include， 下面的例子只缓存 a 组件
<keep-alive include="a,b" exclude="b">
  <component />
</keep-alive>

// 如果缓存的组件超过了 max 设定的值 5，那么将删除第一个缓存的组件
<keep-alive exclude="c" max="5">
  <component />
</keep-alive>

// 配合 router 使用
<keep-alive>
    <router-view>
        <!-- 所有路径匹配到的视图组件都会被缓存！ -->
    </router-view>
</keep-alive>
```

#### route 和 router 的区别

-   1.route 主要是获取路由信息的，例如 path，fullPath，query，param 等
-   2.router 是路由的实例对象，可以用来进行路由的跳转

#### router-link 的一些常用属性

-   1.to：需要跳转的路径

```
<router-link :to="{path: 'foo1'}" >路由1</router-link>
```

-   2.replace：设置这个属性其实也是替换的作用，会调用 router.replace() 而不是 router.push()，作用是导航后不会留下 history 记录

```
<router-link to="/foo1" replace>路由1</router-link>
```

-   3.tag：指定 router-link 会被渲染成什么标签，默认是 a 标签

```
<router-link to="/foo1" tag='li'>路由1</router-link>
```

-   4.active-class：设置 active-class 属性是当 router-link 中的链接被激活是，添加 css 类名

```
<router-link active-class='active_class' :to="{path: 'foo1'}" >路由1</router-link>
```

#### v-model

#### 响应式系统

#### 虚拟 DOM

#### Vue 中的 key 的作用

key 是为 Vue 中 vnode 的唯一标记，通过这个 key，我们的 diff 操作可以更准确、更快速。

#### Vue 中常用事件修饰符

-   stop：阻止事件冒泡
-   prevent：阻止默认行为
-   once：事件只触发一次
-   self：事件只在自己身上触发
-   enter：键盘回车
-   esc：退出键
-   trim：去除首尾空格
-   lazy：由监听 oninput 事件转为 onchange 事件
-   number：尽量将文本框中的值转为数字，能转就转，不能转就不转

#### Vue 中为什么不能使用 a 标签

因为用 vue 做的都是单页应用，就相当于只有一个主的 index.html 页面，所以写的 a 标签是不起作用的，必须使用 vue-router 来进行管理。

#### 组件的 data 为什么是一个函数

因为 Vue 最终是单页面的，并且 Js 的机制，对象属于引用类型，如果组件的 data 是一个对象，那么会相互影响，使用函数，那么每个实例可以维护一份被返回对象的独立的拷贝，组件实例之间的 data 属性值不会互相影响

#### 组件通讯

-   props，\$emit
-   $attr，$listeners
-   \$refs
-   slot
-   $parent，$children
-   provide，inject
-   EventBus
-   Vuex

#### 递归组件

递归组件是通过组件的 name 选项来调用自身，使用时要注意确保递归调用是条件性的 (例如使用一个最终会得到 false 的 v-if)，不然会陷入死循环

-   组件必须要含有 name 这个属性，如果没有 name 这个属性会造成控件自身不能调用自身
-   要确保递归的调用有终止条件，防止内存溢出

```
// 数据
var demoData = [
  {
    'id': '1',
    'menuName': '基础管理',
    'menuCode': '10',
    'children': [
      {
        'menuName': '用户管理',
        'menuCode': '11'
      },
      {
        'menuName': '角色管理',
        'menuCode': '12',
        'children': [
          {
            'menuName': '管理员',
            'menuCode': '121'
          },
        ]
      },
      {
        'menuName': '权限管理',
        'menuCode': '13'
      }
    ]
  },
  {
    'id': '2',
    'menuName': '商家管理',
    'menuCode': '',
    'children': []
  }
]

// 定义组件 treeMenu
<template>
  <li>
    <span @click="toggle">
      <i v-if="hasChild" class="icon" v-bind:class="[open ? 'folder-open': 'folder' ]"></i>
      <i v-if="!hasChild" class="icon file-text"></i>
      {{model.menuName}}
    </span>
    <ul v-show="open" v-if="hasChild">
      <tree-menu v-for="(item,index) in model.children"  v-bind:model="item" v-bind:key="index"></tree-menu>
    </ul>
  </li>
</template>

<script>
  export default {
    name: "treeMenu",
    props: ['model'],
    data(){
      return {
        open:false
      }
    },
    computed:{
      hasChild(){
        return this.model.children && this.model.children.length
      }
    },
    methods:{
      toggle(){
        if(this.hasChild){
          this.open = !this.open
        }
      }
    }
  }
</script>

// 使用 treeMenu
<template>
  <div class="tree-menu">
    <ul v-for="menuItem in theModel">
      <my-tree :model="menuItem"></my-tree>
    </ul>
  </div>
</template>

<script>
  import testData from './testdata';
  import myTree from './treeMenu';

  export default {
    name: "side-bar",
    components: {
      myTree
    },
    data() {
      return {
        theModel: testData
      }
    }
  }
</script>
```

#### 路由跳转，name 形式和 path 形式的区别

```
// 字符串
this.$router.push('home')

// 命名的路由
this.$router.push({
  name: 'user',
  params: {userId: '123'}
})
//接收参数
this.userId = this.$route.params.userId

// 带查询参数，变成 /user?userId=123
this.$router.push({
  path: '/user',
  query: {userId: '123'}
})
//接收
this.userId = this.$route.query.userId;
```

**区别**

-   name 传参用 params，path 传参用 query
-   用 name 跳转后参数不会携带到 url 上，用 query 传参参数会携带到 url 上

#### 导航守卫

-   全局：beforeEach、afterEach
-   路由独享守卫：beforeEnter
-   组件内路由守卫：beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave

#### watch 跟 computed 分别适合哪些场景使用

-   当我们需要进行数值计算，并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时，都要重新计算；主要用于同步对数据的处理。比如购物车
-   当我们需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用  watch  选项允许我们执行异步操作 ( 访问一个 API )，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。主要用于事件的派发,可异步。这些都是计算属性无法做到的。比如侦听路由变化

#### Proxy 与 Object.defineProperty

-   Proxy 可以直接监听对象而非属性；
-   Proxy 可以直接监听数组的变化；
-   Proxy 有多达 13 种拦截方法,不限于 apply、ownKeys、deleteProperty、has 等等是 Object.defineProperty 不具备的；
-   Proxy 返回的是一个新对象,我们可以只操作新的对象达到目的,而 Object.defineProperty 只能遍历对象属性直接修改；
-   Proxy 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利；

#### Vue 的性能优化

[Vue 的性能优化](https://juejin.im/post/5d548b83f265da03ab42471d#heading-14)

**1、代码层面优化：**

-   v-if 和 v-show 区分使用场景
-   computed 和 watch 区分使用场景
-   v-for 遍历必须为 item 添加 key，且避免同时使用 v-if
-   长列表性能优化
-   事件的销毁
-   图片资源懒加载
-   路由懒加载
-   第三方插件的按需引入
-   优化无限列表性能
-   服务端渲染 SSR or 预渲染

**2、webpack 层面优化：**

-   Webpack 对图片进行压缩
-   减少 ES6 转为 ES5 的冗余代码
-   提取公共代码
-   模板预编译
-   提取组件的 CSS
-   优化 SourceMap
-   构建结果输出分析
-   Vue 项目的编译优化

**基础 web 技术优化：**

-   开启 gzip 压缩
-   浏览器缓存
-   CDN 的使用
-   使用 Chrome Performance 查找性能瓶颈

#### vue 动画

v-enter：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。

v-enter-active：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。

v-enter-to: 2.1.8 版及以上 定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 v-enter 被移除)，在过渡/动画完成之后移除。

v-leave: 定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。

v-leave-active：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。

v-leave-to: 2.1.8 版及以上 定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave 被删除)，在过渡/动画完成之后移除。

#### Vue 自定义指令

-   注册

```
// 全局注册
Vue.directive('color', {
    inserted: function (el,binding) {
        el.style.color=binding.value;
    }
})

<p v-color='color'></p>

data() {
  return {
    color: 'red'
  }
}

// 局部注册
<template>
    <div>
        <h1 v-color="color">自定义指令</h1>
    </div>
</template>
<script>
export default {
    data() {
        return {
            color:'red'
        }
    },
    directives:{
        color:{
            inserted:function(el,binding){
                el.style.color=binding.value;
            }
        }
    }
}
</script>
```

-   自定义指令钩子函数

    1.bind：只调用一次，在指令第一次绑定到元素时调用，可以在这个钩子函数中进行初始化设置;

    2.inserted：被绑定元素插入父节点时调用,在 bind 后面调用；

    3.update：所在绑定的组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。调用时指令的值不一定发生改变，通过比较更新前后的值来忽略不必要的模板更新

-   钩子函数的参数

    1.el: 指令所绑定的元素，可以用来直接操作 DOM

    2.binding: 一个对象其中包括以下几个属性

    -   name：指令名，不包括 v- 前缀
    -   value：指令的绑定值，例：v-my-directive="1 + 1"中，绑定值为 2

#### Vuex 和单纯的全局对象区别

-   Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
-   不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。

#### Vuex 的 Mutation 为什么不能做异步操作

-   Vuex 中所有的状态更新的唯一途径都是 mutation，异步操作通过 Action 来提交 mutation 实现，这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。
-   每个 mutation 执行完成后都会对应到一个新的状态变更，这样 devtools 就可以打个快照存下来，然后就可以实现 time-travel 了。如果 mutation 支持异步操作，就没有办法知道状态是何时更新的，无法很好的进行状态的追踪，给调试带来困难

#### Vuex 的 Action 有没有返回值

-   store.dispatch 可以处理被触发的 action 的处理函数返回的 Promise，并且 store.dispatch 仍旧返回 Promise
-   Action 通常是异步的，要知道 action 什么时候结束或者组合多个 action 以处理更加复杂的异步流程，可以通过定义 action 时返回一个 promise 对象，就可以在派发 action 的时候就可以通过处理返回的 Promise 处理异步流程

#### Vue3 虚拟 DOM 与 Vue2 的虚拟 DOM 对比

-   对于模板编译标记的静态节点，Vue2 中依然使用\_c 新建成 vdom，在 diff 的时候需要对比，有一些额外的性能损耗

```
<div id="app">
    <h1>技术摸鱼</h1>
    <p>今天天气真不错</p>
    <div>{{name}}</div>
</div>


function render() {
  with(this) {
    return _c('div', {
      attrs: {
        "id": "app"
      }
    }, [_c('h1', [_v("技术摸鱼")]), _c('p', [_v("今天天气真不错")]), _c('div', [_v(
      _s(name))])])
  }
}
```

-   在 Vue3 中，最后一个\_createVNode 第四个参数 1，只有带这个参数的，才会被真正的追踪，静态节点不需要遍历

```
import { createVNode as _createVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createBlock as _createBlock } from "vue"

export function render(_ctx, _cache) {
  return (_openBlock(), _createBlock("div", { id: "app" }, [
    _createVNode("h1", null, "技术摸鱼"),
    _createVNode("p", null, "今天天气真不错"),
    _createVNode("div", null, _toDisplayString(_ctx.name), 1 /* TEXT */)
  ]))
}
```

-   事件缓存：传入的事件会自动生成并缓存一个内联函数在 cache 里，变为一个静态节点。这样就算我们自己写内联函数，也不会导致多余的重复渲染

```
<div id="app">
  <button @click="handleClick">戳我</button>
</div>

export function render(_ctx, _cache) {
  return (_openBlock(), _createBlock("div", { id: "app" }, [
    _createVNode("button", {
      onClick: _cache[1] || (_cache[1] = $event => (_ctx.handleClick($event)))
    }, "戳我")
  ]))
}

// 变为
<div id="app">
  <button @click="()=>foo()">戳我</button>
</div>
```

#### 组件设计原则

-   1: 容错处理, 这个要做好, 极端场景要考虑到, 不能我传错了一个参数你就原地爆炸
-   2: 缺省值(默认值)要有, 一般把应用较多的设为缺省值
-   3: 颗粒化, 把组件拆分出来.
-   4: 一切皆可配置, 如有必要, 组件里面使用中文标点符号, 还是英文的标点符号, 都要考虑到
-   5: 场景化, 如一个 dialog 弹出, 还需要根据不同的状态封装成 success, waring 等
-   6: 有详细的文档/注释和变更历史, 能查到来龙去脉, 新版本加了什么功能是因为什么
-   7: 组件名称, 参数 prop, emit, 名称设计要通俗易懂, 最好能做到代码即注释这种程度
-   8: 可拓展性, 前期可能不需要这个功能, 但是后期可能会用上, 要预留什么, 要注意什么, 心里要有逼数
-   9: 规范化,我这个 input 组件, 叫 on-change, 我另外一个 select 组件叫 change, 信不信老子捶死你
-   10: 分阶段: 不是什么都要一期开发完成看具体业务, 如果一个 select, 我只是个简单的 select 功能, 什么 multi 老子这个版本压根不需要, 别 TM 瞎折腾! 给自己加戏

#### Vue3 的优点

**1、性能方面：**

-   重写了虚拟 Dom 的实现
-   编译模板的优化
-   更高效的组件初始化
-   update 性能提高 1.3~2 倍
-   SSR 速度提高了 2~3 倍

**2、支持 tree-shaking**

可以将无用模块“剪辑”，仅打包需要的

**3、Composition API：**

**4、typescript 支持：**

### Vue3 的 Composition API

#### 完整 API

```
const {
  createApp,
  reactive, // 创建响应式数据对象
  ref, // 创建一个响应式的数据对象
  toRefs, // 将响应式数据对象转换为单一响应式对象
  isRef, // 判断某值是否是引用类型
  computed, // 创建计算属性
  watch, // 创建watch监听
  // 生命周期钩子
  onMounted,
  onUpdated,
  onUnmounted,
} = Vue
```

#### 生命周期钩子替代

| Vue2          | Vue3            |
| ------------- | --------------- |
| beforeCreate  | setup(替代)     |
| created       | setup(替代)     |
| beforeMount   | onBeforeMount   |
| mounted       | onMounted       |
| beforeUpdate  | onBeforeUpdate  |
| beforeDestroy | onBeforeUnmount |
| destroyed     | onUnmounted     |
| errorCaptured | onErrorCaptured |

#### setup: 在 beforeCreate 之后 created 之前执行

```
setup(props,context){
    console.log('setup....',)
    console.log('props',props) // 组件参数
    console.log('context',context) // 上下文对象,就是 Vue 本身，可以调用 Vue 上的方法，比如 Vue.$emit()
}
```

#### reactive: 接受一个普通对象，返回一个响应式数据对象

```
<template>
  <div>{{ object.foo }}</div>
</template>

<script>
import { reactive } from 'vue'

export default {
  setup() {
    const object = reactive({ foo: 'bar' })

    // 暴露至模板中
    return {
      object
    }
  }
}
</script>
```

#### ref：ref 函数接收一个用于初始化的值并返回一个响应式的和可修改的 ref 对象。该 ref 对象存在一个 value 属性，value 保存着 ref 对象的值

```
<template>
  <div class="tf">
    <div>
      <!--在模板中使用时不需要使用 count.value, 会自动解包-->
      <p>{{count}}</p>
    </div>
  </div>
</template>
<script>
  import {ref, reactive} from 'vue'

  export default {
    setup() {
      const count = ref(0)

      count.value++

      return { count }
    },
  }
</script>
```

#### isRefs: 判断一个对象是否为 ref 代理对象

```
const unwrapped = isRef(foo) ? foo.value : foo
```

#### toRefs: 将一个 reactive 代理对象打平，转换为 ref 代理对象，使得对象的属性可以直接在 template 上使用

```
<template>
  <p>{{ obj.count }}</p>
  <p>{{ count }}
  <p>{{ value }}
</template>

<script>
export default {
  setup() {
    const obj = reactive({
        count: 0,
        value: 100
    })
    return {
      obj,
      // 如果这里的 obj 来自另一个文件，
      // 这里就可以不用包裹一层 key，可以将 obj 的元素直接平铺到这里
      // template 中可以直接获取属性
      ...toRefs(obj)
    }
  }
}
</script>
```

**toRefs 在 setup 或者 Composition Function 的返回值特别有用**

```
import {reactive, toRefs} from 'vue'
function useFeatureX() {
  const state = reactive({
    foo: 1,
    bar: 2
  })
  return state
}
function useFeature2() {
  const state = reactive({
    a: 1,
    b: 2
  })
  return toRefs(state)
}

export default {
  setup() {
    // 使用解构之后 foo 和 bar 都丧失响应式
    const { foo, bar } = useFeatureX()
    // 即便使用了解构也不会丧失响应式
    const {a, b} = useFeature2()
    return {
      foo,
      bar
    }
  }
}
```

#### readonly:

使用 readonly 函数，可以把 普通 object 对象、reactive 对象、ref 对象 返回一个只读对象。返回的 readonly 对象，一旦修改就会在 console 有 warning 警告。程序还是会照常运行，不会报错

```
const original = reactive({ count: 0 })

const copy = readonly(original)
```

#### watch

-   指定依赖源

```
<template>
  <div>
    state2.count: <input type="text" v-model="state2.count">
    {{state2.count}}<br/><br/>
    ref2: <input type="text" v-model="ref2">{{ref2}}<br/><br/>
  </div>
</template>
<script>
  import {watch, reactive, ref} from 'vue'

  export default {
    setup() {
      const state2 = reactive({count: ''})
      const ref2 = ref('')

      // 直接指定ref依赖源
      watch(ref2,() => {
        console.log('ref2.value',ref2.value)
      })

      return {state, inputRef, state2, ref2}
    }
  }
</script>
```

-   多个数据源

```
<template>
  <div>
    <p>
      <input type="text" v-model="state.a"><br/><br/>
      <input type="text" v-model="state.b"><br/><br/>
    </p>
    <p>
      <input type="text" v-model="ref1"><br/><br/>
      <input type="text" v-model="ref2"><br/><br/>
    </p>
  </div>
</template>

<script>
  import {reactive, ref, watch} from 'vue'

  export default {
    setup() {
      const state = reactive({a: 'a', b: 'b'})
      // state.a和state.b任意一个改变都会触发watch的回调
      watch(() => [state.a, state.b],
       // 回调的第二个参数是对应上一个状态的值
       ([a, b], [preA, preB]) => {
        console.log('callback params:', a, b, preA, preB)
        console.log('state.a', state.a)
        console.log('state.b', state.b)
        console.log('****************')
      })

      const ref1 = ref(1)
      const ref2 = ref(2)
      watch([ref1, ref2],([val1, val2], [preVal1, preVal2]) => {
        console.log('callback params:', val1, val2, preVal1, preVal2)
        console.log('ref1.value:',ref1.value)
        console.log('ref2.value:',ref2.value)
         console.log('##############')
      })
      return {state, ref1, ref2}
    }
  }
</script>
```

#### computed: 与 Vue2.x 中的作用类似，获取一个计算结果。当然功能有所增强，不仅支持取值 get（默认），还支持赋值 set。

```
const count = ref(1)
const plusOne = computed(() => count.value + 1)
console.log(plusOne.value) // 2
plusOne.value++ // 错误，computed不可改变

// 同样支持set和get属性
onst count = ref(1)
const plusOne = computed({
  get: () => count.value + 1,
  set: val => { count.value = val - 1 }
})
plusOne.value = 1
console.log(count.value) // 0
```

#### vite 工具

**vite 利用浏览器浏览器自带的 import 机制，通过请求拦截，返回合适的结果这样的方式，实现了开发环境无需编译，快速启动的功能**

```
当浏览器识别 type="module" 引入 js 文件的时候，内部的 import 就会发起一个网络请求，尝试去获取这个文件

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="icon" href="/favicon.ico" />
  <title>Vite App</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

```
vite 的任务，就是用 koa 起一个 http 服务，来拦截这些请求，返回合适的结果

const fs = require('fs')
const path = require('path')
const Koa = require('koa')

const app = new Koa()

app.use(async ctx=>{
  const {request:{url} } = ctx
  // 首页
  if(url=='/') {
    ctx.type="text/html"
    ctx.body = fs.readFileSync('./index.html','utf-8')
  } else if(url.endsWith('.js')) {
    // js文件
    const p = path.resolve(__dirname,url.slice(1))
    ctx.type = 'application/javascript'
    const content = fs.readFileSync(p,'utf-8')
    ctx.body = content
  }
})

app.listen(3001, ()=>{
  console.log('听我口令，3001 端口，起~~')
})
```

```
解析的 url 的时候，加一个判断即可，主要就是要去 node_module 里找大概逻辑

url 开头是 /@module/ 就把剩下的路径扣下来
去 node_module 里找到这个库，把 package.json 读出来
我们用的 import 语法，所以把 package.json 里的 Module 字段读出来，就是项目的入口替换回来即可
```

**实现热更：其实核心逻辑就是注入 socket.io ，后端数据变了，通知前端即可**
