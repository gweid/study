// ----------------------------单例模式
// 单例设计模式（Singleton Design Pattern）理解起来非常简单。
// 一个类只允许创建一个对象（或者实例），那这个类就是一个单例类，这种设计模式就叫单例模式。
// class GetSeetingConfig {
//   static instance = null

//   constructor() {
//     console.log('new')
//   }

//   static create () {
//     if (!this.instance) {
//       this.instance = new GetSeetingConfig()
//     }
//     return this.instance
//   }
// }

// const seeting1 = GetSeetingConfig.create()
// const seeting2 = GetSeetingConfig.create()
// //两次只打印一次 new
// seeting1 === seeting2 // true



// ----------------------------工厂模式
// 简单工厂
// class User {
//   constructor(name, role) {
//     this.name = name;
//     this.role = role;
//   }
// }

// const zhangsan = new User('张三', ['首页', '通讯录', '发现页'])


// 工厂方法
// class User {
//   constructor(name = '', viewPage = []) {
//     this.name = name;
//     this.viewPage = viewPage;
//   }
// }

// class UserFactory extends User {
//   constructor(name, viewPage) {
//     super(name, viewPage)
//   }
//   create(role) {
//     switch (role) {
//       case 'superAdmin': 
//         return new UserFactory( '超级管理员', ['首页', '通讯录', '权限管理'] );
//         break;
//       case 'admin':
//         return new UserFactory( '管理员', ['首页', '通讯录'] );
//         break;
//       default:
//         throw new Error('params error');
//     }
//   }
// }
// let userFactory = new UserFactory();
// let superAdmin = userFactory.create('superAdmin');
// let admin = userFactory.create('admin');
// let user = userFactory.create('user');




// -----------------------------代理模式
// 代理实现图片懒加载
// class MyImg {
// 	static imgNode = document.createElement("img")
// 	constructor(selector) {
//     	selector.appendChild(this.imgNode);
//     }
    
//     setSrc(src) {
//     	this.imgNode = src
//     }
// }

// class ProxyMyImg {
// 	static src = 'xxx本地预览图地址loading.gif'

// 	constructor(selector) {
// 		this.img = new Image

//     // 通过代理的方式先设置一张本地默认图
//     this.myImg = new MyImg(selector)
//     this.myImg.setSrc(this.src)
//   }
    
//   setSrc(src) {
//     // 设置 this.img.src 代表发起图片资源请求
//     this.img.src = src
//     // 等到图片资源加载完成
//     this.img.onload = () => {
//       // 再将图片设置上去
//     	this.myImg.setSrc(src)
//     }
//   }
// }

// const img = new ProxyMyImg(document.body)
// img.setSrc('xxx')




// -----------------------------适配器模式
// 适配接口数据
const data1 = {name: 'alan'};
const data2 = {username: 'tom'};

function sayName(param) {
    console.log(param.name);
}

function adapter(param) {
    return { name: param.username }
}


sayName(data1);
sayName(adapter(data2));