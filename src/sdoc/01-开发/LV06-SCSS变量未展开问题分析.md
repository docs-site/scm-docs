---
title: LV06-SCSS变量未展开问题分析
date: 2025-09-03 19:30:53
icon: famicons:logo-markdown
permalink: /sdoc/develop/126b07e425dd1810c4407b67
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
  detailDate: 2025-09-03 19:30:53.385
  fulluuid: 0c4407b679bd42e6bb74555e9aba8d35
  useduuid: 0c4407b67
---

## 一、问题描述

在 `packages\theme-chalk\src\var\theme-color.scss` 文件中，第46-51行的代码：

```scss
html[theme-color="ep-blue"] {
  --vp-c-brand-1: #{getCssVar("el-color-primary")};
  --vp-c-brand-2: #{getCssVar("el-color-primary-light-3")};
  --vp-c-brand-3: #{getCssVar("el-color-primary-light-5")};
  --vp-c-brand-soft: #{getCssVar("el-color-primary-light-9")};
}
```

其中 `#{getCssVar("el-color-primary")}` 未正确展开，导致运行时出现错误：

```
index.mjs:226 [Teek Error] 输入错误的 hex 颜色值
getLightColor @ index.mjs:226
switchLight @ useThemeColor.ts:100
update @ useThemeColor.ts:179
```

## 二、颜色从定义到使用的完整过程

### 1. 颜色定义阶段

#### 1.1 基础变量定义

在 `var.scss` 中定义了 Element Plus 的基础颜色变量：

```scss
// packages/theme-chalk/src/var/var.scss
:root {
  @include set-css-var("el-color-primary", #409eff);
  @include set-css-var("el-color-primary-light-3", rgb(121.3, 187.1, 255));
  @include set-css-var("el-color-primary-light-5", rgb(159.5, 206.5, 255));
  @include set-css-var("el-color-primary-light-9", rgb(235.9, 245.3, 255));
}
```

#### 1.2 set-css-var mixin 的工作原理

`set-css-var` mixin 在 `mixins.scss` 中定义：

```scss
// packages/theme-chalk/src/mixins/mixins.scss
@mixin set-css-var($name, $value) {
  #{joinVarName($name)}: #{$value};
}
```

#### 1.3 joinVarName 函数的展开过程

`joinVarName` 函数根据命名空间生成 CSS 变量名：

```scss
// packages/theme-chalk/src/mixins/function.scss
@function joinVarName($list) {
  $name: "--" + config.$namespace; // $namespace = "mt"
  @each $item in $list {
    @if $item != "" {
      $name: $name + "-" + $item;
    }
  }
  @return $name;
}
```

所以 `set-css-var("el-color-primary", #409eff)` 最终展开为：

```css
--mt-el-color-primary: #409eff;
```

### 2. 主题色映射阶段

#### 2.1 主题色映射定义

在 `theme-color.scss` 中定义了主题色映射（问题所在）：

```scss
// packages/theme-chalk/src/var/theme-color.scss
html[theme-color="ep-blue"] {
  --vp-c-brand-1: #{getCssVar("el-color-primary")};
  --vp-c-brand-2: #{getCssVar("el-color-primary-light-3")};
  --vp-c-brand-3: #{getCssVar("el-color-primary-light-5")};
  --vp-c-brand-soft: #{getCssVar("el-color-primary-light-9")};
}
```

#### 2.2 getCssVar 函数的预期展开

`getCssVar` 函数应该将参数转换为 CSS 变量引用：

```scss
// packages/theme-chalk/src/mixins/function.scss
@function getCssVar($args...) {
  @return var(#{joinVarName($args)});
}
```

所以 `#{getCssVar("el-color-primary")}` 应该展开为 `var(--mt-el-color-primary)`。

#### 2.3 编译后的预期 CSS

如果一切正常，编译后的 CSS 应该是：

```css
html[theme-color="ep-blue"] {
  --vp-c-brand-1: var(--mt-el-color-primary);
  --vp-c-brand-2: var(--mt-el-color-primary-light-3);
  --vp-c-brand-3: var(--mt-el-color-primary-light-5);
  --vp-c-brand-soft: var(--mt-el-color-primary-light-9);
}
```

