const fs = require("fs");
const path = require("path");

/**
 * 把 api-data.json 轉成 Claude Code Skill 的 markdown 文件
 * 每個分類產生一個 skill 檔案
 */
function generateSkills(apiDataPath, skillsOutputDir) {
  const apis = JSON.parse(fs.readFileSync(apiDataPath, "utf-8"));

  // 依分類分組
  const byCategory = {};
  apis.forEach((api) => {
    const cat = api.category || "General";
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(api);
  });

  fs.mkdirSync(skillsOutputDir, { recursive: true });

  for (const [category, categoryApis] of Object.entries(byCategory)) {
    const skillName = `hktvmall-${category.toLowerCase()}-apis`;
    const skillDir = path.join(skillsOutputDir, skillName);
    fs.mkdirSync(skillDir, { recursive: true });
    const content = buildSkillContent(category, categoryApis);
    fs.writeFileSync(path.join(skillDir, "SKILL.md"), content, "utf-8");
    console.log(`已生成: ${skillName}/SKILL.md (${categoryApis.length} 個 API)`);
  }

  // 也產生一個總覽 skill
  const overviewDir = path.join(skillsOutputDir, "hktvmall-api-overview");
  fs.mkdirSync(overviewDir, { recursive: true });
  fs.writeFileSync(path.join(overviewDir, "SKILL.md"), buildOverviewContent(byCategory), "utf-8");
  console.log(`已生成: hktvmall-api-overview/SKILL.md`);
}

function buildSkillContent(category, apis) {
  const lines = [
    `---`,
    `name: hktvmall-${category.toLowerCase()}-apis`,
    `description: HKTVmall ${category} API reference. Use when writing code that calls HKTVmall ${category} endpoints (${apis.map(a => a.method + " " + a.endpoint).join(", ")}).`,
    `---`,
    ``,
    `# HKTVmall ${category} API Reference`,
    ``,
    `Use this skill when helping developers write code that calls HKTVmall ${category} APIs.`,
    `Base URL for all ${category} APIs: \`${apis[0]?.baseUrl || "https://merchant-oapi.shoalter.com"}\``,
    ``,
    `## Required Headers (all endpoints)`,
    ``,
    `\`\`\``,
    `Content-Type: application/json`,
    `x-auth-token: <token>        # see hktvmall-auth skill`,
    `storeCode: <Your Store Code> # e.g. H8888881`,
    `platformCode: HKTV`,
    `businessType: eCommerce`,
    `\`\`\``,
    ``,
    `## Endpoints`,
    ``,
  ];

  for (const api of apis) {
    if (api.status !== "active") continue;

    lines.push(`### ${api.name} (${api.nameTw || ""})`);
    lines.push(``);
    lines.push(`**${api.method}** \`${api.baseUrl}${api.endpoint}\``);
    lines.push(`Version: ${api.version}`);
    lines.push(``);

    if (api.description) {
      lines.push(api.description);
      lines.push(``);
    }

    // Request body examples
    if (api.requestBodies?.length > 0) {
      lines.push(`**Request Body:**`);
      lines.push(``);
      api.requestBodies.forEach((body) => {
        if (body.description?.en) lines.push(`*${body.description.en}*`);
        if (body.example) {
          lines.push(`\`\`\`json`);
          lines.push(body.example.trim());
          lines.push(`\`\`\``);
        }
        lines.push(``);
      });
    }

    // Response examples
    if (api.responses?.length > 0) {
      lines.push(`**Response:**`);
      lines.push(``);
      api.responses.forEach((res) => {
        if (res.example) {
          lines.push(`\`\`\`json`);
          lines.push(
            typeof res.example === "string"
              ? res.example.trim()
              : JSON.stringify(res.example, null, 2)
          );
          lines.push(`\`\`\``);
        }
        lines.push(``);
      });
    }

    lines.push(`---`);
    lines.push(``);
  }

  return lines.join("\n");
}

function buildOverviewContent(byCategory) {
  const lines = [
    `---`,
    `name: hktvmall-api-overview`,
    `description: HKTVmall API overview. Use to discover available HKTVmall API categories (Product, Order, Store, Inventory) before diving into specific endpoints.`,
    `---`,
    ``,
    `# HKTVmall API Overview`,
    ``,
    `HKTVmall Open API Platform for merchant integration.`,
    ``,
    `## Available API Categories`,
    ``,
  ];

  for (const [category, apis] of Object.entries(byCategory)) {
    lines.push(`### ${category} (${apis.length} APIs)`);
    apis.forEach((api) => {
      lines.push(`- **${api.method}** \`${api.endpoint}\` — ${api.name}`);
    });
    lines.push(``);
  }

  lines.push(`## Common Headers`);
  lines.push(``);
  lines.push(`All API calls require:`);
  lines.push(`- \`x-auth-token\`: Authentication token`);
  lines.push(`- \`storeCode\`: Your merchant store code (e.g. H8888881)`);
  lines.push(`- \`platformCode\`: HKTV`);
  lines.push(`- \`businessType\`: eCommerce`);

  return lines.join("\n");
}

