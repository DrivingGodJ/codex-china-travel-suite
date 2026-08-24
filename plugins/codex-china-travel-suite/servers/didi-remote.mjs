import { execFileSync, spawn } from "node:child_process";
import { createRequire } from "node:module";
import os from "node:os";
import path from "node:path";

const require = createRequire(import.meta.url);
const remotePackage = require.resolve("mcp-remote/package.json");
const remoteProxy = path.join(path.dirname(remotePackage), "dist", "proxy.js");
const keychainService = "codex-china-travel-suite-didi-key";

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

const key = (process.env.DIDI_MCP_KEY || readKeychain()).trim();
if (!key) {
  console.error(`Missing DIDI_MCP_KEY. On macOS it may be stored in Keychain service ${keychainService}.`);
  process.exit(2);
}

const endpoint = new URL("https://mcp.didichuxing.com/mcp-servers");
endpoint.searchParams.set("key", key);
const child = spawn(process.execPath, [remoteProxy, endpoint.toString()], {
  stdio: ["inherit", "inherit", "pipe"],
  env: process.env,
});

child.stderr.on("data", (chunk) => {
  process.stderr.write(chunk.toString().split(key).join("[REDACTED]"));
});

for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => child.kill(signal));
child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  else process.exit(code ?? 1);
});
