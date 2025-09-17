---
title: LV04-InputSlide滑动输入
date: 2025-09-03 19:31:21
icon: famicons:logo-markdown
permalink: /sdoc/component/common-omponent/126b07e426211e820106ce41
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
  detailDate: 2025-09-03 19:31:21.488
  fulluuid: 20106ce41106495bb53a523e78309e48
  useduuid: 20106ce41
---

<script setup>
import { MtInputSlide } from "vitepress-theme-mist"
import { ref } from 'vue'

const value1 = ref(50)  // 基础示例
const value2 = ref(100) // 自定义范围示例
const value3 = ref(5)   // 设置步长示例
const value4 = ref(30)  // 禁用状态示例
const value5 = ref(75)  // 自定义格式化示例
const formatPercentage = (val) => {
  return `${val}%`
}

// 完整示例
const value6 = ref(500)
const formatCurrency = (val) => {
  return `¥${val}`
}
</script>

<!-- more -->

## 简介

`MtInputSlide` 是一个滑动输入组件，它提供了直观的用户界面来选择数值范围内的值。组件支持自定义范围、步长、格式化函数，并且具有悬浮提示功能，使用户能够精确地选择所需的数值。

## 基本用法

在 Markdown 文档中可以直接使用 `<MtInputSlide>` 标签来创建滑动输入控件。

### 基础示例

下面是一个使用 `MtInputSlide` 组件的简单示例：

<div class="preview-container">
  <MtInputSlide v-model="value1" />
  <div class="value-display">当前值：{{ value1 }}</div>
</div>

### 自定义范围

可以通过 `min` 和 `max` 属性来设置滑动范围：

<div class="preview-container">
  <MtInputSlide v-model="value2" :min="0" :max="200" />
  <div class="value-display">当前值：{{ value2 }}（范围：0-200）</div>
</div>

### 设置步长

使用 `step` 属性来设置滑动的步长：

<div class="preview-container">
  <MtInputSlide v-model="value3" :min="0" :max="10" :step="0.5" />
  <div class="value-display">当前值：{{ value3 }}（步长：0.5）</div>
</div>

### 禁用状态

通过 `disabled` 属性可以禁用滑块：

<div class="preview-container">
  <MtInputSlide v-model="value4" :disabled="true" />
  <div class="value-display">当前值：{{ value4 }}（已禁用）</div>
</div>

### 自定义格式化

使用 `format` 属性来自定义悬浮提示中显示的数值格式：

<div class="preview-container">
  <MtInputSlide v-model="value5" :min="0" :max="100" :format="formatPercentage" />
  <div class="value-display">当前值：{{ value5 }}（百分比格式）</div>
</div>

### 完整示例

下面是一个包含所有属性的完整示例：

<div class="preview-container">
  <MtInputSlide
    v-model="value6"
    name="价格滑块"
    :min="100"
    :max="1000"
    :step="50"
    :format="formatCurrency"
  />
  <div class="value-display">当前价格：{{ formatCurrency(value6) }}</div>
</div>


## API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| name | string | 'Slider' | 滑块的名称 |
| disabled | boolean | false | 是否禁用滑块 |
| min | number | 0 | 滑块的最小值 |
| max | number | 100 | 滑块的最大值 |
| step | number | 1 | 滑块的步长 |
| format | function | - | 自定义格式化函数，用于悬浮提示中显示的数值 |

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| update:modelValue | 当滑块值改变时触发 | 新的数值 |

### 方法

组件支持所有原生的 input[type="range"] 方法。

## 样式定制

### CSS 变量

组件使用以下 CSS 变量进行样式定制：

```css
:root {
  --mist-slider-height: 32px;                    /* 滑块高度 */
  --mist-slider-shadow-color: #d1d5db;           /* 滑块阴影颜色 */
  --mist-slider-thumb-height: 32px;              /* 滑块拇指高度 */
  --mist-slider-thumb-width: 32px;               /* 滑块拇指宽度 */
  --mist-slider-thumb-border-radius: 6px;        /* 滑块拇指圆角 */
  --mist-slider-thumb-color: #ffffff;            /* 滑块拇指颜色 */
  --mist-slider-track-height: 32px;              /* 轨道高度 */
  --mist-slider-track-border-radius: 6px;        /* 轨道圆角 */
  --mist-slider-track-color: #ffffff;            /* 轨道颜色 */
  --mist-slider-track-progress-color: #ffffff;   /* 进度轨道颜色 */
  --mist-slider-track-progress-padding: 0px;     /* 进度轨道内边距 */
  --mist-slider-transition-duration: 0.3s;       /* 过渡动画时间 */
}
```

### 暗色主题

组件自动支持暗色主题，在暗色模式下会自动调整颜色：

```css
:root.dark {
  --mist-slider-thumb-color: #e1e2da;            /* 暗色模式滑块拇指颜色 */
  --mist-slider-track-color: #e1e2da;            /* 暗色模式轨道颜色 */
  --mist-slider-track-progress-color: #e1e2da;   /* 暗色模式进度轨道颜色 */
}
```

## 注意事项

1. **数值范围**：当设置的值超出 min-max 范围时，组件会自动将其限制在有效范围内。
2. **悬浮提示**：鼠标悬浮在滑块上时会显示当前数值，提示框会自动跟随滑块位置。
3. **响应式设计**：组件完全支持响应式布局，宽度会自适应父容器。
4. **浏览器兼容性**：组件已针对 Webkit、Firefox 和 IE/Edge 浏览器进行了兼容性处理。

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
