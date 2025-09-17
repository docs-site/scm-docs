---
title: LV06-Button按钮
date: 2025-09-03 19:31:21
icon: famicons:logo-markdown
permalink: /sdoc/component/common-omponent/126b07e426211f4efe567dec
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
  detailDate: 2025-09-03 19:31:21.500
  fulluuid: efe567dec07b4aa69a2fee617e5ee209
  useduuid: efe567dec
---

<script setup>
import { MtButton } from "vitepress-theme-mist"
import { ref } from 'vue'

// 基础示例
const basicClickCount = ref(0)
const handleBasicClick = () => {
  basicClickCount.value++
}

// 不同类型示例
const primaryClickCount = ref(0)
const handlePrimaryClick = () => {
  primaryClickCount.value++
}

// 不同尺寸示例
const sizeClickCount = ref(0)
const handleSizeClick = () => {
  sizeClickCount.value++
}

</script>

<!-- more -->

## 简介

`MtButton` 是一个按钮组件，提供了基础的样式和交互效果。组件支持多种主题类型和不同尺寸，满足基本的按钮需求。

## 基本用法

在 Markdown 文档中可以直接使用 `<MtButton>` 标签来创建按钮。

### 基础示例

下面是一个使用 `MtButton` 组件的简单示例：

<div class="preview-container">
  <MtButton @click="handleBasicClick">基础按钮</MtButton>
  <div class="value-display">点击次数：{{ basicClickCount }}</div>
</div>

## 不同类型的按钮

使用 `type` 属性来定义按钮的类型，支持 `default`、`primary`、`success`、`warning`、`danger`、`info`、`text` 七种类型。

<div class="preview-container">
  <div style="display: flex; gap: 10px; flex-wrap: wrap;">
    <MtButton @click="handlePrimaryClick">默认按钮</MtButton>
    <MtButton type="primary" @click="handlePrimaryClick">主要按钮</MtButton>
    <MtButton type="success" @click="handlePrimaryClick">成功按钮</MtButton>
    <MtButton type="warning" @click="handlePrimaryClick">警告按钮</MtButton>
    <MtButton type="danger" @click="handlePrimaryClick">危险按钮</MtButton>
    <MtButton type="info" @click="handlePrimaryClick">信息按钮</MtButton>
    <MtButton type="text" @click="handlePrimaryClick">文本按钮</MtButton>
  </div>
  <div class="value-display">点击次数：{{ primaryClickCount }}</div>
</div>

## 不同尺寸的按钮

使用 `size` 属性来设置按钮的尺寸，支持 `large`、`default`、`small` 三种尺寸。

<div class="preview-container">
  <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
    <MtButton size="large" @click="handleSizeClick">大号按钮</MtButton>
    <MtButton size="default" @click="handleSizeClick">默认按钮</MtButton>
    <MtButton size="small" @click="handleSizeClick">小型按钮</MtButton>
  </div>
  <div class="value-display">点击次数：{{ sizeClickCount }}</div>
</div>


## API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| type | string | 'default' | 按钮类型，可选值：'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'text' |
| size | string | 'default' | 按钮尺寸，可选值：'large' \| 'default' \| 'small' |
| icon | string | - | 图标类名 |
| autofocus | boolean | false | 是否自动聚焦 |
| nativeType | string | 'button' | 原生按钮类型，可选值：'button' \| 'submit' \| 'reset' |

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| click | 当按钮被点击时触发 | MouseEvent 对象 |

### Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| focus | 聚焦按钮 | - |
| blur | 失焦按钮 | - |

## 样式定制

### CSS 变量

组件使用以下 CSS 变量进行样式定制：

```css
:root {
  --mist-button-default-color: #606266;          /* 默认按钮文字颜色 */
  --mist-button-default-bg-color: #ffffff;       /* 默认按钮背景颜色 */
  --mist-button-default-border-color: #dcdfe6;   /* 默认按钮边框颜色 */
  
  --mist-button-primary-color: #ffffff;          /* 主要按钮文字颜色 */
  --mist-button-primary-bg-color: #409eff;       /* 主要按钮背景颜色 */
  --mist-button-primary-border-color: #409eff;   /* 主要按钮边框颜色 */
  
  --mist-button-success-color: #ffffff;          /* 成功按钮文字颜色 */
  --mist-button-success-bg-color: #67c23a;       /* 成功按钮背景颜色 */
  --mist-button-success-border-color: #67c23a;   /* 成功按钮边框颜色 */
  
  --mist-button-warning-color: #ffffff;          /* 警告按钮文字颜色 */
  --mist-button-warning-bg-color: #e6a23c;       /* 警告按钮背景颜色 */
  --mist-button-warning-border-color: #e6a23c;   /* 警告按钮边框颜色 */
  
  --mist-button-danger-color: #ffffff;           /* 危险按钮文字颜色 */
  --mist-button-danger-bg-color: #f56c6c;        /* 危险按钮背景颜色 */
  --mist-button-danger-border-color: #f56c6c;    /* 危险按钮边框颜色 */
  
  --mist-button-info-color: #ffffff;             /* 信息按钮文字颜色 */
  --mist-button-info-bg-color: #909399;          /* 信息按钮背景颜色 */
  --mist-button-info-border-color: #909399;      /* 信息按钮边框颜色 */
  
  
  --mist-button-font-size: 14px;                 /* 按钮字体大小 */
  --mist-button-font-weight: 500;                /* 按钮字体粗细 */
  --mist-button-border-radius: 4px;              /* 按钮圆角大小 */
  --mist-button-padding-vertical: 12px;          /* 按钮垂直内边距 */
  --mist-button-padding-horizontal: 20px;        /* 按钮水平内边距 */
}
```

### 暗色主题

组件自动支持暗色主题，在暗色模式下会自动调整颜色：

```css
:root.dark {
  --mist-button-default-color: #d1d5db;          /* 暗色模式默认按钮文字颜色 */
  --mist-button-default-bg-color: #1f2937;       /* 暗色模式默认按钮背景颜色 */
  --mist-button-default-border-color: #4b5563;   /* 暗色模式默认按钮边框颜色 */
  
}
```

## 注意事项

1. **按钮类型**：`type` 属性支持 7 种预设类型（包括 `text` 类型），每种类型都有对应的配色方案。
2. **按钮尺寸**：`size` 属性支持 3 种尺寸，会自动调整按钮的高度、内边距和字体大小。
3. **样式继承**：组件会继承父元素的部分样式属性，如字体系列等。
4. **图标支持**：通过 `icon` 属性可以设置按钮图标，图标会在文字左侧显示。
5. **原生类型**：`nativeType` 属性支持设置按钮的原生类型，用于表单提交等场景。

<style scoped>
.preview-container {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 20px;
}

.value-display {
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #f5f5f5;
  border-radius: 4px;
  font-size: 14px;
  color: #666;
}
</style>
