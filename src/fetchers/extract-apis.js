const fs = require("fs");
const vm = require("vm");
const path = require("path");

/**
 * 從 HKTVmall 前端 JS bundle 提取 API 資料
 * 資料結構: const OR = [{ id, name, endpoint, method, category, ... }]
 */
function extractApis(jsBundlePath) {
  const source = fs.readFileSync(jsBundlePath, "utf-8");

  // 找出 API 陣列的起始位置
  // 特徵：const <大寫變數>=[ { id:"<數字串>",name:{en:
  const startMatch = source.match(/const\s+([A-Z]{1,3})=(\[\{id:"[0-9]+",name:\{en:)/);
  if (!startMatch) {
    throw new Error("找不到 API 資料陣列，請確認 JS bundle 是否正確");
  }

  const varName = startMatch[1];
  const arrayStart = source.indexOf(`const ${varName}=[`);
  if (arrayStart === -1) {
    throw new Error(`找不到變數 ${varName} 的定義`);
  }

  // 從 '[' 開始，計算括號層數找出陣列結尾
  const bracketStart = source.indexOf("[", arrayStart);
  let depth = 0;
  let inString = false;
  let stringChar = "";
  let inTemplate = false;
  let i = bracketStart;

  for (; i < source.length; i++) {
    const ch = source[i];
    const prev = source[i - 1];

    if (inTemplate) {
      if (ch === "`" && prev !== "\\") inTemplate = false;
      continue;
    }
    if (inString) {
      if (ch === stringChar && prev !== "\\") inString = false;
      continue;
    }

    if (ch === "`") { inTemplate = true; continue; }
    if (ch === '"' || ch === "'") { inString = true; stringChar = ch; continue; }
    if (ch === "[" || ch === "{") depth++;
    if (ch === "]" || ch === "}") {
      depth--;
      if (depth === 0) break;
    }
  }

  const rawArray = source.slice(bracketStart, i + 1);
  console.log(`找到 API 資料，原始長度: ${rawArray.length} 字元，變數名: ${varName}`);

  // 用 vm 安全執行，提取陣列資料
  const sandbox = { result: undefined };
  vm.runInNewContext(`result = ${rawArray}`, sandbox);

  return sandbox.result;
}

function main() {
  const bundlePath = path.join(__dirname, "../../index.js");

  if (!fs.existsSync(bundlePath)) {
    console.error(`找不到 JS bundle: ${bundlePath}`);
    console.error("請先執行 npm run fetch 下載最新 bundle");
    process.exit(1);
  }

  console.log("開始提取 API 資料...");
  const apis = extractApis(bundlePath);

  console.log(`共找到 ${apis.length} 個 API`);

  // 顯示摘要
  const categories = [...new Set(apis.map((a) => a.category))];
  console.log(`API 分類: ${categories.join(", ")}`);

  // 輸出精簡版 JSON（只保留 AI 需要的欄位）
  const simplified = apis.map((api) => ({
    id: api.id,
    name: api.name?.en || api.name,
    nameTw: api.name?.["zh-TW"],
    description: api.description?.en?.replace(/<[^>]+>/g, "").trim(),
    version: api.version,
    baseUrl: api.baseUrl,
    endpoint: api.endpoint,
    method: api.method,
    category: api.category,
    status: api.status,
    headers: api.headers,
    requestBodies: api.requestBodies,
    responses: api.responses,
  }));

  const outputPath = path.join(__dirname, "../../api-data.json");
  fs.writeFileSync(outputPath, JSON.stringify(simplified, null, 2), "utf-8");
  console.log(`已輸出到: ${outputPath}`);
}

main();
