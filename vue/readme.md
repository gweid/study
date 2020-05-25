# Vue 相关面试题

#### MVVM

M: model，数据层，在 Vue 内部就相当于 dada，主要对数据的存储； V：view，视图层，在 Vue 中相当于 Template 里面的 html；VM：control，控制层，在 Vue 里面相当于 Methods 这一类驱动数据改变视图

#### Vue 中 hash 模式和 history 模式的区别

-   1.最明显的区别是 hash 在 url 中会有 #, history 没有
-   2.hash 主要是依赖于 onhashchange 事件监听 location.hash 的改变
-   3.history 主要依赖于 HTML5 中的两个方法, pushState 可以改变 url 地址不发送请求; replaceState 可以读取历史记录栈，还可以对浏览器记录进行修改
-   4.当真正需要通过 URL 向后端发送 HTTP 请求的时候，比如常见的用户手动输入 URL 后回车，或者是刷新(重启)浏览器，这时候 history 模式需要后端的支持。因为 history 模式下，前端的 URL 必须和实际向后端发送请求的 URL 一致，例如有一个 URL 是带有路径 path 的 (例如 www.lindaidai.wang/blogs/id)，如果后端没有对这个路径做处理的话，就会返回 404 错误。所以需要后端增加一个覆盖所有情况的候选资源，一般会配合前端给出的一个 404 页面。

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
