# HKTVmall OpenAPI Toolkit

Bring HKTVmall merchant-platform expertise into your AI coding assistant.

This toolkit ships HKTVmall's Open API knowledge as plug-in skills, so your agent can produce integration code that actually matches the official contract — rather than inventing endpoints from thin air. Reference material comes from the [HKTVmall developer portal](https://developers.shoalter.com/apis).

[繁體中文](./README.zh-TW.md)

## Getting started

**Claude Code** — inside any chat session, run:

```
/plugin marketplace add eeeleeeeee/HKTVmall-OpenAPI-Toolkit
/plugin install hktvmall-plugin@HKTVmall-OpenAPI-Toolkit
```

Then reload (`/reload-plugins`) and the skills become available automatically whenever you ask about HKTVmall APIs.

**Cursor** — open Settings > Features > Chat, scroll to "Plugins", and search for **HKTVmall**. Or install from the [Cursor Marketplace](https://cursor.com/marketplace).

**Gemini CLI** — from your shell, run:

```
gemini extensions install https://github.com/eeeleeeeee/HKTVmall-OpenAPI-Toolkit
```

Once the extension is registered, Gemini will activate the relevant HKTVmall skill whenever a prompt touches the platform.

**VS Code** — open the Command Palette (`CMD+SHIFT+P`) and run **Chat: Install Plugin From Source**.

Then paste:

```
https://github.com/eeeleeeeee/HKTVmall-OpenAPI-Toolkit
```

## Staying up to date

A scheduled GitHub Actions job syncs this repository with the HKTVmall developer portal daily and bumps the plugin's patch version whenever the upstream specs change. To pull the latest build into your Claude Code install, run:

```
/plugin marketplace update HKTVmall-OpenAPI-Toolkit
/plugin update hktvmall-plugin@HKTVmall-OpenAPI-Toolkit
/reload-plugins
```

You can confirm the currently installed version with `/plugin list` and compare it against the latest tag in this repository.

## What's inside

- **On-demand endpoint lookup** — the agent pulls up method, path, headers, and sample payloads for every API on request.
- **Complete merchant surface area** — 23 endpoints covering products (10), orders (9), storefront settings (2), and inventory (2).
- **Grounded code generation** — requests and responses follow the published HKTVmall schema, cutting down on trial-and-error debugging.

## Manual setup

Using a tool without plugin support? Drop the `SKILL.md` folders from `skills/` straight into your assistant's skills directory.

## Keeping the data fresh

The skill files are generated from the public developer portal. To rebuild them after the source changes, run:

```
npm run build
```
