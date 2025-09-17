<script setup lang="ts">
import { withBase } from "vitepress";
</script>

<template>
  <iframe :src="withBase('/test/articlePage/doc')" width="100%" height="360" frameborder="0" />
</template>
