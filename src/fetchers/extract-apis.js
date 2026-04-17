const fs = require("fs");
const vm = require("vm");
const path = require("path");

/**
 * 從 JS bundle 依括號層數提取一個陣列的原始字串
 */
function extractArrayRaw(source, arrayStart) {
  const bracketStart = source.indexOf("[", arrayStart);
  let depth = 0, inString = false, stringChar = "", inTemplate = false;
  let i = bracketStart;
  for (; i < source.length; i++) {
    const ch = source[i], prev = source[i - 1];
    if (inTemplate) { if (ch === "`" && prev !== "\\") inTemplate = false; continue; }
    if (inString) { if (ch === stringChar && prev !== "\\") inString = false; continue; }
    if (ch === "`") { inTemplate = true; continue; }
    if (ch === '"' || ch === "'") { inString = true; stringChar = ch; continue; }
    if (ch === "[" || ch === "{") depth++;
    if (ch === "]" || ch === "}") { depth--; if (depth === 0) break; }
  }
  return source.slice(bracketStart, i + 1);
}

/**
 * 從 HKTVmall 前端 JS bundle 提取 API 資料
 * 資料結構: const OR = [{ id, name, endpoint, method, category, ... }]
 */
function extractApis(source) {

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

  const rawArray = extractArrayRaw(source, arrayStart);
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
  const source = fs.readFileSync(bundlePath, "utf-8");
  const apis = extractApis(source);

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

  // 提取 tutorials (認證文件等)
  extractTutorials(source);
}

function extractTutorials(source) {
  // 找出所有 tutorials 陣列，取含 Authentication category 的那個
  const pattern = /([A-Za-z_$]{1,8})=(\[\{id:"[0-9]+",title:\{)/g;
  const allMatches = [...source.matchAll(pattern)];
  if (allMatches.length === 0) {
    console.warn("找不到 tutorials 陣列，跳過");
    return;
  }

  let tutorials = null;
  let foundVarName = null;
  for (const match of allMatches) {
    const varName = match[1];
    const arrayStart = match.index;
    const rawArray = extractArrayRaw(source, arrayStart);
    const sandbox = { result: undefined };
    vm.runInNewContext(`result = ${rawArray}`, sandbox);
    const candidates = sandbox.result;
    if (candidates.some((t) => t.category === "Authentication")) {
      tutorials = candidates;
      foundVarName = varName;
      console.log(`找到 tutorials 資料，原始長度: ${rawArray.length} 字元，變數名: ${varName}`);
      break;
    }
  }

  if (!tutorials) {
    console.warn("所有 tutorials 陣列中都找不到 Authentication 分類，跳過");
    return;
  }

  const stripped = tutorials.map((t) => ({
    id: t.id,
    title: typeof t.title === "object" ? t.title.en : t.title,
    content: typeof t.content === "object"
      ? t.content.en.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/\n\s*\n+/g, "\n\n").trim()
      : t.content,
    category: t.category,
  }));

  console.log(`共找到 ${tutorials.length} 個 tutorial: ${stripped.map((t) => t.title).join(", ")}`);

  const outputPath = path.join(__dirname, "../../tutorials-data.json");
  fs.writeFileSync(outputPath, JSON.stringify(stripped, null, 2), "utf-8");
  console.log(`已輸出到: ${outputPath}`);
}

main();
