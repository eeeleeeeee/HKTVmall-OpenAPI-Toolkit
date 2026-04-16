# HKTVmall OpenAPI Toolkit

Connect your AI tools to the HKTVmall platform.

This toolkit gives your AI agent access to HKTVmall's OpenAPI documentation, endpoint references, and code generation guidance for merchant integration.

## Install

**For Claude Code:** Run these two commands in a chat:

```
/plugin marketplace add eeeleeeeee/HKTVmall-OpenAPI-Toolkit
/plugin install hktvmall-plugin@HKTVmall-OpenAPI-Toolkit
```

## What you get

- **API Reference**: All 23 HKTVmall OpenAPI endpoints across Product, Order, Store, and Inventory categories
- **Request/Response Examples**: Real request bodies and response formats for each endpoint
- **Required Headers**: Authentication and platform headers needed for every API call
- **Auto-updates**: The plugin updates automatically as HKTVmall releases new API changes

## Available Skills

| Skill | Description |
|-------|-------------|
| `hktvmall-api-overview` | Discover all available API categories and endpoints |
| `hktvmall-product-apis` | 10 endpoints — create, edit, query products |
| `hktvmall-order-apis` | 9 endpoints — orders, waybills, returns |
| `hktvmall-store-apis` | 2 endpoints — get/update store info |
| `hktvmall-inventory-apis` | 2 endpoints — get/update stock levels |

## Updating API Data

To regenerate skills from the latest HKTVmall developer portal:

```bash
npm run build
```

This runs three steps:
1. **fetch** — Downloads the JS bundle from developers.shoalter.com
2. **extract** — Parses API definitions from the bundle
3. **skills** — Generates SKILL.md files for each API category

## License

MIT
