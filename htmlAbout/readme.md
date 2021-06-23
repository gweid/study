## HTML 相关知识点汇总

[「2021」高频前端面试题汇总之HTML篇](https://juejin.cn/post/6905294475539513352)

[html篇--这可能是目前较为全面的html面试知识点了吧](https://juejin.cn/post/6844904180943945742)

[面试指南](http://interview.poetries.top/docs/base.html)


#### 1、XHTML与HTML的区别

- XHTML标签名必须小写
- XHTML元素必须被关闭
- XHTML元素必须被正确的嵌套
- XHTML元素必须要有根元素



#### 2、title 与 alt 属性

- alt 是 img 的特有属性，当图片无法正常显示时候的替代文字
- title 属性可以用在除了 base，basefont，head，html，meta，param，script 和 title 之外的所有标签，是对 dom元素的注释说明



#### 3、iframe 的优缺点

可以参考：https://www.pianshen.com/article/3071165311/

**优点：**

- iframe 可以实现无刷新文件上传
- iframe 能够原封不动的把嵌入的网页展现出来
- 如果遇到加载缓慢的第三方内容如图标和广告，这些问题可以由 iframe 来解决

**缺点：**

- iframe 会阻塞主页面的 Onload 事件
- 无法被一些搜索引擎索引到，不利于 SEO
- 页面会增加服务器的 http 请求
- 会产生很多页面，不容易管理

现在基本上都是用 Ajax 来代替 iframe，所以 iframe 已经渐渐的退出了前端开发



#### 4、块级元素、行内元素、空元素

-   行内元素： a, b, span, img, input, select, strong, button
-   块级元素： div, ul, li, dl, dt, dd, h1-6, p 等
-   空元素： `<br>, <hr>, <img>, <link>, <meta>` 等

块级元素和行内元素区别：

- 块级元素独占一行、可以设置宽高、margin、padding 等
- 行内元素不占一行、不可以设置宽高、padding 和 margin 只能设置左右而上下无效



#### 5、页面导入样式使用 link 和 @import 有什么区别

- link 属于 HTML 标签，而 @import 是 css 提供的
- 页面被加载时，link 会同时被加载，而 @import 引用的 css 会等到页面被加载完再加载
- @import 只在 IE5 以上才能识别，而 link 是 HTML 标签，无兼容问题
- link 方式的样式的权重高于 @import 的权重



#### 6、src 与 href 的区别

- src 用于替换当前元素；href 用于当前文档与引用资源质检确立联系
- src 是 source 的缩写，指向的内容将会嵌入到文档中当前标签所在位置；在请求src 资源时会将其指向的资源下载并应用到文档内，例如 js 脚本，img 图片和 frame 等元素
- href 是 Hypertext Reference 的缩写，指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接



#### 7、为什么图片不会阻塞浏览器渲染，js 脚本会

图片和 js 都是通过 src 引入的，为什么图片不会阻塞浏览器渲染，而 js 脚本通过 src 引入会阻塞浏览器渲染呢？

> 首先，必须要知道的是，src 引入的资源是不会阻塞浏览器渲染的，js 脚本通过 src 引入会阻塞与这个无关。主要的原因是 js 是可以操作 DOM 的，所以需要等到 js 完全加载完才继续进行渲染。

那既然图片不会阻塞浏览器的渲染，图片懒加载的意义是什么？
> 1、图片加载本身不会阻塞 DOMContentLoaded，但是会影响 load 事件的触发，加载完全部图片后才会触发 load。
2、图片资源本身会占一个 http 请求，即使浏览器做了相关优化也会占优先级和带宽，会和关键 html 与 css 资源抢带宽，影响首屏加载时间



#### 8、HTML 语义化的理解

语义化是指根据内容的结构化（内容语义化），选择合适的标签（代码语义化），便于开发者阅读和写出更优雅的代码的同时，让浏览器的爬虫和机器很好的解析。

**好处：**

- 有利于SEO：和搜索引擎建立良好沟通，有助于爬虫抓取更多的有效信息：爬虫依赖于标签来确定上下文和各个关键字的权重
- 便于团队开发和维护，语义化更具可读性，遵循 W3C 标准的团队都遵循这个标准，可以减少差异化
- 方便其他设备解析（如屏幕阅读器、盲人阅读器、移动设备）以意义的方式来渲染网页



#### 9、HTML5 新特性

**1、语义化标签：**

- header：定义文档的页眉（头部）
- nav：定义导航链接的部分
- footer：定义文档或节的页脚（底部）
- article：定义文章内容
- section：定义文档中的节（section、区段）
- aside：定义其所处内容之外的内容（侧边）

**2、媒体标签**

- audio：音频
- video：视频

**3、表单**

- email：能够验证当前输入的邮箱地址是否合法
- url：验证URL
- number：只能输入数字，其他输入不了，而且自带上下增大减小箭头，max属性可以设置为最大值，min可以设置为最小值，value为默认值
- search：输入框后面会给提供一个小叉，可以删除输入的内容，更加人性化
- range：可以提供给一个范围，其中可以设置max和min以及value，其中value属性可以设置为默认值
- color：提供了一个颜色拾取器
- time：时分秒
- data：日期选择年月日
- datatime：时间和日期
- datatime-local：日期时间控件
- week：周控件
- month：月控件

**4、其他**

- 数据存储：localStorage、sessionStorage
- canvas（画布）
- Geolocation（地理定位）
- websocket（通信协议）
- history API：go、forward、back、pushstate

**5、移除的元素**

- 纯表现的元素：basefont，big，center，font, s，strike，tt，u
- 对可用性产生负面影响的元素：frame，frameset，noframes；



#### 10、script 标签的的 defer 与 async

浏览器在解析 HTML 的时候，如果遇到一个没有任何属性的 script 标签，就会暂停解析，先发送网络请求获取该 JS 脚本的代码内容，然后让 JS 引擎执行该代码，当代码执行完毕后恢复解析。整个过程如下图所示：

![](./imgs/img1.png)

可以看到，script 阻塞了浏览器对 HTML 的解析，如果获取 JS 脚本的网络请求迟迟得不到响应，或者 JS 脚本执行时间过长，都会导致白屏，用户看不到页面内容。



**defer script**

当浏览器遇到带有 defer 属性的 script 时，获取该脚本的网络请求也是异步的，不会阻塞浏览器解析 HTML，一旦网络请求回来之后，如果此时 HTML 还没有解析完，浏览器不会暂停解析并执行 JS 代码，而是等待 HTML 解析完毕再执行 JS 代码，图示如下：

![](./imgs/img2.png)

如果存在多个 defer script 标签，浏览器（IE9及以下除外）会保证它们按照在 HTML 中出现的顺序执行，不会破坏 JS 脚本之间的依赖关系。



**async script**

当浏览器遇到带有 async 属性的 script 时，请求该脚本的网络请求是异步的，不会阻塞浏览器解析 HTML，一旦网络请求回来之后，如果此时 HTML 还没有解析完，浏览器会暂停解析，先让 JS 引擎执行代码，执行完毕后再进行解析，图示如下：

![](./imgs/img3.png)

如果在 JS 脚本请求回来之前，HTML 已经解析完毕了，那就啥事没有，立即执行 JS 代码，如下图所示：

![](./imgs/img4.png)

所以 async 是不可控的，因为执行时间不确定，你如果在异步 JS 脚本中获取某个 DOM 元素，有可能获取到也有可能获取不到。而且如果存在多个 async 的时候，它们之间的执行顺序也不确定，完全依赖于网络传输结果，谁先下载完就先执行谁。



#### 11、HTML5 drag API

- dragstart：事件主体是被拖放元素，在开始拖放被拖放元素时触发
- darg：事件主体是被拖放元素，在正在拖放被拖放元素时触发
- dragenter：事件主体是目标元素，在被拖放元素进入某元素时触发
- dragover：事件主体是目标元素，在被拖放在某元素内移动时触发
- dragleave：事件主体是目标元素，在被拖放元素移出目标元素是触发
- drop：事件主体是目标元素，在目标元素完全接受被拖放元素时触发
- dragend：事件主体是被拖放元素，在整个拖放操作结束时触发



#### 12、渐进增强与优雅降级

- 渐进增强：主要是针对低版本的浏览器进行页面重构，保证基本的功能情况下，再针对高级浏览器进行效果、交互等方面的改进和追加功能，以达到更好的用户体验
- 优雅降级：一开始就构建完整的功能，然后再针对低版本的浏览器进行兼容



#### 13、a 标签的四个伪类

- a:link，定义正常链接的样式
- a:visited，定义已访问过链接的样式
- a:hover，定义鼠标悬浮在链接上时的样式
- a:active，定义鼠标点击链接时的样式



#### 14、Doctype 作用? 严格模式与混杂模式？

- Doctype：<!DOCTYPE> 声明位于文档中的最前面，处于 html 标签之前。主要作用是：告诉浏览器（解析器）应该以什么样（html或xhtml）的文档类型定义来解析文档
- 严格模式：又称为标准模式，指浏览器按照 W3C 标准解析代码
- 混杂模式：又称怪异模式、兼容模式，是指浏览器用自己的方式解析代码，混杂模式通常模拟老式浏览器的行为，以防止老站点无法工作
- <!doctype html> 的作用就是让浏览器进入标准模式，使用最新的 HTML5标准来解析渲染页面；如果不写，浏览器就会进入混杂模式，应避免是使用混杂模式



#### 15、如何让 IE6/IE7/IE8 支持 HTML5 标签

- 可以通过 `document.createElement` 方式创建 html5 标签
- 使用 html5shim 库



#### 16、浏览器内核

现在说的浏览器内核包括
- 渲染引擎
- js 引擎

主流浏览器的内核：

- IE 浏览器 Trident 内核
- 谷歌浏览器（chrome）
  - Webkit（之前使用）
  - blink 内核
- Opera 浏览器 blink 内核
- 火狐浏览器（Firefox）Gecko 内核
- Safari 浏览器 ：苹果公司 webkit 内核



#### 17、meta 元数据

> `<meta>` 元素标签是提供有关HTML文档的元数据，元数据不会显示在页面上，但是能够被机器识别



**charset**

指定了 html 文档的编码格式，常用的是 utf-8

```html
<meta charset="utf-8">
```



**name 和 content**

> content 一般不单独使用，而是与 name、http-equiv 等配合使用

这部分对 SEO 非常有用，并且视口也是在这一块设置的

- author：定义了页面的作者

  ```html
  <meta name="author" content="gweid">
  ```

- keyworks：为搜索引擎提供关键字

  ```html
  <meta name="keyworks" content="html,js,css">
  ```

- description：对网页的整体描述

  ```js
  <meta name="description" content="一个 xxx 的平台">
  ```

- viewport：设置页面视口

  ```js
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minmum-scale=1.0">
  ```

  - width：viewport 宽度(width=device-width 将页面宽度设置为跟随屏幕宽度变化而变化)
  - height: viewport 高度
  - initial-scale：初始缩放比例
  - maximum-scale：允许用户缩放的最大比例，0.0-10.0 正数
  - minimum-scale：允许用户缩放的最小比例，0.0-10.0 正数，必须小于或等于 maximum-scale
  - user-scalable：是否允许用户手动缩放(yes or no)