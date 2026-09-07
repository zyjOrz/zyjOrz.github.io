# Homepage update — CV + RoboSTAR

## 本次更新

### 顶部 CV

- 在原来的 Home / News / Publication / Experiences 之后加入 CV。
- 顶栏的 `w-full max-w-6xl`、内边距、字号、悬浮背景及移动端样式均未改变。第五个链接使用原容器内部的间距，不加宽顶栏。
- CV 指向 `/resume.pdf`，使用新标签页打开 PDF，未设置强制下载。
- `public/resume.pdf` 已替换为此次上传的 `Resume_260906.pdf`，文件内容未修改。
- 后续更新简历，只需覆盖 `public/resume.pdf`，无需再改导航代码。

### RoboSTAR

- 已放在首页 Publications 和独立 `/publication` 页面第一项；其他论文的顺序不变。
- 标注 `IROS 2026 Workshop`、`Oral` 和 `Under Review`，并说明 Workshop oral acceptance。
- 没有额外写入任何具体的在投会议名称。
- 标题、作者顺序及前三位共同一作标记依据上传的简历。
- 原始流程图存为 `public/robostar-method.png`，完整保留 2048 × 572 的内容和比例；仅此项目采用整行图片布局，点击图片可查看原始分辨率。
- 项目主页：https://www.yujiazeng.com/RoboSTAR/
- Code：https://github.com/zyjOrz/zyjOrz.github.io
- Code 使用的是用户指定的地址，未自动替换为其他仓库。
- 项目介绍依据项目主页；未添加尚未提供地址的 Paper 按钮。
- 两个页面共享 `app/robostar.tsx` 中的数据，之后修改一次即可同步。

## 修改或新增的文件

```text
app/TopNav.tsx
app/globals.css
app/page.tsx
app/publication/page.tsx
app/robostar.tsx             # 新增，共享项目数据及条目类型
public/resume.pdf            # 替换为本次上传的简历
public/robostar-method.png    # 新增，上传的流程图原文件
UPDATE_NOTES.md              # 本说明
```

## 使用

解压后，将 `zyjOrz.github.io-main` 文件夹内的内容放到原本地仓库的根目录，覆盖同名文件，并保留新增文件。不要把整个文件夹再次嵌套在仓库里。

本地预览沿用现有流程：

```bash
npm ci
npm run dev
```

完成预览后，将修改提交到现有仓库的 `main` 分支；原 GitHub Pages workflow 保持不变。此压缩包不包含 `node_modules`、构建缓存或离线预览用的测试代码。

## 检查范围与限制

- 已检查所有 TS/TSX 文件的语法及转译诊断；这不等同于完整 Next.js 构建或完整类型检查。
- 已从实际 TSX 生成离线静态布局，使用本地 Tailwind CSS 编译样式并在 Chromium 中检查。
- 在 320、375、390、639、640、768、1024、1440 像素视口下，新增 CV 前后顶栏的外宽、高度和左右位置保持一致；五个导航项没有重叠或换行。
- 已核对图片完整比例、两个页面的项目顺序、链接与状态标注。
- 已逐字节核对发布目录中的 PDF 和 PNG，与上传文件一致。PDF 两页已本地渲染检查。
- 当前环境无法访问 npm registry，因而没有完成依赖安装及生产构建；浏览器的本地 HTTP 导航也受限，原生 PDF 新标签页的集成预览未作端到端验证。已检查 PDF 链接、`target="_blank"` 及未设置强制下载的属性；实际行为还会受访客浏览器的 PDF 设置影响。
- 未直接更改或部署线上 GitHub 仓库。
