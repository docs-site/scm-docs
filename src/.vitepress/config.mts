import { defineConfig } from "vitepress";
// 主题配置
import { defineMistConfig, createRewrites } from "vitepress-theme-mist/config"; 

const myThemeConfig = defineMistConfig({
  useTheme: true,
  themeName: "vitepress-theme-mist",
  clickEffect: {
    enabled: true,
  },
  vitePlugins: {
    navSidebarOption: {
      path: "sdoc",
      debugInfo: false,
      navOption: {
        maxLevel: 2,
        debugPrint: false,
        saveToFile: false
      },
      sideBarOption: {
        type: "object",
        ignoreList: ["index.md", "README.md"],
        initItems: false, // 这个设置为true的话进入某个导航栏路径时可能不显示侧边栏
        collapsed: true,
        debugPrint: false,
        saveToFile: false
      }
    }
  },
});

// https://vitepress.dev/reference/site-config
export default defineConfig({
  extends: myThemeConfig,
  title: "MCU",
  description: "Single-Chip Microcomputer docs",
  base: '/scm-docs/',
  markdown: {
    math: true, // 开启数学公式支持，需要安装 markdown-it-mathjax3
    image: {
      lazyLoading: false, // 主题默认开启了图片懒加载，浏览器会有一个警告，这里先默认关闭，有需要再打开
    }
  },
  rewrites: createRewrites({ srcDir: "src" }), // 这里需要填项目根目录(.vtiepress所在目录，若是.vitepress和package.json在同级，则可为空)
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: "功能页",
        items: [
          { text: "归档页", link: "/archives" },
          { text: "导航页", link: "/Navigation" },
        ],
      },
    ],
    logo: "/favicon.svg", // 导航栏标题的logo
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    outline: {
      label: "页面导航",
      level: [2, 6],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/docs-site/scm-docs.git' }
    ]
  }
})
