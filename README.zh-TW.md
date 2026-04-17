# HKTVmall OpenAPI Toolkit

將 HKTVmall 商戶平台的專業知識帶進你的 AI 開發助理。

此工具包以 plugin 形式提供 HKTVmall Open API 的領域知識，讓 AI 代理生成的程式碼能符合官方規格，而不再是憑空猜測。所有資料皆來自 [HKTVmall 開發者入口網站](https://developers.shoalter.com/apis)。

[English version](./README.md)

## 快速開始

**Claude Code** — 在任一對話中執行：

```
/plugin marketplace add eeeleeeeee/HKTVmall-OpenAPI-Toolkit
/plugin install hktvmall-plugin@HKTVmall-OpenAPI-Toolkit
```

接著執行 `/reload-plugins` 重新載入，之後只要提問涉及 HKTVmall API，對應的 skills 就會自動啟用。

**Gemini CLI** — 在終端機執行：

```
gemini extensions install https://github.com/eeeleeeeee/HKTVmall-OpenAPI-Toolkit
```

擴充套件註冊完成後，當提示詞涉及 HKTVmall 平台時，Gemini 會自動啟用相關 skill。

**VS Code** — 開啟命令面板（`CMD+SHIFT+P`），執行 **Chat: Install Plugin From Source**。

接著貼上：

```
https://github.com/eeeleeeeee/HKTVmall-OpenAPI-Toolkit
```

## 保持更新

本 repo 設有排程 GitHub Actions，每日自動與 HKTVmall 開發者入口網站同步，上游 API 有異動時會自動 bump plugin 的 patch 版本號。若要把最新版拉進你的 Claude Code，執行以下指令：

```
/plugin marketplace update HKTVmall-OpenAPI-Toolkit
/plugin update hktvmall-plugin@HKTVmall-OpenAPI-Toolkit
/reload-plugins
```

可以用 `/plugin list` 查看目前安裝的版本，與本 repo 的最新版本對照確認。

## 內容總覽

- **即時查詢 API 端點** — AI 助理會依照需求列出每支 API 的 method、路徑、headers 與範例 payload。
- **完整的商戶 API 覆蓋** — 涵蓋 23 支端點：商品（10）、訂單（9）、店家設定（2）、庫存（2）。
- **符合規範的程式碼生成** — 請求與回應皆對齊 HKTVmall 官方 schema，大幅減少除錯時間。

## 手動安裝

若你使用的工具不支援 plugin，可直接將 `skills/` 底下的 `SKILL.md` 資料夾複製到你的 AI 助理 skills 目錄。

## 資料同步

Skill 檔案由 HKTVmall 開發者入口網站自動產生。當原始資料更新時，執行以下指令重新建置：

```
npm run build
```
