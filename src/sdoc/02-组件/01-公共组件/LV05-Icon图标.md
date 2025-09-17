---
title: LV05-Icon图标
date: 2025-09-03 19:31:21
icon: famicons:logo-markdown
permalink: /sdoc/component/common-omponent/126b07e426211ee3c329bfd3
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
  detailDate: 2025-09-03 19:31:21.494
  fulluuid: 3c329bfd32904f078790caf9654bc7f5
  useduuid: 3c329bfd3
---

<!-- 引入 iconfont 在线图标样式 -->
<link rel="stylesheet" href="//at.alicdn.com/t/font_2989306_w303erbip9.css" />

<script setup lang="ts">
import { MtIcon } from "vitepress-theme-mist";
import { gitee, email, WhatsApp, telegram, github, bilibili, moblieQQ, music } from "vitepress-theme-mist";
import { shareIcon, fullScreenOneIcon } from "vitepress-theme-mist";
const svg = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="39px" height="47px" viewBox="0 0 39 47" enable-background="new 0 0 39 47" xml:space="preserve">  <image id="image0" width="39" height="47" x="0" y="0"
    xlink:href="data:image/png;base64,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" />
</svg>`;
</script>

<style lang="css" scoped>
.icons-container {
  display: flex;
  gap: 20px;
}
</style>

<!-- more-->

`MtIcon` 是一个图标组件，支持多种图标类型，包括 Iconify 在线图标、SVG 图标、Font 图标、图片等。

## 基本用法

### 组件引入

```vue
<script setup lang="ts">
import { MtIcon } from "vitepress-theme-mist";
</script>
```

### 支持的图标类型

#### Iconify 在线图标

使用 Iconify 在线图标库中的图标，需要传入包含冒号的图标名称。

```vue
<MtIcon icon="material-symbols:account-circle" icon-type="iconifyOnline" />
```

示例：

<div class="icons-container">
  <!-- Iconify 在线图标 -->
  <MtIcon icon="material-symbols:account-circle" icon-type="iconifyOnline" />
</div>

#### SVG 图标

支持直接传入 SVG 字符串或 SVG 文件路径。

```vue
<script setup lang="ts">
const svg = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="39px" height="47px" viewBox="0 0 39 47" enable-background="new 0 0 39 47" xml:space="preserve">  <image id="image0" width="39" height="47" x="0" y="0"
    xlink:href="data:image/png;base64,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" />
</svg>`;
</script>

<MtIcon :icon="svg" icon-type="svg" />
```

示例：

<div class="icons-container">
  <!-- SVG 图标 -->
  <MtIcon :icon="svg" icon-type="svg" />
</div>

#### Font 图标

支持使用 iconfont 等字体图标库。

```vue
<!-- 引入 iconfont 在线图标样式 -->
<link rel="stylesheet" href="//at.alicdn.com/t/font_2989306_w303erbip9.css" />

<MtIcon icon="icon-github" icon-type="iconfont" />
```

示例：

<div class="icons-container">
  <!-- Font 图标 -->
  <MtIcon icon="icon-github" icon-type="iconfont" />
</div>

#### 悬停效果

支持鼠标悬停时改变图标颜色。

```vue
<MtIcon icon="material-symbols:account-circle" hover hoverColor="#395AE3" />
```

示例：

<div class="icons-container">
  <!-- 带悬停效果的图标 -->
  <MtIcon icon="material-symbols:account-circle" hover hoverColor="#395AE3" />
</div>

## 组件属性

| 属性名     | 类型                                                                                                        | 默认值                  | 说明                                          |
| ---------- | ----------------------------------------------------------------------------------------------------------- | ----------------------- | --------------------------------------------- |
| icon       | string \| Object \| Component \| IconifyIcon                                                                | -                       | 图标内容，支持多种格式                        |
| iconType   | "svg" \| "unicode" \| "iconfont" \| "symbol" \| "img" \| "component" \| "iconifyOffline" \| "iconifyOnline" | -                       | 图标类型                                      |
| size       | string \| number                                                                                            | 'inherit'               | 图标大小                                      |
| color      | string                                                                                                      | 'inherit'               | 图标颜色                                      |
| hover      | boolean                                                                                                     | false                   | 是否启用悬停效果                              |
| hoverColor | string                                                                                                      | 'var(--tk-theme-color)' | 悬停时图标颜色                                |
| imgAlt     | string                                                                                                      | -                       | 图片标签的 alt 属性（iconType 为 img 时生效） |
| pointer    | boolean                                                                                                     | false                   | 是否使用鼠标手形                              |
| style      | Record<string, any>                                                                                         | -                       | 自定义图标样式                                |

