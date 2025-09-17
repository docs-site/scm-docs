---
title: LV02-ArticleBreadcrumb文章面包屑
date: 2025-09-03 19:31:26
icon: famicons:logo-markdown
permalink: /sdoc/component/theme-component/126b07e426261f6561194202
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
  detailDate: 2025-09-03 19:31:26.502
  fulluuid: 561194202c7b49a590e68b71e259f0a4
  useduuid: 561194202
---

这一部分来了解一下ArticleBreadcrumb文章面包屑组件。

<!-- more -->

<script setup>
import { MtArticleBreadcrumb } from "vitepress-theme-mist"
</script>

## 一、组件介绍

ArticleBreadcrumb（文章面包屑）是一个为文章页面设计的面包屑组件，它会根据当前页面的路径自动生成面包屑导航。该组件是基于基础的 Breadcrumb 组件构建的，但针对文章页面进行了优化。

## 二、基础用法

### 1. 默认用法

在文章页面中直接使用 ArticleBreadcrumb 组件，它会自动根据页面路径生成面包屑导航。

```vue
<script setup lang="ts">
import { MtArticleBreadcrumb } from "vitepress-theme-mist";
</script>

<template>
  <MtArticleBreadcrumb />
</template>
```

### 2. 实际效果示例

在真实的文档站点中，ArticleBreadcrumb 会根据当前页面路径生成类似如下的面包屑导航：

<div class="example-container">
  <div class="breadcrumb-example">
    <span class="breadcrumb-item">首页</span>
    <span class="breadcrumb-separator">/</span>
    <span class="breadcrumb-item">组件</span>
    <span class="breadcrumb-separator">/</span>
    <span class="breadcrumb-item">主题组件</span>
    <span class="breadcrumb-separator">/</span>
    <span class="breadcrumb-item">ArticleBreadcrumb文章面包屑</span>
  </div>
</div>

<style scoped>
.example-container {
  margin: 16px 0;
  padding: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background-color: #fafafa;
}

.breadcrumb-example {
  padding: 8px 12px;
  background-color: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}

.breadcrumb-item {
  color: #1890ff;
  margin: 0 4px;
}

.breadcrumb-item:first-child {
  margin-left: 0;
}

.breadcrumb-separator {
  color: #999;
  margin: 0 4px;
}
</style>

## 三、配置选项

ArticleBreadcrumb 组件支持以下配置选项，可以通过主题配置进行全局设置：

### 1. 配置项说明

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| enabled | 是否启用面包屑 | `boolean` | `true` |
| showCurrentName | 面包屑最后一列是否显示当前文章的文件名 | `boolean` | `false` |
| separator | 面包屑分隔符 | `string` | `'/'` |
| homeLabel | 鼠标悬停首页图标的提示文案 | `string` | `'首页'` |

### 2. 全局配置示例

可以通过主题配置来全局设置 ArticleBreadcrumb 的行为：

```ts
// .vitepress/config.ts
import { defineConfig } from 'vitepress'
import { defineMistConfig } from 'vitepress-theme-mist'

export default defineConfig({
  // ...
  themeConfig: {
    mist: defineMistConfig({
      breadcrumb: {
        enabled: true,
        showCurrentName: false,
        separator: "/",
        homeLabel: "首页"
      }
    })
  }
})
```

## 四、API

### MtArticleBreadcrumb Props

`MtArticleBreadcrumb` 组件没有特定的 props，它会自动读取页面上下文信息。

### 插槽

`MtArticleBreadcrumb` 组件没有提供插槽，其内容完全由组件自动生成。

## 五、最佳实践

### 1. 页面集成

通常将 ArticleBreadcrumb 组件放置在文章页面的顶部，以便用户了解当前位置：

```vue
<template>
  <div class="article-page">
    <MtArticleBreadcrumb />
    <article>
      <!-- 文章内容 -->
    </article>
  </div>
</template>
```

### 2. 样式定制

可以通过 CSS 覆盖默认样式来定制 ArticleBreadcrumb 的外观：

```css
/* 文章面包屑容器 */
.mt-article-breadcrumb {
  margin-bottom: 16px;
}

/* 面包屑导航 */
.mt-article-breadcrumb .mt-breadcrumb {
  font-size: 14px;
}

/* 面包屑项 */
.mt-article-breadcrumb .mt-breadcrumb__item {
  /* 自定义样式 */
}

/* 首页图标 */
.mt-article-breadcrumb .home {
  /* 自定义样式 */
}
```

### 3. 条件显示

可以根据页面类型条件性地显示面包屑：

```vue
<script setup lang="ts">
import { MtArticleBreadcrumb } from "vitepress-theme-mist";
import { useData } from "vitepress";

const { page } = useData();

// 只在文档页面显示面包屑
const showBreadcrumb = computed(() => {
  return page.value.relativePath.startsWith('docs/');
});
</script>

<template>
  <MtArticleBreadcrumb v-if="showBreadcrumb" />
</template>
```

## 六、常见问题

### Q: ArticleBreadcrumb 在自定义页面中不显示？

A: ArticleBreadcrumb 依赖于 VitePress 的页面上下文信息。在自定义页面中使用时，请确保页面具有正确的文件路径信息。

### Q: 如何自定义首页图标？

A: 首页图标目前是固定的 houseIcon，如果需要自定义，可以通过 CSS 覆盖：

```css
.mt-article-breadcrumb .home .mt-icon {
  /* 自定义图标样式 */
}
```

或者通过主题配置的未来版本支持自定义图标。

### Q: 面包屑中的文件名显示不正确？

A: ArticleBreadcrumb 会自动处理文件名前缀（如序号），如果显示不正确，请检查文件命名是否符合规范：
- 使用数字前缀加点号分隔：`01-Introduction.md`
- 使用中文文件名：`介绍.md`

### Q: 如何禁用某个页面的面包屑？

A: 可以通过页面的 frontmatter 来控制：

```md
---
breadcrumb: false
---
```

然后在组件中检查该配置：

```vue
<script setup lang="ts">
import { MtArticleBreadcrumb } from "vitepress-theme-mist";
import { useData } from "vitepress";

const { frontmatter } = useData();

// 如果页面设置了 breadcrumb: false，则不显示
const showBreadcrumb = computed(() => {
  return frontmatter.value.breadcrumb !== false;
});
</script>

<template>
  <MtArticleBreadcrumb v-if="showBreadcrumb" />
</template>
