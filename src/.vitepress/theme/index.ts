// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'

import Mist from "vitepress-theme-mist";

import MistLayoutProvider from "./components/MistLayoutProvider.vue";

import './style.css'
import './styles/index.scss' // 自定义样式

import "vitepress-theme-mist/theme-chalk/index.css" // 主题样式

export default {
  extends: Mist,
  Layout: MistLayoutProvider,
  enhanceApp({ app, router, siteData }) {
    // ...
  }
} satisfies Theme
