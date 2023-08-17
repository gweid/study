# react 相关问题记录



#### 1、history.push 跳转，url 变化，页面没渲染

```tsx
import { useHistory } from 'react-router-dom'

const Demo = () => {
  const history = useHistory()
  
  const handleToAgreeDetail = () => {
    history.push({
      pathname: `/page/broker_agreement/agree_detail?token=${getToken()}`,
    })
  }

  return (
  	<div onClick={handleToAgreeDetail}>点击<div>
  )
}
```

使用 `history.push` 进行跳转，url 已经变化，但是却没有渲染新页面。使用浏览器刷新，新页面被渲染出来



问题：在网上找了一圈答案，解释是 react 只有 state 变化，才会重新渲染，而 `history.push` 只改变了 prop。



解决：

将直接拼接在 pathname 中的参数，放在 search 中（神奇！！！！）

```tsx
const handleToAgreeDetail = () => {
  history.push({
    pathname: `/page/broker_agreement/agree_detail`,
    search: `?token=${getToken()}`
  })
}
```



