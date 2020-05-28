### 1、从浏览器输入 URL 到页面展示过程发生了什么

#### 1-1、DNS 域名解释

-   从本地 host 文件查找
-   从浏览器 DNS 缓存中查找
-   从 ip 服务器上去查找

#### 1-2、发起 tcp 连接

**三次握手：**

-   1.客户端告知服务端，我要发起请求
-   2.服务端表示收到通知，告知客户端可以开始发送请求
-   3.客户端收到，告知服务端，我要开始发送请求，请准备接收

采用三次握手是为了防止失效的连接请求报文段突然又传送到主机 B，因而产生错误。

失效的连接请求：主机 A 发出的连接请求没有收到主机 B 的确认，于是经过一段时间后，主机 A 又重新向主机 B 发送连接请求，且建立成功，顺序完成数据传输。考虑这样一种特殊情况，主机 A 第一次发送的连接请求并没有丢失，而是因为网络节点导致延迟达到主机 B，主机 B 以为是主机 A 又发起的新连接，于是主机 B 同意连接，并向主机 A 发回确认，但是此时主机 A 根本不会理会，主机 B 就一直在等待主机 A 发送数据，导致主机 B 的资源浪费。

二次握手不可以，会造成上面说的失效的连接请求；四次握手可以，但没有必要。

**四次挥手：**

四次挥手谁先关闭都可以；这里假设客户端主动关闭，服务器被动关闭

-   1.客户端发送请求，申请断开，进入等待阶段，此时不会发送数据，但是会继续接收数据
-   2.服务端接收到请求，告知客户端已明白，此时服务端进入等待状态，不会再接收数据，但会继续发送数据；而客户端则进入下一阶段的等待状态
-   3.服务端发送完剩余的数据后，告知客户端可以断开连接，此时服务端不会发送和接收数据
-   4.客户端收到后，告知服务端我开始断开连接，服务端收到后，断开连接

#### 1-3、发起 http 请求

**http: 主要解决数据以何种格式传输，tcp 是决定数据怎么传输**

1.请求报文：由请求行、请求报头、请求正文组成

-   请求行：一般是规定请求方式
-   请求报头：请求报头允许客户端向服务器传递请求的附加信息和客户端自身的信息，比如 cookies、user-agent
-   请求正文：一般是需要向服务端传输的数据

    2.http 缓存

-   强制缓存：当有强缓存并且强缓存没有过期，那么会直接使用强缓存。对于强制缓存，服务器响应的 header 中会用两个字段来表明 Expires 和 Cache-Control，而现在一般是 htpp1.1 版本，所以一般使用 Cache-Control

        private：客户端可以缓存

        public：客户端和代理服务器都可以缓存

        max-age=t：缓存内容将在 t 秒后失效

        no-cache：需要使用协商缓存来验证缓存数据

        no-store：所有内容都不会缓存。

-   协商缓存：浏览器第一次请求数据时，服务器会将缓存标识与数据一起响应给客户端，客户端将它们备份至缓存中。再次请求时，客户端会先从缓存数据库拿到一个缓存的标识，然后向服务端验证标识是否失效，如果没有失效服务端会返回 304，这样客户端可以直接去缓存数据库拿出数据，如果失效，服务端会返回新的数据

**强制缓存的优先级高于协商缓存，若两种缓存皆存在，且强制缓存命中目标，则协商缓存不再验证标识**

-   缓存的优点

          1.减少了冗余的数据传递，节省宽带流量

          2.减少了服务器的负担，大大提高了网站性能

          3.加快了客户端加载网页的速度 这也正是 HTTP 缓存属于客户端缓存的原因。

    3.响应体

-   状态码

        1xx：指示信息–表示请求已接收，继续处理。

        2xx：成功–表示请求已被成功接收、理解、接受。 200：成功

        3xx：重定向–要完成请求必须进行更进一步的操作。304：使用缓存

        4xx：客户端错误–请求有语法错误或请求无法实现。 401：未授权  403：服务器拒绝请求  404：服务器找不到请求页面

        5xx：服务器端错误–服务器未能实现合法的请求。  500：服务器遇到错误，无法完成请求

-   响应报头

        常见的响应报头字段有: Server, Connection...

-   响应报文

        从服务器请求的 HTML,CSS,JS 文件就放在这里面

#### 1-4、浏览器渲染流程

