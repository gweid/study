### 1、从浏览器输入 URL 到页面展示过程发生了什么

#### 浏览器会构建请求行

#### 1-0、先看有没有强缓存，如果命中直接使用，否则进入下一步

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

-   请求行：一般是规定请求方式及版本 （GET / HTTP/1.1）
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

-   响应行：（HTTP/1.1 200 OK）由 HTTP 协议版本、状态码和状态描述组成

        1xx：指示信息–表示请求已接收，继续处理。

        2xx：成功–表示请求已被成功接收、理解、接受。 200：成功

        3xx：重定向–要完成请求必须进行更进一步的操作。301：永久重定向  302：临时重定向  304：未修改，使用缓存

        4xx：客户端错误–请求有语法错误或请求无法实现。 400：错误请求，比如传参错误  401：未授权  403：服务器拒绝请求  404：服务器找不到请求页面

        5xx：服务器端错误–服务器未能实现合法的请求。  500：服务器遇到错误，无法完成请求  503：服务不可用

-   响应报头

        常见的响应报头字段有: Server, cache-control，expires，last-modified，content-encoding: gzip

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

-   建立图层树：对于一些复杂的场景，比如 3D 动画如何呈现出变换效果，浏览器在构建完布局树之后，还会对特定的节点进行分层，构建一棵图层树
-   生成绘制列表：接下来渲染引擎会将图层的绘制拆分成一个个绘制指令，比如先画背景、再描绘边框......然后将这些指令按顺序组合成一个待绘制列表
-   生成图块和生成位图
-   显示器显示内容

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

#### 3-0、模块化

将一个复杂的程序依据一定的规则(规范)封装成几个块(文件), 并进行组合在一起

块的内部数据与实现是私有的, 只是向外部暴露一些接口(方法)与外部其它模块通信

**模块化好处**

-   避免命名冲突(减少命名空间污染)
-   更好的分离, 按需加载
-   更高复用性
-   高可维护性

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

回流是指元素的几何属性发生变化，例如宽高、增删移动节点等，引起页面回流

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

