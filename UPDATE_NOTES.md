# Homepage redesign — Ciel（天空档案馆）

上一版“书卷风格（浅绿）”在提交 `17e7fc1` 及之前，需要时可以从 Git 历史恢复。

## 设计

- 法式“天空档案馆”拼贴风：淡蓝紫天空渐变 + 云 + 细颗粒（`body::before/::after`，固定不随滚动）；藏蓝墨色、白色纸张面板、少量玫瑰粉点缀。色值在 `app/globals.css` 顶部（`data-theme="ciel"`）。
- 字体：正文 Newsreader；姓名、日期、大号描边斜体数字和大写标签用 Bodoni Moda；法文花体用 Pinyon Script；日期、编号等元信息用 IBM Plex Mono；中文标题用思源宋体 Black 子集。
- 每个小节：藏蓝小标签（如 `NOUVELLES · 02`）+ 描边斜体编号 + 粗宋体中文标题 + 右侧法文花体副标题；内容放在带藏蓝标题栏和角标的纸张面板里，列表用方框编号 + 右侧等宽日期。
- 首屏：左上 “YZ” 描边字母与姓名叠排；中间是按访客本地时间显示的法语问候（Bonjour / Bon après-midi / Bonsoir）；右上是实时日期和时钟。下面是石柱 + 引言卡、拱门里的贴纸人像和缓慢转动的罗盘环、简介面板 + 邮票邮戳；背景里有伸向云端的梯子和一只鸽子。
- 所有装饰（石柱、梯子、鸽子、罗盘、邮票、邮戳、条形码）都是 `app/components/ciel/Ornaments.tsx` 里手绘的 SVG，不依赖外部图片。
- 宽屏左侧是悬挂的行李牌导航（`app/components/ciel/TagRail.tsx`），当前所在小节的牌子会变成藏蓝色，悬停时轻轻摆动并显示名称；窄屏改为顶部文字导航。
- 光标：平时是一朵樱花，悬停链接时变成颜色更深、带花苞的樱花，正文上是细衬线 I 形光标，见 `app/cursors.css`（SVG 以 data URI 内嵌，热点在花心）。
- 邮箱不直接显示，显示为 “Email”，点击复制地址并短暂提示 “Copied”（`app/components/CopyEmail.tsx`）。
- Miscs（Miscellaneous）默认折叠，只显示一行分类标签；点击标题旁的圆形 “+”（或标签本身）展开，分类名滑入左栏、内容依次淡入，再点 “−” 收起（`app/components/Miscellaneous.tsx`）。链接带 `#miscellaneous` 时直接展开。
- 系统开启“减少动态效果”时，罗盘不转、牌子不摆、Miscs 不播放动画。
- 页脚访客地图（MapMyVisitors）沿用原来的统计 token，颜色读取当前主题。

## 修改内容

- 所有文字内容都在 `app/content.tsx`：简介、News、论文、经历、教育、荣誉和 Miscs。新增一条 News 或一篇论文只需改这个文件。各小节的法文标签、中文标题和花体副标题在 `app/page.tsx` 的 `<Section>` 上。
- 首屏引言卡的文字在 `app/page.tsx`（`quote-card`）。
- 论文作者里给名字末尾加 `*` 表示共同一作；`Yujia Zeng` 会自动加下划线强调。
- 论文配图放在 `public/images/pubs/`（WebP），每张图完整显示在统一的 2:1 白底框里；照片在 `public/images/portrait.webp`。
- 页面用到的中文字来自随站点托管的思源宋体子集：`public/fonts/noto-serif-sc-400.woff2`（正文、标签、引言）和 `noto-serif-sc-900.woff2`（小节大标题）。新增中文字时需要重新下载子集，方法见 `app/globals.css` 中的注释，并更新对应的 `unicode-range`。

## 移除

- CV 入口和 `public/resume.pdf`（Git 历史中仍可恢复）。
- 论文图片不再外链 arXiv，改为本站托管。

`/publication` 页面保留，与首页共用同一份论文数据和样式。