-   解析 HTML 生成 DOM 树

![解析 HTML 生成 DOM 树](/imgs/img1.png)

-   解析 CSS 生成 CSSOM：通过解析 CSS 文件、style 标签、行内 style 等，生成 CSSOM

        规范 css，即将 color: blue 转化成 color: rgb() 形式

        计算元素样式，例如 CSS 样式会继承父级的样式，如 font-size、color 之类的

![解析 CSS 生成 CSSOM](/imgs/img2.png)

-   加载或执行 JavaScript

-   生成渲染树

        在有了 DOM 树和 CSSOM 之后，需要将两者结合生成渲染树 Render Tree。此时，渲染树就具备元素和元素的样式信息

-   布局

        根据 Render Tree 渲染树，对树中每个节点进行计算，确定每个节点在页面中的宽度、高度和位置

-   渲染到页面

### 2、跨域

#### 2-1、浏览器同源策略

同源策略就是：协议、域名、端口都相同的。同源策略主要是为了保护用户信息安全

同源策略主要是两种，一个是 ajax 同源策略，一个是 DOM 同源策略

-   ajax 同源策略：1、不同源页面不能发起 ajax 请求 2、不同源页面不能获取 cookies。如果没有同源策略，那么只要任意一个脚本就能获取 cookies，去到相应网站发起恶意请求
-   DOM 同源策略：不同源页面不能获取 DOM。主要防止通过 iframe 嵌套一个真正网站地址，拿取用户信息

#### 2-2、解决跨域

1.jsonp：主要利用 script 标签的 src 天然支持跨域请求的原理

```
function jsonp({
  url,
  params,
  callback
}) {
  params = {
    ...params,
    callback
  }

  const str = Object.keys(params).map(item => {
    return `${item}=${params[item]}`
  }).join('&')

  const requestStr = `${url}?${str}`

  const script = document.createElement("script")

  script.setAttribute('src', requestStr)

  document.body.appendChild(script)
}

jsonp({
  url: 'http://www.xxxxx.com',
  params: {
    name: 'jack'
  },
  callback(res) {
    console.log(res);
  }
})
```

2.CORS：跨域资源共享

这个一般需要服务器配置，通常的几个配置

        Access-Control-Allow-Origin： 服务器允许访问的域名

        Access-Control-Allow-Methods： 服务器允许使用的方法

        Access-Control-Allow-Headers： 服务器允许的首部字段

        Access-Control-Allow-Credentials

        Access-Control-Max-Age： 该响应的有效时间(s), 在有效时间内浏览器无需再为同一个请求发送预检请求

-   浏览器根据同源策略，发现是同源，则直接发送请求，如果不同源，发送跨域请求
-   服务器收到跨域请求，根据自身配置返回请求头；如果没配置过跨域，那么返回不包含 Access-Control-Allow-\*\*
-   浏览器根据有没有 Access-Control-Allow-\*\* 做判断，如果没有，则报警告

3.服务器代理：同源策略主要存在于浏览器中，当不利用浏览器发起请求，而是直接在两台服务器中，那么就不会存在跨域的问题

    常见的 webpack 的 devServer

4.websocket：这是一种双向通讯协议，客户端和服务端都可以主动向对方发送东西

5.postMessage: HTML5 中的 API，可以实现跨文档通讯，一个窗口发送消息，另一个窗口接受消息

6.ngnix：利用 ngnix 跨域的关键就是在配置文件中设置 server 项，然后设置其中的 location 属性，proxy_pass：需要代理的服务器地址，add_header：给响应报文中添加首部字段，例如 Access-Control-Allow-Origin 设置为 \*，即允许所有的请求源请求。

```
events {
    worker_connections  1024;
}
http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;
    server {
        listen       80;
        server_name  localhost;
        location / {
            proxy_pass  http://localhost:8887;
            add_header  Access-Control-Allow-Origin *;
        }
    }
}
```

### 3、CommonJS 和 ES6 模块，AMD 与 CMD

#### 3-1、区别：

-   CommonJS 输出的是一个值的拷贝，ES6 输出的是值的引用
-   CommonJS 是在运行的时候加载，ES6 是在编译的时候
-   CommonJS 的 require 语法是同步的，所以 CommonJS 规范只适合于服务端
-   CommonJS 的 this 指向当前模块，ES6 的 this 指向 undefined
-   CommonJs 导入的模块路径可以是一个表达式，因为它使用的是 require() 方法；而 ES6 Modules 只能是字符串