// 一开始就马上设置
setNowFontSize();
// 当屏幕宽度一变化马上获取计算当前根元素字体大小 把 setNowFontSize 函数体传递过去的
window.addEventListener('resize', setNowFontSize);
```

### 8、http 相关

http：超文本传输协议，无连接、无状态

-   无连接：无连接的含义是限制每次连接只处理一个请求
-   无状态：无状态是指协议对于事务处理没有记忆能力。这也是为什么需要 session 标记用户的原因

#### 8-0、https 工作流程

-   客户端首先向服务端发送一个 HTTPS 请求
-   服务端会把事先配置好的公钥证书随着其它的信息返回给客户端
-   客户端在收到服务端发来的证书之后进行验证，验证的过程参考数字证书验证，会得到服务端的信息以及它的公钥
-   验证成功之后生成一个叫做 client_params 的参数发送给服务器；同时自己会用伪随机函数生成一个 secret，这个 secret 就是它们后续进行通信的对称密钥。
-   服务器在收到刚刚的 client_params 之后，也会根据伪随机函数生成一个 secret。这时候双方都有了相同的对称密钥。
-   后面的传输都会用这个 secret 进行对称密钥加解密传输

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

Keep-Alive 是 HTTP 的一个头部字段 Connection 中的一个值，它是保证我们的 HTTP 请求能建立一个持久连接；在 HTTP/1.1 中所有的连接默认都是持久连接的，但是 HTTP/1.0 并未标准化。Keep-Alive 功能使客户端到服务器端的连接持续有效，当出现对服务器的后继请求时，Keep-Alive 功能避免了建立或者重新建立连接

#### 8-5、get 请求和 post 请求区别

-   get 请求参数在 url 上，post 请求参数在请求体里
-   get 请求的参数有大小限制，post 请求的参数可以无限大
-   post 请求相对于 get 请求会稍微安全，因为请求参数不暴露在 url 上，但仅仅是相对的
-   get 请求能缓存，post 不能

#### 8-6、HTTP/1.0 和 HTTP/1.1 有什么区别

-   长连接： HTTP/1.1 支持长连接和请求的流水线，在一个 TCP 连接上可以传送多个 HTTP 请求，避免了因为多次建立 TCP 连接的时间消耗和延时
-   缓存处理： HTTP/1.1 引入 Entity tag，If-Unmodified-Since, If-Match, If-None-Match 等新的请求头来控制缓存，详见浏览器缓存小节
-   带宽优化及网络连接的使用： HTTP1.1 则在请求头引入了 range 头域，支持断点续传功能
-   Host 头处理： 在 HTTP/1.0 中认为每台服务器都有唯一的 IP 地址，但随着虚拟主机技术的发展，多个主机共享一个 IP 地址愈发普遍，HTTP1.1 的请求消息和响应消息都应支持 Host 头域，且请求消息中如果没有 Host 头域会 400 错误

#### 8-7、HTTP 和 HTTPS 有何区别

-   HTTPS 使用 443 端口，而 HTTP 使用 80
-   HTTPS 需要申请证书
-   HTTP 是超文本传输协议，是明文传输；HTTPS 是经过 SSL 加密的协议，传输更安全
-   HTTPS 比 HTTP 慢，因为 HTTPS 除了 TCP 握手的三个包，还要加上 SSL 握手的九个包

#### 8-8、http1.x 的缺点

-   HTTP/1.0 一次只允许在一个 TCP 连接上发起一个请求，HTTP/1.1 使用的流水线技术也只能部分处理请求并发，仍然会存在队列头阻塞问题，因此客户端在需要发起多次请求时，通常会采用建立多连接来减少延迟。
-   单向请求，只能由客户端发起。
-   请求报文与响应报文首部信息冗余量大。
-   数据未压缩，导致数据的传输量大。

#### 8-9、http2.0 特点

-   二进制传输
-   多路复用
-   Header 压缩
-   服务器 push
-   双向通讯
-   更安全

#### 8-10、21. TCP 和 UDP 的区别

**TCP 是一个面向连接的、可靠的、基于字节流的传输层协议**

TCP 为什么可靠，是因为它有三次握手来保证双方都有接受和发送数据的能力。
字节流服务：将大块数据分割为以报文段为单位的数据包进行管理

**UDP 是一个面向无连接的传输层协议（UDP 是一个面向报文（报文可以理解为一段段的数据）的协议。意思就是 UDP 只是报文的搬运工，不会对报文进行任何拆分和拼接操作）**

1.2 不可靠性

UDP 是无连接的，也就是说通信不需要建立和断开连接。

UDP 也是不可靠的。协议收到什么数据就传递什么数据，并且也不会备份数据，对方能不能收到是不关心的

UDP 没有拥塞控制，一直会以恒定的速度发送数据。即使网络条件不好，也不会对发送速率进行调整。这样实现的弊端就是在网络条件不好的情况下可能会导致丢包，但是优点也很明显，在某些实时性要求高的场景（比如电话会议）就需要使用 UDP 而不是 TCP

1.3 高效

因为 UDP 没有 TCP 那么复杂，需要保证数据不丢失且有序到达。所以 UDP 的头部开销小，只有八字节，相比 TCP 的至少二十字节要少得多，在传输数据报文时是很高效的

### 9、反向代理

我们将请求发送到服务器，然后服务器对我们的请求进行转发，我们只需要和代理服务器进行通信就好。所以对于客户端来说，是感知不到服务器的

### 10、前端安全

#### 10-1、XSS 攻击

**XSS**

XSS(Cross Site Script) 跨站脚本攻击。指的是攻击者向网页注入恶意的客户端代码，通过恶意的脚本对客户端网页进行篡改，从而在用户浏览网页时，对用户浏览器进行控制或者获取用户隐私数据的一种攻击方式

**XSS 攻击原理**

-   往 Web 页面里插入恶意 Script 代码

**主要是分为三种**：

-   存储型：即攻击被存储在服务端，常见的场景是留言评论区提交一段脚本代码，如果前后端没有做好转义的工作，那评论内容存到了数据库，在页面渲染过程中直接执行, 相当于执行一段未知逻辑的 JS 代码，是非常恐怖的。
-   反射型：恶意脚本作为网络请求的一部分。服务端接收到 URL 将恶意代码当做参数取出并拼接在 HTML 里返回，浏览器解析此 HTML 后即执行恶意代码

```
// 比如：