## 图标类型自动识别

组件支持通过图标名称前缀自动识别图标类型：

- `img-` 或 `IMG-` 开头：自动识别为图片类型
- `if-` 或 `IF-` 开头：自动识别为 iconfont 类型
- `uni-` 或 `UNI-` 开头：自动识别为 unicode 类型
- `sym-` 或 `SYM-` 开头：自动识别为 symbol 类型
- `svg-` 或 `SVG-` 开头：自动识别为 svg 类型

## 内置社交图标

组件内置了一些常用的社交图标，可以直接使用：

```vue
<script setup lang="ts">
import { gitee, email, WhatsApp, telegram, github, bilibili, moblieQQ, music } from "vitepress-theme-mist";
</script>

<!-- 使用内置社交图标 -->
<MtIcon :icon="gitee" icon-type="svg" />
<MtIcon :icon="email" icon-type="svg" />
<MtIcon :icon="WhatsApp" icon-type="svg" />
<MtIcon :icon="telegram" icon-type="svg" />
<MtIcon :icon="github" icon-type="svg" />
<MtIcon :icon="bilibili" icon-type="svg" />
<MtIcon :icon="moblieQQ" icon-type="svg" />
<MtIcon :icon="music" icon-type="svg" />
```

示例：

<div class="icons-container">
  <MtIcon :icon="gitee" icon-type="svg" />
  <MtIcon :icon="email" icon-type="svg" />
  <MtIcon :icon="WhatsApp" icon-type="svg" />
  <MtIcon :icon="telegram" icon-type="svg" />
  <MtIcon :icon="github" icon-type="svg" />
  <MtIcon :icon="bilibili" icon-type="svg" />
  <MtIcon :icon="moblieQQ" icon-type="svg" />
  <MtIcon :icon="music" icon-type="svg" />
  <MtIcon :icon="shareIcon" icon-type="svg" />
  <MtIcon :icon="fullScreenOneIcon" icon-type="svg" />
</div>

## 注意事项

（1）使用 iconfont 图标时，需要先引入对应的 CSS 文件

（2）SVG 图标支持直接传入 SVG 字符串或 SVG 文件路径

（3）Iconify 在线图标需要网络连接

（4）悬停效果需要设置 `hover` 属性为 `true` 才会生效

（5）这个组件依赖于`@iconify/vue`，当我们在工作区外直接在线安装`npm i -D vitepress-theme-mist`的时候是可以自动安装这个依赖的，但是当`npm i -D ../vitepress-theme-mist/dist/vitepress-theme-mist/`这样进行本地安装的时候，依赖是不会自动安装到工作区外的站点的，这个时候会报下面的错误：

```bash
11:57:24 [vitepress] Pre-transform error: Failed to resolve import "@iconify/vue" from "../vitepress-theme-mist/dist/vitepress-theme-mist/es/index.mjs". Does the file exist?
11:57:24 [vitepress] Pre-transform error: Failed to resolve import "@iconify/vue" from "../vitepress-theme-mist/dist/vitepress-theme-mist/es/components/common/Icon/src/components/IconifyOffline.vue2.mjs". Does the file exist?
11:57:24 [vitepress] Pre-transform error: Failed to resolve import "@iconify/vue" from "../vitepress-theme-mist/dist/vitepress-theme-mist/es/components/common/Icon/src/components/IconifyOnline.vue2.mjs". Does the file exist?
11:57:24 [vitepress] Internal server error: Failed to resolve import "@iconify/vue" from "../vitepress-theme-mist/dist/vitepress-theme-mist/es/index.mjs". Does the file exist?
  Plugin: vite:import-analysis
  File: D:/sumu_blog/vitepress-theme-mist/dist/vitepress-theme-mist/es/index.mjs:8:44
  6  |  export { default as MtIcon } from './components/common/Icon/src/index.vue2.mjs';
  7  |  export { WhatsApp, bilibili, email, gitee, github, moblieQQ, music, telegram } from './components/common/Icon/src/SocialIcons.mjs';
  8  |  export { addCollection as addIcons } from '@iconify/vue';
     |                                             ^
  9  |
  10 |  var index = {
```

一开始肯定还是考虑在工作区外的站点添加依赖：

```bash
npm i -D @iconify/vue
```

但是这样还是不行，需要在`../vitepress-theme-mist/dist/vitepress-theme-mist/`这个目录中安装才行。
