---
title: LV02-BackTop回到顶部
date: 2025-09-03 19:31:21
icon: famicons:logo-markdown
permalink: /sdoc/component/common-omponent/126b07e426211e383be37ae4
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
  detailDate: 2025-09-03 19:31:21.483
  fulluuid: 83be37ae42b1440d8e0c87f77e25042e
  useduuid: 83be37ae4
---

<script setup>
import { MtBackTop } from "vitepress-theme-mist"
</script>

<!-- more -->

## 简介

这是一个回到顶部按钮。

## 基本用法

在 Markdown文档中添加以下内容：

```markdown
<MtBackTop minScrollY="value"/>
```

minScrollY表示向下滚动多少px后出现回到顶部按钮。

## 效果

页面向下滚动就可以看到右下角出现轨道顶部按钮了。

<MtBackTop minScrollY="20"/>