http://sanyuan.com?q=<script>alert("你完蛋了")</script>
```

-   DOM 型：将攻击脚本写在 URL 中，诱导用户点击该 URL，如果 URL 被解析，那么攻击脚本就会被运行。和前两者的差别主要在于 DOM 型攻击不经过服务端

**如何防御 XSS 攻击**：

-   输入检查：永远不要相信任何用户的输入，对输入内容中的 script 和 \<iframe\> 等标签进行转义或者过滤
-   设置 httpOnly：很多 XSS 攻击目标都是窃取用户 cookie 伪造身份认证，设置此属性可防止 JS 获取 cookie
-   开启 CSP：即开启白名单，可阻止白名单以外的资源加载和运行；1.限制其他域下的资源加载。2.禁止向其它域提交数据。3.提供上报机制，能帮助我们及时发现 XSS 攻击。
-   URL：使用 Javascript 的 encodeURIComponent() 方法对用户的输入进行编码

#### 10-2、CSRF

**CSRF**

CSRF 攻击 (Cross-site request forgery) 跨站请求伪造。是一种劫持受信任用户向服务器发送非预期请求的攻击方式，通常情况下，它是攻击者借助受害者的 Cookie 骗取服务器的信任，但是它并不能拿到 Cookie，也看不到 Cookie 的内容，它能做的就是给服务器发送请求，然后执行请求中所描述的命令，以此来改变服务器中的数据，也就是并不能窃取服务器中的数据

**CSRF 攻击原理**

-   用户 C 打开浏览器，访问受信任网站 A，输入用户名和密码请求登录网站 A；
-   在用户信息通过验证后，网站 A 产生 Cookie 信息并返回给浏览器，此时用户登录网站 A 成功，可以正常发送请求到网站 A；
-   用户未退出网站 A 之前，在同一浏览器中，打开一个 TAB 页访问网站 B；
-   网站 B 接收到用户请求后，返回一些攻击性代码，并发出一个请求要求访问第三方站点 A；
-   浏览器在接收到这些攻击性代码后，根据网站 B 的请求，在用户不知情的情况下携带 Cookie 信息，向网站 A 发出请求。网站 A 并不知道该请求其实是由 B 发起的，所以会根据用户 C 的 Cookie 信息以 C 的权限处理该请求，导致来自网站 B 的恶意代码被执行。

**防御 CSRF 攻击**

-   验证 Token：浏览器请求服务器时，服务器返回一个 token，每个请求都需要同时带上 token 和 cookie 才会被认为是合法请求
-   验证 Referer：通过验证请求头的 Referer 来验证来源站点，但请求头很容易伪造
-   设置 SameSite：设置 cookie 的 SameSite，可以让 cookie 不随跨域请求发出，但浏览器兼容不一

### 11、requestAnimationFrame

requestAnimationFrame 是浏览器用于定时循环操作的一个接口，类似于 setTimeout，主要用途是按帧对网页进行重绘。对于 JS 动画，用 requestAnimationFrame 会比 setInterval 效果更好

### 12、不使用框架如何实现组件按需加载以及原理

使用 babel-plugin-import 就可以实现

babel-plugin-import 原理：在 babel 转码的时候，把对整个库的引用，变为具体模块的引用

### 13、V8 如何执行一段 JS 代码

-   预解析：检查语法错误但不生成 AST
-   生成 AST：经过词法/语法分析，生成抽象语法树
-   生成字节码：基线编译器 (Ignition) 将 AST 转换成字节码
-   生成机器码：优化编译器 (Turbofan) 将字节码转换成优化过的机器码，此外在逐行执行字节码的过程中，如果一段代码经常被执行，那么 V8 会将这段代码直接转换成机器码保存起来，下一次执行就不必经过字节码，优化了执行速度

### 14、GPU 加速

-   优点：使用 transform、opacity、filters 等属性时，会直接在 GPU 中完成处理，这些属性的变化不会引起回流重绘
-   缺点：GPU 渲染字体会导致字体模糊，过多的 GPU 处理会导致内存问题

### 15、HTML 相关

#### 15-1、HTML5 的一些新特性

-   新增语义化标签 （aside / figure / section / header / footer / nav 等），增加多媒体标签 video 与 audio
-   删除了一些纯表现的元素 <u> 下划线、<\big>字体等
-   增强了表单的 type 属性
-   增加了 localStorage、sessionStorage 本地存储
-   新的 API、新的技术：canvas、pushState、地理定位、webworker、websocket 等；

#### 15-2、href 和 src 有什么区别

-   href：即超文本引用。当浏览器遇到 href 时，会并行地下载资源，不会阻塞页面解释，例如我们使用 \<link\> 引入 CSS，浏览器会并行地下载 CSS 而不阻塞页面解析. 因此我们在引入 CSS 时建议使用 \<link\> 而不是 @import
-   src：即资源。当浏览器遇到 src 时，会暂停页面解析，直到该资源下载或执行完毕，这也是 script 标签之所以放底部的原因

### 16、CSS 相关

#### 16-1、CSS3 新特性

-   伪类选择器（li:first-child li:last-child li:nth-child） 伪元素选择器（:before :after）
-   border-radius: 圆角
-   box-shadow: 盒子阴影 text-shadow: 文字阴影
-   渐变：线性渐变、径向渐变
-   过渡：transition(css 属性，时间，曲线，延时)
-   2D、3D 变换
-   动画 animation
-   flex 弹性布局
-   @media 媒体查询

#### 16-2、如何触发 BFC

-   float 不为 none
-   overflow 的值不为 visible
-   position 的值不是 static 或者 relative
-   display 的值为 inline-block 或 table-cell 或 table-caption 或 grid

#### 16-3、BFC 的应用场景

-   清除浮动：BFC 内部的浮动元素会参与高度计算，因此可用于清除浮动，防止高度塌陷
-   阻止外边距重叠：属于同一个 BFC 的两个相邻 Box 的 margin 会发生折叠，不同 BFC 不会发生折叠

#### 16-4、去除图片底部空隙

给 img 添加 vertical-align:middle | top 等等。 让图片不要和基线对齐。（只能修改图片底部的间隙）

#### 16-5、盒子模型

```
//设置标准模型
box-sizing: content-box;
//设置IE模型
box-sizing: border-box;
```

#### 16-6、垂直水平居中

-   position: absolute 跟 margin 配合，需要知道子元素的宽高
-   position: absolute 跟 transfrom 配合
-   flex 布局

### 17、执行上下文

当 JS 引擎解析到可执行代码片段（通常是函数调用阶段）的时候，就会先做一些执行前的准备工作，这个 “准备工作”，就叫做 "执行上下文(execution context 简称 EC)" 或者也可以叫做执行环境。

-   全局执行上下文:这是默认或者说是最基础的执行上下文，一个程序中只会存在一个全局上下文，它在整个 javascript 脚本的生命周期内都会存在于执行堆栈的最底部不会被栈弹出销毁。全局上下文会生成一个全局对象（以浏览器环境为例，这个全局对象是 window），并且将 this 值绑定到这个全局对象上
-   函数执行上下文: 每当一个函数被调用时，都会创建一个新的函数执行上下文

### 18、localStorage，sessionStorage 和 cookie 的区别

1.数据存储方面

-   cookie 数据始终在同源的 http 请求中携带（即使不需要），即 cookie 在浏览器和服务器间来回传递。cookie 数据还有路径（path）的概念，可以限制 cookie 只属于某个路径下
-   sessionStorage 和 localStorage 不会自动把数据发送给服务器，仅在本地保存

2.存储数据大小

-   存储大小限制也不同，cookie 数据不能超过 4K，同时因为每次 http 请求都会携带 cookie、所以 cookie 只适合保存很小的数据，如会话标识
-   sessionStorage 和 localStorage 虽然也有存储大小的限制，但比 cookie 大得多，可以达到 5M 或更大

3.数据存储有效期

-   sessionStorage：仅在当前浏览器窗口关闭之前有效
-   localStorage：始终有效，窗口或浏览器关闭也一直保存，本地存储，因此用作持久数据
-   cookie：只在设置的 cookie 过期时间之前有效，即使窗口关闭或浏览器关闭

4.作用域不同

-   sessionStorage 不在不同的浏览器窗口中共享，即使是同一个页面；
-   localstorage 在所有同源窗口中都是共享的；也就是说只要浏览器不关闭，数据仍然存在
-   cookie: 也是在所有同源窗口中都是共享的；也就是说只要浏览器不关闭，数据仍然存在

### 19、session 和 cookie

-   Session: 是在服务端保存的一个数据结构，用来跟踪用户的状态，这个数据可以保存在集群、数据库、文件中；session 的运行依赖 session id，而 session id 是存在 cookie 中的
-   Cookie: 是客户端保存用户信息的一种机制，用来记录用户的一些信息，也是实现 Session 的一种方式

1、 由于 HTTP 协议是无状态的协议，所以服务端需要记录用户的状态时，就需要用某种机制来识具体的用户，这个机制就是 Session.典型的场景比如购物车，当你点击下单按钮时，由于 HTTP 协议无状态，所以并不知道是哪个用户操作的，所以服务端要为特定的用户创建了特定的 Session，用用于标识这个用户，并且跟踪用户，这样才知道购物车里面有几本书。这个 Session 是保存在服务端的，有一个唯一标识

2、 思考一下服务端如何识别特定的客户?: 这个时候 Cookie 就登场了。每次 HTTP 请求的时候，客户端都会发送相应的 Cookie 信息到服务端。实际上大多数的应用都是用 Cookie 来实现 Session 跟踪的，第一次创建 Session 的时候，服务端会在 HTTP 协议中告诉客户端，需要在 Cookie 里面记录一个 Session ID，以后每次请求把这个会话 ID 发送到服务器，我就知道你是谁了

#### 19-1、cookie 和 session 的区别

-   cookie 数据存放在客户的浏览器上，session 数据放在服务器上
-   cookie 不是很安全，别人可以分析存放在本地的 cookie 并进行 cookie 欺骗，考虑到安全应当使用 session。用户验证这种场合一般会用 session
-   session 保存在服务器，客户端不知道其中的信息；反之，cookie 保存在客户端，服务器能够知道其中的信息
-   session 会在一定时间内保存在服务器上，当访问增多，会比较占用你服务器的性能，考虑到减轻服务器性能方面，应当使用 cookie
-   session 中保存的是对象，cookie 中保存的是字符串
-   session 不能区分路径，同一个用户在访问一个网站期间，所有的 session 在任何一个地方都可以访问到，而 cookie 中如果设置了路径参数，那么同一个网站中不同路径下的 cookie 互相是访问不到的

### 20、为什么 js 是单线程

作为浏览器脚本语言，JavaScript 的主要用途是与用户互动，以及操作 DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定 JavaScript 同时有两个线程，一个线程在某个 DOM 节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？

虽然 HTML5 提出了 Web Worker 标准。Web Worker 的作用，就是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行。但是子线程完全不受主线程控制，且不得操作 DOM。所以这个并没有改变 JavaScript 单线程的本质。一般使用 Web Worker 的场景是代码中有很多计算密集型或高延迟的任务，可以考虑分配给 Worker 线程。

### 21、script 标签的 defer 与 async 区别

defer 跟 async 都是异步加载，区别在于脚本加载完之后何时执行，defer 是按照加载顺序执行脚本的，async 则是谁先加载完就先执行。所以 async 使用需要注意脚本的相互依赖问题

### 22、提升页面性能

-   资源压缩合并，减少 HTTP 请求
-   非核心代码异步加载（异步加载的方式，异步加载的区别） (defer、async)
-   利用浏览器缓存（缓存的分类，缓存原理）
-   使用 CDN
-   预解析 DNS

```
//强制打开 <a> 标签的 dns 解析
<meta http-equiv="x-dns-prefetch-controller" content="on">
//DNS预解析
<link rel="dns-prefetch" href="//host_name_to_prefetch.com">
```

### 23、浏览器缓存

强制缓存优先于协商缓存进行，若强制缓存 (Expires 和 Cache-Control) 生效则直接使用缓存，若不生效则进行协商缓存 (Last-Modified / If-Modified-Since 和 Etag / If-None-Match)，协商缓存由服务器决定是否使用缓存，若协商缓存失效，那么代表该请求的缓存失效，返回 200，重新返回资源和缓存标识，再存入浏览器缓存中；生效则返回 304，继续使用缓存。

#### 23-1、强缓存

强缓存：不会向服务器发送请求，直接从缓存中读取资源，在 chrome 控制台的 Network 选项中可以看到该请求返回 200 的状态码，并且 Size 显示 from disk cache 或 from memory cache。强缓存可以通过设置两种 HTTP Header 实现：Expires 和 Cache-Control。

-   Expires：缓存过期时间，用来指定资源到期的时间，是服务器端的具体的时间点。缺点：服务器的时间和浏览器的时间可能并不一致，那服务器返回的这个过期时间可能就是不准确的
-   Cache-Control：它并没有采用具体的过期时间点这个方式，而是采用过期时长来控制缓存，对应的字段是 max-age，还可以配合其他字段一起

**Expires 与 Cache-Control 区别**

Expires 是 http1.0 的产物，Cache-Control 是 http1.1 的产物，两者同时存在的话，Cache-Control 优先级高于 Expires

#### 23-2、协商缓存

协商缓存就是强制缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程

-   Last-Modified 和 If-Modified-Since：浏览器在第一次访问资源时，服务器返回资源的同时，在 response header 中添加 Last-Modified 的 header，值是这个资源在服务器上的最后修改时间，浏览器接收后缓存文件和 header
-   ETag 和 If-None-Match：Etag 是服务器响应请求时，返回当前资源文件的一个唯一标识(由服务器生成)，只要资源有变化，Etag 就会重新生成

**Last-Modified 和 ETag 对比**

在精准度上，ETag 优于 Last-Modified。优于 ETag 是按照内容给资源上标识，因此能准确感知资源的变化。而 Last-Modified 就不一样了，它在一些特殊的情况并不能准确感知资源变化，主要有两种情况:

-   编辑了资源文件，但是文件内容并没有更改，这样也会造成缓存失效。
-   Last-Modified 能够感知的单位时间是秒，如果文件在 1 秒内改变了多次，那么这时候的 Last-Modified 并没有体现出修改了。

在性能上，Last-Modified 优于 ETag，也很简单理解，Last-Modified 仅仅只是记录一个时间点，而 Etag 需要根据文件的具体内容生成哈希值。

另外，如果两种方式都支持的话，服务器会优先考虑 ETag。

#### 23-3、存储位置

浏览器中的缓存位置一共有四种，按优先级从高到低排列分别是

-   Service Worker：借鉴了 Web Worker 的 思路，即让 JS 运行在主线程之外，由于它脱离了浏览器的窗体，因此无法直接访问 DOM。虽然如此，但它仍然能帮助我们完成很多有用的功能，比如离线缓存 Service Worker Cache
-   Memory Cache：指的是内存缓存，从效率上讲它是最快的。但是从存活时间来讲又是最短的，当渲染进程结束后，内存缓存也就不存在了
-   Disk Cache：就是存储在磁盘中的缓存，从存取效率上讲是比内存缓存慢的，但是他的优势在于存储容量和存储时长

所以，对于 Memory Cache 和 Disk Cache，比较大的 JS、CSS 文件会直接被丢进磁盘，反之丢进内存；内存使用率比较高的时候，文件优先进入磁盘

-   Push Cache：即推送缓存，这是浏览器缓存的最后一道防线。它是 HTTP/2 中的内容，虽然现在应用的并不广泛，但随着 HTTP/2 的推广，它的应用越来越广泛

### 24、错误监控

一般分为两类：1.即时运行错误（代码错误） 2.资源加载错误

#### 24-1、即时运行错误的捕获方式

```
try...catch

