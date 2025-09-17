---
title: LV08-Popover气泡卡片
date: 2025-09-03 19:31:21
icon: famicons:logo-markdown
permalink: /sdoc/component/common-omponent/126b07e426211fee0fe4e6df
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
  detailDate: 2025-09-03 19:31:21.510
  fulluuid: e0fe4e6df50d4da893bfdf08990c0e04
  useduuid: e0fe4e6df
---

<script setup>
import { MtPopover, MtButton } from "vitepress-theme-mist"
import { ref } from 'vue'

// 不同触发方式示例
const clickVisible = ref(false)
const hoverVisible = ref(false)
const focusVisible = ref(false)

// 不同位置示例
const topVisible = ref(false)
const rightVisible = ref(false)
const bottomVisible = ref(false)
const leftVisible = ref(false)

// 自定义内容示例
const customVisible = ref(false)

// 禁用示例
const disabled = ref(true)

// 控制可见性示例
const controlVisible = ref(false)
const togglePopover = () => {
  controlVisible.value = !controlVisible.value
}

// 处理关闭事件
const handleClose = () => {
  console.log('Popover已关闭')
}
</script>

<!-- more -->

## 简介

`MtPopover` 是一个轻量级的弹出框组件，用于显示额外的信息或操作。它可以在指定元素附近弹出，支持多种触发方式和丰富的自定义选项。

## 基本用法

在模板中使用 `<MtPopover>` 标签来创建气泡卡片。通过 `reference` 插槽指定触发元素，通过默认插槽或 `content` 属性指定弹出内容。

### 基础示例

下面是一个使用 `MtPopover` 组件的基础示例：

::: demo
popover/basic
:::

## 不同触发方式

通过 `trigger` 属性控制气泡卡片的触发方式，支持 `click`、`hover`、`focus` 和 `contextmenu` 四种方式。

- `click`: 点击触发元素时显示气泡卡片
- `hover`: 鼠标悬停在触发元素上时显示气泡卡片
- `focus`: 触发元素获得焦点时显示气泡卡片（适用于可聚焦元素如按钮、输入框等）
- `contextmenu`: 鼠标右键点击触发元素时显示气泡卡片

<div class="preview-container">
  <div class="button-group">
    <MtPopover trigger="click" content="点击触发的提示">
      <template #reference>
        <MtButton>点击触发</MtButton>
      </template>
    </MtPopover>
    <MtPopover trigger="hover" content="悬停触发的提示">
      <template #reference>
        <MtButton>悬停触发</MtButton>
      </template>
    </MtPopover>
    <MtPopover trigger="focus" content="聚焦触发的提示">
      <template #reference>
        <MtButton>聚焦触发</MtButton>
      </template>
    </MtPopover>
  </div>
</div>

```vue
<template>
  <!-- 点击触发 -->
  <MtPopover trigger="click" content="点击触发的提示">
    <template #reference>
      <MtButton>点击触发</MtButton>
    </template>
  </MtPopover>
  
  <!-- 悬停触发 -->
  <MtPopover trigger="hover" content="悬停触发的提示">
    <template #reference>
      <MtButton>悬停触发</MtButton>
    </template>
  </MtPopover>
  
  <!-- 聚焦触发 -->
  <MtPopover trigger="focus" content="聚焦触发的提示">
    <template #reference>
      <MtButton>聚焦触发</MtButton>
    </template>
  </MtPopover>
</template>
```

::: tip 聚焦触发说明
聚焦触发适用于可聚焦的元素，如按钮、输入框、链接等。当这些元素通过 Tab 键导航获得焦点或通过鼠标点击获得焦点时，气泡卡片会自动显示。当元素失去焦点时，气泡卡片会自动隐藏。
:::

::: details 如何使元素获得焦点
有几种方式可以让元素获得焦点：

