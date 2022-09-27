# Docker

相关学习资料：https://github.com/LiangJunrong/document-library/tree/master/%E7%B3%BB%E5%88%97-%E5%89%8D%E7%AB%AF%E8%B5%84%E6%96%99/Node/Node%20%E5%BA%94%E7%94%A8%E9%83%A8%E7%BD%B2/Docker



#### --from

经常会看到：

```dockerfile
FROM yunke-registry.cn-hangzhou.cr.aliyuncs.com/images-base/node:11.13.0 AS builder_web

COPY --from=builder_web /app/dist /app/dist
```

 这个的意思是：使用 `yunke-registry.cn-hangzhou.cr.aliyuncs.com/images-base/node:11.13.0` 作为基础镜像进行构建；然后将这个基础镜像构建后的产物复制