window.onerror
```

#### 24-2、资源加载错误捕获

```
object.onerror

performance.getEntries()

Error 事件捕获
```

### jquery 源码优点

-   jquery 源码封装在一个匿名函数的自执行环境中，有助于防止变量的全局污染，然后通过传入 window 对象参数，可以使 - window 对象作为局部变量使用，好处是当 jquery 中访问 window 对象的时候，就不用将作用域链退回到顶层作用域了，从而可以更快的访问 window 对象。同样，传入 undefined 参数，可以缩短查找 undefined 时的作用域链
-   将一些原型属性和方法封装在了 jquery.prototype 中，为了缩短名称，又赋值给了 jquery.fn，这是很形象的写法
-   有一些数组或对象的方法经常能使用到，jQuery 将其保存为局部变量以提高访问速度
-   jquery 实现的链式调用可以节约代码，所返回的都是同一个对象，可以提高代码效率

### 谈一谈箭头函数与普通函数的区别

-   函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象
-   不可以当作构造函数，也就是说，不可以使用 new 命令，否则会抛出一个错误
-   不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 Rest 参数代替

### 如何渲染几万条数据并不卡住界面

如何在不卡住页面的情况下渲染数据，也就是说不能一次性将几万条都渲染出来，而应该一次渲染部分 DOM，那么就可以通过 requestAnimationFrame 来每 16 ms 刷新一次

```
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <ul>控件</ul>
  <script>
    setTimeout(() => {
      // 插入十万条数据
      const total = 100000
      // 一次插入 20 条，如果觉得性能不好就减少
      const once = 20
      // 渲染数据总共需要几次
      const loopCount = total / once
      let countOfRender = 0
      let ul = document.querySelector("ul");
      function add() {
        // 优化性能，插入不会造成回流
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < once; i++) {
          const li = document.createElement("li");
          li.innerText = Math.floor(Math.random() * total);
          fragment.appendChild(li);
        }
        ul.appendChild(fragment);
        countOfRender += 1;
        loop();
      }
      function loop() {
        if (countOfRender < loopCount) {
          window.requestAnimationFrame(add);
        }
      }
      loop();
    }, 0);
  </script>
