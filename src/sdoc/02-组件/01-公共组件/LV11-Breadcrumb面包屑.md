---
title: LV11-Breadcrumb面包屑
date: 2025-09-03 19:31:21
icon: famicons:logo-markdown
permalink: /sdoc/component/common-omponent/126b07e4262120fe996735d3
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
  detailDate: 2025-09-03 19:31:21.527
  fulluuid: e996735d35674ee19ac4e6756c620ae9
  useduuid: e996735d3
---

这一部分来了解一下Breadcrumb面包屑组件。

<!-- more -->

<script setup>
import { MtBreadcrumb, MtBreadcrumbItem } from "vitepress-theme-mist"
</script>

## 一、组件介绍

Breadcrumb（面包屑）是一种导航组件，用于显示用户在网站或应用中的当前位置。它可以帮助用户理解他们所在的层级结构，并提供快速返回上一级或首页的导航路径。

### 特点

- **简洁直观**：清晰的层级结构展示
- **高度可定制**：支持自定义分隔符
- **灵活使用**：支持纯文本、图标、链接等多种内容形式
- **无障碍支持**：内置ARIA属性，提升可访问性

## 二、基础用法

### 1. 默认分隔符

默认使用 `/` 作为分隔符，这是最常见的面包屑样式。

::: demo 默认使用斜杠分隔符
Breadcrumb/basic
:::

### 2. 自定义分隔符

通过 `separator` 属性可以自定义分隔符样式。

::: demo 使用不同的分隔符
Breadcrumb/basic
:::

## 三、高级用法

### 1. 带图标的面包屑

结合图标组件，可以创建更加直观的面包屑导航。

::: demo 在面包屑中使用图标
Breadcrumb/advanced
:::

### 2. 带链接的面包屑

为面包屑项添加链接，提供快速导航功能。

::: demo 在面包屑中使用链接
Breadcrumb/advanced
:::

### 3. 混合使用：图标和链接

结合图标和链接，创建更加丰富的面包屑导航。

::: demo 混合使用图标和链接
Breadcrumb/advanced
:::

### 4. 自定义分隔符样式

使用不同的分隔符来适配不同的设计风格。

::: demo 使用自定义分隔符
Breadcrumb/advanced
:::

### 5. 长文本面包屑

处理长文本的面包屑项，确保在不同屏幕尺寸下的良好显示。

::: demo 长文本面包屑处理
Breadcrumb/advanced
:::

## 四、API

### MtBreadcrumb Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| separator | 分隔符 | `string` | `'/'` |

### MtBreadcrumbItem

`MtBreadcrumbItem` 组件没有特定的 props，它作为容器组件，主要通过默认插槽来显示内容。

### 插槽

#### MtBreadcrumb

| 插槽名 | 说明 |
|--------|------|
| default | 面包屑项内容，用于放置 `MtBreadcrumbItem` 组件 |

#### MtBreadcrumbItem

| 插槽名 | 说明 |
|--------|------|
| default | 面包屑项的内容，可以包含文本、图标、链接等 |

## 五、最佳实践

### 1. 层级控制

建议面包屑的层级不要超过 5 级，过深的层级会影响用户体验。

```vue
<!-- 推荐：3-4级 -->
<MtBreadcrumb>
  <MtBreadcrumbItem>首页</MtBreadcrumbItem>
  <MtBreadcrumbItem>产品</MtBreadcrumbItem>
  <MtBreadcrumbItem>智能手机</MtBreadcrumbItem>
  <MtBreadcrumbItem>iPhone 15</MtBreadcrumbItem>
</MtBreadcrumb>
```

### 2. 当前页面标识

最后一个面包屑项通常表示当前页面，不应添加链接。

```vue
<MtBreadcrumb>
  <MtBreadcrumbItem>
    <a href="/">首页</a>
  </MtBreadcrumbItem>
  <MtBreadcrumbItem>
    <a href="/products">产品</a>
  </MtBreadcrumbItem>
  <MtBreadcrumbItem>智能手机</MtBreadcrumbItem> <!-- 当前页面，无链接 -->
</MtBreadcrumb>
```

### 3. 响应式设计

在移动端，考虑简化面包屑显示或使用省略号处理长文本。

```vue
<template>
  <MtBreadcrumb separator="/">
    <MtBreadcrumbItem>首页</MtBreadcrumbItem>
    <MtBreadcrumbItem>产品</MtBreadcrumbItem>
    <!-- 在移动端可能需要简化 -->
    <MtBreadcrumbItem v-if="!isMobile">电子产品</MtBreadcrumbItem>
    <MtBreadcrumbItem>智能手机</MtBreadcrumbItem>
  </MtBreadcrumb>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});
</script>
```

### 4. 无障碍性

组件已内置基本的ARIA属性，但你可以根据需要进一步优化：

```vue
<MtBreadcrumb 
  separator="/" 
  aria-label="面包屑导航"
  role="navigation"
>
  <MtBreadcrumbItem>
    <a href="/" aria-label="返回首页">首页</a>
  </MtBreadcrumbItem>
  <MtBreadcrumbItem>
    <a href="/components" aria-label="查看组件列表">组件</a>
  </MtBreadcrumbItem>
  <MtBreadcrumbItem aria-current="page">Breadcrumb</MtBreadcrumbItem>
</MtBreadcrumb>
```

## 六、常见问题

### Q: 如何自定义面包屑的样式？

A: 可以通过 CSS 覆盖默认样式。组件使用了 BEM 命名规范，你可以通过以下类名进行样式定制：

```css
/* 面包屑容器 */
.mt-breadcrumb {
  /* 你的样式 */
}

/* 面包屑项 */
.mt-breadcrumb__item {
  /* 你的样式 */
}

/* 面包屑项内容 */
.mt-breadcrumb__inner {
  /* 你的样式 */
}

/* 分隔符 */
.mt-breadcrumb__separator {
  /* 你的样式 */
}
```

### Q: 如何在面包屑中使用路由？

A: 结合 Vue Router 使用，将 `<a>` 标签替换为 `<router-link>`：

```vue
<script setup lang="ts">
import { MtBreadcrumb, MtBreadcrumbItem } from "@mist/components/common/Breadcrumb";
import { RouterLink } from 'vue-router';
</script>

<template>
  <MtBreadcrumb separator="/">
    <MtBreadcrumbItem>
      <RouterLink to="/">首页</RouterLink>
    </MtBreadcrumbItem>
    <MtBreadcrumbItem>
      <RouterLink to="/components">组件</RouterLink>
    </MtBreadcrumbItem>
    <MtBreadcrumbItem>Breadcrumb</MtBreadcrumbItem>
  </MtBreadcrumb>
</template>
```

### Q: 如何处理动态面包屑？

A: 可以根据当前路由动态生成面包屑：

```vue
<script setup lang="ts">
import { MtBreadcrumb, MtBreadcrumbItem } from "@mist/components/common/Breadcrumb";
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

const breadcrumbs = computed(() => {
  // 根据路由配置生成面包屑
  return [
    { name: '首页', path: '/' },
    { name: '组件', path: '/components' },
    { name: 'Breadcrumb', path: route.path }
  ];
});
</script>

<template>
  <MtBreadcrumb separator="/">
    <MtBreadcrumbItem v-for="(crumb, index) in breadcrumbs" :key="index">
      <RouterLink 
        v-if="index < breadcrumbs.length - 1" 
        :to="crumb.path"
      >
        {{ crumb.name }}
      </RouterLink>
      <template v-else>
        {{ crumb.name }}
      </template>
    </MtBreadcrumbItem>
  </MtBreadcrumb>
</template>