1. **Tab 导航**：按 Tab 键在页面上的可聚焦元素之间导航
2. **鼠标点击**：直接点击可聚焦元素
3. **JavaScript 调用**：使用 `element.focus()` 方法主动让元素获得焦点
4. **自动聚焦**：设置 `autofocus` 属性使元素在页面加载时自动获得焦点

只有特定类型的元素默认可以获得焦点，包括：
- 表单元素（`<input>`、`<textarea>`、`<select>` 等）
- 链接（`<a>` 标签带 `href` 属性）
- 按钮（`<button>` 或 `type="button"` 的元素）
- 设置了 `tabindex` 属性的任意元素

如果你想让普通元素（如 `<div>`）能够获得焦点，可以为其添加 `tabindex="0"` 属性。
:::

## 不同位置

通过 `placement` 属性控制气泡卡片的弹出位置，支持 12 个不同的方向。

<div class="preview-container position-demo">
  <div class="position-row">
    <MtPopover placement="top-start" content="Top Start 提示信息">
      <template #reference>
        <MtButton>top-start</MtButton>
      </template>
    </MtPopover>
    <MtPopover placement="top" content="Top 提示信息">
      <template #reference>
        <MtButton>top</MtButton>
      </template>
    </MtPopover>
    <MtPopover placement="top-end" content="Top End 提示信息">
      <template #reference>
        <MtButton>top-end</MtButton>
      </template>
    </MtPopover>
  </div>
  
  <div class="position-row">
    <MtPopover placement="left-start" content="Left Start 提示信息">
      <template #reference>
        <MtButton>left-start</MtButton>
      </template>
    </MtPopover>
    <MtPopover placement="right-start" content="Right Start 提示信息">
      <template #reference>
        <MtButton>right-start</MtButton>
      </template>
    </MtPopover>
  </div>
  
  <div class="position-row">
    <MtPopover placement="left" content="Left 提示信息">
      <template #reference>
        <MtButton>left</MtButton>
      </template>
    </MtPopover>
    <MtPopover placement="right" content="Right 提示信息">
      <template #reference>
        <MtButton>right</MtButton>
      </template>
    </MtPopover>
  </div>
  
  <div class="position-row">
    <MtPopover placement="left-end" content="Left End 提示信息">
      <template #reference>
        <MtButton>left-end</MtButton>
      </template>
    </MtPopover>
    <MtPopover placement="right-end" content="Right End 提示信息">
      <template #reference>
        <MtButton>right-end</MtButton>
      </template>
    </MtPopover>
  </div>
  
  <div class="position-row">
    <MtPopover placement="bottom-start" content="Bottom Start 提示信息">
      <template #reference>
        <MtButton>bottom-start</MtButton>
      </template>
    </MtPopover>
    <MtPopover placement="bottom" content="Bottom 提示信息">
      <template #reference>
        <MtButton>bottom</MtButton>
      </template>
    </MtPopover>
    <MtPopover placement="bottom-end" content="Bottom End 提示信息">
      <template #reference>
        <MtButton>bottom-end</MtButton>
      </template>
    </MtPopover>
  </div>
</div>

```vue
<template>
  <!-- 上方位置 -->
  <MtPopover placement="top-start" content="Top Start 提示信息">
    <template #reference>
      <MtButton>top-start</MtButton>
    </template>
  </MtPopover>
  
  <MtPopover placement="top" content="Top 提示信息">
    <template #reference>
      <MtButton>top</MtButton>
    </template>
  </MtPopover>
  
  <MtPopover placement="top-end" content="Top End 提示信息">
    <template #reference>
      <MtButton>top-end</MtButton>
    </template>
  </MtPopover>
  
  <!-- 左右位置 -->
  <MtPopover placement="left" content="Left 提示信息">
    <template #reference>
      <MtButton>left</MtButton>
    </template>
  </MtPopover>
  
  <MtPopover placement="right" content="Right 提示信息">
    <template #reference>
      <MtButton>right</MtButton>
    </template>
  </MtPopover>
  
  <!-- 下方位置 -->
  <MtPopover placement="bottom-start" content="Bottom Start 提示信息">
    <template #reference>
      <MtButton>bottom-start</MtButton>
    </template>
  </MtPopover>
  
  <MtPopover placement="bottom" content="Bottom 提示信息">
    <template #reference>
      <MtButton>bottom</MtButton>
    </template>
  </MtPopover>
  
  <MtPopover placement="bottom-end" content="Bottom End 提示信息">
    <template #reference>
      <MtButton>bottom-end</MtButton>
    </template>
  </MtPopover>
</template>
```