</body>
</html>
```

### Javascript 中 callee 和 caller 的作用？

-   caller 是返回一个对函数的引用，该函数调用了当前函数；
-   callee 是返回正在被执行的 function 函数，也就是所指定的 function 对象的正文

### Babel 原理

本质就是编译器，当代码转为字符串生成 AST，对 AST 进行转变最后再生成新的代码
分为三步：词法分析生成 Token，语法分析生成 AST，遍历 AST，根据插件变换相应的节点，最后把 AST 转换为代码

### async...await 原理

async...await: 其实是 Generator 的语法糖

```
// Generator 写法
const fs = require('fs');

const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error){
          return reject(error);
        }
        resolve(data);
    });
  });
};

const foo = function* () {
  const f1 = yield readFile('/src/lib');
  const f2 = yield readFile('/src/utils');

  console.log(f1.toString());
  console.log(f2.toString());
}
```

**使用 async...await：其实就是将 \* 换成 async，将 yield 换成 await**

```
const asyncReadFile = async function () {
  const f1 =  await readFile('/src/lib');
  const f2 =  await readFile('/src/utils');

  console.log(f1.toString());
  console.log(f2.toString());
}
```

### iframe 的优缺点

#### 优点

-   iframe 可以实现无刷新文件上传；
-   iframe 能够原封不动的把嵌入的网页展现出来；
-   如果遇到加载缓慢的第三方内容如图标和广告，这些问题可以由 iframe 来解决

#### 缺点

-   iframe 会阻塞主页面的 Onload 事件;
-   无法被一些搜索引擎索引到;
-   页面会增加服务器的 http 请求;
-   会产生很多页面，不容易管理。

### Html5 应用程序缓存和 HTML 浏览器缓存有什么区别

新的 HTML5 规范的应用缓存最关键的就是支持离线应用，允许浏览器在链接客户端时预取一些或全部网站资产，如 HTML 文件，图像，CSS 以及 JS 等，预取文件加速了站点的性能。换句话说，应用程序缓存可以预取完全未被访问的页面，从而在常规的浏览器缓存中不可用。与传统的浏览器缓存比较，该特性并不强制要求用户访问网站。

### 浏览器如何对 HTML5 的离线储存资源进行管理和加载

有线情况下：

（1），浏览器发现 html 头部有 manifest 属性，它会请求 manifest 文件，如果是第一次访问 app，那么浏览器就会根据 manifest 文件的内容下载相应的资源并且进行离线存储。
（2），如果已经访问过 app 并且资源已经离线存储了，那么浏览器就会使用离线的资源加载页面，然后 浏览器会对比新的 manifest 文件与旧的 manifest 文件，如果文件没有发生改变，就不做任何操作，如果文件改变了，那么就会重新下载文件中的资源并进行离线存储。

在离线情况下： 浏览器直接使用离线缓存的资源；
