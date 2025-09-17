<script setup lang="ts">
import { MtBreadcrumb, MtBreadcrumbItem } from "vitepress-theme-mist";
</script>

<template>
  <div>
    <!-- 默认分隔符 '/' -->
    <div class="breadcrumb-demo">
      <MtBreadcrumb>
        <MtBreadcrumbItem>首页</MtBreadcrumbItem>
        <MtBreadcrumbItem>组件</MtBreadcrumbItem>
        <MtBreadcrumbItem>Breadcrumb</MtBreadcrumbItem>
      </MtBreadcrumb>
    </div>

    <!-- 自定义分隔符 '>' -->
    <div class="breadcrumb-demo">
      <MtBreadcrumb separator=">">
        <MtBreadcrumbItem>首页</MtBreadcrumbItem>
        <MtBreadcrumbItem>组件</MtBreadcrumbItem>
        <MtBreadcrumbItem>Breadcrumb</MtBreadcrumbItem>
      </MtBreadcrumb>
    </div>

    <!-- 自定义分隔符 '→' -->
    <div class="breadcrumb-demo">
      <MtBreadcrumb separator="→">
        <MtBreadcrumbItem>首页</MtBreadcrumbItem>
        <MtBreadcrumbItem>组件</MtBreadcrumbItem>
        <MtBreadcrumbItem>Breadcrumb</MtBreadcrumbItem>
      </MtBreadcrumb>
    </div>
  </div>
</template>

<style scoped>
.breadcrumb-demo {
  margin-bottom: 24px;
  display: block;
  width: 100%;
  padding: 12px 0;
}

.breadcrumb-demo:last-child {
  margin-bottom: 0;
}
</style>