## 自定义内容

除了使用 `content` 属性传递简单的文本内容外，还可以通过默认插槽传递复杂的自定义内容。

<div class="preview-container">
  <MtPopover>
    <template #reference>
      <MtButton>自定义内容</MtButton>
    </template>
    <div style="padding: 10px;">
      <p>这是自定义内容</p>
      <div style="margin-top: 10px; display: flex; gap: 5px;">
        <MtButton size="small" type="primary">确认</MtButton>
        <MtButton size="small">取消</MtButton>
      </div>
    </div>
  </MtPopover>
</div>

```vue
<template>
  <MtPopover>
    <template #reference>
      <MtButton>自定义内容</MtButton>
    </template>
    <div style="padding: 10px;">
      <p>这是自定义内容</p>
      <div style="margin-top: 10px; display: flex; gap: 5px;">
        <MtButton size="small" type="primary">确认</MtButton>
        <MtButton size="small">取消</MtButton>
      </div>
    </div>
  </MtPopover>
</template>
```

## 禁用状态

通过 `disabled` 属性可以禁用气泡卡片，使其无法触发。

<div class="preview-container">
  <div style="display: flex; align-items: center; gap: 20px;">
    <MtPopover disabled content="这是一个被禁用的提示">
      <template #reference>
        <MtButton>禁用状态</MtButton>
      </template>
    </MtPopover>
    <MtButton @click="disabled = !disabled">
      {{ disabled ? '启用' : '禁用' }}
    </MtButton>
  </div>
</div>

```vue
<template>
  <MtPopover :disabled="isDisabled" content="这是一个被禁用的提示">
    <template #reference>
      <MtButton>禁用状态</MtButton>
    </template>
  </MtPopover>
  
  <MtButton @click="isDisabled = !isDisabled">
    {{ isDisabled ? '启用' : '禁用' }}
  </MtButton>
</template>

<script setup>
import { ref } from 'vue'
const isDisabled = ref(true)
</script>
```

## 控制可见性

可以通过 `v-model` 双向绑定控制气泡卡片的可见性，也可以通过调用方法手动控制。

<div class="preview-container">
  <div style="display: flex; align-items: center; gap: 20px;">
    <MtPopover v-model="controlVisible" content="受控的提示信息">
      <template #reference>
        <MtButton>受控显示</MtButton>
      </template>
    </MtPopover>
    <MtButton @click="togglePopover">
      {{ controlVisible ? '隐藏' : '显示' }}
    </MtButton>
  </div>
</div>

```vue
<template>
  <MtPopover v-model="visible" content="受控的提示信息">
    <template #reference>
      <MtButton>受控显示</MtButton>
    </template>
  </MtPopover>
  
  <MtButton @click="toggleVisible">
    {{ visible ? '隐藏' : '显示' }}
  </MtButton>
</template>

<script setup>
import { ref } from 'vue'
const visible = ref(false)

const toggleVisible = () => {
  visible.value = !visible.value
}
</script>
```

