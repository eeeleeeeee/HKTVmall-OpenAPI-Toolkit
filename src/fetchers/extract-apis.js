const fs = require("fs");
const path = require("path");
const JSON5 = require("json5");

/**
 * 將 JS bundle 片段中的 template literal 轉成普通 JSON 字串。
 * 若發現 ${} 插值語法則拋錯——這是程式碼注入的警訊，不應出現在純資料裡。
 */
function normalizeTemplateLiterals(code) {
  return code.replace(/`((?:[^`\\]|\\.)*)`/gs, (match, content) => {
    if (content.includes("${")) {
      throw new Error(
        "Bundle 資料中發現 template 插值 ${}，可能遭到注入攻擊，已中止解析"
      );
    }
    const escaped = content
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')
      .replace(/\r\n/g, "\\n")
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\n");
    return `"${escaped}"`;
  });
}

/**
 * 從 JS bundle 依括號層數提取一個陣列的原始字串
 */
function extractArrayRaw(source, arrayStart) {
  const bracketStart = source.indexOf("[", arrayStart);
  if (bracketStart === -1) {
    throw new Error(`在位置 ${arrayStart} 找不到陣列起始括號 '['`);
  }

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

  if (depth !== 0) {
    throw new Error("Bundle 資料括號不平衡，無法安全提取陣列");
  }

  return source.slice(bracketStart, i + 1);
}

/**
 * 安全解析 JS 陣列字串，使用 JSON5 取代 vm.runInNewContext。
 * 先處理 minifier 的常見替換，再轉換 template literal，最後用 JSON5 解析。
 */
function safeParseArray(rawArray) {
  // 處理 minifier 常見替換：!0 → true、!1 → false、void 0 → null
  let normalized = rawArray
    .replace(/!0/g, "true")
    .replace(/!1/g, "false")
    .replace(/void 0/g, "null");
  normalized = normalizeTemplateLiterals(normalized);
  return JSON5.parse(normalized);
}

/**
 * 從 HKTVmall 前端 JS bundle 提取 API 資料
 */
function extractApis(source) {
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

  return safeParseArray(rawArray);
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

  const categories = [...new Set(apis.map((a) => a.category))];
  console.log(`API 分類: ${categories.join(", ")}`);

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

  extractTutorials(source);
  extractQnA(source);
}

function extractQnA(source) {
  const marker = 'V6=[{id:"1",question:';
  const markerIdx = source.indexOf(marker);
  if (markerIdx === -1) {
    console.warn("找不到 Q&A 陣列 (V6)，跳過");
    return;
  }

  let rawArray;
  try {
    rawArray = extractArrayRaw(source, markerIdx);
  } catch (err) {
    console.warn(`提取 Q&A 陣列失敗: ${err.message}`);
    return;
  }

  let qnas;
  try {
    qnas = safeParseArray(rawArray);
  } catch (err) {
    console.warn(`解析 Q&A 陣列失敗: ${err.message}`);
    return;
  }

  if (!Array.isArray(qnas)) {
    console.warn("Q&A 資料不是陣列，跳過");
    return;
  }

  const stripped = qnas.map((q) => ({
    id: q.id,
    question: typeof q.question === "object" ? q.question.en : q.question,
    questionTw: typeof q.question === "object" ? q.question["zh-TW"] : null,
    answer: typeof q.answer === "object"
      ? q.answer.en.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/\n\s*\n+/g, "\n\n").trim()
      : String(q.answer).replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim(),
    tags: q.tags || [],
  }));

  console.log(`共找到 ${qnas.length} 個 Q&A: ${stripped.map((q) => q.question).join(", ")}`);

  const outputPath = path.join(__dirname, "../../qna-data.json");
  fs.writeFileSync(outputPath, JSON.stringify(stripped, null, 2), "utf-8");
  console.log(`已輸出到: ${outputPath}`);
}

function extractTutorials(source) {
  const pattern = /([A-Za-z_$]{1,8})=(\[\{id:"[0-9]+",title:\{)/g;
  const allMatches = [...source.matchAll(pattern)];
  if (allMatches.length === 0) {
    console.warn("找不到 tutorials 陣列，跳過");
    return;
  }

  let tutorials = null;
  for (const match of allMatches) {
    const varName = match[1];
    const arrayStart = match.index;

    let rawArray, candidates;
    try {
      rawArray = extractArrayRaw(source, arrayStart);
      candidates = safeParseArray(rawArray);
    } catch (err) {
      console.warn(`解析 tutorials 變數 ${varName} 失敗，跳過: ${err.message}`);
      continue;
    }

    if (!Array.isArray(candidates)) continue;

    if (candidates.some((t) => t.category === "Authentication")) {
      tutorials = candidates;
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
      : String(t.content).replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim(),
    category: t.category,
  }));

  console.log(`共找到 ${tutorials.length} 個 tutorial: ${stripped.map((t) => t.title).join(", ")}`);

  const outputPath = path.join(__dirname, "../../tutorials-data.json");
  fs.writeFileSync(outputPath, JSON.stringify(stripped, null, 2), "utf-8");
  console.log(`已輸出到: ${outputPath}`);
}

main();
