<script setup lang="ts">
import { MtArticlePage } from "vitepress-theme-mist";
</script>

<template>
  <MtArticlePage class="demo-article-page-basic">
    <h1>一、一级标题</h1>
    <h2>1. 二级标题</h2>
    <p>aaa</p>
    <h3>1.1 三级标题</h3>
    <p>bbb</p>
    <h1>二、一级标题</h1>
    <h2>1. 二级标题</h2>
    <p>ccc</p>
    <h3>1.1 三级标题</h3>
    <p>ddd</p>
  </MtArticlePage>
</template>

<style>
/* 当前示例位于文章页内，自动应用文章页内的样式，因此这里需要取消父元素样式影响，实际不需要这段代码 */
.demo-article-page-basic {
  all: initial;
}
</style>
