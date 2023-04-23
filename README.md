# hexo-theme-mcolor

### 主题预览

预览地址：[https://itsatan.github.io/](https://itsatan.github.io/)



### 安装主题

进入到自己的 Hexo 博客目录，在博客目录下拉取主题代码

```
git clone https://github.com/itsatan/hexo-theme-mcolor.git themes/moclor
```

在 Hexo 目录的`_config.yml`中将`theme`的值改为`moclor`



### 安装依赖

```
yarn add hexo-renderer-jade
```

```
yarn add hexo-generator-feed
```

```
yarn add hexo-generator-search
```

```
yarn add hexo-wordcount
```



### 运行

```
hexo clean && hexo g && hexo s
```



### 分类页配置

```
hexo new page categories
```

```
---
title: 分类
date: 2023-04-23 22:37:43
layout: categories
---
```



### 朋友圈配置

```
hexo new page friends
```

```
---
title: 朋友圈
date: 2023-04-23 22:37:43
layout: friends
---
```



### 主题配置

修改本主题目录下的`_config.yml`文件
