<script setup lang="ts">
import { MtBreadcrumb, MtBreadcrumbItem } from "vitepress-theme-mist";
import { MtIcon } from "vitepress-theme-mist";
import { houseIcon, folderOpenedIcon, editPenIcon } from "vitepress-theme-mist";
</script>

<template>
  <div>
    <!-- 带图标的面包屑 -->
    <div class="breadcrumb-demo">
      <MtBreadcrumb separator="/">
        <MtBreadcrumbItem>
          <MtIcon :icon="houseIcon" />
          首页
        </MtBreadcrumbItem>
        <MtBreadcrumbItem>
          <MtIcon :icon="folderOpenedIcon" />
          设置
        </MtBreadcrumbItem>
        <MtBreadcrumbItem>
          <MtIcon :icon="editPenIcon" />
          文档
        </MtBreadcrumbItem>
      </MtBreadcrumb>
    </div>

    <!-- 带链接的面包屑 -->
    <div class="breadcrumb-demo">
      <MtBreadcrumb separator=">">
        <MtBreadcrumbItem>
          <a href="/">首页</a>
        </MtBreadcrumbItem>
        <MtBreadcrumbItem>
          <a href="/components">组件</a>
        </MtBreadcrumbItem>
        <MtBreadcrumbItem>
          <a href="/components/breadcrumb">Breadcrumb</a>
        </MtBreadcrumbItem>
      </MtBreadcrumb>
    </div>

    <!-- 混合使用：图标和链接 -->
    <div class="breadcrumb-demo">
      <MtBreadcrumb separator="→">
        <MtBreadcrumbItem>
          <a href="/">
            <MtIcon :icon="houseIcon" />
            首页
          </a>
        </MtBreadcrumbItem>
        <MtBreadcrumbItem>
          <a href="/components">
            <MtIcon :icon="folderOpenedIcon" />
            组件
          </a>
        </MtBreadcrumbItem>
        <MtBreadcrumbItem>
          <MtIcon :icon="editPenIcon" />
          Breadcrumb
        </MtBreadcrumbItem>
      </MtBreadcrumb>
    </div>

    <!-- 自定义分隔符样式 -->
    <div class="breadcrumb-demo">
      <MtBreadcrumb separator="|">
        <MtBreadcrumbItem>用户中心</MtBreadcrumbItem>
        <MtBreadcrumbItem>个人资料</MtBreadcrumbItem>
        <MtBreadcrumbItem>编辑资料</MtBreadcrumbItem>
      </MtBreadcrumb>
    </div>

    <!-- 长文本面包屑 -->
    <div class="breadcrumb-demo">
      <MtBreadcrumb separator="/">
        <MtBreadcrumbItem>产品管理</MtBreadcrumbItem>
        <MtBreadcrumbItem>电子产品分类</MtBreadcrumbItem>
        <MtBreadcrumbItem>智能手机子分类</MtBreadcrumbItem>
        <MtBreadcrumbItem>高端智能手机系列</MtBreadcrumbItem>
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
