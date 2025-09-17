---
title: LV09-Segmented分段器
date: 2025-09-03 19:31:21
icon: famicons:logo-markdown
permalink: /sdoc/component/common-omponent/126b07e4262120558dabd0d0
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
  detailDate: 2025-09-03 19:31:21.517
  fulluuid: 58dabd0d094e4320b2033cdf909cc626
  useduuid: 58dabd0d0
---

<script setup>
import { MtSegmented, MtSegmentedItem } from "vitepress-theme-mist"
import { ref } from 'vue'

const basicValue = ref('option1')
const disabledValue = ref('option1')
const iconValue = ref("ep:coordinate")
const mixedValue = ref('option1')
const numberValue = ref(1)

const basicOptions = [
  { value: 'option1', label: '选项一' },
  { value: 'option2', label: '选项二' },
  { value: 'option3', label: '选项三' }
]

const iconOptions = [
  { value: "ep:coordinate", icon: "ep:coordinate" },
  { value: "ep:copy", icon: "ep:copy-document" },
  { value: "ep:cpu", icon: "ep:cpu" },
  { value: "ep:credit-card", icon: "ep:credit-card" },
  { value: "ep:crop", icon: "ep:crop" },
  { value: "ep:d-arrow-left", icon: "ep:d-arrow-left" },
  { value: "ep:d-arrow-right", icon: "ep:d-arrow-right" },
];

const mixedOptions = [
  { value: 'option1', label: '选项一' },
  { value: 'option2', label: '选项二', icon: "ep:coordinate" },
  { value: 'option3', label: '选项三' },
  { value: 'option4', label: '选项四', icon: "ep:cpu" }
]

const numberOptions = [
  { value: 1, label: '一月' },
  { value: 2, label: '二月' },
  { value: 3, label: '三月' },
  { value: 4, label: '四月' }
]

</script>

<style scoped>
.preview-container {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 20px;
}

.demo-description {
  margin-bottom: 15px;
  color: #666;
  font-size: 14px;
}

.result-display {
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #f5f5f5;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
}
</style>

<!-- more -->

## 简介

`MtSegmented` 是一个用于分段选择的 Vue 组件。它支持多种数据类型、图标显示、禁用状态等功能，适用于需要用户在多个选项中做出单个选择的场景。

## 基本用法

Segmented 组件通过模板方式使用，需要提供 `options` 数组和 `v-model` 绑定值。

### 基本用法

最基本的分段器，用于在多个选项中选择一个。

<div class="preview-container">
  <p class="demo-description">提供选项数组和 v-model 绑定值即可创建基本的分段器</p>
  <MtSegmented v-model="basicValue" :options="basicOptions" />
  <div class="result-display">当前选择: {{ basicValue }}</div>
</div>

```vue
<template>
  <MtSegmented 
    v-model="selectedValue" 
    :options="options" 
  />
</template>

<script setup>
import { ref } from 'vue'
import { MtSegmented } from 'vitepress-theme-mist'

const selectedValue = ref('option1')
const options = [
  { value: 'option1', label: '选项一' },
  { value: 'option2', label: '选项二' },
  { value: 'option3', label: '选项三' }
]
</script>
```

### 禁用状态

整个分段器或单个选项可以被禁用。

<div class="preview-container">
  <p class="demo-description">使用 disabled 属性禁用整个分段器</p>
  <MtSegmented v-model="disabledValue" :options="basicOptions" disabled />
  <div class="result-display">当前选择: {{ disabledValue }}</div>
</div>

```vue
<template>
  <!-- 禁用整个分段器 -->
  <MtSegmented 
    v-model="disabledValue" 
    :options="options" 
    disabled 
  />
</template>

<script setup>
import { ref } from 'vue'
import { MtSegmented } from 'vitepress-theme-mist'

const disabledValue = ref('option1')
const options = [
  { value: 'option1', label: '选项一' },
  { value: 'option2', label: '选项二' },
  { value: 'option3', label: '选项三' }
]
</script>
```

### 带图标

选项可以显示图标，增强视觉效果。

<div class="preview-container">
  <p class="demo-description">在选项配置中添加 icon 属性来显示图标</p>
  <MtSegmented v-model="iconValue" :options="iconOptions" />
  <div class="result-display">当前选择: {{ iconValue }}</div>
</div>

```vue
<template>
  <MtSegmented 
    v-model="selectedIcon" 
    :options="iconOptions" 
  />
</template>

<script setup>
import { ref } from 'vue'
import { MtSegmented } from 'vitepress-theme-mist'

const selectedIcon = ref("ep:coordinate")
const iconOptions = [
  { value: "ep:coordinate", icon: "ep:coordinate" },
  { value: "ep:copy", icon: "ep:copy-document" },
  { value: "ep:cpu", icon: "ep:cpu" },
  { value: "ep:credit-card", icon: "ep:credit-card" },
  { value: "ep:crop", icon: "ep:crop" },
  { value: "ep:d-arrow-left", icon: "ep:d-arrow-left" },
  { value: "ep:d-arrow-right", icon: "ep:d-arrow-right" },
]
</script>
```

### 混合模式

