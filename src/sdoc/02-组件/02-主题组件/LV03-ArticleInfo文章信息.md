---
title: LV03-ArticleInfo文章信息
date: 2025-09-03 19:31:26
icon: famicons:logo-markdown
permalink: /sdoc/component/theme-component/126b07e426261fc7e55ccebb
index: true
tags:
categories:
copyright: false
keywords:
cover:
comments:
mathjax:
top:
description:
tdoc:
  detailDate: 2025-09-03 19:31:26.508
  fulluuid: 7e55ccebb297438da73f37967e35f269
  useduuid: 7e55ccebb
---

这一部分来了解一下ArticleInfo文章信息组件。

<!-- more -->

<script setup>
import { MtArticleInfo } from "vitepress-theme-mist"
</script>

## 一、组件介绍

ArticleInfo（文章信息）是一个用于显示文章基本信息的组件，包括作者、创建时间、更新时间、分类、标签等内容。该组件会根据主题配置自动显示相应的信息，并支持在首页和文章页的不同展示需求。


## 二、基础用法

### 1. 默认用法

在文章页面中使用 ArticleInfo 组件，传入文章数据和作用域：

::: demo ArticleInfo 基础用法
ArticleInfo/basic
:::

```vue
<script setup lang="ts">
import { MtArticleInfo } from "vitepress-theme-mist";
</script>

<template>
  <MtArticleInfo :post="post" scope="article" />
</template>
```

### 2. 在首页列表中使用

在首页的文章列表中使用 ArticleInfo 组件，传入不同的作用域：

```vue
<script setup lang="ts">
import { MtArticleInfo } from "vitepress-theme-mist";
</script>

<template>
  <MtArticleInfo :post="post" scope="post" />
</template>
```

### 3. 高级用法

ArticleInfo 组件还支持更多高级用法，包括带分割线展示、使用插槽添加额外内容等：

::: demo ArticleInfo 高级用法
ArticleInfo/advanced
:::

```vue
<script setup lang="ts">
import { MtArticleInfo } from "vitepress-theme-mist";
</script>

<template>
  <!-- 带分割线的展示 -->
  <MtArticleInfo :post="post" scope="article" split />
  
  <!-- 使用插槽添加额外内容 -->
  <MtArticleInfo :post="post" scope="article">
    <span class="extra-info">阅读时长: 5分钟</span>
  </MtArticleInfo>
</template>
```

## 三、配置选项

ArticleInfo 组件的行为受主题配置中的 `articleAnalyze` 选项控制，支持以下配置项：

### 1. 配置项说明

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| showIcon | 是否显示信息图标 | `boolean` | `true` |
| dateFormat | 日期格式 | `"yyyy-MM-dd"` \| `"yyyy-MM-dd hh:mm:ss"` \| `((date: number \| string) => string)` | `'yyyy-MM-dd'` |
| showInfo | 是否展示文章信息 | `boolean` \| `ArticleInfoPosition[]` | `true` |
| showAuthor | 是否展示作者 | `boolean` \| `ArticleInfoPosition[]` | `true` |
| showCreateDate | 是否展示创建日期 | `boolean` \| `ArticleInfoPosition[]` | `true` |
| showUpdateDate | 是否展示更新日期（仅在文章页显示） | `boolean` | `false` |
| showCategory | 是否展示分类 | `boolean` \| `ArticleInfoPosition[]` | `false` |
| showTag | 是否展示标签 | `boolean` \| `ArticleInfoPosition[]` | `false` |

### 2. 全局配置示例

可以通过主题配置来全局设置 ArticleInfo 的行为：

```ts
// .vitepress/config.ts
import { defineConfig } from 'vitepress'
import { defineMistConfig } from 'vitepress-theme-mist'

export default defineConfig({
  // ...
  themeConfig: {
    mist: defineMistConfig({
      articleAnalyze: {
        showIcon: true,
        dateFormat: "yyyy-MM-dd",
        showAuthor: true,
        showCreateDate: true,
        showUpdateDate: false,
        showCategory: false,
        showTag: false
      }
    })
  }
})
```

