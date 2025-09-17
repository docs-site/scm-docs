---
title: LV10-img懒加载
date: 2025-09-14 15:58:43
icon: famicons:logo-markdown
permalink: /sdoc/plugin/126b088b6d43289b5fdc3312
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
  detailDate: 2025-09-14 15:58:43.649
  fulluuid: b5fdc3312e924a1782155081651b8dad
  useduuid: b5fdc3312
---

<!-- more -->

## 一、VitePress 内置图片懒加载功能

VitePress 内置了对 markdown 语法图片的懒加载支持。在配置文件中设置 `lazyLoading: true` 即可启用：

```javascript
// .vitepress/config.mts
export default defineConfig({
  markdown: {
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true,
    },
  },
});
```

**功能特点：**

- 仅对 markdown 语法 `![]()` 的图片有效
- 自动添加 `loading="lazy"` 属性
- 基于浏览器原生懒加载支持

**限制：**

- 对 HTML `<img>` 标签无效
- 需要现代浏览器支持

## 二、自定义 HTML img 标签懒加载插件

为了解决 HTML `<img>` 标签无法自动懒加载的问题，我们开发了 `img-lazy-load` 插件。

### 1. 插件功能

```typescript
// packages/markdown/plugins/img-lazy-load.ts
import type MarkdownIt from "markdown-it";
import type { Token } from "markdown-it";

export const imgLazyLoadPlugin = (md: MarkdownIt, enabled: boolean = true) => {
  // 如果懒加载未启用，直接返回
  if (!enabled) {
    return;
  }

  // 处理 HTML 块和内联内容中的 <img> 标签
  // 自动添加 loading="lazy" 属性
};
```

### 2. 配置方式

插件支持通过 `markdown.image.lazyLoading` 配置控制：

```javascript
// 主题配置
const myThemeConfig = defineMistConfig({
  markdown: {
    image: {
      lazyLoading: true, // 启用插件
    },
  },
});
```

### 3. 工作原理

（1）**HTML 块处理**：处理 `html_block` 类型的 token

（2）**HTML 内联处理**：处理 `html_inline` 类型的 token

（3）**正则匹配**：使用正则表达式识别 `<img>` 标签

（4）**属性添加**：为没有 `loading` 属性的图片添加 `loading="lazy"`

（5）**配置控制**：根据 `lazyLoading` 配置决定是否启用

### 4. 代码实现

```typescript
// 处理 HTML 块中的 <img> 标签
md.renderer.rules.html_block = (tokens: Token[], idx: number, options, env, self) => {
  const token = tokens[idx];
  let content = token.content;

  // 使用正则表达式匹配 <img> 标签
  content = content.replace(
    /<img(\s+[^>]*?)(?:\s+loading\s*=\s*(["'])(?:lazy|eager|auto)\2)?([^>]*?)>/gi,
    (match, before, quote, after) => {
      // 如果已经有 loading 属性，跳过
      if (match.includes("loading=")) {
        return match;
      }

      // 添加 loading="lazy" 属性
      return `<img${before} loading="lazy"${after}>`;
    }
  );

  token.content = content;
  return defaultHtmlBlockRender(tokens, idx, options, env, self);
};
```

## 三、使用示例

### 1. Markdown 语法图片（VitePress 内置支持）

```markdown
![图片描述](./images/example.png)
```

输出结果：

```html
<img src="./images/example.png" alt="图片描述" loading="lazy" />
```

### 2. HTML img 标签（插件支持）

```markdown
<img src="./images/example.png" alt="图片描述" style="zoom:50%;">
```

输出结果：

```html
<img src="./images/example.png" alt="图片描述" style="zoom:50%;" loading="lazy" />
```

### 3. 图片实例

- `![]()`

![image-20250914160244893](./LV10-img懒加载/img/image-20250914160244893.png)

- `<img>`

<img src="./LV10-img懒加载/img/image-20250914160313926.png" alt="image-20250914160313926" style="zoom: 59%;" />

## 四、配置选项

### 1. 全局启用/禁用

```javascript
// 启用所有图片懒加载
markdown: {
  image: {
    lazyLoading: true, // 默认值
  },
}

// 禁用所有图片懒加载
markdown: {
  image: {
    lazyLoading: false,
  },
}
```

### 2. 优先级说明

（1）**VitePress 内置功能**：处理 `![]()` 语法图片

（2）**自定义插件**：处理 `<img>` 标签图片

（3）**手动设置**：已有 `loading` 属性的图片不会被修改