部分选项带图标，部分不带，实现灵活的显示效果。

<div class="preview-container">
  <p class="demo-description">为部分选项添加图标，其他选项只显示文本</p>
  <MtSegmented v-model="mixedValue" :options="mixedOptions" />
  <div class="result-display">当前选择: {{ mixedValue }}</div>
</div>

```vue
<template>
  <MtSegmented 
    v-model="mixedValue" 
    :options="mixedOptions" 
  />
</template>

<script setup>
import { ref } from 'vue'
import { MtSegmented } from 'vitepress-theme-mist'

const mixedValue = ref('option1')
const mixedOptions = [
  { value: 'option1', label: '选项一' },
  { value: 'option2', label: '选项二', icon: "ep:coordinate" },
  { value: 'option3', label: '选项三' },
  { value: 'option4', label: '选项四', icon: "ep:cpu" }
]
</script>
```

### 数值类型

支持数值类型的选项值，适用于需要数值选择的场景。

<div class="preview-container">
  <p class="demo-description">选项值可以是数字类型，不仅限于字符串</p>
  <MtSegmented v-model="numberValue" :options="numberOptions" />
  <div class="result-display">当前选择: {{ numberValue }}</div>
</div>

```vue
<template>
  <MtSegmented 
    v-model="numberValue" 
    :options="numberOptions" 
  />
</template>

<script setup>
import { ref } from 'vue'
import { MtSegmented } from 'vitepress-theme-mist'

const numberValue = ref(1)
const numberOptions = [
  { value: 1, label: '一月' },
  { value: 2, label: '二月' },
  { value: 3, label: '三月' },
  { value: 4, label: '四月' }
]
</script>
```

## API

### 组件属性

#### MtSegmented Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| options | 选项数组 | `SegmentedOption[]` | [] |
| disabled | 是否禁用整个分段器 | `boolean` | false |

#### MtSegmentedItem Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 选项的值 | `ModelType` | - |
| label | 选项的标签文本 | `string` | - |
| icon | 选项的图标 | `MtIconProps["icon"]` | - |
| title | 鼠标悬停时的提示文本 | `string` | - |
| name | 选项的名称（用于表单） | `string` | - |
| ariaLabel | 无障碍标签 | `string` | - |

### 类型定义

#### ModelType

```typescript
export type ModelType = string | number | object | boolean
```

#### SegmentedOption

```typescript
export interface SegmentedOption extends SegmentedBase {
  ariaLabel?: string;
}

export interface SegmentedBase {
  value: ModelType;
  label?: string;
  icon?: MtIconProps["icon"];
  title?: string;
  name?: string;
}
```

### 事件

#### v-model

- `v-model`: 绑定当前选中的值，类型为 `ModelType`

### 其他数据类型示例

#### 对象类型

组件支持对象类型的选项值。

```vue
<template>
  <MtSegmented 
    v-model="objectValue" 
    :options="objectOptions" 
  />
</template>

<script setup>
import { ref } from 'vue'
import { MtSegmented } from 'vitepress-theme-mist'

const objectValue = ref({ id: 1 })
const objectOptions = [
  { value: { id: 1 }, label: '对象一' },
  { value: { id: 2 }, label: '对象二' },
  { value: { id: 3 }, label: '对象三' }
]
</script>
```

#### 自定义属性

可以为选项添加更多自定义属性来增强功能。

```vue
<template>
  <MtSegmented 
    v-model="customValue" 
    :options="customOptions" 
  />
</template>

<script setup>
import { ref } from 'vue'
import { MtSegmented } from 'vitepress-theme-mist'

const customValue = ref('option1')
const customOptions = [
  { 
    value: 'option1', 
    label: '选项一',
    title: '这是选项一的详细说明',
    name: 'segmented-option-1',
    ariaLabel: '选择第一个选项'
  },
  { 
    value: 'option2', 
    label: '选项二',
    title: '这是选项二的详细说明',
    name: 'segmented-option-2',
    ariaLabel: '选择第二个选项'
  },
  { 
    value: 'option3', 
    label: '选项三',
    title: '这是选项三的详细说明',
    name: 'segmented-option-3',
    ariaLabel: '选择第三个选项'
  }
]
</script>
```

## 注意事项

1. **无障碍支持**: 组件内置了基本的 ARIA 属性支持，包括 `aria-checked` 和 `role="radio"`，确保屏幕阅读器能够正确识别组件状态。

2. **数据类型**: 组件支持多种数据类型（字符串、数值、对象、布尔值），但在使用对象类型时，需要确保对象的引用一致性。

3. **图标显示**: 图标是可选的，可以根据需要为部分或全部选项添加图标。

4. **禁用状态**: 只支持整个分段器禁用，通过设置 `disabled` 属性来控制。

5. **样式定制**: 组件使用 CSS 类名进行样式控制，可以通过覆盖相应的 CSS 类来自定义外观。

6. **表单集成**: 组件基于 `fieldset` 和 `input[type="radio"]` 实现，可以很好地与表单集成使用。

7. **响应式**: 组件完全支持 Vue 3 的响应式系统，可以与 `ref`、`reactive` 等响应式 API 无缝配合使用。
