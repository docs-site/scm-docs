---
title: LV05-侧边栏的rewrite模式
date: 2025-09-03 20:24:53
icon: famicons:logo-markdown
permalink: /sdoc/plugin/126b07e44a951ec74338378f
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
  detailDate: 2025-09-03 20:24:53.492
  fulluuid: 74338378ff1f4660bcf028c0ee03adb8
  useduuid: 74338378f
---

<!-- more -->

## 一、准备工作

### 1. 工程目录结构

```bash
docs
├── .vitepress
├── 01.指南
│   ├── 01.简介
│   │   ├── 01.简介.md
│   │   └── 10.快速开始.md
│   ├── 10.使用
│   │   ├── 05.Markdown 拓展.md
│   │   └── 10.摘要与封面.md
│   └── 目录.md
├── 15.主题开发
│   ├── 01.开发思路.md
│   └── 10.主题配置.md
├── 20.资源
│   ├── 05.案例.md
│   └── 10.功能拓展
│       ├── 01.简介.md
│       └── 05.导航栏图标.md
├── @pages
│   ├── archivesPage.md
│   ├── articleOverviewPage.md
│   ├── categoriesPage.md
│   ├── loginPage.md
│   ├── riskLinkPage.md
│   └── tagsPage.md
├── ...
├── index.md
├── package.json
```

### 2. rewrite配置

