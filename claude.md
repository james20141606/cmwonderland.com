# WonderLand 博客现代化重构 — 工作总结

## 项目概述

将博客从 Hexo 3.9.0 + NexT 主题迁移到 Astro v5 + AstroWind 主题，并部署到 Vercel。

- **旧站**: `www.cmwonderland.com/blog`（GitHub Pages，Hexo 因 Node.js 版本不兼容已无法构建）
- **新站**: `www.cmwonderland.com`（Vercel，Astro v5 静态站点）
- **GitHub 仓库**: `james20141606/cmwonderland.com`

---

## 架构

- **首页** (`/`): Aerial HTML5 模板 — 个人介绍 landing page
- **博客** (`/blog/`): AstroWind 主题 — 文章列表、分类、标签
- **新闻** (`/news/`): Finance News Feed — 客户端渲染的金融新闻
- **关于** (`/about/`): Markdown 页面 + PDF 简历

---

## 已完成的工作

### 1. 项目初始化 & 主题迁移

- 初始项目基于 AstroPaper v5，后迁移到 AstroWind 主题
- AstroWind 提供更丰富的 UI 组件、深色模式、导航下拉菜单等
- 配置文件:
  - `astro.config.ts` — remark-math、rehype-katex、tailwind、sitemap、mdx、icon、compress
  - `src/config.yaml` — AstroWind YAML 配置（站点名、URL、博客路由、分页）
  - `src/navigation.ts` — 导航栏（Blog, Categories 下拉, About, News）和页脚社交链接
  - `tsconfig.json` — 使用 `astro/tsconfigs/base`，路径别名 `~/*` → `src/*`

### 2. 内容 Schema 扩展

`src/content/config.ts` 在 AstroWind 默认 schema 基础上新增:
- `categories: z.array(z.string()).default([])` — 兼容旧格式
- `math: z.boolean().optional().default(false)`
- `description` 改为 `.default("")`
- `featured`, `draft` 等可选字段
- 同时支持 `publishDate`（AstroWind）和 `pubDatetime`（AstroPaper）格式

### 3. 文章迁移

编写了 `scripts/migrate.mjs` 迁移脚本，处理 101 篇文章:

**Front matter 转换:**
| 旧字段 | 新字段 |
|--------|--------|
| `date: 2018-04-11 10:09:40` | `publishDate: 2018-04-11T10:09:40Z` |
| `categories: \n- xxx` | `category: "xxx"` |
| `tags: \n- xxx` | `tags: ["xxx"]` |
| `mathjax: true` | `math: true` |
| `#top: N` | 删除 |
| (新增) | `excerpt:` 从 `<!-- more -->` 前文本提取 |
| (新增) | `author: "James Chen"` |

**内容处理:**
- 删除 `<!-- more -->` 标记
- `` ```{r} `` → `` ```r ``
- 内部链接 `cmwonderland.com/blog/` → `cmwonderland.com/`
- 跳过重复文件 `108_25birthday_mengmeng copy.md`
- 修复单位数月份日期解析
- 修复 YAML frontmatter 中的空行和转义引号问题

**文件组织:**
- 去掉数字前缀，文件名规范化为 kebab-case
- 文章存放在 `src/data/post/`（AstroWind 扁平目录结构）

**静态文件:**
- `xupeng_chen_resume_cv.pdf` → `public/about/`
- `DeepSeekV3.pdf` → `public/`
- 本地图片 (11 张 JPG) → `src/assets/images/`

### 4. 首页 (Landing Page)

`src/pages/index.astro` — Aerial HTML5 模板：
- 个人头像、姓名动画（textillate.js）
- 导航: Blog → /blog/, CV → /about/, Project → /categories/projects/, GitHub, Book, News
- 所有资源在 `public/landing/` 目录下
- 使用 `is:inline` 指令避免 Astro 打包 jQuery 等脚本

### 5. Finance News Feed

`src/pages/news.astro` — 客户端渲染的金融新闻信息流:
- 从 GitHub 获取 `news-feed.json`（editions 数组架构）
- 支持历史期刊：最新期默认展开，旧期折叠可展开
- 展示: Daily Outlook、Sector Picks、Market Snapshot、Sector Rankings、Top Briefing
- 双语显示（中英文标题和摘要）
- RSS 订阅按钮 → `news-feed.xml`
- 邮件订阅表单 → Vercel Edge Function (`api/subscribe.js`)

