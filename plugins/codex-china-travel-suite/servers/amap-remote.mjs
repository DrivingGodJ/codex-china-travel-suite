import { execFileSync } from "node:child_process";
import os from "node:os";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const keychainService = "codex-china-travel-suite-amap-key";

function readKeychain() {
  if (process.platform !== "darwin") return "";
  try {
    return execFileSync(
      "/usr/bin/security",
      ["find-generic-password", "-a", os.userInfo().username, "-s", keychainService, "-w"],
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    ).trim();
  } catch {
    return "";
  }
}

const key = (process.env.AMAP_MCP_KEY || process.env.AMAP_WEBSERVICE_KEY || readKeychain()).trim();
if (!key) {
  console.error(`Missing AMAP_MCP_KEY. On macOS it may be stored in Keychain service ${keychainService}.`);
  process.exit(2);
}

const upstreamUrl = new URL("https://mcp.amap.com/mcp");
upstreamUrl.searchParams.set("key", key);

const upstream = new Client(
  { name: "codex-china-travel-amap-bridge", version: "0.1.0" },
  { capabilities: {} },
);
await upstream.connect(new StreamableHTTPClientTransport(upstreamUrl));

const server = new Server(
  { name: "amap", version: "0.1.0" },
  { capabilities: { tools: {} } },
);
server.setRequestHandler(ListToolsRequestSchema, async () => upstream.listTools());
server.setRequestHandler(CallToolRequestSchema, async (request) => upstream.callTool(request.params));

async function shutdown() {
  await Promise.allSettled([server.close(), upstream.close()]);
  process.exit(0);
}
process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);

await server.connect(new StdioServerTransport());
console.error("AMap bridge ready on stdio.");
