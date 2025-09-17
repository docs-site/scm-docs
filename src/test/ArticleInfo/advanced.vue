<script setup lang="ts">
import { MtArticleInfo } from "vitepress-theme-mist";
import { ref } from "vue";

// 模拟文章数据 - 包含更多字段
const mockPostFull = ref({
  title: "Vue 3 Composition API 使用指南",
  url: "/guide/vue3-composition-api",
  relativePath: "guide/vue3-composition-api.md",
  frontmatter: {
    title: "Vue 3 Composition API 使用指南",
    date: "2025-08-24",
    permalink: "/guide/vue3-composition-api",
    author: "苏木",
    tags: ["Vue", "Composition API", "前端", "JavaScript"],
    categories: ["技术", "Vue", "框架"],
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

// 模拟文章数据 - 只包含基本信息
const mockPostBasic = ref({
  title: "CSS Grid 布局详解",
  url: "/guide/css-grid",
  relativePath: "guide/css-grid.md",
  frontmatter: {
    title: "CSS Grid 布局详解",
    date: "2025-08-20",
    permalink: "/guide/css-grid",
  },
  date: "2025-08-20",
});
</script>

<template>
  <div class="article-info-demo">
    <h3>ArticleInfo 高级用法</h3>
    <p>ArticleInfo 组件支持多种配置和用法，可以满足不同的展示需求。</p>

    <div class="demo-section">
      <h4>1. 完整信息展示（文章页）</h4>
      <div class="demo-container">
        <MtArticleInfo :post="mockPostFull" scope="article" />
      </div>
      <p class="demo-description">在文章页中展示完整的文章信息，包括作者、创建时间、分类和标签。</p>
    </div>

    <div class="demo-section">
      <h4>2. 基本信息展示（首页列表）</h4>
      <div class="demo-container">
        <MtArticleInfo :post="mockPostBasic" scope="post" />
      </div>
      <p class="demo-description">在首页文章列表中只展示基本的文章信息。</p>
    </div>

    <div class="demo-section">
      <h4>3. 带分割线的展示</h4>
      <div class="demo-container">
        <MtArticleInfo :post="mockPostFull" scope="article" split />
      </div>
      <p class="demo-description">使用 split 属性在各项信息之间添加分割线。</p>
    </div>

    <div class="demo-section">
      <h4>4. 使用插槽添加额外内容</h4>
      <div class="demo-container">
        <MtArticleInfo :post="mockPostFull" scope="article">
          <span class="extra-info">阅读时长: 5分钟</span>
        </MtArticleInfo>
      </div>
      <p class="demo-description">通过默认插槽可以添加额外的信息内容。</p>
    </div>
  </div>
</template>

<style scoped>
.article-info-demo {
  padding: 20px;
}

.demo-section {
  margin-bottom: 30px;
}

.demo-container {
  margin: 15px 0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fafafa;
}

.demo-description {
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #f0f8ff;
  border-left: 3px solid #1890ff;
  border-radius: 2px;
  font-size: 14px;
}

.extra-info {
  margin-left: 10px;
  padding: 2px 6px;
  background-color: #e6f7ff;
  border: 1px solid #91d5ff;
  border-radius: 4px;
  color: #1890ff;
  font-size: 12px;
}
</style>
