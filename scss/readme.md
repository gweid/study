# scss 使用

### 1.使用变量

SCSS 中的变量以 \$ 开头。

下面定义了两个变量，其中 $border-color 在大括号之外称为全局变量，顾名思义任何地方都可以使用，$border-width 是在 .container 之内声明的，是一个局部变量，只有 .container 内部才能使用。

```
$border-color:#aaa; //声明变量
.container {
$border-width:1px;
    border:$border-width solid $border-color; //使用变量
}
```

### 嵌套

#### 2.1 嵌套选择器

```
.container ul {
    border:1px solid #aaa;
    list-style:none;

    li {
        float:left;
    }

    li>a {
        display:inline-block;
        padding:6px 12px;
    }
}
```

#### 2.2 嵌套中的父级选择器

SCSS 提供了一个选择器可以选中当前元素的父元素，使用&表示，下面用父级选择器继续简化代码。

```
.container ul {

    &:after {
        display:block;
        content:"";
        clear:both;
    }
}
```

### 导入 SCSS 文件

```
@import App2.scss;  //引入另一个SCSS文件
```

### 混合器

#### 混合器传参数

```
@mixin get-border-radius($border-radius,$color){
    -moz-border-radius: $border-radius;
    -webkit-border-radius: $border-radius;
    border-radius: $border-radius;
    color:$color;
}
```

#### 也可以设置混合器的默认值

```
@mixin get-border-radius($border-radius:5px,$color:red){
    -moz-border-radius: $border-radius;
    -webkit-border-radius: $border-radius;
    border-radius: $border-radius;
    color:$color;
}
```

### 继承

```
// 声明一个变量
$border-style {
  border:1px solid #aaa;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}

// 继承
.container {
	@extend $border-style;
	color:red;
}
```
