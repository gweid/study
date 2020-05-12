# Vue 相关面试题

#### Vue 中 hash 模式和 history 模式的区别
- 最明显的区别是 hash 在 url 中会有 #, history 没有
- hash 主要是依赖于 onhashchange 事件监听 location.hash 的改变
- history 主要依赖于 HTML5 中的两个方法, pushState 可以改变 url 地址不发送请求; replaceState 可以读取历史记录栈，还可以对浏览器记录进行修改
- 当真正需要通过URL向后端发送 HTTP 请求的时候，比如常见的用户手动输入URL后回车，或者是刷新(重启)浏览器，这时候 history 模式需要后端的支持。因为 history 模式下，前端的 URL 必须和实际向后端发送请求的 URL 一致，例如有一个URL是带有路径 path 的 (例如www.lindaidai.wang/blogs/id)，如果后端没有对这个路径做处理的话，就会返回 404 错误。所以需要后端增加一个覆盖所有情况的候选资源，一般会配合前端给出的一个 404 页面。

#### Vue 的优点和缺点