#### 3-2、AMD 和 CMD 都是异步加载模块，区别是：对依赖模块的执行时机处理不同

-   AMD 推崇依赖前置，在定义模块的时候就要声明其依赖的模块
-   CMD 推崇就近依赖，只有在用到某个模块的时候再去 require

### 4、webpack 的 hash

-   hash 是跟整个项目的构建相关，只要项目里有文件更改，整个项目构建的 hash 值都会更改，并且全部文件都共用相同的 hash 值。(粒度整个项目)
-   chunkhash 是根据不同的入口进行依赖文件解析，构建对应的 chunk(模块)，生成对应的 hash 值。只有被修改的 chunk(模块)在重新构建之后才会生成新的 hash 值，不会影响其它的 chunk。(粒度 entry 的每个入口文件)
-   contenthash 是跟每个生成的文件有关，每个文件都有一个唯一的 hash 值。当要构建的文件内容发生改变时，就会生成新的 hash 值，且该文件的改变并不会影响和它同一个模块下的其它文件。(粒度每个文件的内容)

### 5、重绘回流

#### 5-1、重绘

重绘是指样式比如颜色这些变化，但是没有几何属性的变化，会导致重绘

#### 5-2、回流

回流是指元素的几何属性发生变化，例如宽高，引起页面回流

**重绘跟回流的成本是非常高的，回流由于发生了 DOM 的变化，会重新渲染，成本比重绘的还要大**

#### 5-3、避免重绘回流

-   不要频繁使用 style，而是使用 class 进行一次性修改
-   将动画效果放到脱离文档流的 position 属性为 absolute 或 fixed 的元素上
-   也可以先为元素设置 display: none，操作结束后再把它显示出来。因为在 display 属性为 none 的元素上进行的 DOM 操作不会引发回流和重绘
-   对于 resize、scroll 等进行防抖/节流处理
-   使用 css3 动画替代 js 操作 DOM，css3 动画会 GPU 加速

### 6、盒子模型

box-sizing: content-box（W3C 盒模型，又名标准盒模型）：元素的宽高大小表现为内容的大小。
box-sizing: border-box（IE 盒模型，又名怪异盒模型）：元素的宽高表现为内容 + 内边距 + 边框的大小。背景会延伸到边框的外沿。

### 7、rem 原理

```
// 这种JS代码是会影响页面的渲染的 放到前面写 就是为了让标签出来之前执行的 只要操作html元素只要html元素出来了JS就可以执行
function setNowFontSize() {
    // 1. 设计稿的宽度 假设750
    // 2. 设计稿屏幕的根元素字体大小 200
    // 3. 求得当前屏幕根元素字体大小 假设当前 375
    // 4. 当前根元素字体大小  375 / (750 / 200)  == 100px
    var designWidth = 750;
    var designFontSize = 200;
    // 获取当前屏幕宽度
    var windowWidth = document.documentElement.offsetWidth || document.body.offsetWidth || window.innerWidth;
    // 使用当前屏幕宽度 / (设计稿宽度/设计稿的字体大小)
    var nowFontSize = windowWidth / (designWidth / designFontSize);
    // console.log(nowFontSize);
    if (nowFontSize > 200) {
        nowFontSize = 200;
    }
    // 给当前根元素设置这个算好的字体大小
    document.documentElement.style.fontSize = nowFontSize + 'px';
}

//一开始就马上设置
setNowFontSize();
//当屏幕宽度一变化马上获取计算当前根元素字体大小 把 setNowFontSize 函数体传递过去的
window.addEventListener('resize', setNowFontSize);
```

### 8、http 相关

#### 8-1、http 请求可以怎么拦截

在浏览器和服务器进行传输的时候，可以被 nginx 代理所拦截，也可以被网关拦截。

#### 8-2. https 的加密方式、混合加密的好处

HTTPS 使用的是对称密钥加密和非对称密钥加密组合而成的混合加密加密机制进行数据传输

也就是发送密文的一方用 "对方的公钥" 进行加密处理 "对称的密钥"，然后对方在收到之后使用自己的私钥进行解密得到 "对称的密钥"，这在确保双方交换的密钥是安全的前提下使用对称密钥方式进行通信。