function generateAuthSkill(tutorialsDataPath, skillsOutputDir) {
  if (!fs.existsSync(tutorialsDataPath)) {
    console.warn("找不到 tutorials-data.json，跳過 hktvmall-auth skill 生成");
    return;
  }

  const tutorials = JSON.parse(fs.readFileSync(tutorialsDataPath, "utf-8"));
  const authTutorial = tutorials.find((t) => t.category === "Authentication");
  if (!authTutorial) {
    console.warn("tutorials-data.json 中找不到 Authentication 分類，跳過");
    return;
  }

  const content = buildAuthSkillContent(authTutorial.content);
  const skillDir = path.join(skillsOutputDir, "hktvmall-auth");
  fs.mkdirSync(skillDir, { recursive: true });
  fs.writeFileSync(path.join(skillDir, "SKILL.md"), content, "utf-8");
  console.log("已生成: hktvmall-auth/SKILL.md");
}

function buildAuthSkillContent(rawContent) {
  // Detect algorithm from content (default RS256)
  const algMatch = rawContent.match(/"alg"\s*:\s*"([A-Z0-9]+)"/);
  const alg = algMatch ? algMatch[1] : "RS256";

  // Detect payload claims present in content
  const hasXApiKey = rawContent.includes('"x-api-key"');
  const hasIat = rawContent.includes('"iat"');

  const jwtHeader = `{\n  "alg": "${alg}",\n  "typ": "JWT"\n}`;

  // Build payload from detected claims (hardcoded structure, dynamically confirmed)
  const jwtPayload = [
    `{`,
    `  "sub": "shoalter",`,
    `  "name": "shoalter",`,
    hasIat ? `  "iat": <current_unix_timestamp>,` : null,
    hasXApiKey ? `  "x-api-key": "<your UUID from MMS>"` : null,
    `}`,
  ].filter(Boolean).join("\n");

  return [
    `---`,
    `name: hktvmall-auth`,
    `description: HKTVmall authentication reference. Use when generating x-auth-token, setting up JWT for HKTVmall OpenAPI, handling 401 Unauthorized errors, or asking how to get UUID and Private Key from MMS system.`,
    `---`,
    ``,
    `# HKTVmall Authentication`,
    ``,
    `All HKTVmall OpenAPI calls require a JWT token in the \`x-auth-token\` header, signed with **RS256** using credentials from the MMS system.`,
    ``,
    `## Step 1 — Get UUID and Private Key from MMS`,
    ``,
    `**MMS 2.0:** Store Management → Store Basic Settings → Edit store → Enable Open API → copy UUID and Private Key`,
    ``,
    `**MMS 1.0:** eCommerce → Merchant → Merchant Store Status → Edit store → Enable Open API → copy UUID and Private Key`,
    ``,
    `> The UUID and Private Key are shown **only once**. If you leave without copying, disable and re-enable Open API to regenerate.`,
    ``,
    `## Step 2 — Generate JWT Token`,
    ``,
    `**Header:**`,
    `\`\`\`json`,
    jwtHeader,
    `\`\`\``,
    ``,
    `**Payload** (refresh \`iat\` every 30 minutes):`,
    `\`\`\`json`,
    jwtPayload,
    `\`\`\``,
    ``,
    `Sign with your **Private Key** using RS256.`,
    ``,
    `## Step 3 — Use in API Requests`,
    ``,
    `\`\`\``,
    `x-auth-token: <generated JWT>`,
    `\`\`\``,
    ``,
    `## Code Examples`,
    ``,
    `**Node.js (jsonwebtoken):**`,
    `\`\`\`js`,
    `const jwt = require('jsonwebtoken');`,
    `const fs = require('fs');`,
    ``,
    `const privateKey = fs.readFileSync('private.pem', 'utf8');`,
    `const token = jwt.sign(`,
    `  { sub: 'shoalter', name: 'shoalter', 'x-api-key': process.env.HKTV_UUID },`,
    `  privateKey,`,
    `  { algorithm: 'RS256', expiresIn: '30m' }`,
    `);`,
    `\`\`\``,
    ``,
    `**Python (PyJWT):**`,
    `\`\`\`python`,
    `import jwt, time`,
    ``,
    `with open('private.pem') as f:`,
    `    private_key = f.read()`,
    ``,
    `token = jwt.encode(`,
    `    {'sub': 'shoalter', 'name': 'shoalter', 'iat': int(time.time()), 'x-api-key': UUID},`,
    `    private_key,`,
    `    algorithm='RS256'`,
    `)`,
    `\`\`\``,
    ``,
    `## Common Mistakes`,
    ``,
    `| Issue | Fix |`,
    `|---|---|`,
    `| HTTP 401 Unauthorized | Token expired — regenerate with current \`iat\` |`,
    `| Token invalid | Wrong Private Key or UUID mismatch |`,
    `| Credentials lost | Disable + re-enable Open API in MMS to regenerate |`,
    `| Token rejected after save | UUID/Key only activate after clicking Save in MMS |`,
  ].join("\n");
}

const apiDataPath = path.join(__dirname, "../../api-data.json");
const tutorialsDataPath = path.join(__dirname, "../../tutorials-data.json");
const skillsOutputDir = path.join(__dirname, "../../skills");

console.log("開始生成 Skills...");
generateSkills(apiDataPath, skillsOutputDir);
generateAuthSkill(tutorialsDataPath, skillsOutputDir);
console.log("完成！");
