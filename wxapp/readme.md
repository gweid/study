# 小程序相关

### 小程序里边的双向绑定和 vue 的双向绑定有什么区别

-   1，首先利用 bindinput 来触发改变 input 输入框中的值
-   2，使用 data-name 来获取改变的数据的内容 name 自己取名
-   3， bindinput 触发后在方法中通过 e.currentTarget.dataset.name 来获取改变后的内容
-   4， 通过 this.setData()来改变 data-name 绑定的参数就好了

```
<input type="text" bindinput="inputEdit" data-name="inputValue" placeholder="姓名" value="{{inputValue}}">

inputEdit(e) {
    console.log(e.currentTarget.dataset.inputValue)
}
```

### 小程序页面间传递数据的方法

#### 通过路由传参

```
wx.navigateTo({url: 'index/a?id=aaa'})

// 在另外一个页面
onLoad: function(opt) {
    opt.id
}
```

#### 使用全局变量实现数据传递。在 app.js 文件中定义全局变量 globalData， 将需要存储的信息存放在里面

#### 也可以通过本地存储

### 请谈谈小程序的主要目录和文件的作用

-   project.config.json 项目配置文件
-   App.js 配置一些全局的基础数据
-   App.json 小程序底部 tab 栏，标题栏的文字，颜色，大小，路由，等的设置
-   App.wxss 全局的公共样式
-   Pages 配置每个页面
    -   index.json: 单独页面的标题栏的文字，颜色，大小
    -   index.wxml：html
    -   index.wxss：css
    -   index.js：js

### 点击事件拿到数据 data-

```
<view bindtap="selectInvitation" data-invitation="{{item}}">

selectInvitation: function (e) {
    var invitation = e.currentTarget.dataset.invitation;
}
```

### 小程序生命周期

-   onLoad() 页面加载时触发，全局只会调用一次，在该周期内可获取当前页面路径的参数
-   onShow() 页面显示时触发或者切入前台时触发，也就是在该周期内可以获取请求数据
-   onReady() 页面初次渲染完成时触发，只会调用一次，代表页面已经可以和视图层进行交互
-   onHide() 页面隐藏或者切入后台时触发，如底部 tab 切换到其他页面或小程序切入后台时触发
-   onUnload() 页面卸载时触发

### 小程序的 wxss 和 css 有哪些不一样的地方

-   wxss 的图片引入需使用外链地址
-   没有 Body；样式可直接使用 import 导入

### 程序关联微信公众号如何确定用户的唯一性

使用 wx.getUserInfo 方法 withCredentials 为 true 时 可获取 \<encryptedData，里面有 union_id。后端需要进行对称解密

### 简述微信小程序原理

-   微信小程序采用 JavaScript、WXML、WXSS 三种技术进行开发,本质就是一个单页面应用，所有的页面渲染和事件处理，都在一个页面内进行，但又可以通过微信客户端调用原生的各种接口
-   微信的架构，是数据驱动的架构模式，它的 UI 和数据是分离的，所有的页面更新，都需要通过对数据的更改来实现
-   小程序分为两个部分 webview 和 appService 。其中 webview 主要用来展现 UI ，appService 有来处理业务逻辑、数据及接口调用。它们在两个进程中运行，通过系统层 JSBridge 实现通信，实现 UI 的渲染、事件的处理

### bindtap 和 catchtap 的区别是什么

-   相同：首先他们都是作为点击事件函数，就是点击时触发
-   不同：bindtap 是不会阻止冒泡事件的，catchtap 是会阻值冒泡

### 小程序 wxml 与标准的 html 的异同

-   小程序运行在 JS Core 内，没有 DOM 树和 window 对象，小程序中无法使用 window 对象和 document 对象
-   标签名字不一样，且小程序标签更少，单一标签更多
