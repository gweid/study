### 整体

通过一个自执行函数执行

```js
;(function() {
    
}.call(this));
```

### 导出

```js
var runInContext = (function runInContext(context) {
    ...
    function lodash(value) {
        ...
        return new LodashWrapper(value);
    }
    
    return lodash
}
                    
var _ = runInContext()
```

