---
title: LV07-Message消息提示
date: 2025-09-03 19:31:21
icon: famicons:logo-markdown
permalink: /sdoc/component/common-omponent/126b07e426211f9e66b38f5e
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
  detailDate: 2025-09-03 19:31:21.505
  fulluuid: e66b38f5e4e849f4b13ce3b8038ce543
  useduuid: e66b38f5e
---

<script setup>
import { MtMessage } from "vitepress-theme-mist"
import { ref } from 'vue'

const showMessage = (type = 'info') => {
  MtMessage[type](`这是一条${type}类型的消息提示`)
}

const showCustomMessage = () => {
  MtMessage({
    message: '这是一条自定义消息，持续5秒',
    type: 'success',
    duration: 5000,
    showClose: true,
    center: true
  })
}

const showHTMLMessage = () => {
  MtMessage({
    message: '<strong>HTML内容</strong><em>支持HTML字符串</em>',
    dangerouslyUseHTMLString: true,
    type: 'warning'
  })
}
</script>

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
  margin-bottom: 20px;
}

.message-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.message-btn.primary { background-color: #409eff; color: white; }
.message-btn.success { background-color: #67c23a; color: white; }
.message-btn.warning { background-color: #e6a23c; color: white; }
.message-btn.error { background-color: #f56c6c; color: white; }
.message-btn.info { background-color: #909399; color: white; }
.message-btn.custom { background-color: #7b68ee; color: white; }

.message-btn:hover {
  opacity: 0.8;
  transform: translateY(-1px);
}
</style>

<!-- more -->

## 简介

`MtMessage` 是一个用于显示全局消息提示的 Vue 组件。它支持多种消息类型、自动关闭、手动关闭、消息分组等功能，可以在页面任何位置调用显示消息提示。

## 基本用法

Message 组件通过编程方式调用，不需要在模板中直接使用。可以通过 `MtMessage()` 函数或其类型方法来显示消息。

### 示例

下面是一个使用 `MtMessage` 组件的简单示例：

<div class="preview-container">
  <div class="button-group">
    <button class="message-btn info" @click="showMessage('info')">Info</button>
    <button class="message-btn success" @click="showMessage('success')">Success</button>
    <button class="message-btn warning" @click="showMessage('warning')">Warning</button>
    <button class="message-btn error" @click="showMessage('error')">Error</button>
    <button class="message-btn primary" @click="showMessage('primary')">Primary</button>
    <button class="message-btn custom" @click="showCustomMessage()">自定义</button>
    <button class="message-btn info" @click="showHTMLMessage()">HTML内容</button>
  </div>
</div>

## API

### 类型定义

Message 组件支持以下类型：

- `primary`: 主要消息
- `success`: 成功消息
- `info`: 信息消息
- `warning`: 警告消息
- `error`: 错误消息

### 方法

#### MtMessage(options, appContext?)

显示一条消息，返回一个消息处理器对象。

**参数：**
- `options`: 消息配置对象或消息内容字符串
- `appContext`: 应用上下文（可选）

**返回值：**
```typescript
{
  close: () => void  // 关闭消息的方法
}
```

#### MtMessage.closeAll(type?)

关闭所有消息或指定类型的消息。

**参数：**
- `type`: 要关闭的消息类型（可选）

### 类型方法

每种消息类型都有对应的快捷方法：

- `MtMessage.primary(options, appContext?)`
- `MtMessage.success(options, appContext?)`
- `MtMessage.info(options, appContext?)`
- `MtMessage.warning(options, appContext?)`
- `MtMessage.error(options, appContext?)`

### 配置选项

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| message | 消息内容 | string \| VNode \| (() => VNode) | '' |
| type | 消息类型 | MessageType | 'info' |
| duration | 显示时长（毫秒），0表示不自动关闭 | number | 3000 |
| showClose | 是否显示关闭按钮 | boolean | false |
| center | 是否居中显示 | boolean | false |
| offset | 距离顶部的偏移量 | number | 16 |
| customClass | 自定义类名 | string | '' |
| icon | 自定义图标 | MtIconProps["icon"] | undefined |
| plain | 是否使用朴素样式 | boolean | false |
| zIndex | 消息的 z-index | number | 0 |
| grouping | 是否开启消息分组 | boolean | false |
| dangerouslyUseHTMLString | 是否将 message 属性作为 HTML 片段处理 | boolean | false |
| onClose | 关闭时的回调函数 | () => void | undefined |
| appendTo | 消息挂载的 DOM 元素 | HTMLElement \| string | document.body |

### 使用示例

#### 基本消息

```javascript
// 简单文本消息
MtMessage('这是一条消息')

// 带类型的消息
MtMessage({
  message: '操作成功',
  type: 'success'
})
```

#### 使用类型方法

```javascript
// 成功消息
MtMessage.success('操作成功')

// 错误消息
MtMessage.error('操作失败')

// 警告消息
MtMessage.warning('请注意')

// 信息消息
MtMessage.info('提示信息')

// 主要消息
MtMessage.primary('重要信息')
```

#### 高级配置

```javascript
// 自定义配置
const handler = MtMessage({
  message: '这是一条自定义消息',
  type: 'success',
  duration: 5000,
  showClose: true,
  center: true,
  offset: 20,
  onClose: () => {
    console.log('消息已关闭')
  }
})

// 手动关闭消息
handler.close()

// 关闭所有消息
MtMessage.closeAll()

// 关闭指定类型的消息
MtMessage.closeAll('error')
```

#### HTML 内容

```javascript
// 使用 HTML 内容（注意：谨慎使用，避免 XSS 攻击）
MtMessage({
  message: '<strong>加粗文本</strong> <em>斜体文本</em>',
  dangerouslyUseHTMLString: true,
  type: 'warning'
})
```

#### 消息分组

```javascript
// 开启消息分组，相同内容的消息会合并显示
MtMessage({
  message: '重复消息',
  grouping: true,
  type: 'info'
})

// 再次发送相同消息，会显示重复次数
MtMessage({
  message: '重复消息',
  grouping: true,
  type: 'info'
})
```

## 注意事项

1. **安全性**: 使用 `dangerouslyUseHTMLString` 时要注意 XSS 攻击风险，确保 HTML 内容是可信的。

2. **性能**: 大量消息同时显示可能会影响性能，建议合理设置 `duration` 和使用 `grouping` 功能。

3. **层级**: 消息会自动管理 z-index，确保新消息显示在旧消息之上。

4. **响应式**: 消息会监听窗口大小变化，自动调整位置。

5. **键盘事件**: 按空格键可以关闭当前获得焦点的消息。
