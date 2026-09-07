# Homepage update — CV + RoboSTAR (original layout restored)

## 本次修正

- RoboSTAR 与其他论文共用原来的卡片模板，取消专用整行大图布局。
- 首页恢复原来的左图右文排版，桌面图片列宽仍为 390 px；独立 `/publication` 页仍为 420 px。移动端沿用原有的上下排版。
- 卡片宽度、内边距、图片容器、标题字号、正文字号、按钮、圆角、阴影和悬停效果均使用原有样式，没有单独放大 RoboSTAR。
- `app/globals.css` 已逐字节恢复为最初上传源码中的文件。
- `(Oral)` 沿用原有红色标注。`Under Review` 在会议名称后以相同字号的普通文字显示，取消新加的胶囊标签和独立说明段落。
- 作者星号保留；共同一作说明保留为作者行的鼠标悬停提示。完整 Workshop 接收说明保留为会议名称的鼠标悬停提示。
- 顶部 CV 入口、顶栏宽度、PDF、项目图片、Project Page / Code 链接均未改变。
- 首页及独立 Publication 页同时修正；其他论文内容和顺序未改变。

## 覆盖方式

将 `zyjOrz.github.io-main` 文件夹中的内容覆盖到原仓库根目录，不要再嵌套一层目录，然后按原有流程提交部署。

相对上一版，本次仅修改：

```text
app/globals.css
app/page.tsx
app/publication/page.tsx
app/robostar.tsx
UPDATE_NOTES.md
```

原有 PDF (`public/resume.pdf`) 与流程图 (`public/robostar-method.png`) 保留且未修改。

## 检查

- 已检查全部 TS/TSX 文件语法及转译诊断。
- 已使用实际 TSX 和本地 Tailwind 编译生成静态页面，在 Chromium 中对照原始版本检查 375、639、768、1024、1440 px 的布局。
- 在这五种视口下，两页 RoboSTAR 卡片的外宽、图片列宽、字号、间距及内边距与各自页面的其他论文一致；原有论文的横向布局未改变。
- 首页顶部导航的外宽、高度和左右位置与最初版本一致。
- 已确认 PDF 和流程图与上传文件逐字节一致。

上述为静态布局检查，不是完整 Next.js 集成测试。未直接修改线上 GitHub 仓库；完整 Next.js 生产构建未验证。
