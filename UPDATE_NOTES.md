# Homepage redesign — Ciel（天空档案馆）

上一版“书卷风格（浅绿）”在提交 `17e7fc1` 及之前，需要时可以从 Git 历史恢复。

## 设计

- “天空档案馆”拼贴风（页面文字全部为英文）：淡蓝紫天空渐变 + 云 + 细颗粒（`body::before/::after`，固定不随滚动）；藏蓝墨色、白色纸张面板、少量玫瑰粉点缀。色值在 `app/globals.css` 顶部（`data-theme="ciel"`）。
- 字体：正文 Newsreader；姓名、日期、小节大标题、描边斜体数字和大写标签用 Bodoni Moda；花体用 Pinyon Script；日期、编号等元信息用 IBM Plex Mono。
- 每个小节：藏蓝小标签（如 `NEWS · 02`）+ 描边斜体编号 + 叠在上面的粗体标题 + 右侧花体副标题（如 Recent updates）；内容放在带藏蓝标题栏和角标的纸张面板里，列表用方框编号 + 右侧等宽日期。
- 首屏：左上 “YZ” 描边字母与姓名叠排；中间是按访客本地时间显示的问候（Good morning / afternoon / evening）；右上是实时日期和时钟。下面是石柱 + 引言卡、拱门里的贴纸人像和罗盘环（旁边的编号和状态标签在 Currently / Also / Seeking 三条之间轮换）、简介面板 + 邮票邮戳；背景里有伸向云端的梯子和一只鸽子。
- 所有装饰（石柱、梯子、鸽子、罗盘、邮票、邮戳、条形码）都是 `app/components/ciel/Ornaments.tsx` 里手绘的 SVG，不依赖外部图片。
- 宽屏左侧是悬挂的行李牌导航（`app/components/ciel/TagRail.tsx`），当前所在小节的牌子会变成藏蓝色，悬停时轻轻摆动并显示名称；窄屏改为顶部文字导航。
- 光标：平时是一朵樱花，悬停链接时变成颜色更深、带花苞的樱花，正文上是细衬线 I 形光标，见 `app/cursors.css`（SVG 以 data URI 内嵌，热点在花心）。
- 邮箱不直接显示，显示为 “Email”，点击复制地址并短暂提示 “Copied”（`app/components/CopyEmail.tsx`）。
- Miscs（Miscellaneous）默认折叠，只显示一行分类标签；点击标题旁的圆形 “+”（或标签本身）展开，分类名滑入左栏、内容依次淡入，再点 “−” 收起（`app/components/Miscellaneous.tsx`）。链接带 `#miscellaneous` 时直接展开。
- 动效（`app/components/ciel/Motion.tsx` 和 `globals.css` 的 motion 一节）：页面从一片白光中浮现，首屏元素依次带模糊淡入，花体问候从左往右“写”出，邮票带回弹“盖”上；云层缓慢漂移；罗盘自己慢转，并随滚动平滑多转一些；状态标签与编号交叉淡化轮换；各小节滚动到时，描边编号从宽字距收拢、标题浮现、藏蓝标题栏从左往右画出、列表逐行出现、花体副标题被写出；悬停列表行时选中条平滑移到该行。
- 动效只在 `<head>` 的内联脚本给 `<html>` 加上 `motion` 后才启用：没有 JavaScript 时页面直接完整显示；系统开启“减少动态效果”时全部关闭。
- 页脚访客地图（MapMyVisitors）沿用原来的统计 token，颜色读取当前主题。

## 修改内容

- 所有文字内容都在 `app/content.tsx`：简介、News、论文、经历、教育、荣誉和 Miscs。新增一条 News 或一篇论文只需改这个文件。
- 首屏引言卡的文字在 `app/page.tsx`（`quote-card`），状态标签的三条文字在 `app/components/ciel/Motion.tsx`（`statuses`）。
- 各小节的标签、标题和花体副标题在 `app/page.tsx` 的 `<Section>` 上。
- 论文作者里给名字末尾加 `*` 表示共同一作；`Yujia Zeng` 会自动加下划线强调。
- 论文配图放在 `public/images/pubs/`（WebP），每张图完整显示在统一的 2:1 白底框里；照片在 `public/images/portrait.webp`。
- 页面不含中文，因此不再托管中文字体子集。

## 移除

- CV 入口和 `public/resume.pdf`（Git 历史中仍可恢复）。
- 论文图片不再外链 arXiv，改为本站托管。

`/publication` 页面保留，与首页共用同一份论文数据和样式。

## 简洁版 `/classic`

- `app/classic/page.tsx` + `app/classic/classic.css`：仿 Jon Barron 学术模板的单栏简洁版（Lato 字体、800 px 宽、蓝色链接、粉色日期、左图右文的论文列表、椭圆照片），内容与首页共用 `app/content.tsx`，改一处两边同步。
- 首页右上角日期下方有 “Classic version →” 按钮跳转过去；简洁版里有 “View the illustrated homepage” 链回首页。简洁版不显示天空背景、动效和樱花光标。
- 社交链接（含 X）在 `app/content.tsx` 的 `profile.links`，两个页面都会显示。