混合加密的好处：对称密钥的优点是加解密效率快，在客户端与服务端确定了连接之后就可以用它来进行加密传输。不过前提是得解决双方都能安全的拿到这把对称密钥。这时候就可以利用非对称密钥加密来传输这把对称密钥，因为我们知道非对称密钥加密的优点就是能保证传输的内容是安全的。
所以好处是即保证了对称密钥能在双方之间安全的传输，又能使用对称加密方式进行通信，这比单纯的使用非对称加密通信快了很多。以此来解决了 HTTP 中内容可能被窃听的问题。

#### 8-3、数字签名

数字签名的产生主要就是为了解决 HTTP 中内容可能被篡改的问题，即校验数据的完整性

-   首先发送方会将原文与数字签名(也就是加密后的摘要)一起发送给接收方
-   接收方会接收到这两样东西，即原文和数字签名
-   接收方用 Hash 函数处理原文会得到一份消息摘要
-   同时用发送方的公钥解密数字签名也会得到一份消息摘要
-   只要比较这两份消息摘要是否相等就可以验证出数据有没有被篡改了

#### 8-4、http 中的 keep-alive

Keep-Alive 是 HTTP 的一个头部字段 Connection 中的一个值，它是保证我们的 HTTP 请求能建立一个持久连接；在 HTTP/1.1 中所有的连接默认都是持久连接的，但是 HTTP/1.0 并未标准化。

### 9、反向代理

我们将请求发送到服务器，然后服务器对我们的请求进行转发，我们只需要和代理服务器进行通信就好。所以对于客户端来说，是感知不到服务器的

### 10、前端安全

#### 10-1、XSS 攻击

**XSS**

XSS(Cross Site Script) 跨站脚本攻击。指的是攻击者向网页注入恶意的客户端代码，通过恶意的脚本对客户端网页进行篡改，从而在用户浏览网页时，对用户浏览器进行控制或者获取用户隐私数据的一种攻击方式

**主要是分为三种**：

-   存储型：即攻击被存储在服务端，常见的是在评论区插入攻击脚本，如果脚本被储存到服务端，那么所有看见对应评论的用户都会受到攻击。

-   反射型：攻击者将脚本混在 URL 里，服务端接收到 URL 将恶意代码当做参数取出并拼接在 HTML 里返回，浏览器解析此 HTML 后即执行恶意代码

-   DOM 型：将攻击脚本写在 URL 中，诱导用户点击该 URL，如果 URL 被解析，那么攻击脚本就会被运行。和前两者的差别主要在于 DOM 型攻击不经过服务端

**如何防御 XSS 攻击**：

-   输入检查：对输入内容中的 script 和 \<iframe\> 等标签进行转义或者过滤

-   设置 httpOnly：很多 XSS 攻击目标都是窃取用户 cookie 伪造身份认证，设置此属性可防止 JS 获取 cookie

-   开启 CSP：即开启白名单，可阻止白名单以外的资源加载和运行

#### 10-2、CSRF

**CSRF**

CSRF 攻击 (Cross-site request forgery) 跨站请求伪造。是一种劫持受信任用户向服务器发送非预期请求的攻击方式，通常情况下，它是攻击者借助受害者的 Cookie 骗取服务器的信任，但是它并不能拿到 Cookie，也看不到 Cookie 的内容，它能做的就是给服务器发送请求，然后执行请求中所描述的命令，以此来改变服务器中的数据，也就是并不能窃取服务器中的数据。

**防御 CSRF 攻击**

-   验证 Token：浏览器请求服务器时，服务器返回一个 token，每个请求都需要同时带上 token 和 cookie 才会被认为是合法请求
-   验证 Referer：通过验证请求头的 Referer 来验证来源站点，但请求头很容易伪造
-   设置 SameSite：设置 cookie 的 SameSite，可以让 cookie 不随跨域请求发出，但浏览器兼容不一

### 11、requestAnimationFrame

requestAnimationFrame 是浏览器用于定时循环操作的一个接口，类似于 setTimeout，主要用途是按帧对网页进行重绘。对于 JS 动画，用 requestAnimationFrame 会比 setInterval 效果更好。


### 12、不使用框架如何实现组件按需加载以及原理

但后来有去了解，babel-plugin-import 就可以实现。