## 四、API

### MtArticleInfo Props

| 参数名 | 说明 | 类型 | 默认值 | 必填 |
|--------|------|------|--------|------|
| post | 文章数据 | `MtContentData` | - | 是 |
| scope | 父组件所在区域 | `"post"` \| `"article"` | - | 是 |
| split | 是否显示分割线 | `boolean` | `false` | 否 |

### MtContentData 数据结构

| 属性名 | 说明 | 类型 |
|--------|------|------|
| title | 文章标题 | `string` |
| url | 文章URL | `string` |
| relativePath | 文章相对路径 | `string` |
| frontmatter | 文章frontmatter信息 | `FrontMatter` |
| author | 文章作者信息 | `{ name: string; link?: string }` |
| date | 文章创建时间 | `string` |
| capture | 文章开头文字 | `string` |

### 插槽

| 插槽名 | 说明 |
|--------|------|
| default | 默认插槽，可用于添加额外内容 |

## 五、最佳实践

### 1. 页面集成

通常将 ArticleInfo 组件放置在文章页面的顶部或底部，以便用户了解文章的基本信息：

```vue
<template>
  <div class="article-page">
    <header>
      <h1>{{ post.title }}</h1>
      <MtArticleInfo :post="post" scope="article" />
    </header>
    <article>
      <!-- 文章内容 -->
    </article>
  </div>
</template>
```

### 2. 首页文章列表

在首页的文章列表中使用 ArticleInfo 组件：

```vue
<template>
  <div class="post-list">
    <div v-for="post in posts" :key="post.url" class="post-item">
      <h2>
        <a :href="post.url">{{ post.title }}</a>
      </h2>
      <MtArticleInfo :post="post" scope="post" />
      <p>{{ post.capture }}</p>
    </div>
  </div>
</template>
```

### 3. 条件显示

可以根据页面类型条件性地显示文章信息：

```vue
<script setup lang="ts">
import { MtArticleInfo } from "vitepress-theme-mist";
import { useData } from "vitepress";

const { page } = useData();

// 只在文章页面显示文章信息
const showArticleInfo = computed(() => {
  return page.value.frontmatter.article !== false;
});
</script>

<template>
  <MtArticleInfo v-if="showArticleInfo" :post="post" scope="article" />
</template>
```

## 六、常见问题

### Q: ArticleInfo 中的日期显示不正确？

A: 确保文章的 frontmatter 中配置了正确的 date 字段，格式为 YYYY-MM-DD 或 YYYY-MM-DD HH:mm:ss。

### Q: 如何自定义日期格式？

A: 可以通过主题配置中的 dateFormat 选项来自定义日期格式：

```ts
// .vitepress/config.ts
export default defineConfig({
  themeConfig: {
    mist: defineMistConfig({
      articleAnalyze: {
        dateFormat: "yyyy-MM-dd hh:mm:ss"
      }
    })
  }
})
```

### Q: 如何在首页和文章页显示不同的信息？

A: 可以使用 showAuthor、showCreateDate 等配置项的数组形式来控制在不同页面的显示：

```ts
// .vitepress/config.ts
export default defineConfig({
  themeConfig: {
    mist: defineMistConfig({
      articleAnalyze: {
        showAuthor: ["article"], // 只在文章页显示作者
        showCreateDate: true,    // 在首页和文章页都显示创建日期
        showTag: ["post"]        // 只在首页显示标签
      }
    })
  }
})
```

### Q: 如何隐藏特定的信息项？

A: 可以通过主题配置中的对应选项来隐藏特定的信息项：

```ts
// .vitepress/config.ts
export default defineConfig({
  themeConfig: {
    mist: defineMistConfig({
      articleAnalyze: {
        showAuthor: false,    // 隐藏作者信息
        showCategory: false,  // 隐藏分类信息
        showTag: false        // 隐藏标签信息
      }
    })
  }
})