### 3. 颜色获取阶段

#### 3.1 用户交互触发

用户在 `ThemeColor.vue` 中点击主题色选项：

```vue
<!-- packages/components/theme/ThemeEnhance/src/ThemeColor.vue -->
<li @click="handleChangePrimaryColor(option)">
  <div class="color-wrapper">
    <div class="color-bg" :style="getStyle(option.color)"></div>
  </div>
  <span>{{ option.label }}</span>
</li>
```

#### 3.2 handleChangePrimaryColor 函数

```typescript
// packages/components/theme/ThemeEnhance/src/ThemeColor.vue
const handleChangePrimaryColor = (option: ThemeColorOption) => {
  themeColorName.value = option.value; // 设置为 "ep-blue"
};
```

#### 3.3 update 函数处理主题色切换

```typescript
// packages/components/theme/ThemeEnhance/src/ThemeColor.vue
const update = (val: string) => {
  if (!isClient) return;

  const el = document.documentElement;

  // 设置 HTML 属性
  if (el.getAttribute(themeColorAttribute) === val) return;
  el.setAttribute(themeColorAttribute, val); // 设置 theme-color="ep-blue"

  // 处理内置主题色逻辑
  if (themeColorList.includes(val)) {
    clear(); // 清除旧的样式变量
    // 获取新的主题色
    primaryColor.value = getComputedStyle(el).getPropertyValue(varNameList.vpBrand1);
  }
};
```

#### 3.4 getComputedStyle 获取颜色值

```typescript
// varNameList.vpBrand1 = "--vp-c-brand-1"
const computedColor = getComputedStyle(el).getPropertyValue("--vp-c-brand-1");
```

### 4. 颜色计算和应用阶段

#### 4.1 useThemeColor composable 监听

```typescript
// packages/composables/useThemeColor.ts
export const useThemeColor = (color: MaybeRef<string>, ignoreList?: string[] | (() => string[] | undefined)) => {
  const colorComputed = computed(() => toValue(color));

  // 监听颜色变化
  watch(colorComputed, update);

  const update = () => {
    if (isStop.value) return;
    clear();

    if (isDark.value) switchDark();
    else switchLight(); // 浅色模式调用 switchLight
  };
};
```

#### 4.2 switchLight 函数计算相关颜色

```typescript
// packages/composables/useThemeColor.ts
const switchLight = () => {
  if (!isClient) return;
  const primary = colorComputed.value; // 从 getComputedStyle 获取的颜色值
  if (!primary) return;

  const lightVarDefaultMap = {
    [vpBrand1]: primary,
    [vpBrand2]: getLightColor(primary, 0.1)!, // 计算浅色变体
    [vpBrand3]: getLightColor(primary, 0.2)!,
    [vpBrandSoft]: getLightColor(primary, 0.85)!,
  };

  // 应用计算后的颜色
  Object.keys(lightVarDefaultMap).forEach(key => {
    setStyleVar(key, lightVarDefaultMap[key]);
  });
};
```

#### 4.3 getLightColor 函数处理颜色计算

```typescript
// packages/helper/color.ts
export const getLightColor = (color: string, level: number) => {
  const reg = /^\#?[0-9A-Fa-f]{6}$/;

  // 验证输入是否为有效的 hex 颜色值
  if (!reg.test(color)) return console.error("[Teek Error] 输入错误的 hex 颜色值");

  const rgb = hexToRgb(color);
  for (let i = 0; i < 3; i++) rgb[i] = Math.round(255 * level + rgb[i] * (1 - level));

  return rgbToHex(rgb[0], rgb[1], rgb[2]);
};
```

### 5. 问题发生的具体位置

#### 5.1 SCSS 编译阶段（问题根源）

`theme-color.scss` 缺少导入，导致 `getCssVar` 函数未展开：

```scss
// 错误的 SCSS（缺少导入）
html[theme-color="ep-blue"] {
  --vp-c-brand-1: #{getCssVar("el-color-primary")}; // getCssVar 未定义，无法展开
}
```