## API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| trigger | string | 'hover' | 触发方式，可选值：'click' \| 'focus' \| 'hover' \| 'contextmenu' |
| placement | string | 'bottom' | 显示位置，支持 12 个方向 |
| content | string | '' | 显示的内容 |
| width | string \| number | - | 宽度，如果不指定则根据内容自动计算 |
| height | string \| number | - | 高度，如果不指定则根据内容自动计算 |
| offset | number | 0 | 偏移量，等价于 xOffset 和 yOffset |
| xOffset | number | 0 | x 偏移量 |
| yOffset | number | 0 | y 偏移量 |
| disabled | boolean | false | 是否禁用 |
| transition | boolean | true | 是否开启过渡动画 |
| transitionName | string | - | 自定义过渡动画名，仅当 transition 为 true 时生效 |
| triggerEl | HTMLDivElement | - | 虚拟元素，弹框将在虚拟元素上显示 |
| zIndex | number | - | 自定义 z-index |
| popperClass | string | - | popper 添加类名 |
| popperStyle | object | - | popper 添加样式 |

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| focus | 当弹框获得焦点时触发 | - |
| blur | 当弹框失去焦点时触发 | - |
| close | 当弹框关闭时触发 | - |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 自定义弹出内容 |
| reference | 触发 Popover 显示的元素 |

## 使用示例

### 基础用法

```vue
<template>
  <MtPopover content="这是一段提示信息">
    <template #reference>
      <span>悬停显示提示</span>
    </template>
  </MtPopover>
</template>
```

### 受控显示

```vue
<template>
  <MtPopover v-model="visible" content="受控显示的提示">
    <template #reference>
      <MtButton @click="visible = !visible">点击显示</MtButton>
    </template>
  </MtPopover>
</template>

<script setup>
import { ref } from 'vue'
const visible = ref(false)
</script>
```

### 自定义内容

```vue
<template>
  <MtPopover>
    <template #reference>
      <MtButton>显示复杂内容</MtButton>
    </template>
    <div style="padding: 15px;">
      <h4>标题</h4>
      <p>这是一段描述信息</p>
      <div style="margin-top: 10px; display: flex; gap: 10px;">
        <MtButton size="small" type="primary">确认</MtButton>
        <MtButton size="small">取消</MtButton>
      </div>
    </div>
  </MtPopover>
</template>
```

### 不同触发方式

```vue
<template>
  <!-- 点击触发 -->
  <MtPopover trigger="click" content="点击触发的提示">
    <template #reference>
      <MtButton>点击触发</MtButton>
    </template>
  </MtPopover>
  
  <!-- 悬停触发 -->
  <MtPopover trigger="hover" content="悬停触发的提示">
    <template #reference>
      <MtButton>悬停触发</MtButton>
    </template>
  </MtPopover>
  
  <!-- 聚焦触发 -->
  <MtPopover trigger="focus" content="聚焦触发的提示">
    <template #reference>
      <MtButton>聚焦触发</MtButton>
    </template>
  </MtPopover>
  
  <!-- 右键触发 -->
  <MtPopover trigger="contextmenu" content="右键触发的提示">
    <template #reference>
      <MtButton>右键触发</MtButton>
    </template>
  </MtPopover>
</template>
```

## 注意事项

1. **触发元素**：必须通过 `reference` 插槽提供触发元素，否则无法正常工作。

2. **内容显示**：可以通过 `content` 属性或默认插槽提供弹出内容，插槽优先级更高。

3. **定位策略**：组件会自动计算弹出框的最佳位置，确保不会超出视窗范围。

4. **事件冒泡**：弹出框内的点击事件会阻止冒泡，防止意外关闭弹框。

5. **焦点管理**：组件内置焦点陷阱，确保键盘导航在弹框内循环。

6. **禁用状态**：当设置 `disabled` 为 true 时，所有触发方式都将失效。

7. **过渡动画**：默认启用过渡动画，可通过 `transition` 属性关闭。

<style scoped>
.preview-container {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.position-demo {
  min-height: 300px;
}

.position-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 15px 0;
}

.position-row:first-child,
.position-row:last-child {
  justify-content: center;
  gap: 40px;
}
</style>
