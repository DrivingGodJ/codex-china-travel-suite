import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("plugin manifest and MCP configuration are valid JSON", () => {
  const plugin = JSON.parse(fs.readFileSync(path.join(root, ".codex-plugin", "plugin.json"), "utf8"));
  const mcp = JSON.parse(fs.readFileSync(path.join(root, ".mcp.json"), "utf8"));
  assert.equal(plugin.name, "codex-china-travel-suite");
  assert.deepEqual(Object.keys(mcp.mcpServers).sort(), ["amap", "didi", "meituan-fliggy"]);
});

test("Meituan uses the installed package and not a bundled generated file", () => {
  const source = fs.readFileSync(path.join(root, "servers", "travel-services.mjs"), "utf8");
  assert.match(source, /@meituan-travel\/ht-ai/);
  assert.doesNotMatch(source, /skills[\s\S]*dist[\s\S]*travel\.js/);
});
