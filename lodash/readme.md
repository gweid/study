### 整体

通过一个自执行函数执行

```js
;(function() {
    
}.call(this));
```

### 导出

```js
;(function() {
    var runInContext = (function runInContext(context) {
        ...
        function lodash(value) {
            ...
            return new LodashWrapper(value);
        }

        return lodash
    }
             
	var _ = runInContext()
    if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
         root._ = _;
         define(function () {
             return _;
         });
     } else if (freeModule) {
         (freeModule.exports = _)._ = _;
         freeExports._ = _;
     } else {
         root._ = _;
     }
}.call(this));
```

可以看出，_  由 runInContext 函数生成，runInContext  里面定义了 lodash 函数，最终返回了 lodash

lodash 的返回是一个 new LodashWrapper(value)

### LodashWrapper 函数