在[packages/config/index.ts](https://github.com/docs-site/vitepress-theme-mist/blob/master/packages/config/index.ts)文件中添加以下内容：

```typescript
import { createRewrites } from "vitepress-plugin-permalink";

// 默认配置
const defaultMistConfig: Required<MistConfig> = {
  useTheme: true,
  //...
  vitePlugins: {
    //...
    navSidebarOption: {
      //...
      sideBarOption: {
        initItems: false, // 这个设置为true的话进入某个导航栏路径时可能不显示侧边栏
        resolveRule: "rewrites",
      },
    },
  },
  //...
} as Required<MistConfig>;

export const defineMistConfig = (config: MistConfig & UserConfig<DefaultTheme.Config> = {}): UserConfig => {
  //...
  return {
    //...
    rewrites: createRewrites(),
  };
};
```

## 二、数据生成

上面目录结构经过`vitepress-plugin-permalink/src/rewrites.ts`中的createRewrites函数处理后会得到下面的数据：

```typescript
{
  '01.指南/01.简介/01.简介.md': 'guide/intro/docs/intro.md',
  '01.指南/01.简介/10.快速开始.md': 'guide/intro/docs/quickstart.md',
  '01.指南/10.使用/05.Markdown 拓展.md': 'guide/use/docs/markdown.md',
  '01.指南/10.使用/10.摘要与封面.md': 'guide/use/docs/summary.md',
  '01.指南/目录.md': 'guide/docs/catalog.md',
  '15.主题开发/01.开发思路.md': 'develop/docs/intro.md',
  '15.主题开发/10.主题配置.md': 'develop/docs/config.md',
  '20.资源/05.案例.md': 'resources/docs/case.md',
  '20.资源/10.功能拓展/01.简介.md': 'resources/expand/docs/intro.md',
  '20.资源/10.功能拓展/05.导航栏图标.md': 'resources/expand/docs/nav-icon.md',
  '@pages/archivesPage.md': 'archives.md',
  '@pages/articleOverviewPage.md': 'articleOverview.md',
  '@pages/categoriesPage.md': 'categories.md',
  '@pages/loginPage.md': 'login.md',
  '@pages/riskLinkPage.md': 'risk-link.md',
  '@pages/tagsPage.md': 'tags.md',
  'examples/articlePage/aside.md': 'iframe/articlePage/aside.md',
  'examples/articlePage/doc.md': 'iframe/articlePage/doc.md'
}
```

由于后返回是这样的：

```typescript
return { __create__: "vitepress-plugin-permalink", ...pathToPermalink };
```

所以我们得到的rewrite完整数据为：

```typescript
export const defineMistConfig = (config: MistConfig & UserConfig<DefaultTheme.Config> = {}): UserConfig => {
  //...
  return {
    //...
    rewrites: {
      "01.指南/01.简介/01.简介.md": "guide/intro/docs/intro.md",
      "01.指南/01.简介/10.快速开始.md": "guide/intro/docs/quickstart.md",
      "01.指南/10.使用/05.Markdown 拓展.md": "guide/use/docs/markdown.md",
      "01.指南/10.使用/10.摘要与封面.md": "guide/use/docs/summary.md",
      "01.指南/目录.md": "guide/docs/catalog.md",
      "15.主题开发/01.开发思路.md": "develop/docs/intro.md",
      "15.主题开发/10.主题配置.md": "develop/docs/config.md",
      "20.资源/05.案例.md": "resources/docs/case.md",
      "20.资源/10.功能拓展/01.简介.md": "resources/expand/docs/intro.md",
      "20.资源/10.功能拓展/05.导航栏图标.md": "resources/expand/docs/nav-icon.md",
      "@pages/archivesPage.md": "archives.md",
      "@pages/articleOverviewPage.md": "articleOverview.md",
      "@pages/categoriesPage.md": "categories.md",
      "@pages/loginPage.md": "login.md",
      "@pages/riskLinkPage.md": "risk-link.md",
      "@pages/tagsPage.md": "tags.md",
      "examples/articlePage/aside.md": "iframe/articlePage/aside.md",
      "examples/articlePage/doc.md": "iframe/articlePage/doc.md",
    },
  };
};
```

## 三、侧边栏插件中使用

### 1. sidebar-resolve插件导入

在`vitepress-plugin-sidebar-resolve/src/index.ts`这样导入：

```typescript
export default function VitePluginVitePressSidebarResolve(option: SidebarOption = {}): Plugin & { name: string } {
  let isExecute = false;

  return {
    name: "vite-plugin-vitepress-sidebar-resolve",
    //...
    config(config: any) {
      // 防止 vitepress build 时重复执行
      if (isExecute) return;
      isExecute = true;

      const {
        site: { themeConfig = {}, locales = {} },
        srcDir,
        rewrites: rewritesObj,
      } = config.vitepress;

      const { path, ignoreList, localeRootDir, type = "object", resolveRule = "filePath" } = option;
      const baseDir = path ? join(srcDir, path) : srcDir;
      const rewrites = rewritesObj.map || {};
      const rewritesLength = Object.keys(rewrites).length;
      // ...
    },
  };
}
```

### 2. 得到的数据？

我们上面引入，然后得到的数据是这样的。

#### 2.1 rewritesObj

包含map和inv两部分，这两部分键值对是相反的。

```typescript
{
  map: {
    '01.指南/01.简介/01.简介.md': 'guide/intro/docs/intro.md',
    '01.指南/01.简介/10.快速开始.md': 'guide/intro/docs/quickstart.md',
    '01.指南/10.使用/05.Markdown 拓展.md': 'guide/use/docs/markdown.md',
    '01.指南/10.使用/10.摘要与封面.md': 'guide/use/docs/summary.md',
    '01.指南/目录.md': 'guide/docs/catalog.md',
    '15.主题开发/01.开发思路.md': 'develop/docs/intro.md',
    '15.主题开发/10.主题配置.md': 'develop/docs/config.md',
    '20.资源/05.案例.md': 'resources/docs/case.md',
    '20.资源/10.功能拓展/01.简介.md': 'resources/expand/docs/intro.md',
    '20.资源/10.功能拓展/05.导航栏图标.md': 'resources/expand/docs/nav-icon.md',
    '@pages/archivesPage.md': 'archives.md',
    '@pages/articleOverviewPage.md': 'articleOverview.md',
    '@pages/categoriesPage.md': 'categories.md',
    '@pages/loginPage.md': 'login.md',
    '@pages/riskLinkPage.md': 'risk-link.md',
    '@pages/tagsPage.md': 'tags.md',
    'examples/articlePage/aside.md': 'iframe/articlePage/aside.md',
    'examples/articlePage/doc.md': 'iframe/articlePage/doc.md'
  },
  inv: {
    'guide/intro/docs/intro.md': '01.指南/01.简介/01.简介.md',
    'guide/intro/docs/quickstart.md': '01.指南/01.简介/10.快速开始.md',
    'guide/use/docs/markdown.md': '01.指南/10.使用/05.Markdown 拓展.md',
    'guide/use/docs/summary.md': '01.指南/10.使用/10.摘要与封面.md',
    'guide/docs/catalog.md': '01.指南/目录.md',
    'develop/docs/intro.md': '15.主题开发/01.开发思路.md',
    'develop/docs/config.md': '15.主题开发/10.主题配置.md',
    'resources/docs/case.md': '20.资源/05.案例.md',
    'resources/expand/docs/intro.md': '20.资源/10.功能拓展/01.简介.md',
    'resources/expand/docs/nav-icon.md': '20.资源/10.功能拓展/05.导航栏图标.md',
    'archives.md': '@pages/archivesPage.md',
    'articleOverview.md': '@pages/articleOverviewPage.md',
    'categories.md': '@pages/categoriesPage.md',
    'login.md': '@pages/loginPage.md',
    'risk-link.md': '@pages/riskLinkPage.md',
    'tags.md': '@pages/tagsPage.md',
    'iframe/articlePage/aside.md': 'examples/articlePage/aside.md',
    'iframe/articlePage/doc.md': 'examples/articlePage/doc.md'
  }
}
```

#### 2.2 rewrites

rewrites是从rewritesObj中拿出map的数据，也就是：

```typescript
{
  '01.指南/01.简介/01.简介.md': 'guide/intro/docs/intro.md',
  '01.指南/01.简介/10.快速开始.md': 'guide/intro/docs/quickstart.md',
  '01.指南/10.使用/05.Markdown 拓展.md': 'guide/use/docs/markdown.md',
  '01.指南/10.使用/10.摘要与封面.md': 'guide/use/docs/summary.md',
  '01.指南/目录.md': 'guide/docs/catalog.md',
  '15.主题开发/01.开发思路.md': 'develop/docs/intro.md',
  '15.主题开发/10.主题配置.md': 'develop/docs/config.md',
  '20.资源/05.案例.md': 'resources/docs/case.md',
  '20.资源/10.功能拓展/01.简介.md': 'resources/expand/docs/intro.md',
  '20.资源/10.功能拓展/05.导航栏图标.md': 'resources/expand/docs/nav-icon.md',
  '@pages/archivesPage.md': 'archives.md',
  '@pages/articleOverviewPage.md': 'articleOverview.md',
  '@pages/categoriesPage.md': 'categories.md',
  '@pages/loginPage.md': 'login.md',
  '@pages/riskLinkPage.md': 'risk-link.md',
  '@pages/tagsPage.md': 'tags.md',
  'examples/articlePage/aside.md': 'iframe/articlePage/aside.md',
  'examples/articlePage/doc.md': 'iframe/articlePage/doc.md'
}
```

后面将会根据这个生成侧边栏。

### 3. 转换为目录结构

首先会通过下面的函数转换rewrites数据：

```typescript
const buildDirectoryStructure = (rewrites: Record<string, string>): DirectoryStructure => {
  const structure: DirectoryStructure = {};

  Object.entries(rewrites).forEach(([key, value]) => {
    const parts = key.split("/");
    let currentLevel = structure;

    // 遍历路径部分，构建嵌套结构
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isLast = i === parts.length - 1;

      // 最后一部分是文件
      if (isLast) currentLevel[part] = value;
      else {
        // 中间部分是目录
        if (!currentLevel[part]) currentLevel[part] = {};
        currentLevel = currentLevel[part] as DirectoryStructure;
      }
    }
  });

  return structure;
};
```

调用的时候是传入的上面的rewrites，经过目录结构转换会得到下面的数据：

```bash
{
  '01.指南': {
    '01.简介': {
      '01.简介.md': 'guide/intro/docs/intro.md',
      '10.快速开始.md': 'guide/intro/docs/quickstart.md'
    },
    '10.使用': {
      '05.Markdown 拓展.md': 'guide/use/docs/markdown.md',
      '10.摘要与封面.md': 'guide/use/docs/summary.md'
    },
    '目录.md': 'guide/docs/catalog.md'
  },
  '15.主题开发': {
    '01.开发思路.md': 'develop/docs/intro.md',
    '10.主题配置.md': 'develop/docs/config.md'
  },
  '20.资源': {
    '05.案例.md': 'resources/docs/case.md',
    '10.功能拓展': {
      '01.简介.md': 'resources/expand/docs/intro.md',
      '05.导航栏图标.md': 'resources/expand/docs/nav-icon.md'
    }
  },
  '@pages': {
    'archivesPage.md': 'archives.md',
    'articleOverviewPage.md': 'articleOverview.md',
    'categoriesPage.md': 'categories.md',
    'loginPage.md': 'login.md',
    'riskLinkPage.md': 'risk-link.md',
    'tagsPage.md': 'tags.md'
  },
  examples: {
    articlePage: {
      'aside.md': 'iframe/articlePage/aside.md',
      'doc.md': 'iframe/articlePage/doc.md'
    }
  }
}
```

可以看到每一个目录都是一个对象结构，这个目录下的md文档是键值对。

### 4. 侧边栏数据

那么最后生成的侧边栏数据是这样的：

```bash
{
    "/guide/": [
        {
            "text": "简介",
            "items": [
                {
                    "text": "简介",
                    "link": "/guide/intro/docs/intro.md"
                },
                {
                    "text": "快速开始",
                    "link": "/guide/intro/docs/quickstart.md"
                }
            ]
        },
        {
            "text": "使用",
            "items": [
                {
                    "text": "Markdown 拓展",
                    "link": "/guide/use/docs/markdown.md"
                },
                {
                    "text": "摘要与封面",
                    "link": "/guide/use/docs/summary.md"
                }
            ]
        }
    ],
    "/develop/": [
        {
            "text": "开发思路",
            "link": "/develop/docs/intro.md"
        },
        {
            "text": "主题配置",
            "link": "/develop/docs/config.md"
        }
    ],
    "/resources/": [
        {
            "text": "功能拓展",
            "items": [
                {
                    "text": "简介",
                    "link": "/resources/expand/docs/intro.md"
                },
                {
                    "text": "导航栏图标",
                    "link": "/resources/expand/docs/nav-icon.md"
                }
            ]
        }
    ],
    "/archives.md/": [
        {
            "text": "分类",
            "link": "/categories.md"
        },
        {
            "text": "loginPage",
            "link": "/login.md"
        },
        {
            "text": "riskLinkPage",
            "link": "/risk-link.md"
        },
        {
            "text": "标签",
            "link": "/tags.md"
        }
    ],
    "/iframe/": [
        {
            "text": "articlePage",
            "items": [
                {
                    "text": "aside",
                    "link": "/iframe/articlePage/aside.md"
                },
                {
                    "text": "doc",
                    "link": "/iframe/articlePage/doc.md"
                }
            ]
        }
    ]
}
```

## 四、侧边栏处理过程示例

为了更清楚地理解处理过程，我们以部分具体数据为例，详细描述每一步的处理过程。

### 1. 初始数据

要使用的的 rewrite 数据：

```json
{
  "01.指南": {
    "01.简介": {
      "01.简介.md": "guide/intro/docs/intro.md",
      "10.快速开始.md": "guide/intro/docs/quickstart.md"
    },
    "10.使用": {
      "05.Markdown 拓展.md": "guide/use/docs/markdown.md",
      "10.摘要与封面.md": "guide/use/docs/summary.md"
    },
    "目录.md": "guide/docs/catalog.md"
  }
}
```

注意：实际传入 `createRewritesSidebar` 函数的 rewrites 参数应该是扁平的键值对形式：

```json
{
  "01.指南/01.简介/01.简介.md": "guide/intro/docs/intro.md",
  "01.指南/01.简介/10.快速开始.md": "guide/intro/docs/quickstart.md",
  "01.指南/10.使用/05.Markdown 拓展.md": "guide/use/docs/markdown.md",
  "01.指南/10.使用/10.摘要与封面.md": "guide/use/docs/summary.md",
  "01.指南/目录.md": "guide/docs/catalog.md"
}
```

### 2. 第一步：构建目录结构

`buildDirectoryStructure` 函数将扁平的 rewrites 映射转换为嵌套的目录结构。

#### 2.1 处理 "01.指南/01.简介/01.简介.md"

```javascript
"01.指南/01.简介/01.简介.md": "guide/intro/docs/intro.md"
```

（1）parts = \["01.指南", "01.简介", "01.简介.md"\]

（2）currentLevel = structure (初始为空对象)

（3）处理 "01.指南"：

- currentLevel\["01.指南"] 不存在，创建空对象：structure\["01.指南"\] = {}
- currentLevel = structure\["01.指南"\]

（4）处理 "01.简介"：

- currentLevel["01.简介"] 不存在，创建空对象：structure\["01.指南"\]\["01.简介"\] = {}
- currentLevel = structure\["01.指南"\]\["01.简介"\]

（5）处理 "01.简介.md" (最后一部分)：

- currentLevel["01.简介.md"] = "guide/intro/docs/intro.md"

- structure 变为：

  ```json
  {
    "01.指南": {
      "01.简介": {
        "01.简介.md": "guide/intro/docs/intro.md"
      }
    }
  }
  ```

#### 2.2 处理 "01.指南/01.简介/10.快速开始.md"

```javascript
"01.指南/01.简介/10.快速开始.md": "guide/intro/docs/quickstart.md"
```

（1）parts = ["01.指南", "01.简介", "10.快速开始.md"]

（2）currentLevel = structure

（3）处理 "01.指南"：

- structure["01.指南"] 已存在
- currentLevel = structure["01.指南"]

（4）处理 "01.简介"：

- structure\["01.指南"\]\["01.简介"\] 已存在
- currentLevel = structure\["01.指南"\]\["01.简介"\]

（5）处理 "10.快速开始.md" (最后一部分)：

- currentLevel["10.快速开始.md"] = "guide/intro/docs/quickstart.md"

- structure 变为：

  ```json
  {
    "01.指南": {
      "01.简介": {
        "01.简介.md": "guide/intro/docs/intro.md",
        "10.快速开始.md": "guide/intro/docs/quickstart.md"
      }
    }
  }
  ```

#### 2.3 处理 "01.指南/10.使用/05.Markdown 拓展.md"

```javascript
"01.指南/10.使用/05.Markdown 拓展.md": "guide/use/docs/markdown.md"
```

（1）parts = ["01.指南", "10.使用", "05.Markdown 拓展.md"]

（2）currentLevel = structure

（3）处理 "01.指南"：

- structure["01.指南"] 已存在
- currentLevel = structure["01.指南"]

（4）处理 "10.使用"：

- currentLevel["10.使用"] 不存在，创建空对象：structure\["01.指南"\]\["10.使用"\] = {}
- currentLevel = structure\["01.指南"\]\["10.使用"\]

（5）处理 "05.Markdown 拓展.md" (最后一部分)：

- currentLevel["05.Markdown 拓展.md"] = "guide/use/docs/markdown.md"

- structure 变为：

  ```json
  {
    "01.指南": {
      "01.简介": {
        "01.简介.md": "guide/intro/docs/intro.md",
        "10.快速开始.md": "guide/intro/docs/quickstart.md"
      },
      "10.使用": {
        "05.Markdown 拓展.md": "guide/use/docs/markdown.md"
      }
    }
  }
  ```

#### 2.4 处理 "01.指南/10.使用/10.摘要与封面.md"

```javascript
"01.指南/10.使用/10.摘要与封面.md": "guide/use/docs/summary.md"
```

（1）parts = ["01.指南", "10.使用", "10.摘要与封面.md"]

（2）currentLevel = structure

（3）处理 "01.指南"：

- structure["01.指南"] 已存在
- currentLevel = structure["01.指南"]

（4）处理 "10.使用"：

- structure\["01.指南"\]\["10.使用"\] 已存在
- currentLevel = structure\["01.指南"\]\["10.使用"\]

（5）处理 "10.摘要与封面.md" (最后一部分)：

- currentLevel["10.摘要与封面.md"] = "guide/use/docs/summary.md"

- structure 变为：

  ```json
  {
    "01.指南": {
      "01.简介": {
        "01.简介.md": "guide/intro/docs/intro.md",
        "10.快速开始.md": "guide/intro/docs/quickstart.md"
      },
      "10.使用": {
        "05.Markdown 拓展.md": "guide/use/docs/markdown.md",
        "10.摘要与封面.md": "guide/use/docs/summary.md"
      }
    }
  }
  ```

#### 2.5 处理 "01.指南/目录.md"

```javascript
"01.指南/目录.md": "guide/docs/catalog.md"
```

（1）parts = ["01.指南", "目录.md"]

（2）currentLevel = structure

（3）处理 "01.指南"：

- structure["01.指南"] 已存在
- currentLevel = structure["01.指南"]

（4）处理 "目录.md" (最后一部分)：

- currentLevel["目录.md"] = "guide/docs/catalog.md"
- structure 变为最终结果：

```json
{
  "01.指南": {
    "01.简介": {
      "01.简介.md": "guide/intro/docs/intro.md",
      "10.快速开始.md": "guide/intro/docs/quickstart.md"
    },
    "10.使用": {
      "05.Markdown 拓展.md": "guide/use/docs/markdown.md",
      "10.摘要与封面.md": "guide/use/docs/summary.md"
    },
    "目录.md": "guide/docs/catalog.md"
  }
}
```

#### 2.6 数据遍历

后面我们会用下面的循环来遍历：

```typescript
Object.entries(dirStructure).forEach(([dirName, dirOrFileInfo]) => {
  //...
}
```

这里的dirStructure就是：

```json
{
  "01.指南": {
    "01.简介": {
      "01.简介.md": "guide/intro/docs/intro.md",
      "10.快速开始.md": "guide/intro/docs/quickstart.md"
    },
    "10.使用": {
      "05.Markdown 拓展.md": "guide/use/docs/markdown.md",
      "10.摘要与封面.md": "guide/use/docs/summary.md"
    },
    "目录.md": "guide/docs/catalog.md"
  }
}
```

dirName就是`01.指南`，dirOrFileInfo就是：

```json
{
  "01.简介": {
    "01.简介.md": "guide/intro/docs/intro.md",
    "10.快速开始.md": "guide/intro/docs/quickstart.md"
  },
  "10.使用": {
    "05.Markdown 拓展.md": "guide/use/docs/markdown.md",
    "10.摘要与封面.md": "guide/use/docs/summary.md"
  },
  "目录.md": "guide/docs/catalog.md"
}
```

也就是`01.指南`下的所有数据。

`dirStructure` 是一个 `DirectoryStructure`类型的对象，其定义为 `{ [key: string]: DirectoryStructure | string; }`。`Object.entries()` 方法返回一个给定对象自身可枚举属性的键值对数组。对于 `dirStructure`，每个键值对是 `[key, value]`，其中 `key` 是目录名或文件名（`dirName`），`value` 是该目录或文件的信息（`dirOrFileInfo`）。

因此，可以通过 `Object.entries(dirStructure).forEach(([dirName, dirOrFileInfo]) => { ... })` 来遍历`dirStructure` 的每个键值对。

根据 `DirectoryStructure`的定义，`dirOrFileInfo` 的类型可以是 `DirectoryStructure` 或 `string`。如果 `dirOrFileInfo` 是 `string` 类型，它表示一个文件，其值是该文件的重写后路径。如果 `dirOrFileInfo` 是 `DirectoryStructure` 类型，它表示一个子目录，其值是该子目录下的结构（包含其子目录和文件）。在代码中，可以通过 `typeof dirOrFileInfo === "string"` 来区分是文件还是目录。如果是文件（字符串），则跳过处理；如果是目录（对象），则继续递归处理。

### 3. 第二步：处理根目录下的一级子目录

在 `createRewritesSidebar` 函数中，处理根目录下的一级子目录（在这个例子中是 "01.指南"）。

#### 3.1 验证目录

检查目录是否存在以及是否为目录类型。就检查dirOrFileInfo是否是字符串就可以了。

```typescript
if (typeof dirOrFileInfo === "string") return;
```

#### 3.2 处理 "01.指南" 目录

调用 `createSidebarItems` 函数处理 "01.指南" 目录的内容：

```typescript
Object.entries(dirStructure).forEach(([dirName, dirOrFileInfo]) => {
  if (typeof dirOrFileInfo === "string") return;

  const dirPath = `${prefix}${dirName}/`;
  const dirRelativePath = join(path, dirPath);

  const sidebarItems = createSidebarItems(dirOrFileInfo, dirRelativePath, option, dirPath);
}
```

参数：

- dirOrFileInfo:

  ```json
  {
    "01.简介": {
      "01.简介.md": "guide/intro/docs/intro.md",
      "10.快速开始.md": "guide/intro/docs/quickstart.md"
    },
    "10.使用": {
      "05.Markdown 拓展.md": "guide/use/docs/markdown.md",
      "10.摘要与封面.md": "guide/use/docs/summary.md"
    },
    "目录.md": "guide/docs/catalog.md"
  }
  ```

- dirRelativePath: 实际文件系统路径（如 "D:\sumu_blog\teek\docs\01.指南\\"）

- option: 配置选项

- dirPath: `${prefix}${dirName}/`，在这里就是 "/01.指南/"

### 4. 第三步：递归处理目录内容

`createSidebarItems` 函数递归处理目录内容:

```typescript
const createSidebarItems = (
  structure: DirectoryStructure,
  root: string,
  option: SidebarOption,
  prefix = "/",
  onlyScannerRootMd = false
): DefaultTheme.SidebarItem[] => {
  const {
    //...
  } = option;

  const ignoreListAll = [...ignoreList];
  // 结构化文章侧边栏数据，以文件夹的序号为数字下标
  let sidebarItems: DefaultTheme.SidebarItem[] = [];
  // 存储没有序号的文件，最终生成 sidebarItems 的时候，将这些文件放到最后面
  const sidebarItemsNoIndex: DefaultTheme.SidebarItem[] = [];
  const entries = Object.entries(beforeCreateSidebarItems?.(structure) || structure);
  // console.log("entries=", entries);
  entries.forEach(([dirOrFilename, dirOrFileInfo]) => {
    //...
  }
```

这行代码的目的是为了在创建 `sidebarItem` 之前，提供一个钩子（hook）或回调函数 `beforeCreateSidebarItems`，允许用户自定义过滤或修改将要解析的文件列表。如果 beforeCreateSidebarItems 回调函数被定义，它会先被调用，传入当前目录的结构 structure，然后根据其返回的文件名数组来决定哪些文件需要被解析为 sidebarItem。

如果 beforeCreateSidebarItems 回调函数未定义或返回 undefined，则直接使用原始的 structure 对象来生成 entries。

entries 最终会得到一个键值对数组，数组中的每个元素是 `[key, value]`。如果 beforeCreateSidebarItems 被调用且返回了 `string[]`，那么 entries 会是 `Object.entries(string[])` 的结果，即` [[index1, filename1], [index2, filename2], ...]`，其中 index 是数组索引（数字字符串），filename 是文件名。

如果 beforeCreateSidebarItems 未被调用或返回 undefined，那么 entries 会是 `Object.entries(structure) `的结果，即 `[[filename1, info1], [filename2, info2], ...]`，其中 filename 是文件名或目录名，info 是该文件或目录的信息（string 或 DirectoryStructure 对象）。上面传下来的数据就是：

```json
{
  "01.简介": {
    "01.简介.md": "guide/intro/docs/intro.md",
    "10.快速开始.md": "guide/intro/docs/quickstart.md"
  },
  "10.使用": {
    "05.Markdown 拓展.md": "guide/use/docs/markdown.md",
    "10.摘要与封面.md": "guide/use/docs/summary.md"
  },
  "目录.md": "guide/docs/catalog.md"
}
```

#### 4.1 处理 "01.简介" 子目录

（1）检测到 "01.简介" 是一个目录对象
（2）递归调用 `createSidebarItems` 处理其内容：

```json
{
  "01.简介.md": "guide/intro/docs/intro.md",
  "10.快速开始.md": "guide/intro/docs/quickstart.md"
}
```

（3）处理 "01.简介.md" 文件：

- 解析文件名 "01.简介.md"，得到 index=1, title="简介"
- 读取文件内容（如果需要）
- 创建侧边栏项：`{ text: "简介", link: "/guide/intro/docs/intro.md" }`

（4）处理 "10.快速开始.md" 文件：

- 解析文件名 "10.快速开始.md"，得到 index=10, title="快速开始"
- 读取文件内容（如果需要）
- 创建侧边栏项：`{ text: "快速开始", link: "/guide/intro/docs/quickstart.md" }`

（5）根据索引排序项（1, 10），得到：

```json
[
  { "text": "简介", "link": "/guide/intro/docs/intro.md" },
  { "text": "快速开始", "link": "/guide/intro/docs/quickstart.md" }
]
```

（6）创建 "01.简介" 目录的侧边栏项：

```json
{
  "text": "简介",
  "collapsed": false, // 假设默认不折叠
  "items": [
    { "text": "简介", "link": "/guide/intro/docs/intro.md" },
    { "text": "快速开始", "link": "/guide/intro/docs/quickstart.md" }
  ]
}
```

#### 4.2 处理 "10.使用" 子目录

处理过程与 "01.简介" 类似：

（1）递归处理内容：

```json
{
  "05.Markdown 拓展.md": "guide/use/docs/markdown.md",
  "10.摘要与封面.md": "guide/use/docs/summary.md"
}
```

（2）处理 "05.Markdown 拓展.md" 文件，创建项：`{ text: "Markdown 拓展", link: "/guide/use/docs/markdown.md" }`
（3）处理 "10.摘要与封面.md" 文件，创建项：`{ text: "摘要与封面", link: "/guide/use/docs/summary.md" }`
（4）根据索引排序项（5, 10），得到：

```json
[
  { "text": "Markdown 拓展", "link": "/guide/use/docs/markdown.md" },
  { "text": "摘要与封面", "link": "/guide/use/docs/summary.md" }
]
```

（5）创建 "10.使用" 目录的侧边栏项：

```json
{
  "text": "使用",
  "collapsed": false,
  "items": [
    { "text": "Markdown 拓展", "link": "/guide/use/docs/markdown.md" },
    { "text": "摘要与封面", "link": "/guide/use/docs/summary.md" }
  ]
}
```

#### 4.3 处理 "目录.md" 文件

（1）检测到 "目录.md" 是一个文件（字符串值）

（2）解析文件名 "目录.md"，得到 index=Infinity (无序号), title="目录"

（3）创建侧边栏项：`{ text: "目录", link: "/guide/docs/catalog.md" }`

### 5. 第四步：合并和排序根目录项

将处理好的项按索引排序：

（1）"01.简介" 目录项 (index=1)

（2）"10.使用" 目录项 (index=10)

（3）"目录.md" 文件项 (index=Infinity，无序号)

最终 "01.指南" 目录的侧边栏项：

```json
[
  {
    "text": "简介",
    "collapsed": false,
    "items": [
      { "text": "简介", "link": "/guide/intro/docs/intro.md" },
      { "text": "快速开始", "link": "/guide/intro/docs/quickstart.md" }
    ]
  },
  {
    "text": "使用",
    "collapsed": false,
    "items": [
      { "text": "Markdown 拓展", "link": "/guide/use/docs/markdown.md" },
      { "text": "摘要与封面", "link": "/guide/use/docs/summary.md" }
    ]
  },
  { "text": "目录", "link": "/guide/docs/catalog.md" }
]
```

### 6. 第五步：生成最终的侧边栏结构

在 `createRewritesSidebar` 函数中，将处理好的 "01.指南" 目录项添加到最终的侧边栏结构中。根据 rewrites 配置，"01.指南" 对应的路径前缀是 "guide"。这个路径前缀是通过以下方式获取的：

（1）在 `createRewritesSidebar` 函数中，处理根目录下的一级子目录时，会查找 `rewrites` 配置中以当前目录名（如 "01.指南"）开头的键。

```typescript
const key = Object.keys(rewrites).find(item => item.startsWith(dirName));
```

（2）对于 "01.指南" 目录，会找到类似 `"01.指南/01.简介/01.简介.md"` 的键。若是不存在，这里就直接返回了。

（3）然后，通过 `rewrites[key]` 获取对应的值，如 `"guide/intro/docs/intro.md"`。

（4）最后，通过 `rewrites[key].split("/")[0]` 提取路径的第一个部分作为前缀，即 "guide"。

```typescript
const path = rewrites[key].split("/")[0];
sidebarObj[`/${path}/`] = ...;
```

根据 rewrites 配置，"01.指南" 对应的路径前缀是 "guide"，所以最终的侧边栏结构为：

```json
{
  "/guide/": [
    {
      "text": "指南",
      "collapsed": false,
      "items": [
        {
          "text": "简介",
          "collapsed": false,
          "items": [
            { "text": "简介", "link": "/guide/intro/docs/intro.md" },
            { "text": "快速开始", "link": "/guide/intro/docs/quickstart.md" }
          ]
        },
        {
          "text": "使用",
          "collapsed": false,
          "items": [
            { "text": "Markdown 拓展", "link": "/guide/use/docs/markdown.md" },
            { "text": "摘要与封面", "link": "/guide/use/docs/summary.md" }
          ]
        },
        { "text": "目录", "link": "/guide/docs/catalog.md" }
      ]
    }
  ]
}
```

### 7. 生成最终的侧边栏数据结构

基于提供的 rewrites 数据，最终生成的侧边栏数据结构如下：

```json
{
  "/guide/": [
    {
      "text": "指南",
      "collapsed": false, // 假设默认不折叠
      "items": [
        {
          "text": "简介",
          "collapsed": false,
          "items": [
            {
              "text": "简介",
              "link": "/guide/intro/docs/intro.md"
            },
            {
              "text": "快速开始",
              "link": "/guide/intro/docs/quickstart.md"
            }
          ]
        },
        {
          "text": "使用",
          "collapsed": false,
          "items": [
            {
              "text": "Markdown 拓展",
              "link": "/guide/use/docs/markdown.md"
            },
            {
              "text": "摘要与封面",
              "link": "/guide/use/docs/summary.md"
            }
          ]
        },
        {
          "text": "目录",
          "link": "/guide/docs/catalog.md"
        }
      ]
    }
  ]
}
```

**注意**：

（1）侧边栏项按照文件名中的序号进行排序（01, 05, 10...）

（2）目录项包含嵌套的 `items` 数组

（3）文件项包含指向实际文档的 `link`

（4）文本内容根据配置可能来自文件名、frontmatter 或 Markdown 标题
