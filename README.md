# 角色素材库

基于 React、TypeScript 与 Vite 的静态角色服装素材网站，适配 GitHub Pages。

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

页面使用 Hash Router，因此 GitHub Pages 上的链接可直接刷新访问。原始 PNG 位于 `public/assets`，页面内的下载按钮直接下载对应原图。

## 发布

将仓库推送至 `main`，然后在 GitHub 仓库的 **Settings → Pages** 中将 Source 设为 **GitHub Actions**。工作流会自动构建并发布。
