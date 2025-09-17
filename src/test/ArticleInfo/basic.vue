<script setup lang="ts">
import { MtArticleInfo } from "vitepress-theme-mist";
import { ref } from "vue";

// 模拟文章数据
const mockPost = ref({
  title: "Vue 3 Composition API 使用指南",
  url: "/guide/vue3-composition-api",
  relativePath: "guide/vue3-composition-api.md",
  frontmatter: {
    title: "Vue 3 Composition API 使用指南",
    date: "2025-08-24",
    permalink: "/guide/vue3-composition-api",
    author: "苏木",
    tags: ["Vue", "Composition API", "前端"],
    categories: ["技术", "Vue"],
    sidebar: true,
    article: true,
    sticky: 0,
    catalogue: false,
  },
  author: {
    name: "苏木",
    link: "https://github.com/docs-site/vitepress-theme-mist",
  },
  date: "2025-08-24",
  capture: "本文详细介绍了 Vue 3 Composition API 的使用方法和最佳实践...",
});

// 模拟作用域
const scope = "article";
</script>

<template>
  <div class="article-info-demo">
    <h3>ArticleInfo 基础用法</h3>
    <p>ArticleInfo 组件用于显示文章的基本信息，包括作者、创建时间、分类、标签等。</p>

    <div class="demo-container">
      <MtArticleInfo :post="mockPost" :scope="scope" />
    </div>

    <div class="demo-description">
      <p>
        以上是 ArticleInfo 组件的基础用法展示。在实际使用中，该组件会自动从文章的 frontmatter 中提取相关信息并展示。
      </p>
    </div>
  </div>
</template>

<style scoped>
.article-info-demo {
  padding: 20px;
}

.demo-container {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fafafa;
}

.demo-description {
  margin-top: 20px;
  padding: 12px 16px;
  background-color: #f0f8ff;
  border-left: 4px solid #1890ff;
  border-radius: 4px;
}
</style>