#### 5.2 运行时获取阶段（问题表现）

```typescript
// getComputedStyle 返回未解析的变量引用
const computedColor = getComputedStyle(el).getPropertyValue("--vp-c-brand-1");
// computedColor = " var(--mt-el-color-primary)"  // 注意前面的空格
```

#### 5.3 颜色计算阶段（错误触发）

```typescript
// getLightColor 收到无效的 hex 值
getLightColor(" var(--mt-el-color-primary)", 0.1);
// 正则验证失败：/^\#?[0-9A-Fa-f]{6}$/.test(" var(--mt-el-color-primary)") = false
// 输出错误：[Teek Error] 输入错误的 hex 颜色值
```

## 三、问题分析过程

### 1. 初始分析

基于上述颜色流程，分析了相关文件的结构和导入关系：

#### 1.1 导入链路分析

- `base.scss` 先导入 `var/var.scss`，然后导入 `var/theme-color.scss`
- `var.scss` 导入了 `mixins/function.scss` 和 `mixins/mixins.scss`
- `theme-color.scss` **缺少** `mixins/function.scss` 的导入

#### 1.2 函数定义分析

从 `function.scss` 可以看到 `getCssVar` 函数的定义：

```scss
@function getCssVar($args...) {
  @return var(#{joinVarName($args)});
}
```

从 `config.scss` 可以看到命名空间：

```scss
$namespace: "mt" !default;
```

所以 `getCssVar("el-color-primary")` 实际会展开为 `var(--mt-el-color-primary)`。

### 3. 深入调试

为了追踪问题的根本原因，在关键位置添加了调试打印：

#### 3.1 在 useThemeColor.ts 中添加打印

```typescript
const switchLight = () => {
  if (!isClient) return;
  const primary = colorComputed.value;
  console.log("switchLight - primary color:", primary);
  console.log("switchLight - primary color type:", typeof primary);
  console.log("switchLight - primary color trimmed:", primary?.trim());
  if (!primary) return;
  // ...
};
```

#### 3.2 在 ThemeColor.vue 中添加打印

```typescript
const computedColor = getComputedStyle(el).getPropertyValue(varNameList.vpBrand1);
console.log("ThemeColor.vue -内置主题色- computedColor:", computedColor);
console.log("ThemeColor.vue -内置主题色- computedColor type:", typeof computedColor);
console.log("ThemeColor.vue -内置主题色- computedColor trimmed:", computedColor?.trim());
```

#### 3.3 在 color.ts 中添加打印

```typescript
export const getLightColor = (color: string, level: number) => {
  console.log("getLightColor - input color:", color);
  console.log("getLightColor - input color type:", typeof color);
  console.log("getLightColor - input color trimmed:", color?.trim());

  const reg = /^\#?[0-9A-Fa-f]{6}$/;
  console.log("getLightColor - regex test result:", reg.test(color));

  if (!reg.test(color)) return console.error("[Teek Error] 输入错误的 hex 颜色值");
  // ...
};
```

### 4. 根本原因发现

通过系统性的代码分析和调试，确定了问题的根本原因：

#### 4.1 缺少导入语句

在 `theme-color.scss` 文件中，使用了 `getCssVar` 函数但没有导入相关的函数文件：

```scss
// 当前文件缺少导入
html[theme-color="ep-blue"] {
  --vp-c-brand-1: #{getCssVar("el-color-primary")}; // getCssVar 未定义
}
```

#### 4.2 Sass 编译机制分析

- `#{getCssVar("el-color-primary")}` 是 Sass 的插值语法
- 在编译时，Sass 需要调用 `getCssVar` 函数来处理这个插值
- 如果函数未定义，插值将无法正确展开

## 四、问题根因

### 1. 直接原因

`theme-color.scss` 文件中缺少对 `function.scss` 的导入语句：

```scss
@use "../mixins/function" as *;
```

### 2. 技术原因

基于颜色流程分析，问题的技术原因更加清晰：

（1）**SCSS 编译阶段**：

