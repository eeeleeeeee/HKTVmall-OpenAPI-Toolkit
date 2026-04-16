const https = require("https");
const fs = require("fs");
const path = require("path");

const API_PORTAL_URL = "https://developers.shoalter.com/apis";
const OUTPUT_PATH = path.join(__dirname, "../../index.js");

function httpGet(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }
        let data = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(data));
      })
      .on("error", reject);
  });
}

async function main() {
  console.log(`抓取 HTML: ${API_PORTAL_URL}`);
  const html = await httpGet(API_PORTAL_URL);

  const match = html.match(/\/assets\/index-[A-Za-z0-9_-]+\.js/);
  if (!match) {
    throw new Error("HTML 裡找不到 bundle 路徑，頁面結構可能變了");
  }

  const bundlePath = match[0];
  const bundleUrl = new URL(bundlePath, API_PORTAL_URL).toString();
  console.log(`偵測到 bundle: ${bundleUrl}`);

  console.log("下載 bundle...");
  const jsSource = await httpGet(bundleUrl);

  fs.writeFileSync(OUTPUT_PATH, jsSource, "utf-8");
  console.log(`已儲存: ${OUTPUT_PATH} (${jsSource.length} bytes)`);
}

main().catch((err) => {
  console.error("失敗:", err.message);
  process.exit(1);
});
