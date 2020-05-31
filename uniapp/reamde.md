# uni-app 开发小程序遇到的问题

### 引入 Vuex 的问题

### 操作 dom 的问题

### 头部适配问题

### 动态的 class style 的问题

### input 切换问题

uni-app 框架开发的物联网微信小程序，今天遇到个 bug，登陆页面的两个 input 切换，一定周期后会出现键盘闪现的问题。花了块一天的时间找原因，后来去官网的快速体验调试微信小程序版本的例子发现也有这个问题，瞬间觉得水实在太深了，但是问题还不能不解决只能硬着头皮上了。
解决办法：
input 框上定位一层 标签， 标签上绑定 click 事件，每次点击将对应的 input 框的 focus 属性值设为 true，input 失去焦点的时候将 focus 属性值设为 false，问题就解决了

### 小程序图片保存问题

uni-app 移动端保存图片到本地相册
uni-app 中有一个接口：uni.saveImageToPhotosAlbum，但是之前使用的时候，真机测试没有问题，但是打了安装包就保存失败，走的是 fail 回调。
捉摸了两天，后来又看到一个接口：uni.downloadFile，这个也可以把图片下载下来，但是没有在系统相册里面看到，是在一个忘记路径的麻烦的文件夹里面。
然后又在想，uni.downloadFile 在成功回调里面会返回 tempFilePath，一个临时文件路径，在成功的回调函数调用 uni.saveImageToPhotosAlbum