- 由于缺少导入，`getCssVar` 函数无法被识别
- `#{getCssVar("el-color-primary")}` 无法正确展开为 `var(--mt-el-color-primary)`
- 编译后的 CSS 可能包含未处理的函数调用或错误的语法

（2）**CSS 变量解析阶段**：

- 当 `theme-color="ep-blue"` 属性被设置时，浏览器无法正确解析 `--vp-c-brand-1` 的值
- `getComputedStyle()` 返回未解析的变量引用而不是实际的 hex 值

（3）**颜色计算阶段**：

- `getLightColor` 函数收到 `" var(--mt-el-color-primary)"` 而不是 `"#409eff"`
- 正则表达式 `^\#?[0-9A-Fa-f]{6}$` 验证失败
- 导致 `[Teek Error] 输入错误的 hex 颜色值` 错误

### 3. 完整的错误传播链

基于颜色流程，完整的错误传播链如下：

（1）**SCSS 编译阶段**（问题根源）：

```scss
// theme-color.scss 缺少导入，导致 getCssVar 未定义
html[theme-color="ep-blue"] {
  --vp-c-brand-1: #{getCssVar("el-color-primary")}; // 无法展开
}
```

（2）**用户交互阶段**：

```typescript
// 用户点击 Element Plus 蓝色主题
handleChangePrimaryColor(option); // option.value = "ep-blue"
```

（3）**主题色切换阶段**：

```typescript
// 设置 HTML 属性
el.setAttribute(themeColorAttribute, "ep-blue"); // theme-color="ep-blue"
```

（4）**颜色获取阶段**（问题显现）：

```typescript
// 获取计算后的样式
const computedColor = getComputedStyle(el).getPropertyValue("--vp-c-brand-1");
// 预期: "#409eff"
// 实际: " var(--mt-el-color-primary)"  // 未解析的变量引用 + 前导空格
```

（5）**颜色计算阶段**（错误触发）：

```typescript
// useThemeColor 监听到颜色变化
primaryColor.value = computedColor; // " var(--mt-el-color-primary)"

// switchLight 尝试计算相关颜色
getLightColor(primary, 0.1); // getLightColor(" var(--mt-el-color-primary)", 0.1)
```

（6）**错误发生阶段**：

```typescript
// getLightColor 内部验证失败
const reg = /^\#?[0-9A-Fa-f]{6}$/;
reg.test(" var(--mt-el-color-primary)"); // false
// 输出错误: [Teek Error] 输入错误的 hex 颜色值
```

## 五、解决方案

### 1. 推荐解决方案

在 `theme-color.scss` 文件开头添加导入语句：

```scss
@use "../mixins/function" as *;

/**
 * Customize default theme styling by overriding CSS variables:
 * https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/styles/vars.css
 */
```

### 2. 备选解决方案

如果导入方案不可行，可以直接使用 hex 颜色值：

```scss
/* element plus 蓝色 */
html[theme-color="ep-blue"] {
  --vp-c-brand-1: #409eff;
  --vp-c-brand-2: rgb(121.3, 187.1, 255);
  --vp-c-brand-3: rgb(159.5, 206.5, 255);
  --vp-c-brand-soft: rgb(235.9, 245.3, 255);
}
```

## 八、相关文件

### 1. 核心文件

- `packages/theme-chalk/src/var/theme-color.scss` - 主题色定义
- `packages/theme-chalk/src/mixins/function.scss` - SCSS 函数定义
- `packages/theme-chalk/src/mixins/config.scss` - 配置定义

### 2. 影响文件

- `packages/composables/useThemeColor.ts` - 主题色逻辑
- `packages/components/theme/ThemeEnhance/src/ThemeColor.vue` - 主题色组件
- `packages/helper/color.ts` - 颜色处理函数

## 九、总结

这个问题是由于 SCSS 文件缺少必要的导入语句导致的。通过系统性的分析和调试，确定了根本原因并提供了有效的解决方案。这个问题提醒我们在使用 SCSS 函数和 mixin 时，必须确保正确导入相关文件，否则可能导致编译时错误或运行时问题。
