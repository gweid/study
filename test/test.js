// ---------------------------------------------闭包
// function test() {
//     let ad = "哈哈"
//     return function () {
//         return ad
//     }
// }
// let ret = test()()
// console.log(ret);


//----------------------------------------------ajax
// ajax  get
// const xhr = new XMLHttpRequest()
// xhr.open('get', '/')
// xhr.send()
// xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//         console.log(xhr.responseText);
//     }
// }
// // ajax  post
// let data = {}
// const xhr = new XMLHttpRequest()
// xhr.post('get', '/')
// XHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // post 请求需要带请求头
// xhr.send(data)
// xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//         console.log(xhr.responseText);
//     }
// }
// readyState
// 0: 请求未初始化
// 1: 服务器连接已建立
// 2: 请求已接收
// 3: 请求处理中
// 4: 请求已完成，且响应已就绪


//---------------------------------------------事件委托
// 事件委托是利用事件的冒泡原理来实现的
let ul = document.querySelector("#ulList")
console.log(ul);


ul.onclick = function (e) {
    e = e || window.event
    let target = e.target || e.srcElemen

    if (target.nodeName.toLocaleLowerCase() == 'li') {
        switch (target.id) {
            case "add":
                alert("add")
                break;
            case "del":
                alert("del")
                break;
            case "put":
                alert("put")
                break;
            case "get":
                alert("get")
                break;
        }
    }
}
// 此时，新增的元素是没有事件的，这只要在新加的元素的时候，给父元素添加事件就可以了