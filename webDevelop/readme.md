# 移动端开发技术



## 1、移动端开发技术

[移动端开发技术](https://juejin.cn/post/6915377977765134344#heading-17)

![](../imgs/img11.jpg)



## 2、JS Bridge

[JS Bridge](https://juejin.cn/post/6916316666208976904#heading-19)

JS Bridge，桥接，主要用来连接 js 和 Native，实现两者之间的通信。一般就两种情况，js 调用 native 和 native 调用 js。



### WebView

- 安卓的 webview

  低版本和高版本的安卓使用了不同的 webkit 内核，4.4 后直接使用了`Chrome`

- ios 的 webview

  ios 的 webview 分为两种，一种是 UIWebView，ios2 就有，但是性能较差，特性支持差。另外一种是 WKWebView，ios8 之后出现，占用内存更少，大概是 UIWebView 的 1/3，支持更好的 HTML5 特性，性能更加强大；但也有一些缺点，比如不支持缓存，需要自己注入 Cookie，发送 POST 请求的时候带不了参数，拦截 POST 请求的时候无法解析参数等等



### JS 调用 Native

js 调用 native 进行通信的方式一般有三种：

- 拦截 webview 请求的 url scheme
- 拦截弹窗
- 向 webview 中注入 js 的 api

#### 拦截 webview 请求的 url scheme

**认识 url scheme**

url scheme 是一种特殊的 url，一般用于在 web 端调起 app，或者打开 app 的某一个页面

例如，`<a href="weixin://">打开微信</a>`，点击就会弹起提示：是否要打开微信

基于以上我们也可以自定义用来通信的 url scheme



**拦截 scheme**

