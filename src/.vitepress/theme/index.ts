// https://vitepress.dev/guide/custom-theme
import type { Theme } from "vitepress";

import Mist, { useCopyBanner } from "vitepress-theme-mist";

import MistLayoutProvider from "./components/MistLayoutProvider.vue";

import "./style.css";
import "./styles/index.scss"; // 自定义样式

import "vitepress-theme-mist/theme-chalk/index.css"; // 主题样式

export default {
  extends: Mist,
  Layout: MistLayoutProvider,
  enhanceApp({ app, router, siteData }) {
    // ...
  },
  setup: () => {
    // 使用复制提示功能（默认配置）
    useCopyBanner();

    /**
     * 配置方式，可自定义提示语
     *
     * 1. 提示语。默认:复制成功，复制和转载请标注本文地址
     * 2. 显示的持续时间(毫秒)，默认 3000
     */
    // useCopyBanner("复制成功", 4000);
  },
} satisfies Theme;
