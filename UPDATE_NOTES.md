# Homepage redesign — 书卷风格（浅绿）

## 设计

- 衬线正文（Newsreader）+ 无衬线信息字（Schibsted Grotesk），左栏放小节标题，细线分隔，不使用玻璃拟态、渐变、阴影、emoji 和滚动动效。
- 配色主题在 `app/layout.tsx` 的 `data-theme` 上切换：`sage`（浅绿，当前）、`blush`（浅粉）、`paper`（暖白）。色值在 `app/globals.css` 顶部。
- 光标：平时是一朵樱花，悬停链接时变成颜色更深、带花苞的樱花，正文上是细衬线 I 形光标，见 `app/cursors.css`（SVG 以 data URI 内嵌，热点在花心）。
- 首屏：宽屏下照片框自动与右侧文字等高（照片贴底，多出的高度留在头顶），所以改简介长度后两栏依然对齐。
- 邮箱不直接显示，显示为 “Email”，点击复制地址并短暂提示 “Copied”（`app/components/CopyEmail.tsx`）。
- 页脚访客地图（MapMyVisitors）沿用原来的统计 token，只把颜色改为读取当前主题。

## 修改内容

- 所有文字内容都在 `app/content.tsx`：简介、News、论文、经历、教育、荣誉和 Miscellaneous。新增一条 News 或一篇论文只需改这个文件。
- 论文作者里给名字末尾加 `*` 表示共同一作；`Yujia Zeng` 会自动加粗。
- 论文配图放在 `public/images/pubs/`（WebP，宽 560 px），照片在 `public/images/portrait.webp`。
- “少年班”三个字使用随站点托管的思源宋体子集 `public/fonts/noto-serif-sc-subset.woff2`。如果要加入其他中文字，需要重新下载子集（方法见 `app/globals.css` 中的注释）。

## 移除

- CV 入口和 `public/resume.pdf`（Git 历史中仍可恢复）。
- 背景大图、鼠标涟漪、经历轮播、复制邮箱按钮等旧组件。
- 论文图片不再外链 arXiv，改为本站托管。

`/publication` 页面保留，与首页共用同一份论文数据和样式。