**Finance Pipeline 集成** (`ai_finance_news` 仓库):
- `fin_news_digest/export_feed.py` — 生成 JSON + RSS XML
- GitHub Actions 自动提交 `news-feed.json` 和 `news-feed.xml`
- 可选触发 Vercel deploy hook
- 新闻每天自动更新 2 次

### 6. KaTeX 数学公式

- `remark-math` + `rehype-katex` 在 `astro.config.ts` 中配置
- KaTeX CSS 在 `src/layouts/Layout.astro` 的 `<head>` 中全局加载
- 46 篇数学文章构建时有 KaTeX 警告，不影响渲染

### 7. URL 重定向

`vercel.json` 配置 301 永久重定向:
```
/blog/:year/:month/:day/:title/ → /posts/:title/
/blog/archives/*               → /archives/
/blog/categories/*             → /categories/*
/blog/tags/*                   → /tags/*
/blog/about/*                  → /about/
/blog/atom.xml                 → /rss.xml
/blog, /blog/                  → /
```

### 8. 邮件订阅 API

`api/subscribe.js` — Vercel Edge Function:
- 接收 POST 请求中的邮件地址
- 通过 GitHub Contents API 存储到 `ai_finance_news` 仓库的 `subscribers.json`
- 需要 `GH_SUBSCRIBER_TOKEN` 环境变量

---

## 构建结果

- 242 个页面（101 篇文章 + blog 分页 + tags + categories + news + about + 404 等）
- 压缩: 16 CSS (31.68 KB) + 242 HTML (1.11 MB) + 10 JS (50.54 KB)
- 构建无错误，耗时约 8 秒

---

## 待完成 / 后续工作

### 部署

1. **Vercel 部署**: 导入 `james20141606/cmwonderland.com`
2. **自定义域名**: Vercel Settings → Domains → `www.cmwonderland.com`
3. **DNS 切换**: `www` CNAME → `cname.vercel-dns.com`
4. **环境变量**: `GH_SUBSCRIBER_TOKEN`（邮件订阅 API 用）
5. **Deploy Hook**: 为 `ai_finance_news` 创建 Vercel deploy hook

### Giscus 评论

1. 创建 GitHub 仓库 `james20141606/blog-comments`（public，启用 Discussions）
2. 安装 Giscus App，获取 `data-repo-id` 和 `data-category-id`
3. 需要在 AstroWind 的 PostLayout 中集成 Comments 组件

### 其他

- 312 张 fuimg.com CDN 图片可能需要后续迁移
- KaTeX 少量不兼容 MathJax 语法需手动修复
- 保留旧 GitHub Pages 运行直到 DNS 传播完成

---

## 技术栈

| 组件 | 技术 |
|------|------|
| 框架 | Astro v5 |
| 主题 | AstroWind |
| 样式 | Tailwind CSS v3 |
| 数学 | remark-math + rehype-katex |
| 代码高亮 | Shiki |
| 评论 | Giscus（待配置） |
| 部署 | Vercel（待部署） |
| 新闻源 | ai_finance_news pipeline → JSON/RSS → 客户端渲染 |

## 关键文件索引

```
astro.config.ts          — Astro 配置（markdown 插件、集成）
src/config.yaml          — AstroWind 站点配置
src/navigation.ts        — 导航栏和页脚配置
src/content/config.ts    — 内容集合 schema
src/layouts/
  Layout.astro           — 根布局（KaTeX CSS）
  PageLayout.astro       — 页面布局（导航 + 页脚）
  MarkdownLayout.astro   — Markdown 页面布局
src/pages/
  index.astro            — Landing page (Aerial 主题)
  news.astro             — 金融新闻信息流
  about.md               — 关于页面
  [...blog]/             — AstroWind 博客路由（列表、分类、标签、文章详情）
  rss.xml.ts             — RSS feed
src/data/post/           — 101 篇博客文章
public/landing/          — Aerial 主题静态资源
api/subscribe.js         — 邮件订阅 Vercel Edge Function
vercel.json              — URL 重定向规则
scripts/migrate.mjs      — 迁移脚本
```
